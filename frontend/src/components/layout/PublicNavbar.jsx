import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          PackEdge
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/categories" className="hover:text-green-600">Categories</Link>
          <Link to="/reviews" className="hover:text-green-600">Reviews</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/contact" className="hover:text-green-600">Contact</Link>
          <div className="flex gap-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-green-600 font-semibold hover:bg-green-50 rounded transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
