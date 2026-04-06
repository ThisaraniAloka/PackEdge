import React from 'react';
import StarRating from '../ui/StarRating';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{review.author}</h3>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-600 text-sm mb-2">{review.product}</p>
      <p className="text-gray-700">{review.comment}</p>
      <p className="text-gray-400 text-xs mt-4">{review.date}</p>
    </div>
  );
}
