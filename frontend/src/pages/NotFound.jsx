import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
