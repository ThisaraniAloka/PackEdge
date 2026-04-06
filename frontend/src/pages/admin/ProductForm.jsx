import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">
        {isEditing ? 'Edit Product' : 'Create Product'}
      </h1>
      <form className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea rows="4" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Select category</option>
            </select>
          </div>
        </div>
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save Product
        </button>
      </form>
    </div>
  );
}
