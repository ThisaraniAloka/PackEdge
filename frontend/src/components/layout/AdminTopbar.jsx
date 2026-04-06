import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminTopbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow ml-64">
      <div className="px-8 py-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-64"
        />
        <div className="flex items-center gap-4">
          <span className="text-gray-600">🔔</span>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-semibold">{user?.name}</span>
            <button onClick={logout} className="text-red-600 text-sm">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}
