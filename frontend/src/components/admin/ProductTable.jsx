import React from 'react';

export default function ProductTable({ products }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{product.name}</td>
              <td className="px-6 py-3">{product.category}</td>
              <td className="px-6 py-3">${product.price}</td>
              <td className="px-6 py-3">{product.stock}</td>
              <td className="px-6 py-3">
                <a href={`/admin/products/${product.id}`} className="text-green-600 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
