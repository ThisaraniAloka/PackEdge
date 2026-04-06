import React from 'react';

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Annual Revenue</h2>
      <div className="h-64 flex items-end justify-around gap-2">
        {[30, 45, 50, 60, 70, 80, 85, 90, 85, 75, 65, 55].map((height, i) => (
          <div
            key={i}
            className="bg-blue-600 rounded-t flex-1"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
