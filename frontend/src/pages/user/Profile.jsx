import React, { useEffect } from 'react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = React.useState([]);

  useEffect(() => {
    // Fetch wishlist items
  }, []);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              {/* Wishlist item */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
