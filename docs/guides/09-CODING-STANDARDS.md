# Coding Standards

Code quality and style guidelines for PackEdge.

## 📐 General Principles

1. **Readability First**
   - Code is read more often than written
   - Optimize for understanding, not brevity

2. **Consistency**
   - Follow existing patterns in codebase
   - Use linter and formatter

3. **Simplicity**
   - Prefer simple solutions
   - Avoid over-engineering

4. **DRY (Don't Repeat Yourself)**
   - Extract reusable code into functions/components
   - Create utilities for common operations

5. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

---

## 🎨 Naming Conventions

### Variables and Functions

```typescript
// ✅ Good
const isUserLoggedIn = true;
const getUserEmail = (userId: string) => {};
let productList: Product[] = [];

// ❌ Bad
const user_logged_in = true;
const gUE = (uId) => {};
let pl = [];
```

### Classes and Interfaces

```typescript
// ✅ Good
class UserService {}
interface IProductResponse {}
type UserRole = 'ADMIN' | 'USER';

// ❌ Bad
class userService {}
class _User {}
interface ProductResponse {} // Missing I prefix
```

### Constants

```typescript
// ✅ Good
const MAX_LOGIN_ATTEMPTS = 5;
const DEFAULT_PAGE_LIMIT = 20;
const API_TIMEOUT_MS = 5000;

// ❌ Bad
const maxLoginAttempts = 5;
const default_page_limit = 20;
```

### Files and Directories

```
// ✅ Good
src/
  components/
    ProductCard.jsx
    UserProfile.jsx
  services/
    auth-service.js
    product-service.js
  utils/
    formatters.ts
    validators.ts

// ❌ Bad
src/
  CompFiles/
  MYSERVICES/
  util.js
```

---

## 📏 File Organization

### Frontend Component Structure

```typescript
// ProductCard.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Imports should be organized:
// 1. React imports
// 2. Third-party imports
// 3. Local imports

export default function ProductCard({ product, onSelect }) {
  // State declarations
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Event handlers
  const handleClick = () => {
    onSelect(product.id);
  };

  // Render
  return (
    <div className="product-card">
      {/* JSX */}
    </div>
  );
}

// Prop validation
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};
```

### Backend Service Structure

```typescript
// products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

// Services should have:
// 1. Dependency injection (constructor)
// 2. Private helper methods
// 3. Public business methods
// 4. Error handling

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Public methods
  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.product.findMany({ skip, take: limit });
  }

  // Private helpers
  private calculateDiscount() {
    // ...
  }
}
```

---

## 🎯 Code Quality Rules

### Line Length

- **Maximum 100 characters**
- Break long lines logically

```typescript
// ✅ Good
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  include: { reviews: true }
});

// ❌ Bad (too long)
const users = await prisma.user.findMany({ where: { role: 'ADMIN' }, include: { reviews: true } });
```

### Function Length

- **Keep functions under 50 lines**
- Extract complex logic into separate functions

```typescript
// ✅ Good
async function registerUser(data: RegisterDto) {
  validateInput(data);
  const hashedPassword = await hashPassword(data.password);
  return createUserInDatabase(data, hashedPassword);
}

// ❌ Bad (too long, multiple responsibilities)
async function registerUser(data: RegisterDto) {
  // 100+ lines with validation, hashing, DB ops, emails, logging, etc.
}
```

### Cyclomatic Complexity

- **Limit to 10** branches per function
- Use early returns

```typescript
// ✅ Good
const validateEmail = (email: string): boolean => {
  if (!email) return false;
  if (!email.includes('@')) return false;
  if (email.length > 100) return false;
  return true;
};

// ❌ Bad (nested conditions)
const validateEmail = (email: string): boolean => {
  if (email) {
    if (email.includes('@')) {
      if (email.length <= 100) {
        return true;
      }
    }
  }
  return false;
};
```

### Avoid Magic Numbers

```typescript
// ✅ Good
const MAX_PASSWORD_LENGTH = 128;
const MIN_USERNAME_LENGTH = 3;

const isValidPassword = (pwd: string) => pwd.length <= MAX_PASSWORD_LENGTH;
const isValidUsername = (name: string) => name.length >= MIN_USERNAME_LENGTH;

// ❌ Bad
const isValidPassword = (pwd: string) => pwd.length <= 128;
const isValidUsername = (name: string) => name.length >= 3;
```

---

## 🔋 Error Handling

### Try-Catch Pattern

```typescript
// ✅ Good
try {
  const user = await getUserById(id);
  return user;
} catch (error) {
  if (error instanceof NotFoundError) {
    throw new NotFoundException('User not found');
  }
  logger.error('Unexpected error:', error);
  throw new InternalServerErrorException();
}

// ❌ Bad
try {
  return await getUserById(id);
} catch (error) {
  // Silently failing
}
```

### Null/Undefined Checks

```typescript
// ✅ Good
const userName = user?.name ?? 'Guest';
const email = user?.contact?.email || 'no-email@example.com';

// ❌ Bad
const userName = user ? user.name : 'Guest';
if (user != null && user.contact != null) {
  const email = user.contact.email;
}
```

---

## 🧪 Testing Standards

### Test Organization

```typescript
describe('AuthService', () => {
  // Setup
  let service: AuthService;

  beforeEach(async () => {
    service = createService();
  });

  // Test cases grouped by functionality
  describe('login', () => {
    it('should return token on valid credentials', async () => {
      // Arrange
      const credentials = { email: 'test@ex.com', password: 'pwd' };

      // Act
      const result = await service.login(credentials);

      // Assert
      expect(result.token).toBeDefined();
    });

    it('should throw on invalid credentials', async () => {
      const credentials = { email: 'test@ex.com', password: 'wrong' };
      await expect(service.login(credentials)).rejects.toThrow();
    });
  });
});
```

### Test Naming

```typescript
// ✅ Good
it('should return 404 when product does not exist', () => {});
it('should filter products by category', () => {});
it('should handle concurrent requests', () => {});

// ❌ Bad
it('works', () => {});
it('test product', () => {});
it('check if..', () => {});
```

---

## 💬 Comments and Documentation

### When to Comment

```typescript
// ✅ Good comments
// Explain WHY, not WHAT

// User ID is stored as CUID for better indexing performance
const userId = generateCUID();

// Retry with exponential backoff for reliability
await retryWithBackoff(() => api.call(), { maxRetries: 3 });

// ❌ Bad comments
// Increment x
x++;

// Set user
const user = getUser();
```

### JSDoc Comments

```typescript
/**
 * Filters products by category and price range.
 *
 * @param products - Array of Product objects
 * @param categoryId - Category ID to filter by
 * @param minPrice - Minimum price (inclusive)
 * @param maxPrice - Maximum price (inclusive)
 * @returns Filtered product array
 *
 * @example
 * const filtered = filterProducts(products, 'cat_1', 10, 100);
 */
function filterProducts(
  products: Product[],
  categoryId: string,
  minPrice: number,
  maxPrice: number
): Product[] {
  // Implementation
}
```

---

## 📋 React Best Practices

### Component Props

```typescript
// ✅ Good
interface ProductProps {
  id: string;
  name: string;
  price: number;
  onSelect: (id: string) => void;
}

export function Product({ id, name, price, onSelect }: ProductProps) {
  // ...
}

// ❌ Bad
export function Product(props) {
  return <div>{props.product.name}</div>;
}
```

### Hooks Usage

```typescript
// ✅ Good
function useProducts(categoryId: string) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Logic here
  }, [categoryId]); // Only re-run when categoryId changes

  return { products, isLoading };
}

// ❌ Bad
function Component() {
  useEffect(() => {
    // API call on every render
  }); // Missing dependency array
}
```

---

## 🛡️ Security Guidelines

### Input Validation

```typescript
// ✅ Good
const createUser = async (data: unknown) => {
  // Validate before using
  const validated = userSchema.parse(data);
  return prisma.user.create({ data: validated });
};

// ❌ Bad
const createUser = async (data) => {
  return prisma.user.create({ data });
};
```

### Sensitive Data

```typescript
// ✅ Good
return {
  id: user.id,
  email: user.email,
  name: user.name
  // Never return password
};

// ❌ Bad
return user; // Includes password hash
```

---

## 🎬 Async/Await

```typescript
// ✅ Good
async function fetchUserData(id: string) {
  try {
    const user = await getUser(id);
    const posts = await getUserPosts(id);
    return { user, posts };
  } catch (error) {
    logger.error('Failed to fetch user data:', error);
    throw new Error('Failed to fetch data');
  }
}

// ❌ Bad
async function fetchUserData(id: string) {
  const user = await getUser(id); // Sequential
  const posts = await getUserPosts(id);
  return { user, posts };
}

// ✅ Better (parallel)
async function fetchUserData(id: string) {
  const [user, posts] = await Promise.all([
    getUser(id),
    getUserPosts(id)
  ]);
  return { user, posts };
}
```

---

## 📦 TypeScript Best Practices

### Type Definitions

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
}

type UserRole = 'ADMIN' | 'USER';

// ❌ Bad
const user = {}; // any type
interface User {
  id: any;
  name: any;
}
```

### Strict Mode

```typescript
// Enable in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## ✅ Linting & Formatting

### ESLint Configuration

Install and run:
```bash
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix issues
```

### Prettier Formatting

```bash
npm run format        # Format code
npm run format:check  # Check formatting
```

### Pre-commit Hooks

```bash
# Install husky
npm install husky

# Will auto-lint and format on commit
```

---

## 🔍 Code Review Checklist

Before submitting PR:

- [ ] Code follows naming conventions
- [ ] No console.log() calls left
- [ ] Error handling implemented
- [ ] No magic numbers
- [ ] Functions have single responsibility
- [ ] Comments explain WHY not WHAT
- [ ] Tests added/updated
- [ ] No sensitive data exposed
- [ ] TypeScript strict mode passes
- [ ] Linter passes
- [ ] No performance issues

---

**Last Updated:** April 6, 2024
