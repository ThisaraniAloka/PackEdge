# Database Schema

Complete Prisma database schema for PackEdge.

## 📊 Overview

PackEdge uses PostgreSQL with Prisma ORM. This document describes all data models and relationships.

## 🗄️ Prisma Schema

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 👤 User Model

User accounts for customers and admins.

### Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // Hashed password
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  reviews   Review[]
  orders    Order[]
}

enum Role {
  ADMIN
  USER
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier (CUID) |
| name | String | User's full name |
| email | String | Email (unique) |
| password | String | Hashed password |
| role | Role | User role (USER or ADMIN) |
| createdAt | DateTime | Account creation date |
| updatedAt | DateTime | Last updated date |

### Relationships

- **reviews** → User can have many reviews
- **orders** → User can have many orders (future)

### Example

```javascript
const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password",
    role: "USER"
  }
});
```

---

## 📦 Product Model

Sellable items in the catalog.

### Schema

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  stock       Int
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  image       String?  // URL or file path
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  reviews     Review[]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | String | Product ID |
| name | String | Product name |
| description | String | Full description |
| price | Float | Unit price ($) |
| stock | Int | Stock quantity |
| categoryId | String | Foreign key to Category |
| image | String | Product image URL |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

### Relationships

- **category** → Belongs to one category
- **reviews** → Can have many reviews

### Queries

```javascript
// Get all products with category
const products = await prisma.product.findMany({
  include: { category: true }
});

// Get by ID with reviews
const product = await prisma.product.findUnique({
  where: { id: "prod_123" },
  include: { 
    category: true,
    reviews: { include: { user: true } }
  }
});

// List by category
const products = await prisma.product.findMany({
  where: { categoryId: "cat_1" }
});
```

---

## 📂 Category Model

Product categories/types.

### Schema

```prisma
model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  image       String?  // Category image
  status      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  products    Product[]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | String | Category ID |
| name | String | Category name (unique) |
| description | String | Category description |
| image | String | Category image |
| status | Boolean | Active/inactive |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

### Relationships

- **products** → Can have many products

### Queries

```javascript
// Get all active categories
const categories = await prisma.category.findMany({
  where: { status: true }
});

// Get with products
const category = await prisma.category.findUnique({
  where: { id: "cat_1" },
  include: { products: true }
});
```

---

## ⭐ Review Model

Customer reviews and ratings.

### Schema

```prisma
model Review {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rating    Int      // 1-5 stars
  comment   String   // Review text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | String | Review ID |
| productId | String | Foreign key to Product |
| userId | String | Foreign key to User |
| rating | Int | Rating (1-5 stars) |
| comment | String | Review text |
| createdAt | DateTime | Review date |
| updatedAt | DateTime | Last update |

### Relationships

- **product** → Belongs to one product
- **user** → Belongs to one user

### Constraints

- Rating must be between 1-5
- Comment required
- Cascade delete on product/user delete

### Queries

```javascript
// Get reviews for a product
const reviews = await prisma.review.findMany({
  where: { productId: "prod_123" },
  include: { user: true }
});

// Get user's reviews
const userReviews = await prisma.review.findMany({
  where: { userId: "user_123" },
  include: { product: true }
});

// Get average rating
const avg = await prisma.review.aggregate({
  where: { productId: "prod_123" },
  _avg: { rating: true }
});
```

---

## 🎁 Promotion Model

Discounts and special offers.

### Schema

```prisma
model Promotion {
  id        String   @id @default(cuid())
  name      String
  discount  Float    // Percentage (e.g., 20.5 for 20.5%)
  startDate DateTime
  endDate   DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | String | Promotion ID |
| name | String | Promotion name |
| discount | Float | Discount percentage |
| startDate | DateTime | Start date/time |
| endDate | DateTime | End date/time |
| createdAt | DateTime | Created date |
| updatedAt | DateTime | Last update |

### Queries

```javascript
// Get active promotions
const now = new Date();
const promotions = await prisma.promotion.findMany({
  where: {
    startDate: { lte: now },
    endDate: { gte: now }
  }
});

// Get by date range
const promotions = await prisma.promotion.findMany({
  where: {
    startDate: { gte: new Date('2024-01-01') },
    endDate: { lte: new Date('2024-12-31') }
  }
});
```

---

## 🔄 Relationships Diagram

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ role        │
└──────┬──────┘
       │
       ├─────────────┐
       │             │
       │        ┌────────────┐
       │        │  Review    │
       │        ├────────────┤
       │        │ id (PK)    │
       │        │ rating     │
       │        │ comment    │
       │        │ userId(FK) │
       │        │ productId  │
       │        └────┬───────┘
       │             │
       │             └──────────────┐
       │                            │
       │    ┌──────────────────┐    │
       │    │   Product       │    │
       │    ├──────────────────┤    │
       │    │ id (PK)         │◄───┤
       │    │ name            │
       │    │ price           │
       │    │ categoryId (FK) │
       │    └────┬────────────┘
       │         │
       │    ┌────▼────────────┐
       │    │   Category      │
       │    ├─────────────────┤
       │    │ id (PK)         │
       │    │ name            │
       │    │ status          │
       │    └─────────────────┘
       │
       
    Promotion (independent)
    ├─────────────────┤
    │ id (PK)         │
    │ discount        │
    │ startDate       │
    │ endDate         │
    └─────────────────┘
```

---

## 📝 Migrations

### Create/Update Database

```bash
# Create migration
npm run prisma:migrate

# Apply pending migrations
npm run prisma:migrate:deploy

# Reset database (WARNING: deletes all data)
npm run prisma:migrate:reset

# View database GUI
npm run prisma:studio
```

### View Existing Migrations

```bash
# List all migrations
ls prisma/migrations/

# Each migration folder contains:
# - migration.sql (SQL changes)
# - .env file with timestamp
```

---

## 🌱 Database Seeding

### Seed Script

Located at `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Kraft Boxes', description: '...' },
      { name: 'Paper Bags', description: '...' }
    ]
  });

  // Create products
  const products = await prisma.product.createMany({
    data: [
      { 
        name: 'Eco Box S',
        price: 25.99,
        categoryId: categories[0].id
      }
    ]
  });
}

main()
  .then(() => console.log('Seeded'))
  .finally(() => prisma.$disconnect());
```

### Run Seeding

```bash
npm run seed
```

---

## 🔒 Data Validation

### User
- Email must be unique and valid
- Password must be 8+ characters
- Role must be USER or ADMIN

### Product
- Price cannot be negative
- Stock cannot be negative
- Must have valid categoryId
- Name and description required

### Review
- Rating must be 1-5
- Comment required (max 1000 chars)
- One review per user per product

### Category
- Name must be unique
- Status is boolean

### Promotion
- Discount must be 0-100
- startDate must be before endDate

---

## 💾 Backup & Administration

### Backup Database

```bash
pg_dump packedge > backup.sql
```

### Restore Database

```bash
psql packedge < backup.sql
```

### Connect with GUI Tools

- **PgAdmin:** Web-based admin
- **DataGrip:** JetBrains IDE
- **DBeaver:** Universal database tool
- **Prisma Studio:** CLI tool (`npm run prisma:studio`)

---

**Next:** Read [Backend Guide](../guides/05-BACKEND-GUIDE.md) for service implementation details.
