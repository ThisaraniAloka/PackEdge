# Categories API Endpoints

Complete documentation for category management API.

## 📍 Endpoints

All category endpoints and their usage.

---

## 1. Get All Categories

List all product categories.

### Endpoint
```
GET /api/categories
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| status | boolean | - | Filter by status |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "cat_1",
      "name": "Kraft Boxes",
      "description": "Eco-friendly kraft boxes",
      "image": "https://cdn.example.com/kraft.jpg",
      "status": true,
      "createdAt": "2024-01-10T10:00:00Z",
      "updatedAt": "2024-01-10T10:00:00Z"
    },
    {
      "id": "cat_2",
      "name": "Paper Bags",
      "description": "Biodegradable paper bags",
      "image": "https://cdn.example.com/bags.jpg",
      "status": true,
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 8,
    "totalPages": 1
  }
}
```

### Example Request

```bash
curl http://localhost:4000/api/categories
```

---

## 2. Get Single Category

Get detailed category information.

### Endpoint
```
GET /api/categories/:id
```

### Parameters

- `id` (string) - Category ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "cat_1",
    "name": "Kraft Boxes",
    "description": "Eco-friendly kraft boxes for sustainable packaging",
    "image": "https://cdn.example.com/kraft.jpg",
    "status": true,
    "products": [
      {
        "id": "prod_1",
        "name": "Kraft Box Small",
        "price": 12.99
      },
      {
        "id": "prod_2",
        "name": "Kraft Box Large",
        "price": 24.99
      }
    ],
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  }
}
```

### Error Response (404)

```json
{
  "statusCode": 404,
  "message": "Category not found"
}
```

### Example Request

```bash
curl http://localhost:4000/api/categories/cat_1
```

---

## 3. Create Category (Admin)

Create a new product category.

### Endpoint
```
POST /api/categories
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Request Body

```json
{
  "name": "Glass Containers",
  "description": "Reusable glass packaging solutions",
  "image": "https://cdn.example.com/glass.jpg",
  "status": true
}
```

### Validation

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | 2-100 chars, unique |
| description | string | Yes | 10-500 chars |
| image | string | No | Valid URL |
| status | boolean | No | Default: true |

### Success Response (201)

```json
{
  "statusCode": 201,
  "data": {
    "id": "cat_3",
    "name": "Glass Containers",
    "description": "Reusable glass packaging solutions",
    "image": "https://cdn.example.com/glass.jpg",
    "status": true,
    "createdAt": "2024-04-06T14:30:00Z",
    "updatedAt": "2024-04-06T14:30:00Z"
  },
  "message": "Category created successfully"
}
```

### Error Response (400)

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be unique"
    }
  ]
}
```

### Example Request

```bash
curl -X POST http://localhost:4000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Glass Containers",
    "description": "Reusable glass packaging solutions",
    "image": "https://cdn.example.com/glass.jpg",
    "status": true
  }'
```

---

## 4. Update Category (Admin)

Update category details.

### Endpoint
```
PUT /api/categories/:id
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Parameters

- `id` (string) - Category ID

### Request Body

```json
{
  "name": "Glass Containers Updated",
  "status": false
}
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "cat_3",
    "name": "Glass Containers Updated",
    "description": "Reusable glass packaging solutions",
    "image": "https://cdn.example.com/glass.jpg",
    "status": false,
    "createdAt": "2024-04-06T14:30:00Z",
    "updatedAt": "2024-04-06T15:00:00Z"
  },
  "message": "Category updated successfully"
}
```

### Error Response (404)

```json
{
  "statusCode": 404,
  "message": "Category not found"
}
```

### Example Request

```bash
curl -X PUT http://localhost:4000/api/categories/cat_3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Glass Containers Updated",
    "status": false
  }'
```

---

## 5. Delete Category (Admin)

Delete a product category.

### Endpoint
```
DELETE /api/categories/:id
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Parameters

- `id` (string) - Category ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "message": "Category deleted successfully"
}
```

### Error Response (404)

```json
{
  "statusCode": 404,
  "message": "Category not found"
}
```

### Example Request

```bash
curl -X DELETE http://localhost:4000/api/categories/cat_3 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 📊 Category Data Structure

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique category ID |
| name | string | Category name |
| description | string | Detailed description |
| image | string | Category image URL |
| status | boolean | Active/inactive status |
| createdAt | datetime | Creation timestamp |
| updatedAt | datetime | Last update timestamp |

---

## 💡 Usage Examples

### JavaScript/Axios

```javascript
import api from '@/services/api';

// Get all categories
const { data } = await api.get('/categories');

// Get single category
const { data } = await api.get(`/categories/${categoryId}`);

// Create category (admin)
const { data } = await api.post('/categories', {
  name: 'New Category',
  description: 'Category description',
  image: 'url-to-image',
  status: true
});

// Update category
const { data } = await api.put(`/categories/${categoryId}`, {
  name: 'Updated Name'
});

// Delete category
await api.delete(`/categories/${categoryId}`);
```

### React Component Example

```jsx
import { useState, useEffect } from 'react';
import api from '@/services/api';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="categories">
      {categories.map(cat => (
        <div key={cat.id} className="category-card">
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
          {cat.image && <img src={cat.image} alt={cat.name} />}
        </div>
      ))}
    </div>
  );
}
```

---

**Next:** Read [Reviews Endpoints](./05-REVIEWS-ENDPOINTS.md) for review management API.
