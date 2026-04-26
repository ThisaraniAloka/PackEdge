import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export default function Reviews() {
  const { reviews, loading, fetchReviews } = useProducts();
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchReviews();
  }, []);

  // Mock data in case no reviews are loaded
  const mockReviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      company: 'EcoShop',
      rating: 5,
      title: 'Exceptional Quality',
      quote: 'PackEdge packaging is beautiful and truly eco-friendly. We switched our entire product line and couldn\'t be happier.',
      date: '2025-03-15',
      verified: true,
    },
    {
      id: 2,
      author: 'Mike Chen',
      company: 'Green Goods Co.',
      rating: 5,
      title: 'Outstanding Service',
      quote: 'Outstanding quality, fast shipping, and the team is incredibly helpful. Highly recommended!',
      date: '2025-03-10',
      verified: true,
    },
    {
      id: 3,
      author: 'Lisa Rodriguez',
      company: 'Sustainable Goods',
      rating: 5,
      title: 'Best Experience',
      quote: 'The best sustainable packaging we\'ve found. Our customers love the unboxing experience.',
      date: '2025-03-05',
      verified: true,
    },
    {
      id: 4,
      author: 'James Wilson',
      company: 'EcoTech Solutions',
      rating: 5,
      title: 'Perfect for Our Needs',
      quote: 'Exceeded our expectations in every way. Custom designs were handled professionally.',
      date: '2025-02-28',
      verified: true,
    },
    {
      id: 5,
      author: 'Emma Davis',
      company: 'Green Living Co',
      rating: 5,
      title: 'Reliable Partner',
      quote: 'We\'ve been using PackEdge for 2 years now. Consistent quality and reliability.',
      date: '2025-02-20',
      verified: true,
    },
    {
      id: 6,
      author: 'David Thompson',
      company: 'Natural Products Ltd',
      rating: 5,
      title: 'Great Value',
      quote: 'Premium quality at competitive prices. Can\'t ask for more.',
      date: '2025-02-15',
      verified: true,
    },
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : mockReviews;

  const sortedReviews = [...displayReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const avgRating = (
    displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length
  ).toFixed(1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#e4e4e0] border-t-[#639922] rounded-full animate-spin"></div>
          <p className="text-sm text-[#888] mt-4">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 p-7 md:p-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
          TESTIMONIALS
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
          What Our <span className="italic text-[#639922]">Customers Say</span>
        </h1>
        <p className="text-sm text-[#888] font-light leading-relaxed mb-6">
          Trusted by eco-conscious businesses across Sri Lanka and beyond. Read authentic reviews from our valued customers.
        </p>

        {/* Average Rating */}
        <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl border border-[#e4e4e0] bg-white">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl text-[#EF9F27]">★</span>
            ))}
          </div>
          <div>
            <span className="font-playfair text-2xl font-bold text-[#639922]">{avgRating}</span>
            <span className="text-xs text-[#888] ml-2">out of 5 ({displayReviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-[#888]">
          Showing <span className="font-medium">{displayReviews.length}</span> reviews
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition ${
              sortBy === 'recent'
                ? 'bg-[#639922] text-white'
                : 'border border-[#e4e4e0] text-[#888] hover:border-[#bbb]'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition ${
              sortBy === 'rating'
                ? 'bg-[#639922] text-white'
                : 'border border-[#e4e4e0] text-[#888] hover:border-[#bbb]'
            }`}
          >
            Highest Rated
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedReviews.map((review, i) => (
          <div
            key={review.id}
            className="rounded-2xl border border-[#e4e4e0] bg-white p-6 hover:border-[#bbb] hover:shadow-md transition flex flex-col"
            style={{ animation: `fadeUp 0.4s ease both ${i * 0.05}s` }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(review.rating)].map((_, idx) => (
                <span key={idx} className="text-lg text-[#EF9F27]">★</span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-playfair font-bold text-[#1a1a1a] mb-2">
              {review.title}
            </h3>

            {/* Quote */}
            <p className="text-xs text-[#555] leading-relaxed italic font-playfair mb-4 flex-grow">
              "{review.quote}"
            </p>

            {/* Author Info */}
            <div className="pt-4 border-t border-[#f0f0ee]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-[#1a1a1a]">
                    {review.author}
                  </p>
                  <p className="text-[10px] text-[#888]">
                    {review.company}
                  </p>
                </div>
                {review.verified && (
                  <span className="text-[10px] font-semibold text-[#639922] bg-[#EAF3DE] px-2 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#aaa]">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative rounded-2xl bg-[#EAF3DE] p-10 text-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="reviews-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reviews-dots)"/>
        </svg>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Ready to Experience <span className="italic text-[#639922]">Premium Packaging</span>?
          </h2>
          <p className="text-sm text-[#888] font-light mb-6">
            Join thousands of satisfied customers who trust PackEdge for their sustainable packaging needs.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/categories"
              className="px-6 py-2.5 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition"
            >
              Explore Products →
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 text-xs font-medium border border-[#639922] text-[#3B6D11] rounded-full hover:bg-[#639922] hover:text-white transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
