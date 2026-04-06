import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg overflow-hidden">
      <div className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to PackEdge</h1>
        <p className="text-xl text-green-100 mb-8">
          Sustainable packaging solutions for eco-conscious businesses and individuals.
        </p>
        <Link
          to="/categories"
          className="inline-block px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
