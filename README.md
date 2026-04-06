# PackEdge

A sustainable packaging e-commerce platform built with modern web technologies.

## Project Structure

```
PackEdge/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── pages/     # Page components organized by role (public, user, admin)
│   │   ├── components/# Reusable components (ui, layout, admin, public, user)
│   │   ├── routes/    # Route definitions and protection
│   │   ├── services/  # API call functions
│   │   ├── hooks/     # Custom React hooks
│   │   ├── context/   # React context providers
│   │   ├── store/     # Zustand global state
│   │   ├── utils/     # Utilities and helpers
│   │   └── assets/    # Images, fonts, and static files
│   └── public/        # Static files
│
├── backend/           # NestJS backend API
│   ├── src/
│   │   ├── modules/   # Feature modules (auth, users, products, etc.)
│   │   ├── common/    # Shared utilities (guards, decorators, filters)
│   │   ├── config/    # Configuration files
│   │   └── main.ts    # Application entry point
│   └── prisma/        # Database schema and migrations
│
└── docs/              # Documentation
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer** - File uploads

## Getting Started

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run prisma:migrate
npm run start:dev
```

## Features

### Public Pages
- Home with hero section
- Product categories
- Product details
- Customer reviews
- Contact page
- About us

### User Features
- User dashboard
- Product catalog
- Order history
- Wishlist
- Profile management

### Admin Features
- Dashboard with analytics
- Product management
- Category management
- User management
- Promotion management
- Review management
- System settings

## Environment Variables

See `.env.example` files in both frontend and backend directories.

## Contributing

Please follow the existing code structure and style conventions.

## License

MIT
