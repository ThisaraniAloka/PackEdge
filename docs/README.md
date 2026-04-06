# PackEdge Documentation

Complete guide to the PackEdge sustainable packaging e-commerce platform.

## 📚 Documentation Structure

### Getting Started
- **[Installation & Setup](./guides/01-SETUP.md)** - Environment setup and local development
- **[Quick Start](./guides/02-QUICK-START.md)** - Get the app running in 5 minutes
- **[Project Structure](./guides/03-PROJECT-STRUCTURE.md)** - Understanding the codebase organization

### Core Guides
- **[Frontend Guide](./guides/04-FRONTEND-GUIDE.md)** - React components, hooks, and patterns
- **[Strapi Backend Setup](./guides/10-STRAPI-SETUP.md)** - Creating content types and collections
- **[Database Schema](./guides/06-DATABASE-SCHEMA.md)** - PostgreSQL models and relationships
- **[Authentication & Authorization](./guides/07-AUTH.md)** - JWT and user roles

### API Reference
- **[API Overview](./api/01-API-OVERVIEW.md)** - REST API endpoints structure
- **[Auth Endpoints](./api/02-AUTH-ENDPOINTS.md)** - Login, register, profile
- **[Product Endpoints](./api/03-PRODUCTS-ENDPOINTS.md)** - CRUD operations for products
- **[Category Endpoints](./api/04-CATEGORIES-ENDPOINTS.md)** - Category management
- **[Reviews Endpoints](./api/05-REVIEWS-ENDPOINTS.md)** - Review posting and retrieval
- **[User Endpoints](./api/06-USERS-ENDPOINTS.md)** - User management (admin)
- **[Analytics Endpoints](./api/07-ANALYTICS-ENDPOINTS.md)** - Dashboard analytics

### Architecture
- **[System Architecture](./architecture/01-SYSTEM-ARCHITECTURE.md)** - High-level system design
- **[Data Flow](./architecture/02-DATA-FLOW.md)** - How data moves through the system
- **[Security Architecture](./architecture/03-SECURITY.md)** - Security measures and best practices

### Development
- **[Contributing Guide](./guides/08-CONTRIBUTING.md)** - How to contribute to the project
- **[Coding Standards](./guides/09-CODING-STANDARDS.md)** - Code style and conventions
- **[Deployment Guide](./guides/11-DEPLOYMENT.md)** - Azure deployment and CI/CD setup

## 🚀 Quick Links

### For New Developers
Start here → [Setup Guide](./guides/01-SETUP.md) → [Quick Start](./guides/02-QUICK-START.md) → [Frontend Guide](./guides/04-FRONTEND-GUIDE.md)

### For Backend/CMS Developers
Start here → [API Overview](./api/01-API-OVERVIEW.md) → [Strapi Setup](./guides/10-STRAPI-SETUP.md)

### For DevOps/Deployment
Start here → [System Architecture](./architecture/01-SYSTEM-ARCHITECTURE.md) → [Deployment Guide](./guides/11-DEPLOYMENT.md) → [Azure Setup](./guides/11-DEPLOYMENT.md)

## 🏗️ Technology Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Zustand (state management)
- Axios (HTTP client)
- React Router (routing)

### Backend (Strapi CMS)
- Strapi 4.26+ (Headless CMS)
- PostgreSQL (database)
- JWT (authentication)
- Azure Blob Storage (file uploads)
- Node.js 18 LTS

### Deployment
- Azure Static Web Apps (Frontend)
- Azure App Service (Backend)
- Azure Database for PostgreSQL
- Azure Blob Storage (Media)
- GitHub Actions (CI/CD)

## 📊 Key Features

### Public Access (No Login Required)
- Browse products and categories
- View product details
- Read customer reviews
- Contact page
- About page

### User Features (Login Required)
- User dashboard
- Order history
- Wishlist management
- Profile management
- Post reviews (authentication required)

### Admin Features (Admin-only)
- Product management (CRUD)
- Category management
- User management
- Promotion management
- Review moderation
- Analytics dashboard
- System settings

## 🔐 User Roles

- **Guest** - Can browse products and reviews
- **User** - Authenticated users can post reviews, manage orders
- **Admin** - Full system access, management capabilities

## 📝 Environment Variables

See individual setup guides for environment requirements:
- [Frontend .env](../frontend/.env.example)
- [Backend .env](../backend/.env)

## 🤝 Support & Getting Help

- Check documentation first
- Review existing code examples
- Check GitHub issues and discussions
- Reach out to the development team

---

**Last Updated:** April 6, 2026
**Version:** 1.0.0
