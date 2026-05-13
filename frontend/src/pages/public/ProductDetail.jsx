import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../../data/products';

export default function ProductDetail() {
  const { id } = useParams();

  // FIND PRODUCT
  const product = products.find((p) => p.id === Number(id));

  // MAIN IMAGE STATE
  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || product?.img
  );

  // IMAGE ZOOM POSITION
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div>

          {/* MAIN IMAGE */}
          <div
            className="
              bg-gray-100
              rounded-2xl
              overflow-hidden
              shadow-md
              relative
              cursor-zoom-in
            "
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
              className="
                w-full
                h-[450px]
                object-cover
                transition-transform
                duration-300
                hover:scale-150
              "
              style={{
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            />

          </div>

          {/* THUMBNAIL IMAGES */}
          <div className="grid grid-cols-4 gap-4 mt-4">

            {product.images?.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                className={`
                  cursor-pointer
                  border-2
                  rounded-xl
                  overflow-hidden
                  transition
                  ${
                    mainImage === image
                      ? 'border-[#639922]'
                      : 'border-gray-200'
                  }
                `}
              >

                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="
                    w-full
                    h-24
                    object-cover
                    hover:opacity-80
                  "
                />

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div>

          <p className="text-sm text-[#639922] font-semibold uppercase">
            Premium Packaging
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-[#639922] mt-4">
            LKR {product.price}
          </p>

          <p className="text-gray-600 leading-8 mt-6">
            {product.description}
          </p>

          {/* PRODUCT DETAILS */}
          <div className="mt-8 space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Material
              </span>

              <span className="text-gray-600">
                {product.material}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Size
              </span>

              <span className="text-gray-600">
                {product.size}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Stock
              </span>

              <span className="text-gray-600">
                {product.stock} Available
              </span>
            </div>

          </div>

          {/* FEATURES */}
          <div className="mt-8 space-y-3">

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#639922] rounded-full"></span>

              <p className="text-gray-700">
                High quality material
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#639922] rounded-full"></span>

              <p className="text-gray-700">
                Eco-friendly packaging
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#639922] rounded-full"></span>

              <p className="text-gray-700">
                Fast delivery available
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button
              className="
                bg-[#639922]
                hover:bg-green-700
                text-white
                px-8
                py-3
                rounded-full
                transition
              "
            >
              Add to Cart
            </button>

            <button
              className="
                border
                border-[#639922]
                text-[#639922]
                px-8
                py-3
                rounded-full
                hover:bg-[#639922]
                hover:text-white
                transition
              "
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}