# Architecture & System Design

Complete system architecture and design documentation.

## 🏛️ System Overview

PackEdge is a **monorepo** with separate frontend and backend services.

```
┌─────────────────────────────────────────────────────────┐
│                     PackEdge System                       │
├──────────────────────┬──────────────────────────────────┤
│   Frontend (React)   │      Backend (Strapi CMS)         │
│  - Vite dev server   │    - Koa server                  │
│  - Port 5173         │    - Port 1337                   │
│  - SPA               │    - REST API                    │
└──────────────────────┴──────────────────────────────────┘
              │                          │
              └──────────────┬───────────┘
                             │
                    ┌────────▼─────────┐
                    │  PostgreSQL DB   │
                    │  Port 5432       │
                    └──────────────────┘
```

---

## 📊 Data Flow

### User Registration Flow

```
┌─────────────┐
│   Frontend  │ POST /auth/register (email, password)
└────┬────────┘
     │
     ▼
┌─────────────────────┐
│  Backend (Strapi)   │
│ ┌───────────────┐   │
│ │ Auth Service  │   │ - Hash password (bcrypt)
│ │               │   │ - Check email uniqueness
│ │ Entity        │   │ - Create user record
│ │ Service       │   │ - Generate JWT token
│ └───────┬───────┘   │
│         │           │
│         ▼           │
│  ┌─────────────┐    │
│  │ PostgreSQL  │    │
│  │ Users table │    │
│  └─────────────┘    │
└────┬────────────────┘
     │
     │ Return: JWT token + user data
     │
     ▼
┌─────────────┐
│  Frontend   │ (store token in localStorage)
└─────────────┘
```

### Product Browsing Flow

```
┌─────────────┐
│  Frontend   │ GET /products (public - no auth)
└────┬────────┘
     │
     ▼
┌─────────────────────┐
│  Backend (Strapi)   │
│ ┌────────────────┐  │
│ │Product Service │  │ - Query database
│ │                │  │ - Apply pagination
│ │ Entity         │  │ - Include relations
│ │ Service        │  │
│ └────────┬───────┘  │
│          │          │
│          ▼          │
│  ┌─────────────┐    │
│  │ PostgreSQL  │    │
│  │Products     │    │
│  │Categories   │    │
│  └─────────────┘    │
└────┬────────────────┘
     │
     │ Return: Product list (paginated) + metadata
     │
     ▼
┌─────────────┐
│  Frontend   │ (render product grid)
└─────────────┘
```

### Review Posting Flow (Authenticated)

```
┌─────────────┐
│  Frontend   │ POST /reviews (with JWT token)
│  Auth header│
└────┬────────┘
     │
     ▼
┌─────────────────────┐
│  Backend (NestJS)   │
│ ┌────────────────┐  │
│ │ JWT Guard      │  │ - Extract token from header
│ │                │  │ - Validate signature
│ │ (Verify token) │  │ - Check expiration
│ │                │  │
│ └────────┬───────┘  │
│          │(token valid)
│          ▼          │
│  ┌────────────────┐ │
│  │Review Service  │ │ - Validate input
│  │                │ │ - Check duplicate review
│  │ Prisma         │ │ - Create review record
│  │                │ │
│  └────────┬───────┘ │
│           │         │
│           ▼         │
│  ┌─────────────┐    │
│  │ PostgreSQL  │    │
│  │Reviews table│    │
│  └─────────────┘    │
└────┬────────────────┘
     │
     │ Return: Created review + success message
     │
     ▼
┌─────────────┐
│  Frontend   │ (show success, update reviews list)
└─────────────┘
```

---

## 🔄 Request/Response Cycle

### Standard API Request

