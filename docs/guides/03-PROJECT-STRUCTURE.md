# Project Structure Guide

Understanding the PackEdge codebase organization.

## 📁 Root Directory

```
PackEdge/
├── frontend/              # React + Vite application
├── backend/               # Strapi CMS backend
├── docs/                  # Documentation (you are here)
├── .gitignore             # Git ignore rules
├── README.md              # Project overview
└── package.json           # (optional) workspace config
```

---

## 🎨 Frontend Structure

```
frontend/
├── src/
│   ├── pages/                        # Page components
│   │   ├── public/                   # Public pages (no auth needed)
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Categories.jsx        # Category listing
│   │   │   ├── ProductDetail.jsx     # Single product page
│   │   │   ├── Reviews.jsx           # All reviews page
│   │   │   ├── Contact.jsx           # Contact form
│   │   │   └── About.jsx             # About us page
│   │   ├── user/                     # User dashboard pages
│   │   │   ├── UserDashboard.jsx     # User home
│   │   │   ├── Catalog.jsx           # Product catalog
│   │   │   ├── OrderHistory.jsx      # Order list
│   │   │   ├── Profile.jsx           # User profile
│   │   │   └── Wishlist.jsx          # Saved items
│   │   ├── admin/                    # Admin pages
│   │   │   ├── AdminDashboard.jsx    # Analytics dashboard
│   │   │   ├── Products.jsx          # Product management
│   │   │   ├── ProductForm.jsx       # Create/edit product
│   │   │   ├── Categories.jsx        # Category management
│   │   │   ├── Users.jsx             # User list
│   │   │   ├── UserDetail.jsx        # User details
│   │   │   ├── Promotions.jsx        # Discount management
│   │   │   ├── Reviews.jsx           # Review moderation
│   │   │   └── Settings.jsx          # System settings
│   │   ├── Login.jsx                 # Login page
│   │   ├── Register.jsx              # Registration page
│   │   ├── NotFound.jsx              # 404 page
│   │   └── Unauthorized.jsx          # 403 page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Design system components
│   │   │   ├── Button.jsx            # Button component
│   │   │   ├── Input.jsx             # Form input
│   │   │   ├── Modal.jsx             # Modal dialog
│   │   │   ├── Toggle.jsx            # On/off toggle
│   │   │   ├── Badge.jsx             # Status badge
│   │   │   ├── FileUpload.jsx        # Drag & drop upload
│   │   │   ├── StarRating.jsx        # Rating stars
│   │   │   ├── Avatar.jsx            # User avatar
│   │   │   ├── Spinner.jsx           # Loading spinner
│   │   │   ├── Toast.jsx             # Notifications
│   │   │   ├── Dropdown.jsx          # Select menu
│   │   │   └── Pagination.jsx        # Page navigation
│   │   ├── layout/                   # Layout wrappers
│   │   │   ├── PublicLayout.jsx      # Main layout for public
│   │   │   ├── PublicNavbar.jsx      # Top navigation
│   │   │   ├── PublicFooter.jsx      # Footer
│   │   │   ├── AdminLayout.jsx       # Admin layout
│   │   │   ├── AdminSidebar.jsx      # Side menu
│   │   │   ├── AdminTopbar.jsx       # Top admin bar
│   │   │   ├── UserLayout.jsx        # User layout
│   │   │   └── AuthLayout.jsx        # Login/register layout
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── StatsCard.jsx         # Stat boxes
│   │   │   ├── EngagementChart.jsx   # Weekly chart
│   │   │   ├── RevenueChart.jsx      # Revenue graph
│   │   │   ├── ProductTable.jsx      # Products table
│   │   │   ├── UserTable.jsx         # Users table
│   │   │   ├── ReviewCard.jsx        # Review display
│   │   │   ├── PromotionTable.jsx    # Promotions table
│   │   │   ├── CategoryModal.jsx     # Add category form
│   │   │   └── ProductUpdatesFeed.jsx# Activity feed
│   │   ├── public/                   # Homepage components
│   │   │   ├── HeroSection.jsx       # Hero banner
│   │   │   ├── StatsBar.jsx          # Stat boxes
│   │   │   ├── CategoryGrid.jsx      # Category display
│   │   │   ├── SustainableStory.jsx  # Story section
│   │   │   ├── CustomerPraise.jsx    # Testimonials
│   │   │   ├── ContactForm.jsx       # Contact form
│   │   │   ├── MapEmbed.jsx          # Location map
│   │   │   ├── ProductCard.jsx       # Product card
│   │   │   └── ReviewForm.jsx        # Post review form
│   │   └── user/                     # User page components
│   │       ├── CatalogGrid.jsx       # Product grid
│   │       ├── OrderCard.jsx         # Order item
│   │       └── ProfileForm.jsx       # Profile edit form
│   │
│   ├── routes/                       # Routing logic
│   │   ├── index.jsx                 # All routes definition
│   │   ├── ProtectedRoute.jsx        # User auth guard
│   │   ├── AdminRoute.jsx            # Admin auth guard
│   │   └── PublicOnlyRoute.jsx       # Guest-only guard
│   │
│   ├── services/                     # API call functions
│   │   ├── api.js                    # Axios instance + interceptors
│   │   ├── authService.js            # Auth endpoints
│   │   ├── productService.js         # Product endpoints
│   │   ├── categoryService.js        # Category endpoints
│   │   ├── userService.js            # User endpoints
│   │   ├── reviewService.js          # Review endpoints
│   │   ├── promotionService.js       # Promotion endpoints
│   │   ├── uploadService.js          # File upload
│   │   └── analyticsService.js       # Analytics endpoints
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.js                # Auth state hook
│   │   ├── useProducts.js            # Products data hook
│   │   ├── useCategories.js          # Categories data hook
│   │   ├── useUpload.js              # File upload hook
│   │   ├── useDebounce.js            # Debounce hook
│   │   └── useToast.js               # Toast notifications hook
│   │
│   ├── context/                      # React Context providers
│   │   ├── AuthContext.jsx           # Auth context
│   │   └── ToastContext.jsx          # Toast context
│   │
│   ├── store/                        # Zustand global state
│   │   ├── authStore.js              # Auth store
│   │   ├── catalogStore.js           # Products store
│   │   └── uiStore.js                # UI state store
│   │
│   ├── utils/                        # Utility functions
│   │   ├── formatters.js             # Date, price formatting
│   │   ├── validators.js             # Form validation
│   │   ├── constants.js              # App constants
│   │   └── cn.js                     # Tailwind class merge
│   │
│   ├── assets/                       # Static files
│   │   ├── images/                   # Product/category images
│   │   ├── fonts/                    # Custom fonts
│   │   ├── hero.png                  # Hero image
│   │   ├── react.svg                 # React logo
│   │   └── vite.svg                  # Vite logo
│   │
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
│
├── public/                           # Static assets
│   ├── favicon.svg                   # Site icon
│   ├── icons.svg                     # Icon sprite
│   ├── robots.txt                    # SEO robots file
│   └── sitemap.xml                   # Sitemap
│
├── .env                              # Environment variables
├── .env.example                      # Example env
├── .gitignore                        # Git ignore
├── eslint.config.js                  # Linting config
├── package.json                      # Dependencies
├── vite.config.js                    # Vite config
├── tailwind.config.js                # Tailwind config
├── postcss.config.js                 # PostCSS config
└── index.html                        # HTML entry
```

