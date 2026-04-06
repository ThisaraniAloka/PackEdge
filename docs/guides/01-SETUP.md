# Setup & Installation Guide

Complete guide to set up PackEdge for local development.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/PackEdge.git
cd PackEdge
```

## 2️⃣ Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Create Environment File

Create `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=PackEdge
```

### Verify Setup

```bash
npm run dev
```

The frontend should be running at `http://localhost:5173`

---

## 3️⃣ Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Create Environment File

Create `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/packedge
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=4000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Database Setup

1. **Create PostgreSQL Database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE packedge;

# Exit
\q
```

2. **Run Prisma Migrations**

```bash
npm run prisma:migrate
```

3. **Seed Database (Optional)**

```bash
npm run seed
```

### Verify Setup

```bash
npm run start:dev
```

The backend should be running at `http://localhost:4000`

---

## 4️⃣ Verify Complete Setup

Check if both services are running:

### Frontend
- Open browser: `http://localhost:5173`
- You should see the PackEdge homepage

### Backend
- Test API: `curl http://localhost:4000/api/categories`
- Should return categories data (may be empty initially)

---

## 🔧 Troubleshooting

### Port Already in Use

**Frontend (5173):**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Backend (4000):**
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Database Connection Error

**Check PostgreSQL is running:**
```bash
psql -U postgres -d postgres -c "SELECT 1"
```

**Verify DATABASE_URL in .env:**
```
postgresql://[username]:[password]@[host]:[port]/[database]
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Prisma Migration Issues

```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate:reset

# Generate Prisma client
npm run prisma:generate
```

---

## 📁 Project Root Structure

```
PackEdge/
├── frontend/          # React application
├── backend/           # NestJS API
├── docs/              # Documentation (this folder)
├── .gitignore         # Git ignore rules
└── README.md          # Project README
```

---

## ✅ Next Steps

After successful setup:

1. Read [Quick Start](./02-QUICK-START.md) guide
2. Explore [Frontend Guide](./04-FRONTEND-GUIDE.md)
3. Understand [API Endpoints](../api/01-API-OVERVIEW.md)
4. Check [Database Schema](./06-DATABASE-SCHEMA.md)

---

## 🐛 Getting Help

If you encounter issues:

1. Check error messages carefully
2. Review logs in terminal
3. Check Troubleshooting section above
4. Search GitHub issues
5. Ask the development team

---

**Last Updated:** April 6, 2026
