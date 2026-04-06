import React from 'react';

export default function CatalogGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
