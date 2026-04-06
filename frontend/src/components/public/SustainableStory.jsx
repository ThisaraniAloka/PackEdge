import React from 'react';

export default function SustainableStory() {
  return (
    <section className="py-12 bg-green-50 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our Commitment to Sustainability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Why Choose PackEdge?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>100% recyclable and biodegradable materials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Reduces carbon footprint by 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Certified by international eco-standards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Support for reforestation projects</span>
              </li>
            </ul>
          </div>
          <div>
            <img src="/assets/hero.png" alt="Sustainability" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
