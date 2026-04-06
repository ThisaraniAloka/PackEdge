import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Wishlist Items</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Account Status</h3>
          <p className="text-lg font-semibold text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
}
