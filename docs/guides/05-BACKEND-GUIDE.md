# Backend Guide - Strapi CMS

Comprehensive guide to Strapi CMS backend development and best practices.

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   ├── users/             # Users module
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   ├── products/          # Products module
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   ├── products.controller.ts
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   └── entities/
│   │       └── product.entity.ts
│   ├── categories/        # Categories module
│   ├── reviews/           # Reviews module
│   ├── promotions/        # Promotions module
│   ├── upload/            # File upload module
│   ├── analytics/         # Analytics module
│   ├── common/            # Shared utilities
│   │   ├── decorators/
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── enums/
│   │       └── role.enum.ts
│   ├── config/            # Configuration
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── test/                  # Tests
├── package.json
├── nest-cli.json
└── tsconfig.json
```

---

## 🏗️ Module Architecture

### Module Pattern

```typescript
// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]  // Export for use in other modules
})
export class ProductsModule {}
```

---

## 🔧 Service Layer

### Service Pattern

```typescript
// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: { category: true }
      }),
      this.prisma.product.count()
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: true }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    // Validate category exists
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.product.create({
      data: createProductDto,
      include: { category: true }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.getById(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: { category: true }
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
```

---

## 🎯 Controller Layer

### Controller Pattern

```typescript
// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const result = await this.productsService.getAll(page, limit);
    return {
      statusCode: 200,
      data: result.data,
      pagination: result.pagination
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const product = await this.productsService.getById(id);
    return {
      statusCode: 200,
      data: product
    };
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return {
      statusCode: 201,
      data: product,
      message: 'Product created successfully'
    };
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    return {
      statusCode: 200,
      data: product,
      message: 'Product updated successfully'
    };
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    await this.productsService.delete(id);
    return {
      statusCode: 200,
      message: 'Product deleted successfully'
    };
  }
}
```

---

## 📝 DTO Pattern

### DTO with Validation

```typescript
// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsPositive, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  categoryId: string;

  @IsString()
  @IsOptional()
  image?: string;
}
```

---

## 🔐 Guards and Decorators

### JWT Guard

```typescript
// src/auth/guards/jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
```

### Roles Guard

```typescript
// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
```

### Roles Decorator

```typescript
// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

---

## 🔄 Error Handling

### Exception Filter

```typescript
// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message: message instanceof Object ? message['message'] : message,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

## 🌍 Environment Configuration

### Configuration Service

```typescript
// src/config/jwt.config.ts
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES_IN', '24h')
  }
});
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/packedge"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="24h"

# Server
PORT=4000
NODE_ENV="development"
```

---

## 🧪 Testing Services

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return all products', async () => {
    const result = await service.getAll();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pagination');
  });
});
```

---

## 📊 Database Operations

### Prisma Queries

```typescript
// Get with relations
const product = await prisma.product.findUnique({
  where: { id: 'prod_1' },
  include: {
    category: true,
    reviews: {
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    }
  }
});

// Update with relations
const updated = await prisma.product.update({
  where: { id: 'prod_1' },
  data: {
    name: 'New Name',
    reviews: {
      connect: [{ id: 'rev_1' }]
    }
  },
  include: { reviews: true }
});

// Delete cascade
const deleted = await prisma.product.delete({
  where: { id: 'prod_1' }
  // Reviews will cascade delete
});
```

---

## 🚀 Best Practices

### 1. Single Responsibility
- Services handle business logic
- Controllers handle request/response
- Guards handle authorization

### 2. Dependency Injection
```typescript
constructor(
  private productsService: ProductsService,
  private prisma: PrismaService
) {}
```

### 3. Error Handling
```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof PrismaClientValidationError) {
    throw new BadRequestException('Invalid data');
  }
  throw error;
}
```

### 4. Logging
```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  async getAll() {
    this.logger.debug('Fetching all products');
    // ...
  }
}
```

---

**Next:** Read [Database Schema](./06-DATABASE-SCHEMA.md) for data model details.
