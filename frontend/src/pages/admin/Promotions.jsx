import React from 'react';
import PromotionTable from '../../components/admin/PromotionTable';

export default function Promotions() {
  const [promotions, setPromotions] = React.useState([]);

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Promotions</h1>
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          New Promotion
        </button>
      </div>
      <PromotionTable promotions={promotions} />
    </div>
  );
}
