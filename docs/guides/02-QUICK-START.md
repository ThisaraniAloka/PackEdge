# Quick Start Guide

Get PackEdge running in 5 minutes!

## ⚡ Prerequisites

- Node.js v18+
- PostgreSQL running
- Git

## 🚀 Quick Start (5 minutes)

### Step 1: Clone & Install (2 min)

```bash
git clone https://github.com/yourusername/PackEdge.git
cd PackEdge

# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### Step 2: Setup Environment (1 min)

**Frontend `.env`:**
```bash
cd frontend
cat > .env << EOF
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=PackEdge
EOF
cd ..
```

**Backend `.env`:**
```bash
cd backend
cat > .env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/packedge
JWT_SECRET=dev-secret-change-in-prod
JWT_EXPIRES_IN=24h
PORT=4000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
EOF
cd ..
```

### Step 3: Database Setup (1 min)

```bash
# Create database
psql -U postgres -c "CREATE DATABASE packedge;"

# Run migrations
cd backend
npm run prisma:migrate
cd ..
```

### Step 4: Start Services (1 min)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### ✅ Done!

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000/api
- **Database:** packedge (PostgreSQL)

---

## 🧪 Test the Setup

### Browse Website
Open `http://localhost:5173` and explore:
- ✅ Home page loads
- ✅ Categories visible
- ✅ Product pages work
- ✅ Reviews section appears

### Test API
```bash
curl http://localhost:4000/api/categories
```

Should return `[]` or existing categories.

---

## 📝 Next Steps

- [Full Setup Guide](./01-SETUP.md) - Detailed instructions
- [Frontend Guide](./04-FRONTEND-GUIDE.md) - Component structure
- [API Reference](../api/01-API-OVERVIEW.md) - All endpoints
- [Database Schema](./06-DATABASE-SCHEMA.md) - Data models

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Kill process: `lsof -ti:5173 \| xargs kill -9` |
| DB connection error | Check PostgreSQL running: `psql -U postgres` |
| Dependencies fail | Clear cache: `npm cache clean --force` |
| Prisma error | Reset: `npm run prisma:migrate:reset` |

---

**Ready to develop? Start with the [Frontend Guide](./04-FRONTEND-GUIDE.md)!**
