import React from 'react';
import HeroSection from '../../components/public/HeroSection';
import StatsBar from '../../components/public/StatsBar';
import CategoryGrid from '../../components/public/CategoryGrid';
import SustainableStory from '../../components/public/SustainableStory';
import CustomerPraise from '../../components/public/CustomerPraise';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <StatsBar />
      <CategoryGrid />
      <SustainableStory />
      <CustomerPraise />
    </div>
  );
}
