import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryGrid({ categories }) {
  const defaultCategories = [
    {
      id: 1,
      name: 'Corrugated Boxes',
      desc: 'Heavy-duty shipping & storage',
      icon: '📦',
      count: 32,
      badge: 'BEST SELLER',
      bg: '#EAF3DE',
      pat: '#639922',
    },
    {
      id: 2,
      name: 'Eco-Friendly Wraps',
      desc: 'Sustainable kraft & recycled',
      icon: '🌿',
      count: 24,
      badge: 'ECO PICK',
      bg: '#E1F5EE',
      pat: '#1D9E75',
    },
    {
      id: 3,
      name: 'Gift Packaging',
      desc: 'Elegant boxes, ribbons & bags',
      icon: '🎁',
      count: 41,
      badge: 'POPULAR',
      bg: '#FAEEDA',
      pat: '#EF9F27',
    },
    {
      id: 4,
      name: 'Food Containers',
      desc: 'Safe, food-grade trays',
      icon: '🥡',
      count: 28,
      badge: null,
      bg: '#FAECE7',
      pat: '#D85A30',
    },
    {
      id: 5,
      name: 'Industrial Packing',
      desc: 'Pallets, bulk bags & loads',
      icon: '🏭',
      count: 19,
      badge: null,
      bg: '#F1EFE8',
      pat: '#888780',
    },
    {
      id: 6,
      name: 'Custom Branded',
      desc: 'Fully custom design & print',
      icon: '🎨',
      count: 36,
      badge: 'NEW',
      bg: '#E6F1FB',
      pat: '#378ADD',
    },
  ];

  const displayCategories = categories || defaultCategories;

  return (
    <div>
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
        WHAT WE OFFER
      </div>
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
        Featured <span className="italic text-[#639922]">Categories</span>
      </h2>
      <p className="text-sm text-[#888] font-light mb-8 max-w-2xl">
        Browse our most popular packaging collections, ready to customise for your brand.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {displayCategories.map((cat, i) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="group rounded-2xl overflow-hidden border border-[#e4e4e0] bg-white cursor-pointer transition-all duration-250 hover:transform hover:translate-y-[-5px] hover:border-[#bbb] relative"
            style={{ animation: `fadeUp 0.4s ease both ${i * 0.07}s` }}
          >
            {cat.badge && (
              <div className="absolute top-2 right-2 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-white bg-opacity-90 text-[#3B6D11] z-10">
                {cat.badge}
              </div>
            )}
            <div
              className="h-32 relative flex items-center justify-center overflow-hidden"
              style={{ background: cat.bg }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`cp${cat.id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="1.5" fill={cat.pat}/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#cp${cat.id})`}/>
              </svg>
              <span className="text-4xl relative z-10 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-3deg] inline-block">
                {cat.icon}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-playfair text-sm font-bold text-[#1a1a1a] mb-1 leading-tight">
                {cat.name}
              </h3>
              <p className="text-xs text-[#999] font-light leading-relaxed mb-2">
                {cat.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#f3f3f0] text-[#777]">
                  {cat.count} items
                </span>
                <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-[#f3f3f0] text-[#666] text-xs font-medium transition-all duration-200 group-hover:bg-[#639922] group-hover:text-white">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <button className="px-6 py-2 text-xs font-medium border border-[#639922] text-[#3B6D11] rounded-full hover:bg-[#639922] hover:text-white transition">
          View all categories →
        </button>
      </div>
    </div>
  );
}
