# API Overview

Complete REST API documentation for PackEdge backend.

## 🌐 API Base URL

```
http://localhost:4000/api
```

## 📊 API Response Format

All responses follow this format:

### Success Response (2xx)
```json
{
  "status": 200,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response (4xx, 5xx)
```json
{
  "status": 400,
  "error": "Error description",
  "message": "What went wrong"
}
```

## 🔐 Authentication

### How It Works

1. User logs in with credentials
2. Server returns JWT token
3. Client stores token (localStorage)
4. Client sends token in `Authorization` header

### JWT Token Format

```
Authorization: Bearer <jwt_token_here>
```

### Token Expiration

- Expires in: 24 hours
- Refresh: Re-login required

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

[Full Auth API Docs](./02-AUTH-ENDPOINTS.md)

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

[Full Products API Docs](./03-PRODUCTS-ENDPOINTS.md)

### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get single category
- `POST /categories` - Create category (admin)
- `PUT /categories/:id` - Update category (admin)
- `DELETE /categories/:id` - Delete category (admin)

[Full Categories API Docs](./04-CATEGORIES-ENDPOINTS.md)

### Reviews
- `GET /reviews` - List all reviews
- `GET /reviews/:id` - Get single review
- `POST /reviews` - Create review (authenticated)
- `PUT /reviews/:id` - Update review (own review)
- `DELETE /reviews/:id` - Delete review (admin/owner)

[Full Reviews API Docs](./05-REVIEWS-ENDPOINTS.md)

### Users
- `GET /users` - List all users (admin)
- `GET /users/:id` - Get user details (admin)
- `PUT /users/:id` - Update user (admin)
- `DELETE /users/:id` - Delete user (admin)

[Full Users API Docs](./06-USERS-ENDPOINTS.md)

### Analytics
- `GET /analytics/engagement` - Weekly engagement stats
- `GET /analytics/revenue` - Revenue analytics
- `GET /analytics/stats` - Dashboard statistics

[Full Analytics API Docs](./07-ANALYTICS-ENDPOINTS.md)

### Upload
- `POST /upload` - Upload file to cloud storage

## 🔑 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Login required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

## ⏱️ Rate Limiting

Currently **no rate limiting** is implemented.

Future versions will limit:
- 100 requests per minute per user
- 1000 requests per hour per IP

## 🔄 Common Response Patterns

### List Endpoint Response

```json
{
  "data": [
    { "id": "1", "name": "Product 1" },
    { "id": "2", "name": "Product 2" }
  ],
  "total": 2,
  "page": 1,
  "limit": 20
}
```

### Single Resource Response

```json
{
  "data": {
    "id": "1",
    "name": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "createdAt": "2024-04-06T10:30:00Z",
    "updatedAt": "2024-04-06T10:30:00Z"
  }
}
```

## 🛠️ Common Headers

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token>
```

### Response Headers
```
Content-Type: application/json
X-Powered-By: PackEdge API v1.0
```

## 🧪 Testing API

### Using cURL

```bash
# Get categories
curl http://localhost:4000/api/categories

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get products with auth
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/products
```

### Using Postman

1. Download Postman
2. Import environment variable: `BASE_URL=http://localhost:4000/api`
3. Create requests with Authorization header
4. Save responses

### Using Thunder Client (VSCode)

Install Thunder Client extension in VSCode for easy API testing.

## 📍 Query Parameters

### Pagination
```
GET /products?page=1&limit=20
```

### Filtering
```
GET /categories?status=true
```

### Sorting
```
GET /products?sort=price&order=asc
```

## 🚨 Error Handling

All endpoints may return error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 📖 Detailed Endpoint Documentation

Navigate to specific API documentation:
- [Authentication](./02-AUTH-ENDPOINTS.md)
- [Products](./03-PRODUCTS-ENDPOINTS.md)
- [Categories](./04-CATEGORIES-ENDPOINTS.md)
- [Reviews](./05-REVIEWS-ENDPOINTS.md)
- [Users](./06-USERS-ENDPOINTS.md)
- [Analytics](./07-ANALYTICS-ENDPOINTS.md)

---

**Last Updated:** April 6, 2026
