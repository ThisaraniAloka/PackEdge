import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    // Fetch user orders
  }, [user?.id]);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg">
              {/* Order details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
