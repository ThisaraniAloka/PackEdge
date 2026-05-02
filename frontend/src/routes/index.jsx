import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import PublicLayout from '../components/layout/PublicLayout';
import UserLayout from '../components/layout/UserLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Pages
import Home from '../pages/public/Home';
import Categories from '../pages/public/Categories';
import ProductDetail from '../pages/public/ProductDetail';
import CategoryProducts from '../pages/public/CategoryProducts';
import Reviews from '../pages/public/Reviews';
import Contact from '../pages/public/Contact';
import About from '../pages/public/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';


// User pages
import UserDashboard from '../pages/user/UserDashboard';
import Catalog from '../pages/user/Catalog';
import OrderHistory from '../pages/user/OrderHistory';
import Profile from '../pages/user/Profile';
import Wishlist from '../pages/user/Wishlist';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import Products from '../pages/admin/Products';
import ProductForm from '../pages/admin/ProductForm';
import AdminCategories from '../pages/admin/Categories';
import Users from '../pages/admin/Users';
import UserDetail from '../pages/admin/UserDetail';
import Promotions from '../pages/admin/Promotions';
import AdminReviews from '../pages/admin/Reviews';
import Settings from '../pages/admin/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages with layout */}
      <Route element={<PublicLayout><Home /></PublicLayout>} path="/" />
      <Route element={<PublicLayout><Categories /></PublicLayout>} path="/categories" />
      <Route element={<PublicLayout><CategoryProducts /></PublicLayout>} path="/category/:id" />
      <Route element={<PublicLayout><ProductDetail /></PublicLayout>} path="/products/:id" />
      <Route element={<PublicLayout><Reviews /></PublicLayout>} path="/reviews" />
      <Route element={<PublicLayout><Contact /></PublicLayout>} path="/contact" />
      <Route element={<PublicLayout><About /></PublicLayout>} path="/about" />

      {/* Auth pages */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* User pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>

      {/* Admin pages */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/:id" element={<ProductForm />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/promotions" element={<Promotions />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* Error pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
