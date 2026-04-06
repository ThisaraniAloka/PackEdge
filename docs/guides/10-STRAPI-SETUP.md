# Strapi Content Types Setup

Guide to creating and configuring content types in Strapi CMS.

## 🎯 Overview

Strapi content types define your data structure. This guide covers setting up all content types for PackEdge.

---

## 📝 Creating Content Types

### Via Strapi Admin Dashboard

1. Log in to Strapi: `http://localhost:1337/admin`
2. Navigate: **Content-Type Builder** → **Create new collection type**
3. Enter content type name (e.g., "Product")
4. Click **Continue**
5. Add fields using the field builder
6. Click **Save**

### Via Code (Advanced)

Create content type schema in `src/api/[contentTypeName]/content-types/[contentTypeName]/schema.json`

---

## 🛍️ Content Type: Product

### Fields

```javascript
{
  "name": {
    "type": "string",
    "required": true,
    "maxLength": 100,
    "minLength": 3,
  },
  "slug": {
    "type": "uid",
    "targetField": "name",
    "required": true,
  },
  "description": {
    "type": "richtext",
    "required": true,
  },
  "price": {
    "type": "decimal",
    "required": true,
    "min": 0,
  },
  "cost": {
    "type": "decimal",
    "min": 0,
  },
  "stock": {
    "type": "integer",
    "required": true,
    "default": 0,
    "min": 0,
  },
  "image": {
    "type": "media",
    "multiple": false,
    "required": false,
    "allowedTypes": ["images"],
    "pluginOptions": {},
  },
  "gallery": {
    "type": "media",
    "multiple": true,
    "allowedTypes": ["images"],
  },
  "category": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "api::category.category",
    "inversedBy": "products",
  },
  "reviews": {
    "type": "relation",
    "relation": "oneToMany",
    "target": "api::review.review",
    "mappedBy": "product",
  },
  "promotions": {
    "type": "relation",
    "relation": "manyToMany",
    "target": "api::promotion.promotion",
    "inversedBy": "products",
  },
  "sku": {
    "type": "string",
    "unique": true,
  },
  "weight": {
    "type": "decimal",
  },
  "dimensions": {
    "type": "component",
    "repeatable": false,
    "component": "product.dimensions",
  },
  "isActive": {
    "type": "boolean",
    "default": true,
  },
  "publishedAt": {
    "type": "datetime",
  },
}
```

### Steps to Create

1. **Name:** Product
2. **Display name:** Product
3. **Add fields:**
   - Name (Text, Required)
   - Description (Rich Text)
   - Price (Decimal, Required)
   - Stock (Integer, Required)
   - Image (Media)
   - Category (Relation → Category, many-to-one)
   - Reviews (Relation → Review, one-to-many)
   - Slug (UID based on name)

4. **Advanced Settings:**
   - Enable timestamps (Draft & Publish)
   - Enable comments
   - Set API ID to `product`

---

## 📂 Content Type: Category

### Fields

```javascript
{
  "name": {
    "type": "string",
    "required": true,
    "unique": true,
    "maxLength": 50,
  },
  "slug": {
    "type": "uid",
    "targetField": "name",
    "required": true,
  },
  "description": {
    "type": "text",
  },
  "icon": {
    "type": "media",
    "multiple": false,
    "allowedTypes": ["images"],
  },
  "image": {
    "type": "media",
    "multiple": false,
    "allowedTypes": ["images"],
  },
  "isActive": {
    "type": "boolean",
    "required": true,
    "default": true,
  },
  "products": {
    "type": "relation",
    "relation": "oneToMany",
    "target": "api::product.product",
    "mappedBy": "category",
  },
  "sortOrder": {
    "type": "integer",
    "default": 0,
  },
}
```

### Steps to Create

1. **Name:** Category
2. **Add fields:**
   - Name (Text, Required, Unique)
   - Description (Text)
   - Image (Media)
   - Is Active (Boolean)
   - Products (Relation → Product, one-to-many)

---

## ⭐ Content Type: Review

### Fields

```javascript
{
  "rating": {
    "type": "enum",
    "enum": ["1", "2", "3", "4", "5"],
    "required": true,
  },
  "comment": {
    "type": "text",
    "required": true,
    "maxLength": 1000,
    "minLength": 10,
  },
  "author": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "plugin::users-permissions.user",
    "inversedBy": "reviews",
  },
  "product": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "api::product.product",
    "inversedBy": "reviews",
    "required": true,
  },
  "isVerified": {
    "type": "boolean",
    "default": false,
  },
  "helpfulCount": {
    "type": "integer",
    "default": 0,
  },
  "publishedAt": {
    "type": "datetime",
  },
}
```

### Steps to Create

1. **Name:** Review
2. **Add fields:**
   - Rating (Enum: 1, 2, 3, 4, 5)
   - Comment (Text, Max 1000 chars)
   - Author (Relation → User)
   - Product (Relation → Product, Required)
   - Is Verified (Boolean)
   - Helpful Count (Integer)

---

## 🎁 Content Type: Promotion

### Fields

