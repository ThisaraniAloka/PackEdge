# Analytics API Endpoints

Dashboard and analytics endpoints for admin insights.

## 📍 Endpoints

All analytics endpoints require **ADMIN role**.

---

## 1. Get Dashboard Statistics

Get overview statistics for dashboard.

### Endpoint
```
GET /api/analytics/stats
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date (YYYY-MM-DD) |
| endDate | string | End date (YYYY-MM-DD) |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "totalProducts": 45,
    "totalCategories": 8,
    "totalUsers": 156,
    "totalReviews": 342,
    "averageRating": 4.3,
    "activePromotions": 3,
    "stats": {
      "productsThisMonth": 5,
      "usersThisMonth": 23,
      "reviewsThisMonth": 87,
      "newOrdersThisMonth": 34
    }
  }
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/stats

# With date range
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/analytics/stats?startDate=2024-01-01&endDate=2024-12-31"
```

---

## 2. Get Engagement Analytics

Get user engagement metrics.

### Endpoint
```
GET /api/analytics/engagement
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "weeklyEngagement": [
      {
        "week": "Week 1 Jan",
        "date": "2024-01-01",
        "views": 245,
        "reviews": 12,
        "newUsers": 8
      },
      {
        "week": "Week 2 Jan",
        "date": "2024-01-08",
        "views": 312,
        "reviews": 18,
        "newUsers": 15
      },
      {
        "week": "Week 3 Jan",
        "date": "2024-01-15",
        "views": 287,
        "reviews": 14,
        "newUsers": 10
      }
    ],
    "totalViews": 3452,
    "totalReviews": 156,
    "totalNewUsers": 87,
    "engagementRate": "3.4%"
  }
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/engagement
```

---

## 3. Get Revenue Analytics

Get sales and revenue metrics.

### Endpoint
```
GET /api/analytics/revenue
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "monthlyRevenue": [
      {
        "month": "January",
        "date": "2024-01-01",
        "revenue": 12450.50,
        "orders": 45,
        "averageOrderValue": 276.68
      },
      {
        "month": "February",
        "date": "2024-02-01",
        "revenue": 15230.75,
        "orders": 52,
        "averageOrderValue": 292.90
      },
      {
        "month": "March",
        "date": "2024-03-01",
        "revenue": 18920.25,
        "orders": 68,
        "averageOrderValue": 278.24
      }
    ],
    "totalRevenue": 46601.50,
    "totalOrders": 165,
    "averageRevenuePerOrder": 282.43,
    "revenueGrowthRate": "18.3%"
  }
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/revenue
```

---

## 4. Get Product Performance

Get top performing and low selling products.

### Endpoint
```
GET /api/analytics/products
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 10 | Number of products |
| metric | string | sales | sales or rating |

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "topProducts": [
      {
        "id": "prod_1",
        "name": "Kraft Box Small",
        "sales": 245,
        "revenue": 3182.55,
        "averageRating": 4.7,
        "reviewCount": 34
      },
      {
        "id": "prod_5",
        "name": "Eco Bag Large",
        "sales": 189,
        "revenue": 4521.11,
        "averageRating": 4.5,
        "reviewCount": 28
      }
    ],
    "lowPerformingProducts": [
      {
        "id": "prod_12",
        "name": "Specialty Box",
        "sales": 5,
        "revenue": 124.95,
        "averageRating": 3.2,
        "reviewCount": 2
      }
    ]
  }
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/products

# Get by rating instead of sales
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  "http://localhost:4000/api/analytics/products?metric=rating"
```

---

## 5. Get Category Analytics

Get analytics by product category.

### Endpoint
```
GET /api/analytics/categories
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "cat_1",
      "name": "Kraft Boxes",
      "productCount": 12,
      "totalSales": 1245,
      "totalRevenue": 16847.55,
      "averageRating": 4.6,
      "reviewCount": 145
    },
    {
      "id": "cat_2",
      "name": "Paper Bags",
      "productCount": 8,
      "totalSales": 892,
      "totalRevenue": 13248.96,
      "averageRating": 4.4,
      "reviewCount": 98
    }
  ]
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/categories
```

---

## 6. Get User Demographics

Get user demographic data.

### Endpoint
```
GET /api/analytics/demographics
```

### Authentication
```
Authorization: Bearer <ADMIN_TOKEN>
```

### Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "totalUsers": 156,
    "activeUsers": 98,
    "inactiveUsers": 58,
    "newUsersThisMonth": 23,
    "newUsersLastMonth": 18,
    "adminUsers": 5,
    "regularUsers": 151,
    "userRetentionRate": "78.2%",
    "signupTrend": [
      { "date": "2024-01-01", "count": 5 },
      { "date": "2024-02-01", "count": 8 },
      { "date": "2024-03-01", "count": 10 }
    ]
  }
}
```

### Example Request

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4000/api/analytics/demographics
```

---

## 📊 Dashboard Components Using Analytics

### React Component Example

```jsx
import { useEffect, useState } from 'react';
import api from '@/services/api';

export function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics/stats');
        setStats(data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="stats-grid">
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        icon="📦"
      />
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon="👥"
      />
      <StatCard
        title="Total Reviews"
        value={stats.totalReviews}
        icon="⭐"
      />
      <StatCard
        title="Avg Rating"
        value={stats.averageRating.toFixed(1)}
        icon="📊"
      />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <span className="icon">{icon}</span>
      <h3>{title}</h3>
      <p className="value">{value}</p>
    </div>
  );
}
```

---

## 📈 Chart Integration

### Using Chart.js for Revenue

```javascript
import { Line } from 'react-chartjs-2';
import api from '@/services/api';

export function RevenueChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/analytics/revenue');
      
      const chartData = {
        labels: data.data.monthlyRevenue.map(m => m.month),
        datasets: [{
          label: 'Revenue',
          data: data.data.monthlyRevenue.map(m => m.revenue),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)'
        }]
      };
      
      setData(chartData);
    };

    fetchData();
  }, []);

  return data ? <Line data={data} /> : <div>Loading...</div>;
}
```

---

## 🔐 Admin Permissions

All analytics endpoints require:
- **Role:** ADMIN
- **Valid JWT token** in Authorization header
- User must be active and not deleted

---

## 📝 Data Refresh

Analytics data is calculated:
- **Real-time:** For current stats
- **Delayed:** For historical trends (max 1-24 hour delay)
- **Cached:** Some metrics cached for 1 hour

Clear cache:
```bash
curl -X POST http://localhost:4000/api/analytics/cache/clear \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

**Next:** Complete API documentation. See sidebar for all endpoints.
