import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategoryGrid from '../../components/public/CategoryGrid';

export default function Categories() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div className="text-center py-12">Loading categories...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      <CategoryGrid categories={categories} />
    </div>
  );
}
