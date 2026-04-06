import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ReviewCard from '../../components/admin/ReviewCard';

export default function Reviews() {
  const { reviews, loading, fetchReviews } = useProducts();

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-12">Loading reviews...</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
