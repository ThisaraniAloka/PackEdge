# Products API Endpoints

Complete API documentation for product management.

## 📋 Endpoints

### 1. Get All Products

Retrieve list of all products with pagination.

**Endpoint:** `GET /products`

**Query Parameters:**
```
?page=1&limit=20&sort=name&order=asc
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "prod-1",
      "name": "Kraft Box Small",
      "description": "Eco-friendly kraft box",
      "price": 12.99,
      "stock": 150,
      "categoryId": "cat-1",
      "image": "https://cdn.example.com/kraft-box-small.jpg",
      "createdAt": "2024-04-01T10:00:00Z",
      "updatedAt": "2024-04-01T10:00:00Z"
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

---

### 2. Get Single Product

Retrieve detailed information for a product.

**Endpoint:** `GET /products/:id`

**Parameters:**
- `id` (string) - Product ID

**Response (200):**
```json
{
  "data": {
    "id": "prod-1",
    "name": "Kraft Box Small",
    "description": "Eco-friendly kraft box suitable for small items",
    "price": 12.99,
    "stock": 150,
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Boxes"
    },
    "image": "https://cdn.example.com/kraft-box-small.jpg",
    "createdAt": "2024-04-01T10:00:00Z",
    "updatedAt": "2024-04-01T10:00:00Z"
  }
}
```

**Error (404):**
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Product not found"
}
```

---

### 3. Create Product

Create a new product (admin only).

**Endpoint:** `POST /products`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Paper Bag Large",
  "description": "Large paper bag for bulk items",
  "price": 24.99,
  "stock": 200,
  "categoryId": "cat-2",
  "image": "https://cdn.example.com/paper-bag-large.jpg"
}
```

**Validation Rules:**
- `name`: Required, min 3 characters, max 100
- `description`: Required, min 10 characters
- `price`: Required, number, > 0
- `stock`: Required, integer, >= 0
- `categoryId`: Required, must exist
- `image`: Optional, valid URL

**Response (201):**
```json
{
  "data": {
    "id": "prod-2",
    "name": "Paper Bag Large",
    "description": "Large paper bag for bulk items",
    "price": 24.99,
    "stock": 200,
    "categoryId": "cat-2",
    "image": "https://cdn.example.com/paper-bag-large.jpg",
    "createdAt": "2024-04-06T10:30:00Z",
    "updatedAt": "2024-04-06T10:30:00Z"
  },
  "message": "Product created successfully"
}
```

**Error (400):**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": [
    {
      "field": "name",
      "message": "Name must be at least 3 characters"
    }
  ]
}
```

---

### 4. Update Product

Update product details (admin only).

**Endpoint:** `PUT /products/:id`

**Authentication:** Required (Admin)

**Parameters:**
- `id` (string) - Product ID

**Request Body:**
```json
{
  "name": "Paper Bag Large - Updated",
  "price": 27.99,
  "stock": 180
}
```

**Response (200):**
```json
{
  "data": {
    "id": "prod-2",
    "name": "Paper Bag Large - Updated",
    "description": "Large paper bag for bulk items",
    "price": 27.99,
    "stock": 180,
    "categoryId": "cat-2",
    "image": "https://cdn.example.com/paper-bag-large.jpg",
    "createdAt": "2024-04-06T10:30:00Z",
    "updatedAt": "2024-04-06T11:00:00Z"
  },
  "message": "Product updated successfully"
}
```

---

### 5. Delete Product

Delete a product (admin only).

**Endpoint:** `DELETE /products/:id`

**Authentication:** Required (Admin)

**Parameters:**
- `id` (string) - Product ID

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

**Error (404):**
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Product not found"
}
```

---

## 💡 Usage Examples

### Get All Products

```bash
curl http://localhost:4000/api/products
```

### Get Paginated Products

```bash
curl "http://localhost:4000/api/products?page=2&limit=10"
```

### Get Single Product

```bash
curl http://localhost:4000/api/products/prod-1
```

### Create Product (requires token)

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "stock": 100,
    "categoryId": "cat-1"
  }'
```

### Update Product

```bash
curl -X PUT http://localhost:4000/api/products/prod-1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "price": 34.99,
    "stock": 95
  }'
```

### Delete Product

```bash
curl -X DELETE http://localhost:4000/api/products/prod-1 \
  -H "Authorization: Bearer <token>"
```

---

## 📊 Product Data Structure

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique product ID |
| name | string | Product name |
| description | string | Product details |
| price | number | Price in USD |
| stock | integer | Available quantity |
| categoryId | string | Category reference |
| image | string | Image URL |
| createdAt | datetime | Creation timestamp |
| updatedAt | datetime | Last update timestamp |

---

**Next:** [Categories API](./04-CATEGORIES-ENDPOINTS.md)
