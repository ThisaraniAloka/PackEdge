# Reviews API Endpoints

Complete documentation for customer reviews management.

## 📍 Endpoints

All review-related endpoints.

---

## 1. Get All Reviews

List all product reviews (paginated).

### Endpoint
```
GET /api/reviews
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| productId | string | - | Filter by product |
| userId | string | - | Filter by user |
| rating | number | - | Filter by rating (1-5) |
| sortBy | string | createdAt | Sort field |
| order | string | desc | asc or desc |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "rev_1",
      "productId": "prod_1",
      "userId": "user_123",
      "rating": 5,
      "comment": "Great product! Excellent quality and fast shipping.",
      "user": {
        "id": "user_123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "product": {
        "id": "prod_1",
        "name": "Kraft Box Small"
      },
      "createdAt": "2024-04-01T10:30:00Z",
      "updatedAt": "2024-04-01T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

### Example Request

```bash
# Get all reviews
curl http://localhost:4000/api/reviews

# Get reviews for specific product
curl "http://localhost:4000/api/reviews?productId=prod_1"

# Get reviews with pagination
curl "http://localhost:4000/api/reviews?page=2&limit=5"

# Get user's reviews
curl "http://localhost:4000/api/reviews?userId=user_123"

# Get 5-star reviews
curl "http://localhost:4000/api/reviews?rating=5"
```

---

## 2. Get Single Review

Get detailed review information.

### Endpoint
```
GET /api/reviews/:id
```

### Parameters

- `id` (string) - Review ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "rev_1",
    "productId": "prod_1",
    "userId": "user_123",
    "rating": 5,
    "comment": "Great product! Excellent quality and fast shipping.",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "product": {
      "id": "prod_1",
      "name": "Kraft Box Small",
      "price": 12.99
    },
    "createdAt": "2024-04-01T10:30:00Z",
    "updatedAt": "2024-04-01T10:30:00Z"
  }
}
```

### Error Response (404)

```json
{
  "statusCode": 404,
  "message": "Review not found"
}
```

---

## 3. Create Review (Authenticated)

Create a new product review.

### Endpoint
```
POST /api/reviews
```

### Authentication
```
Authorization: Bearer <USER_TOKEN>
```

### Request Body

```json
{
  "productId": "prod_1",
  "rating": 4,
  "comment": "Good product, met my expectations. Packaging could be better."
}
```

### Validation

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| productId | string | Yes | Must exist |
| rating | number | Yes | Integer 1-5 |
| comment | string | Yes | Min 10, max 1000 chars |

### Success Response (201)

```json
{
  "statusCode": 201,
  "data": {
    "id": "rev_2",
    "productId": "prod_1",
    "userId": "user_123",
    "rating": 4,
    "comment": "Good product, met my expectations. Packaging could be better.",
    "createdAt": "2024-04-06T14:25:00Z",
    "updatedAt": "2024-04-06T14:25:00Z"
  },
  "message": "Review created successfully"
}
```

### Error Responses

**Validation Error (400)**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "rating",
      "message": "Rating must be between 1 and 5"
    }
  ]
}
```

**Product Not Found (404)**
```json
{
  "statusCode": 404,
  "message": "Product not found"
}
```

**Already Reviewed (409)**
```json
{
  "statusCode": 409,
  "message": "You have already reviewed this product"
}
```

**Unauthorized (401)**
```json
{
  "statusCode": 401,
  "message": "Login required to post review"
}
```

### Example Request

```bash
curl -X POST http://localhost:4000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{
    "productId": "prod_1",
    "rating": 5,
    "comment": "Excellent quality and fast delivery!"
  }'
```

---

## 4. Update Review (Own Review)

Update your own review.

### Endpoint
```
PUT /api/reviews/:id
```

### Authentication
```
Authorization: Bearer <USER_TOKEN>
```

### Parameters

- `id` (string) - Review ID

### Request Body

```json
{
  "rating": 4,
  "comment": "Updated comment with more details"
}
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "id": "rev_2",
    "productId": "prod_1",
    "userId": "user_123",
    "rating": 4,
    "comment": "Updated comment with more details",
    "createdAt": "2024-04-06T14:25:00Z",
    "updatedAt": "2024-04-06T15:10:00Z"
  },
  "message": "Review updated successfully"
}
```

### Error Response (403)

```json
{
  "statusCode": 403,
  "message": "You can only edit your own reviews"
}
```

### Example Request

```bash
curl -X PUT http://localhost:4000/api/reviews/rev_2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{
    "rating": 4,
    "comment": "Updated comment"
  }'
```

---

## 5. Delete Review (Owner/Admin)

Delete a review.

### Endpoint
```
DELETE /api/reviews/:id
```

### Authentication
```
Authorization: Bearer <USER_OR_ADMIN_TOKEN>
```

### Parameters

- `id` (string) - Review ID

### Success Response (200)

```json
{
  "statusCode": 200,
  "message": "Review deleted successfully"
}
```

### Error Responses

**Not Found (404)**
```json
{
  "statusCode": 404,
  "message": "Review not found"
}
```

**Forbidden (403)**
```json
{
  "statusCode": 403,
  "message": "You can only delete your own reviews"
}
```

### Example Request

```bash
curl -X DELETE http://localhost:4000/api/reviews/rev_2 \
  -H "Authorization: Bearer USER_TOKEN"
```

---

## 📊 Review Data Structure

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique review ID |
| productId | string | Product ID |
| userId | string | User ID |
| rating | number | Rating 1-5 stars |
| comment | string | Review text |
| createdAt | datetime | Creation date |
| updatedAt | datetime | Last update |

---

## ⭐ Rating Guidelines

- **5 Stars:** Excellent, highly recommend
- **4 Stars:** Good, would recommend
- **3 Stars:** Average, meets expectations
- **2 Stars:** Below average
- **1 Star:** Poor, not recommended

---

## 💡 Frontend Examples

### React Hook for Reviews

```javascript
import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useProductReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews', {
          params: { productId }
        });
        setReviews(data.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return { reviews, loading };
}
```

### Review Component

```jsx
import { useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export function ReviewForm({ productId, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', {
        ...formData,
        productId
      });
      onSuccess();
      setFormData({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Failed to post review:', error);
    }
  };

  if (!user) {
    return <p>Please login to post a review</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <select
          value={formData.rating}
          onChange={(e) => setFormData({
            ...formData,
            rating: parseInt(e.target.value)
          })}
        >
          <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
          <option value={4}>⭐⭐⭐⭐ Good</option>
          <option value={3}>⭐⭐⭐ Average</option>
          <option value={2}>⭐⭐ Below Average</option>
          <option value={1}>⭐ Poor</option>
        </select>
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({
            ...formData,
            comment: e.target.value
          })}
          placeholder="Share your experience with this product..."
          minLength={10}
          maxLength={1000}
        />
      </div>
      <button type="submit">Post Review</button>
    </form>
  );
}
```

---

**Next:** Read [Users Endpoints](./06-USERS-ENDPOINTS.md) for user management API.
