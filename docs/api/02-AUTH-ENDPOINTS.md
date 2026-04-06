# Authentication API Endpoints

Endpoints for user authentication and authorization.

## 📋 Endpoints

### 1. User Login

Register a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "data": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-04-06T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "error": "User already exists",
  "message": "Email is already registered"
}
```

**Validation Rules:**
- Name: Required, min 2 characters
- Email: Required, valid email format, unique
- Password: Required, min 8 characters

---

### 2. User Registration

Log in with email and password.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "data": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "error": "Invalid credentials",
  "message": "Email or password is incorrect"
}
```

**Validation Rules:**
- Email: Required, must exist in system
- Password: Required, must match

---

### 3. Get Current User

Get authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "data": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-04-06T10:00:00Z",
    "updatedAt": "2024-04-06T10:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

---

### 4. Logout

Log out current user (client-side only).

**Note:** JWT tokens are stateless, so logout is handled by:
1. Client removes token from `localStorage`
2. Client redirects to login page

**Frontend Implementation:**
```javascript
localStorage.removeItem('authToken');
window.location.href = '/login';
```

---

## 🔐 Token Management

### Storing Token

After login, store the JWT token:

```javascript
// Frontend
const response = await api.post('/auth/login', credentials);
localStorage.setItem('authToken', response.data.token);
```

### Using Token

Send token in every authenticated request:

```javascript
// Axios interceptor automatically adds token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Token Expiration

Token expires in **24 hours**:
- User must re-login after expiration
- Expired token returns 401 error
- Frontend redirects to login page

---

## 👥 User Roles

### Role Types

```typescript
enum Role {
  USER = 'USER',      // Regular user
  ADMIN = 'ADMIN'     // Administrator
}
```

### Permissions by Role

| Feature | USER | ADMIN |
|---------|------|-------|
| Browse products | ✅ | ✅ |
| Post reviews | ✅ | ✅ |
| View profile | ✅ | ✅ |
| Edit own profile | ✅ | ❌ |
| Create products | ❌ | ✅ |
| Edit products | ❌ | ✅ |
| Delete products | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| View analytics | ❌ | ✅ |

---

## 🧪 Testing Authentication

### Test Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Test Protected Endpoint

```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:4000/api/auth/me
```

### Test with Invalid Token

```bash
curl -H "Authorization: Bearer invalid-token" \
  http://localhost:4000/api/auth/me
# Returns 401 Unauthorized
```

---

## 🐛 Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid credentials | Wrong email/password | Check credentials |
| Email already exists | Account exists | Use different email |
| User not found | No account | Register first |
| Invalid token | Expired/malformed | Re-login |
| Missing token | No auth header | Include token in header |

---

## 📝 Implementation Example

### Frontend: Login Component

```javascript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

**Next:** Go to [Products API](./03-PRODUCTS-ENDPOINTS.md)
