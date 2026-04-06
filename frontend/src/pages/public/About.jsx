import React from 'react';
import SustainableStory from '../../components/public/SustainableStory';

export default function About() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">About PackEdge</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg text-gray-600 mb-4">
            PackEdge is committed to sustainable packaging solutions for eco-conscious businesses.
          </p>
          <p className="text-lg text-gray-600">
            Our mission is to reduce plastic waste and promote environmentally friendly alternatives.
          </p>
        </div>
        <SustainableStory />
      </div>
    </div>
  );
}
