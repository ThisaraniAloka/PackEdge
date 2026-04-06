# Frontend Guide

Comprehensive guide to Frontend development and best practices.

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, static files
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Categories.jsx
│   │   ├── Reviews.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── ProductManagement.jsx
│   │       ├── CategoryManagement.jsx
│   │       ├── UserManagement.jsx
│   │       └── Analytics.jsx
│   ├── components/     # Reusable components
│   │   ├── layout/
│   │   ├── common/
│   │   ├── ui/
│   │   └── forms/
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useProducts.js
│   │   ├── useCategories.js
│   │   ├── useToast.js
│   │   └── useDebounce.js
│   ├── services/       # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── categoryService.js
│   ├── stores/         # Zustand stores
│   │   ├── authStore.js
│   │   ├── catalogStore.js
│   │   └── uiStore.js
│   ├── context/        # React Context
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── utils/          # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── constants.js
│   │   └── classNames.js
│   ├── routes/         # Route definitions
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── PublicOnlyRoute.jsx
│   └── styles/
│       └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎨 Component Architecture

### Component Types

#### 1. Pages
Full-page components representing routes.

```jsx
// Example: pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?limit=12');
        setProducts(data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <h1>Welcome to PackEdge</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

#### 2. Layout Components
Wrapper components providing page structure.

```jsx
// Example: components/layout/PublicLayout.jsx
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
```

#### 3. UI Components
Reusable, single-responsibility components.

```jsx
// Example: components/ui/Button.jsx
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClass = 'font-semibold rounded transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const buttonClass = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

---

## 🪝 Custom Hooks

### useAuth Hook

```javascript
// hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
```

### useProducts Hook

```javascript
// hooks/useProducts.js
import { useState, useEffect } from 'react';
import productService from '@/services/productService';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts(filters);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error };
}
```

---

## 📦 State Management

### Zustand Stores

```javascript
// stores/authStore.js
import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null });
  }
}));
```

### Context API

```jsx
// context/AuthContext.jsx
import { createContext, useState, useCallback } from 'react';
import authService from '@/services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email, password) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem('authToken', token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🔗 API Services

### Service Pattern

```javascript
// services/productService.js
import api from './api';

const productService = {
  getProducts: async (filters = {}) => {
    const response = await api.get('/products', { params: filters });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, updates) => {
    const response = await api.put(`/products/${id}`, updates);
    return response.data;
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
  }
};

export default productService;
```

### Axios Instance with Interceptors

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor - add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🛣️ Routing

### Route Guards

```jsx
// routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ element }) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" />;
}
```

### Route Configuration

```javascript
// routes/index.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <AdminRoute element={<AdminDashboard />} />
  }
]);
```

---

## 🎯 Best Practices

### Component Development

1. **Keep Components Small**
   - Single responsibility principle
   - Max 200 lines per component

2. **Use Composition Over Inheritance**
   ```jsx
   // Good
   <Card>
     <Card.Header title="Title" />
     <Card.Body>Content</Card.Body>
   </Card>
   ```

3. **Memoize Expensive Components**
   ```jsx
   export default memo(ProductCard, (prev, next) => {
     return prev.id === next.id;
   });
   ```

4. **Extract Logic to Custom Hooks**
   ```jsx
   // Instead of putting logic in component
   const { data, loading } = useProductData(id);
   ```

### Styling

- Use **Tailwind CSS** for utility classes
- Create component-specific style files only if needed
- Use CSS variables for theme values

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>
```

### Error Handling

```jsx
function ProductDetail() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    if (error.response?.status === 404) {
      setError('Product not found');
    } else {
      setError('An error occurred');
    }
  }, []);

  return error ? <ErrorBoundary message={error} /> : <ProductCard />;
}
```

---

## 🧪 Testing Components

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 🔄 Form Handling

```jsx
import { useState } from 'react';
import api from '@/services/api';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      // Success
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

**Next:** Read [Backend Guide](./05-BACKEND-GUIDE.md) for server-side development.
