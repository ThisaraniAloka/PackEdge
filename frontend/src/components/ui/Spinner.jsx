import React from 'react';

export default function Spinner({ size = 'md', color = 'green' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    green: 'border-green-600',
    blue: 'border-blue-600',
    gray: 'border-gray-600',
  };

  return (
    <div
      className={`${sizes[size]} border-4 border-gray-200 ${colors[color]} border-t-transparent rounded-full animate-spin`}
    />
  );
}
