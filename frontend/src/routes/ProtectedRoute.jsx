import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
