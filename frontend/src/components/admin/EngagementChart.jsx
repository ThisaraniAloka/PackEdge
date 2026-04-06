import React from 'react';

export default function EngagementChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Weekly Engagement</h2>
      <div className="h-64 flex items-end justify-around gap-2">
        {[40, 65, 45, 70, 55, 80, 60].map((height, i) => (
          <div
            key={i}
            className="bg-green-600 rounded-t flex-1"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
