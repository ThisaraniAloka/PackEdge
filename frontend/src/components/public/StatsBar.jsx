import React from 'react';

export default function StatsBar() {
  const stats = [
    { label: 'Recycling Rate', value: '94%' },
    { label: 'Trees Saved', value: '1.2M' },
    { label: 'Customers', value: '50K+' },
  ];

  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-green-400">{stat.value}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
