# Authentication & Authorization

Complete guide to authentication and authorization systems.

## 🔐 Authentication Overview

PackEdge uses **JWT (JSON Web Tokens)** for stateless authentication.

### Flow

```
1. User registers/logs in
2. Server validates credentials
3. Server returns JWT token
4. Client stores token (localStorage)
5. Client sends token with every request
6. Server validates token and grants access
```

---

## 🔑 JWT Implementation

### Token Structure

```
Header.Payload.Signature
```

### Payload Contents

```json
{
  "sub": "user_123",      // Subject (user ID)
  "email": "user@ex.com", // User email
  "role": "USER",         // User role
  "iat": 1705320600,      // Issued at
  "exp": 1705407000       // Expires at
}
```

### Token Configuration

```javascript
// config/plugins.js (Strapi)
module.exports = ({env}) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d'
      }
    }
  }
});
```

### Token Validation

Backend validates on every protected endpoint:
1. Token format (Bearer <token>)
2. Token signature (matches secret)
3. Token expiration (not expired)
4. Token claims (valid data)

---

## 📝 Registration

### User Registration Flow

```
Frontend: POST /auth/register
  ↓
Backend: Validate input
  ↓
Backend: Check if email exists
  ↓
Backend: Hash password (bcrypt)
  ↓
Backend: Create user in database
  ↓
Backend: Generate JWT token
  ↓
Frontend: Store token
  ↓
Frontend: Redirect to dashboard
```

### Registration Validation Rules

| Field | Rules |
|-------|-------|
| name | 2-100 characters, required |
| email | Valid format, unique in database |
| password | 8+ characters, required |

### Registration Example

```javascript
// Frontend
const register = async (name, email, password) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password
  });
  
  localStorage.setItem('authToken', response.data.token);
  router.push('/dashboard');
};

// Backend
@Post('register')
async register(@Body() registerDto: RegisterDto) {
  // 1. Validate input
  // 2. Check email uniqueness
  const exists = await this.prisma.user.findUnique({
    where: { email: registerDto.email }
  });
  if (exists) throw new ConflictException('Email already registered');
  
  // 3. Hash password
  const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  
  // 4. Create user
  const user = await this.prisma.user.create({
    data: {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: 'USER'
    }
  });
  
  // 5. Generate token
  const token = this.generateToken(user);
  
  // 6. Return
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  };
}
```

---

## 🔑 Login

### Login Flow

```
Frontend: POST /auth/login
  ↓
Backend: Validate input
  ↓
Backend: Find user by email
  ↓
Backend: Compare passwords
  ↓
Backend: Generate JWT token
  ↓
Frontend: Store token
  ↓
Frontend: Redirect to dashboard
```

### Login Implementation

```javascript
// Frontend
const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password
  });
  
  const { token, user } = response.data;
  localStorage.setItem('authToken', token);
  setUser(user);
};

// Backend
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // 1. Find user
  const user = await this.prisma.user.findUnique({
    where: { email: loginDto.email }
  });
  
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }
  
  // 2. Compare passwords
  const passwordMatch = await bcrypt.compare(
    loginDto.password,
    user.password
  );
  
  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }
  
  // 3. Generate token
  const token = this.generateToken(user);
  
  // 4. Return
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  };
}
```

---

## 🛡️ Authorization

### Role-Based Access Control (RBAC)

#### User Roles

```typescript
enum Role {
  ADMIN = 'ADMIN',   // Full system access
  USER = 'USER'      // Limited access
}
```

#### Role Permissions

| Feature | USER | ADMIN |
|---------|------|-------|
| View products | ✅ | ✅ |
| Create product | ❌ | ✅ |
| Edit own product | ❌ | ✅ |
| Delete product | ❌ | ✅ |
| Post review | ✅ | ✅ |
| Edit own review | ✅ | ✅ |
| Delete own review | ✅ | ✅ |
| Manage users | ❌ | ✅ |
| View analytics | ❌ | ✅ |

#### Protecting Routes

**Backend (Strapi):**
```javascript
// src/api/product/controllers/product.js
module.exports = createCoreController(
  'api::product.product',
  ({ strapi }) => ({
    async create(ctx) {
      // Check authentication
      if (!ctx.state.user) {
        return ctx.unauthorized('Must be logged in');
      }
      
      // Check role
      if (ctx.state.user.role.name !== 'Admin') {
        return ctx.forbidden('Only admins can create');
      }
      
      // Protected action
      const product = await strapi.entityService.create(
        'api::product.product',
        { data: ctx.request.body }
      );
      
      ctx.send({ data: product });
    }
  })
);
```

**Frontend (React):**
```jsx
export function AdminRoute({ element }) {
  const { user } = useAuth();
  
  return user?.role === 'Admin' ? element : <Navigate to="/" />;
}
```

---

## 🔐 Protected Endpoints

### How Protection Works

```
1. Client sends request with Authorization header
2. Backend receives request
3. Backend extracts token from header
4. Backend validates token signature
5. Backend checks token expiration
6. Backend verifies user role (if needed)
7. Backend processes request
8. Backend returns response
```

### Authorization Header Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Protected Endpoint Example

```javascript
// Strapi - src/api/product/routes/product.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products',
      handler: 'product.find',
      config: { policies: [] }  // Public
    },
    {
      method: 'POST',
      path: '/products',
      handler: 'product.create',
      config: { 
        policies: ['api::product.is-admin']  // Admin only
      }
    },
    {
      method: 'POST',
      path: '/products/:id/review',
      handler: 'product.addReview',
      config: { 
        policies: ['api::product.is-authenticated']  // Auth required
      }
    }
  ]
};
```
async createReview(@Req() req) {
  const userId = req.user.id;  // Token provides user info
}

@Delete('products/:id')
@UseGuards(JwtGuard, RolesGuard)  // Requires token + ADMIN role
@Roles('ADMIN')
async deleteProduct(@Param('id') id: string) {
  // Only admins can access
}
```

---

## 📝 Token Management

### Storing Tokens

**Recommended: localStorage**
```javascript
localStorage.setItem('authToken', token);
```

**Accessing token:**
```javascript
const token = localStorage.getItem('authToken');
```

**Clearing token (logout):**
```javascript
localStorage.removeItem('authToken');
```

### Automatic Token Injection

Axios interceptor automatically adds token:

```typescript
// services/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Token Expiration Handling

```typescript
// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🔄 Password Reset (Future)

Implementation plan:

```
1. User requests password reset
2. Backend generates reset token (valid for 1 hour)
3. Backend sends email with reset link
4. User clicks link, enters new password
5. Backend validates reset token
6. Backend updates password
7. User can login with new password
```

---

## 🔐 Security Best Practices

### ✅ DO

- Use HTTPS in production
- Store JWT_SECRET in .env (never commit)
- Validate all inputs (frontend and backend)
- Hash passwords with bcrypt (10+ rounds)
- Use strong JWT_SECRET (32+ characters)
- Implement rate limiting on auth endpoints
- Log authentication failures
- Clear tokens on logout
- Validate token expiration

### ❌ DON'T

- Store JWT_SECRET in code
- Send passwords in API responses
- Use unsecured HTTP
- Trust only frontend validation
- Log user passwords
- Expose user emails in public lists
- Allow unlimited login attempts
- Store plain-text passwords

---

## 🧪 Testing Authentication

### Test Registration

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Endpoint

```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📖 Related Documentation

- [API Overview](../api/01-API-OVERVIEW.md)
- [Auth Endpoints](../api/02-AUTH-ENDPOINTS.md)
- [Backend Guide](./05-BACKEND-GUIDE.md)

---

**Last Updated:** April 6, 2024
