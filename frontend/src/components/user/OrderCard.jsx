import React from 'react';

export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
          <p className="font-semibold text-lg">{order.date}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-semibold ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600">{order.items} items</p>
      <p className="text-xl font-bold text-gray-900 mt-2">${order.total}</p>
    </div>
  );
}
