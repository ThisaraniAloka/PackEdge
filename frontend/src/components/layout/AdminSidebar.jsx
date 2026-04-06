import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  const menuItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Categories', href: '/admin/categories' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Promotions', href: '/admin/promotions' },
    { label: 'Reviews', href: '/admin/reviews' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 fixed h-full overflow-y-auto">
      <Link to="/admin" className="text-2xl font-bold text-green-400 mb-8 block">
        PackEdge Admin
      </Link>
      <Link
        to="/admin/products/new"
        className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-6 text-center"
      >
        + New Entry
      </Link>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
