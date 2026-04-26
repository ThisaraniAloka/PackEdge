import React from 'react';

export default function StatsBar() {
  const stats = [
    { label: 'Recycling Rate', value: '94%', icon: '♻️' },
    { label: 'Trees Saved', value: '1.2M', icon: '🌳' },
    { label: 'Customers', value: '50K+', icon: '🤝' },
    { label: 'Eco Certified', value: '100%', icon: '🌿' },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] p-8">
      {/* Dotted pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stats-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stats-dots)"/>
      </svg>

      <div className="relative z-10 grid grid-cols-4 gap-0">
        {stats.map((stat, i) => (
          <div key={i} className={`text-center py-3 px-2 ${i < stats.length - 1 ? 'border-r border-white border-opacity-10' : ''}`}>
            <div className="text-lg mb-1">{stat.icon}</div>
            <p className="font-playfair text-2xl font-bold text-[#639922]">{stat.value}</p>
            <p className="text-xs text-white text-opacity-40 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
