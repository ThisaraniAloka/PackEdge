import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryProducts() {
  const { id } = useParams();
  const categoryId = Number(id);

  // 🟢 CATEGORY DATA
  const categories = [
    { id: 1, name: 'Corrugated Boxes' },
    { id: 2, name: 'Eco-Friendly Wraps' },
    { id: 3, name: 'Gift Packaging' },
    { id: 4, name: 'Food Containers' },
    { id: 5, name: 'Industrial Packing' },
    { id: 6, name: 'Custom Branded' },
  ];

  const category = categories.find((c) => c.id === categoryId);

 const products = [
  // CATEGORY 1 - Corrugated Boxes
  { id: 1, name: 'Premium Corrugated Box', price: 'LKR 1200', img: 'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg', categoryId: 1 },
  { id: 2, name: 'Heavy Duty Shipping Box', price: 'LKR 1500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s', categoryId: 1 },
  { id: 3, name: 'Double Wall Storage Box', price: 'LKR 1800', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s', categoryId: 1 },

  // CATEGORY 2 - Eco Wraps
  { id: 4, name: 'Eco Kraft Wrap Roll', price: 'LKR 800', img: 'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg', categoryId: 2 },
  { id: 5, name: 'Recycled Paper Sheets', price: 'LKR 950', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s', categoryId: 2 },
  { id: 6, name: 'Biodegradable Wrap Pack', price: 'LKR 1100', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s', categoryId: 2 },

  // CATEGORY 3 - Gift Packaging
  { id: 7, name: 'Luxury Gift Box Set', price: 'LKR 2000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s', categoryId: 3 },
  { id: 8, name: 'Premium Ribbon Pack', price: 'LKR 900', img: 'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg', categoryId: 3 },
  { id: 9, name: 'Decorative Gift Bag Set', price: 'LKR 1300', img: 'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp', categoryId: 3 },

  // CATEGORY 4 - Food Containers
  { id: 10, name: 'Food Grade Container Pack', price: 'LKR 1400', img: 'https://image.made-in-china.com/202f0j00trDbkocBqfzU/Disposable-Recycle-Food-Grade-Container-Packaging-Brown-Fast-Food-Take-Away-Kraft-Paper-Food-Lunch-Box.webp', categoryId: 4 },
  { id: 11, name: 'Disposable Lunch Boxes', price: 'LKR 1000', img: 'https://pettahonline.com/cdn/shop/products/Box_large.png?v=1576393649', categoryId: 4 },

  // CATEGORY 5 - Industrial Packing
  { id: 12, name: 'Industrial Pallet Wrap', price: 'LKR 3000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSH0jmPTNC8oVrBZipZkUw0pARjdFQJt3d8A&s', categoryId: 5 },
  { id: 13, name: 'Heavy Duty Bulk Bags', price: 'LKR 2500', img: 'https://lewismfg.com/wp-content/uploads/Lewis-Bulk-Bag_700.jpg', categoryId: 5 },

  // CATEGORY 6 - Custom Branded
  { id: 14, name: 'Custom Printed Box', price: 'LKR 2200', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6h_eJZ3ajR8JQVu4uRwAJE6-wphpMws__qg&s', categoryId: 6 },
  { id: 15, name: 'Branded Packaging Kit', price: 'LKR 2800', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmuENWmHy1UhFzL5ENfdAFOU58kpHf0EkTcw&s', categoryId: 6 },
];


  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const categoryProducts = products.filter(
    (p) => p.categoryId === categoryId
  );

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, sort, categoryProducts]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {category ? category.name : 'Category'} Products
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore premium packaging solutions
        </p>
      </div>

      {/* SEARCH + FILTER (FORCED ONE ROW) */}
      <div className="flex flex-row items-center gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#639922]"
        />

        {/* FILTER */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-48 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#639922]"
        >
          <option value="default">Sort by Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products found 
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>

                <p className="text-[#639922] font-bold mt-2">
                  LKR {p.price}
                </p>

                <Link
                  to={`/products/${p.id}`}
                  className="inline-block mt-4 text-sm font-medium text-white bg-[#639922] px-4 py-2 rounded-full hover:bg-green-700 transition"
                >
                  View Product →
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