```
1. Frontend builds request
   ├─ URL: /api/products
   ├─ Method: GET
   └─ Headers: { Authorization: Bearer TOKEN }

2. Axios sends request
   ├─ Uses base URL from .env
   ├─ Adds auth token (interceptor)
   └─ Adds content-type header

3. Backend receives
   ├─ Health check (not rate limited)
   ├─ Route matching
   └─ Guard execution

4. Guards/Middleware
   ├─ JWT validation (if protected)
   ├─ Role checking (if restricted)
   └─ Exception handling

5. Controller processes
   ├─ Parameter validation
   ├─ Business logic call
   └─ Response formatting

6. Service layer
   ├─ Database queries
   ├─ Business rules
   └─ Error handling

7. Database (Prisma)
   ├─ ORM query execution
   ├─ SQL generation
   └─ Data retrieval

8. Response building
   ├─ Format response
   ├─ Add metadata
   └─ Set status code

9. Frontend receives
   ├─ Parse JSON
   ├─ Extract data
   └─ Update UI
```

---

## 🗄️ Database Schema

### Key Relationships

```
User (1:N) Reviews
├─ User can have many reviews
└─ Review belongs to one user

Product (1:N) Reviews
├─ Product can have many reviews
└─ Review belongs to one product

Category (1:N) Products
├─ Category can have many products
└─ Product belongs to one category
```

### Key Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| User | Authentication & profiles | id, email, password, role |
| Product | Catalog items | id, name, price, stock |
| Category | Product grouping | id, name, status |
| Review | Customer feedback | id, rating, comment |
| Promotion | Discounts/offers | id, discount, dateRange |

---

## 🚀 Deployment Architecture

### Development

```
Laptop/PC
├─ Frontend: npm run dev (Vite)
├─ Backend: npm run start:dev (NestJS)
└─ Database: PostgreSQL (local)
```

### Production (Planned)

```
Cloud Infrastructure
├─ Frontend: Vercel/Netlify (Static CDN)
├─ Backend: Railway/Heroku/AWS (Compute)
└─ Database: Cloud PostgreSQL (AWS RDS)
```

---

## 🔐 Security Layers

### Frontend Security

```
Input validation
    ↓
Sanitization
    ↓
Token storage
    ↓
HTTPS only
```

### Backend Security

```
CORS validation
    ↓
Input validation
    ↓
JWT verification
    ↓
Role checks
    ↓
Database queries (parameterized)
    ↓
Error handling (no info leakage)
```

### Database Security

```
Password hashing (bcrypt)
    ↓
No plain-text sensitive data
    ↓
User isolation
    ↓
Regular backups
```

---

## 📈 Scalability Considerations

### Current Limitations

- Single backend server
- Single database instance
- No caching layer
- No message queue

### Future Improvements

```
1. Database Optimization
   ├─ Indexing
   ├─ Query optimization
   └─ Partitioning

2. Caching Layer
   ├─ Redis (sessions, products)
   └─ CDN (static assets)

3. Horizontal Scaling
   ├─ Load balancer
   ├─ Multiple backend instances
   └─ Database replication

4. Async Processing
   ├─ Message queue
   ├─ Email notifications
   └─ Image processing
```

---

## 🧪 Testing Strategy

### Unit Tests
- Service methods
- Utility functions
- Custom hooks

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### E2E Tests
- User registration
- Product browsing
- Review posting

---

## 🔄 Development Workflow

```
1. Feature planning
│
2. Create feature branch
│
3. Implement feature
│   ├─ Frontend component
│   ├─ Backend API
│   └─ Database migration (if needed)
│
4. Test locally
│
5. Create pull request
│
6. Code review
│
7. Merge to main
│
8. Deploy
    ├─ Frontend deployment
    ├─ Backend deployment
    └─ Database migration (if needed)
```

---

## 📋 Architecture Decision Log

### Monorepo vs Separate Repos

**Decision:** Monorepo (single git repository)

**Rationale:**
- Easier dependency management
- Shared utilities possible
- Single deployment pipeline
- Simpler for small team

### Frontend Framework

**Decision:** React with Vite

**Rationale:**
- Fast dev experience (Vite)
- Mature ecosystem
- Component reusability
- Large community

### Backend Framework

**Decision:** NestJS

**Rationale:**
- TypeScript-first
- Built-in modules/DI
- Express compatibility
- Scalable architecture

### Database

**Decision:** PostgreSQL with Prisma

**Rationale:**
- Relational data fit
- ACID compliance
- Prisma ORM simplifies queries
- Good type safety

---

**Next:** Read [Contributing Guide](./08-CONTRIBUTING.md) for development workflow.
