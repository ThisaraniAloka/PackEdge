import React from 'react';

export default function PromotionTable({ promotions }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Discount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{promo.name}</td>
              <td className="px-6 py-3">{promo.discount}%</td>
              <td className="px-6 py-3">{promo.startDate}</td>
              <td className="px-6 py-3">{promo.endDate}</td>
              <td className="px-6 py-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
