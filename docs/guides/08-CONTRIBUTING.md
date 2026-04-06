# Contributing Guide

Guidelines for contributing to PackEdge project.

## 🤝 Getting Started

1. **Fork the repository** (if external contributor)
2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PackEdge.git
   cd PackEdge
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Set up development environment** (see [Setup Guide](./01-SETUP.md))
5. **Make your changes**
6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feat/your-feature-name
   ```
7. **Create Pull Request** on GitHub

---

## 🌳 Branch Naming Convention

Branches should follow the format:

```
<type>/<description>
```

### Types

- `feat/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions/fixes
- `chore/` - Dependency updates, config changes
- `perf/` - Performance improvements

### Examples

```
feat/add-review-system
fix/product-image-loading
docs/update-api-docs
refactor/auth-service
test/product-tests
chore/update-dependencies
```

---

## 📝 Commit Message Format

Follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Same as branch types (feat, fix, docs, etc.)

### Scope

Where the change was made:
- `frontend` - React/Vite code
- `backend` - NestJS code
- `database` - Prisma schema
- `config` - Configuration files
- `docs` - Documentation

### Subject

- Imperative mood ("add" not "added")
- Not capitalized
- No period at end
- 50 characters or less

### Body (Optional)

- Explain WHAT and WHY (not HOW)
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

Reference issues:
```
Closes #123
Fixes #456
Related to #789
```

### Examples

```
feat(frontend): add product search filter

Implement search input in product catalog
that filters products by name and category.

Closes #45

---

fix(backend): correct review duplicate validation

The duplicate review check was using the wrong
user ID field, allowing multiple reviews.

Fixes #87

---

docs: update authentication guide

Add examples for JWT token storage and usage.
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Pull latest `main` branch
   ```bash
   git pull origin main
   ```
2. ✅ Merge main into your branch (resolve conflicts)
   ```bash
   git merge main
   ```
3. ✅ Run tests locally
   ```bash
   npm test
   ```
4. ✅ Run linter
   ```bash
   npm run lint
   ```
5. ✅ Build locally
   ```bash
   npm run build
   ```

### PR Title Format

```
[TYPE] Description of change
```

Examples:
```
[FEATURE] Add product search
[BUG FIX] Fix image upload error
[DOCS] Update API documentation
[REFACTOR] Improve auth service
```

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance

## How to Test
Steps to test the changes:
1.
2.
3.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Added tests (if applicable)
- [ ] Updated documentation
- [ ] No breaking changes
```

### Code Review

**Reviewers will check:**
- Code quality and style
- Performance impact
- Security issues
- Test coverage
- Documentation
- Breaking changes

**As Author:**
- Respond to all comments
- Request re-review after changes
- Merge only after approval

---

## 💻 Code Quality

### Linting

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint
```

### Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### TypeScript Compilation

```bash
# Check for TS errors
npm run typecheck
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- productService.test.ts

# Generate coverage report
npm test -- --coverage
```

---

## 📚 Code Style Guide

### JavaScript/TypeScript

```typescript
// ✅ Good
const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user;
};

// ❌ Bad
async function get_user_by_id(id) {
  var user = await prisma.user.findUnique({where:{id}})
  return user
}
```

### React Components

```jsx
// ✅ Good
export function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => onSelect(product.id)}>
        View Details
      </button>
    </div>
  );
}

// ❌ Bad
export default function pc(props) {
  return (
    <div>
      <h3>{props.p.n}</h3>
      <p>${props.p.pr}</p>
      <button onClick={props.o}>View</button>
    </div>
  );
}
```

### Naming Conventions

```typescript
// Constants: UPPER_SNAKE_CASE
const MAX_PRODUCTS_PER_PAGE = 20;

// Variables/Functions: camelCase
const userName = 'John';
const getUserData = () => {};

// Classes/Types: PascalCase
class UserService {}
interface IUserResponse {}

// File names: kebab-case (except .jsx/.tsx: PascalCase)
// ✅ user-service.ts
// ✅ ProductCard.jsx
// ❌ UserService.ts
// ❌ productcard.jsx
```

---

## 🧪 Testing Guidelines

### Unit Tests

Test individual functions/methods:

```typescript
describe('formatPrice', () => {
  it('should format price with 2 decimals', () => {
    expect(formatPrice(29.5)).toBe('$29.50');
  });

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
```

### Integration Tests

Test API endpoints and services:

```typescript
describe('ProductsService', () => {
  it('should fetch products with pagination', async () => {
    const result = await service.getAll(1, 10);
    expect(result.data).toHaveLength(10);
    expect(result.pagination).toBeDefined();
  });
});
```

### E2E Tests

Test complete user flows:

```typescript
describe('User Registration', () => {
  it('should register new user and redirect to dashboard', () => {
    cy.visit('/register');
    cy.get('[data-cy=name]').type('John Doe');
    cy.get('[data-cy=email]').type('john@example.com');
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## 📖 Documentation

### When to Update Docs

- ✅ Adding new feature
- ✅ Changing API endpoint
- ✅ Modifying database schema
- ✅ Updated dependency versions
- ❌ Internal refactoring (unless public API changes)

### Documentation Checklist

- [ ] Code comments for complex logic
- [ ] Function/method documentation
- [ ] API endpoint documentation
- [ ] README updates (if needed)
- [ ] CHANGELOG entry

### Code Comments

```typescript
// ✅ Good
// Calculate discount based on promotion end date
const isPromotionActive = endDate > new Date();

// ❌ Bad
// Set value to x
const x = true;

// ❌ Unnecessary
const email = 'user@example.com'; // Set email
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No linting errors
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Performance checks done

---

## 🐛 Reporting Issues

### Issue Title Format

```
[TYPE] Brief description
```

### Issue Description

```markdown
## Description
Clear problem description.

## Steps to Reproduce
1.
2.
3.

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: Windows 10
- Node: 18.0.0
- Browser: Chrome 120

## Screenshots
If applicable.
```

### Issue Labels

- `bug` - Something broken
- `feature` - Enhancement request
- `documentation` - Doc improvement
- `help wanted` - Need assistance
- `good first issue` - For new contributors

---

## ✨ Tips for Contributors

### Getting Help

- 💬 Check existing documentation
- 🔍 Search closed issues
- 📧 Ask maintainers (GitHub Discussions)
- 📚 Read code comments

### Common Tasks

**Adding a new API endpoint:**

1. Create DTO in `backend/src/module/dto/`
2. Add method to service
3. Add route to controller
4. Update API docs
5. Add frontend service method
6. Add tests
7. Create PR

**Adding a new page:**

1. Create component in `frontend/src/pages/`
2. Add to router
3. Create service if needed
4. Add styling with Tailwind
5. Add tests
6. Update docs
7. Create PR

---

## 📞 Contact

- 📧 Email: team@packedge.com
- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 🎯 Project Board

---

**Happy Contributing! 🎉**
