import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, fetchProduct } = useProducts();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading product...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-green-600 mb-6">${product.price}</div>
          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-4 py-2 border rounded"
            />
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
