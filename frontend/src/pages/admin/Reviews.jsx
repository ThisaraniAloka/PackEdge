import React from 'react';

export default function Reviews() {
  const [reviews, setReviews] = React.useState([]);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Reviews</h1>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              {/* Review content */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
