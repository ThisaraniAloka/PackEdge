import React from 'react';
import ProductCard from './ProductCard';

export default function CategoryGrid({ categories }) {
  const defaultCategories = [
    { id: 1, name: 'Eco Boxes', image: '/images/boxes.jpg' },
    { id: 2, name: 'Paper Bags', image: '/images/bags.jpg' },
    { id: 3, name: 'Kraft Envelopes', image: '/images/envelopes.jpg' },
    { id: 4, name: 'Biodegradable Films', image: '/images/films.jpg' },
  ];

  const displayCategories = categories || defaultCategories;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCategories.map((cat) => (
          <div key={cat.id} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
