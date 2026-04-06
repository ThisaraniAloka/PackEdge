import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductTable from '../../components/admin/ProductTable';

export default function Products() {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-12">Loading products...</div>;

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
        <a href="/admin/products/new" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Product
        </a>
      </div>
      <ProductTable products={products} />
    </div>
  );
}
