# Users API Endpoints

Complete documentation for user management API (Admin).

## 📍 Endpoints

All user management endpoints require **ADMIN role**.

---

## 1. Get All Users

List all system users (admin only).

### Endpoint
```
GET /api/users
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| role | string | - | Filter by role (USER/ADMIN) |
| search | string | - | Search by name/email |
| sortBy | string | createdAt | Sort field |
| order | string | desc | asc or desc |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-10T10:30:00Z",
      "updatedAt": "2024-01-10T10:30:00Z"
    },
    {
      "id": "user_124",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "ADMIN",
      "createdAt": "2024-01-01T08:00:00Z",
      "updatedAt": "2024-04-06T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 85,
    "totalPages": 5
  }
}
```

### Error Response (403)

```json
{
  "statusCode": 403,
  "message": "Admin access required"
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/users

# Filter by role
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/users?role=ADMIN"

# Search users
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/users?search=john"
```

---

## 2. Get User Profile

Get detailed user information (admin or own profile).

### Endpoint
```
GET /api/users/:id
```

### Authentication
```
Authorization: Bearer <TOKEN>
```

### Parameters

- `id` (string) - User ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "reviewCount": 5,
    "orderCount": 12,
    "createdAt": "2024-01-10T10:30:00Z",
    "updatedAt": "2024-04-06T14:25:00Z"
  }
}
```

### Error Responses

**Not Found (404)**
```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

**Forbidden (403)**
```json
{
  "statusCode": 403,
  "message": "Cannot view other user profiles"
}
```

### Example Request

```bash
# Get own profile
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/users/user_123
```

---

## 3. Update User (Admin)

Update user information (admin only).

### Endpoint
```
PUT /api/users/:id
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Parameters

- `id` (string) - User ID

### Request Body

```json
{
  "name": "John Doe Updated",
  "role": "ADMIN"
}
```

### Allowed Fields (Admin)

| Field | Type | Description |
|-------|------|-------------|
| name | string | User's full name |
| role | string | USER or ADMIN |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "user_123",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "role": "ADMIN",
    "updatedAt": "2024-04-06T15:10:00Z"
  },
  "message": "User updated successfully"
}
```

### Error Response (400)

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "role",
      "message": "Role must be USER or ADMIN"
    }
  ]
}
```

### Example Request

```bash
curl -X PUT http://localhost:4000/api/users/user_123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "John Doe Updated",
    "role": "ADMIN"
  }'
```

---

## 4. Delete User (Admin)

Delete a user account (admin only).

### Endpoint
```
DELETE /api/users/:id
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Parameters

- `id` (string) - User ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "message": "User deleted successfully"
}
```

### Error Response (404)

```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

### Example Request

```bash
curl -X DELETE http://localhost:4000/api/users/user_123 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 📊 User Data Structure

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique user ID (CUID) |
| name | string | User's full name |
| email | string | Email address |
| password | string | Hashed password (not returned) |
| role | string | USER or ADMIN |
| createdAt | datetime | Account creation date |
| updatedAt | datetime | Last update date |

---

## 👥 User Roles

### USER Role
- Browse products
- View categories
- Create/edit own reviews
- View own profile
- Cannot manage system

### ADMIN Role
- Full system access
- Create/edit/delete products
- Create/edit/delete categories
- Manage users
- View analytics
- Manage promotions

---

## 📈 User Statistics

### Query User Activity

```bash
# Get user with review count and order count
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/users/user_123
```

### Response Includes

- `reviewCount` - Number of reviews posted
- `orderCount` - Number of orders (future)
- `createdAt` - Registration date
- `updatedAt` - Last activity

---

## 🔐 User Management Best Practices

### Password Management

- Never send passwords in responses
- Always hash passwords with bcrypt (8+ rounds)
- Enforce minimum 8 character passwords
- Consider password reset flow

### Account Security

- Keep audit log of admin changes
- Monitor suspicious activities
- Implement rate limiting on auth endpoints
- Regular security audits

### Data Privacy

- Don't expose user emails in lists (unless admin)
- Implement data retention policies
- Allow users to request data deletion
- GDPR compliance

---

## 💡 Usage Examples

### Get Admin Users Only

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/users?role=ADMIN"
```

### Promote User to Admin

```bash
curl -X PUT http://localhost:4000/api/users/user_123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{ "role": "ADMIN" }'
```

### Search for User

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/users?search=john&page=1&limit=10"
```

### Delete Inactive User

```bash
curl -X DELETE http://localhost:4000/api/users/user_123 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🛠️ Frontend Integration

### React Hook for User Management

```javascript
export function useUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/users', { params: filters });
      setUsers(data.data);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updates) => {
    const { data } = await api.put(`/users/${userId}`, updates);
    return data;
  };

  const deleteUser = async (userId) => {
    await api.delete(`/users/${userId}`);
  };

  return { users, loading, fetchUsers, updateUser, deleteUser };
}
```

---

**Next:** Read [Analytics Endpoints](./07-ANALYTICS-ENDPOINTS.md) for dashboard analytics API.
