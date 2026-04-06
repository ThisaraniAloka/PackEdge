import React, { useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategoryModal from '../../components/admin/CategoryModal';

export default function Categories() {
  const { categories, loading, fetchCategories } = useCategories();
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-12">Loading categories...</div>;

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
      {showModal && <CategoryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