---

## 🔧 Backend Structure (Strapi CMS)

```
backend/
├── config/                           # Strapi configuration
│   ├── database.js                   # PostgreSQL configuration
│   ├── server.js                     # Server settings (port 1337)
│   ├── plugins.js                    # Plugin configuration (JWT, Users)
│   ├── middlewares.js                # Custom middleware
│   ├── functions/                    # Reusable functions
│   └── cron.js                       # Scheduled tasks (optional)
│
├── src/
│   ├── api/                          # Content Types (auto-generated)
│   │   ├── product/                  # Product content type
│   │   │   ├── controllers/
│   │   │   │   └── product.js        # Auto-generated endpoints
│   │   │   ├── services/
│   │   │   │   └── product.js        # Business logic
│   │   │   ├── routes/
│   │   │   ├── content-types/        # Content type definition
│   │   │   └── lifecycles.js         # Hooks (before/after events)
│   │   │
│   │   ├── category/                 # Category content type
│   │   ├── review/                   # Review content type
│   │   └── promotion/                # Promotion content type
│   │
│   ├── extensions/                   # Custom code (optional)
│   │   ├── upload/                   # Upload plugin customization
│   │   └── users-permissions/        # Auth customization
│   │
│   ├── filters/                      # Custom filters (middleware)
│   ├── policies/                     # Access policies
│   ├── middlewares/                  # Global middleware
│   └── index.js                      # Strapi entry point
│
├── .env                              # Environment variables
├── .env.example                      # Example environment
├── .gitignore                        # Git ignore
├── package.json                      # Dependencies (Strapi, plugins)
└── README.md                         # Backend setup guide
```

---

## 🔄 Data Flow

```
User Browser
    ↓
[Frontend (React)]
    ↓ (HTTP/REST)
[API Routes] → [Strapi Controllers]
    ↓
[Services] (Business Logic)
    ↓
[PostgreSQL Database]
    ↓ (Query Results)
[JSON Response] → [Frontend State (Zustand)]
```

---

## 📋 Component Naming

### Pages
- `HomePage.jsx`, `LoginPage.jsx` (ends with Page)

### Components
- `Button.jsx`, `ProductCard.jsx` (simple name)

### Hooks
- `useAuth.js`, `useProducts.js` (starts with use)

### Services
- `authService.js`, `productService.js` (ends with Service)

### Stores
- `authStore.js`, `uiStore.js` (ends with Store)

---

## 🎯 Module Relationships

### Frontend
- Pages use Components
- Components use Hooks
- Hooks use Services
- Services use API client
- Store (Zustand) provides global state

### Backend (Strapi)
- Content Types define API endpoints (auto-generated)
- Controllers handle HTTP requests
- Services contain business logic
- Policies/Guards handle authentication & authorization
- Database stores persisted data

---

**Next:** Read [Frontend Guide](./04-FRONTEND-GUIDE.md) to understand component patterns.