```javascript
{
  "name": {
    "type": "string",
    "required": true,
    "maxLength": 100,
  },
  "slug": {
    "type": "uid",
    "targetField": "name",
  },
  "description": {
    "type": "text",
  },
  "discountType": {
    "type": "enum",
    "enum": ["percentage", "fixed"],
    "required": true,
    "default": "percentage",
  },
  "discountValue": {
    "type": "decimal",
    "required": true,
    "min": 0,
  },
  "startDate": {
    "type": "datetime",
    "required": true,
  },
  "endDate": {
    "type": "datetime",
    "required": true,
  },
  "code": {
    "type": "string",
    "unique": true,
  },
  "maxUsage": {
    "type": "integer",
    "default": -1,
  },
  "currentUsage": {
    "type": "integer",
    "default": 0,
  },
  "isActive": {
    "type": "boolean",
    "default": true,
  },
  "products": {
    "type": "relation",
    "relation": "manyToMany",
    "target": "api::product.product",
    "inversedBy": "promotions",
  },
  "banner": {
    "type": "media",
    "multiple": false,
    "allowedTypes": ["images"],
  },
}
```

### Steps to Create

1. **Name:** Promotion
2. **Add fields:**
   - Name (Text, Required)
   - Description (Text)
   - Discount Type (Enum: percentage, fixed)
   - Discount Value (Decimal)
   - Start Date (DateTime)
   - End Date (DateTime)
   - Code (Text, Unique)
   - Is Active (Boolean)
   - Products (Relation → Product, many-to-many)
   - Banner (Media)

---

## 👤 Extend User Content Type

By default, Strapi creates a User type via the Users & Permissions plugin. Extend it:

1. Navigate: **Content-Type Builder** → **Plugins** → **Users & Permissions** → **User**
2. Add fields:
   - Full Name (Text)
   - Phone (Text)
   - Address (Component)
   - Reviews (Relation → Review, one-to-many)
   - Orders (Relation → Order, one-to-many) *[Future]*
   - Wishlist (Relation → Product, many-to-many) *[Future]*

---

## 🔗 Relations Summary

```
Product ←→ Category (many-to-one)
Product ←→ Review (one-to-many)
Product ←→ Promotion (many-to-many)
Review ←→ User (many-to-one)
Review ←→ Product (many-to-one)
User ←→ Review (one-to-many)
```

---

## 🔐 Permissions & Access Control

### Configure API Endpoints

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Select **Public** role
3. **Permissions:**
   - ✅ **Products:** find, findOne (Read Only)
   - ✅ **Categories:** find, findOne (Read Only)
   - ✅ **Reviews:** find, findOne (Read Only)
   - ✅ **Promotions:** find, findOne (Read Only)
   - ❌ **Everything else:** Disabled

4. Select **Authenticated** role
5. **Permissions:**
   - ✅ **Products:** find, findOne
   - ✅ **Categories:** find, findOne
   - ✅ **Reviews:** find, findOne, create (users can post reviews)
   - ✅ **Promotions:** find, findOne
   - ❌ **Management actions:** Disabled

6. Select **Admin** role
   - ✅ **All permissions enabled** (full access)

---

## 📤 Content Type: Order (Future)

```javascript
{
  "orderNumber": {
    "type": "string",
    "unique": true,
    "required": true,
  },
  "customer": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "plugin::users-permissions.user",
  },
  "items": {
    "type": "component",
    "repeatable": true,
    "component": "order.order-item",
  },
  "totalPrice": {
    "type": "decimal",
    "required": true,
  },
  "status": {
    "type": "enum",
    "enum": ["pending", "processing", "shipped", "delivered", "cancelled"],
    "default": "pending",
  },
  "shippingAddress": {
    "type": "component",
    "repeatable": false,
    "component": "shared.address",
  },
  "paymentMethod": {
    "type": "enum",
    "enum": ["credit-card", "paypal", "bank-transfer"],
  },
  "trackingNumber": {
    "type": "string",
  },
}
```

---

## 🧩 Components (Reusable Field Groups)

### Create Component: Dimensions

```javascript
{
  "length": {
    "type": "decimal",
  },
  "width": {
    "type": "decimal",
  },
  "height": {
    "type": "decimal",
  },
  "unit": {
    "type": "enum",
    "enum": ["cm", "inch"],
    "default": "cm",
  },
}
```

### Create Component: Address

```javascript
{
  "street": {
    "type": "string",
    "required": true,
  },
  "city": {
    "type": "string",
    "required": true,
  },
  "state": {
    "type": "string",
  },
  "zipCode": {
    "type": "string",
    "required": true,
  },
  "country": {
    "type": "string",
    "required": true,
  },
}
```

---

## ✅ Verification Checklist

After creating all content types:

- [ ] Product content type created
- [ ] Category content type created
- [ ] Review content type created
- [ ] Promotion content type created
- [ ] User extended with additional fields
- [ ] All relations configured correctly
- [ ] Public permissions set correctly
- [ ] Authenticated permissions set correctly
- [ ] Admin permissions enabled
- [ ] API endpoints tested via Postman

---

## 🧪 Test API Endpoints

### List Products

```bash
curl -X GET http://localhost:1337/api/products
```

### Create Product (Admin Only)

```bash
curl -X POST http://localhost:1337/api/products \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Kraft Box Small",
      "description": "Small eco-friendly kraft box",
      "price": 12.99,
      "stock": 100,
      "category": 1
    }
  }'
```

### Create Review (Authenticated)

```bash
curl -X POST http://localhost:1337/api/reviews \
  -H "Authorization: Bearer USER_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "rating": 5,
      "comment": "Amazing product, highly recommend!",
      "product": 1
    }
  }'
```

---

## 📚 References

- [Strapi Content Types](https://docs.strapi.io/dev-docs/backend/models)
- [Field Types](https://docs.strapi.io/dev-docs/backend/models#field-types)
- [Relations](https://docs.strapi.io/dev-docs/backend/models#relations)
- [Components](https://docs.strapi.io/dev-docs/backend/models#components-and-dynamic-zones)

---

**Last Updated:** April 6, 2026
