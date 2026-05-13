import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../../data/products';

export default function ProductDetail() {
  const { id } = useParams();

  // FIND PRODUCT
  const product = products.find((p) => p.id === Number(id));

  // MAIN IMAGE
  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || product?.img
  );

  // IMAGE ZOOM POSITION
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  // REVIEWS STATE
  const [reviews, setReviews] = useState([
    {
      name: 'Nimal Perera',
      rating: 5,
      comment: 'Excellent packaging quality and very durable product.',
    },
    {
      name: 'Kavindi Silva',
      rating: 4,
      comment: 'Good eco-friendly packaging with fast delivery.',
    },
    {
      name: 'Sahan Fernando',
      rating: 3,
      comment: 'Nice packaging product for daily business usage.',
    },
  ]);

  // REVIEW FORM
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Product Not Found
        </h1>

        <Link
          to="/categories"
          className="inline-block mt-6 bg-[#639922] text-white px-6 py-3 rounded-full"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  // CALCULATE AVERAGE RATING
  const averageRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) /
    reviews.length;

  // SUBMIT REVIEW
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !comment) return;

    const newReview = {
      name,
      rating: Number(rating),
      comment,
    };

    setReviews([newReview, ...reviews]);

    setName('');
    setRating(5);
    setComment('');
  };

  // STAR FUNCTION
  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          {/* MAIN IMAGE */}
          <div
            className="bg-gray-100 rounded-2xl overflow-hidden shadow-md relative cursor-zoom-in"
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();

              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;

              setPosition({ x, y });
            }}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-150"
              style={{
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            />
          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-4 mt-5">
            {(product.images || [
              product.img,
              product.img,
              product.img,
              product.img,
            ]).map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                className={`border-2 rounded-xl overflow-hidden cursor-pointer transition ${
                  mainImage === image
                    ? 'border-[#639922]'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-sm text-[#639922] font-semibold uppercase">
            Premium Packaging
          </p>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <h1 className="text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-semibold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-3xl font-bold text-[#639922] mt-5">
            LKR {product.price}
          </p>

          <p className="text-gray-600 leading-8 mt-6">
            {product.description}
          </p>

          {/* PRODUCT DETAILS */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">Material</span>
              <span className="text-gray-600">{product.material}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">Size</span>
              <span className="text-gray-600">{product.size}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">Stock</span>
              <span className="text-gray-600">{product.stock} Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ REVIEWS SECTION SIDE BY SIDE */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* CUSTOMER REVIEWS */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>

          <div className="space-y-5">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-2xl p-5 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {review.name}
                  </h3>

                  <div className="text-yellow-500 text-lg">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="text-gray-600 mt-3 leading-7">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WRITE REVIEW */}
        <div>
          <div className="border rounded-2xl p-6 shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Write a Review
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#639922]"
              />

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#639922]"
              >
                <option value="5">★★★★★ Excellent</option>
                <option value="4">★★★★☆ Very Good</option>
                <option value="3">★★★☆☆ Good</option>
                <option value="2">★★☆☆☆ Average</option>
                <option value="1">★☆☆☆☆ Poor</option>
              </select>

              <textarea
                rows="5"
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#639922]"
              />

              <button
                type="submit"
                className="mt-5 bg-[#639922] hover:bg-green-700 text-white px-8 py-3 rounded-full transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}