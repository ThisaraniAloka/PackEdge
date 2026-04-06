import React from 'react';

export default function ProductUpdatesFeed() {
  const updates = [
    { id: 1, product: 'Eco Box S', action: 'created', time: '2 hours ago' },
    { id: 2, product: 'Paper Bag L', action: 'updated', time: '5 hours ago' },
    { id: 3, product: 'Kraft Envelope', action: 'archived', time: '1 day ago' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Product Updates</h2>
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <span className="font-medium">{update.product}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">{update.action}</span>
              <span className="text-sm text-gray-500">{update.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
