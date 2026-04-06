import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import CatalogGrid from '../../components/user/CatalogGrid';

export default function Catalog() {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-12">Loading products...</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Product Catalog</h1>
      <CatalogGrid products={products} />
    </div>
  );
}
