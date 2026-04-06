import React from 'react';

export default function StarRating({ rating = 0, onRate }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2">
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => onRate && onRate(star)}
          className={`text-2xl transition ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
