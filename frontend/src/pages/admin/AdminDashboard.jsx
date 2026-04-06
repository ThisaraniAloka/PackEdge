import React from 'react';
import StatsCard from '../../components/admin/StatsCard';
import EngagementChart from '../../components/admin/EngagementChart';
import RevenueChart from '../../components/admin/RevenueChart';
import ProductUpdatesFeed from '../../components/admin/ProductUpdatesFeed';

export default function AdminDashboard() {
  return (
    <div className="py-8 space-y-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Products" value="150" />
        <StatsCard label="Total Users" value="1,250" />
        <StatsCard label="Engagement Score" value="94%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart />
        <RevenueChart />
      </div>

      <ProductUpdatesFeed />
    </div>
  );
}
