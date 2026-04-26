import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: '🌍',
      title: 'Environmental Responsibility',
      description: 'We minimize our ecological footprint at every stage of production.',
    },
    {
      icon: '💼',
      title: 'Quality Excellence',
      description: 'Premium materials and craftsmanship in every packaging solution.',
    },
    {
      icon: '🤝',
      title: 'Customer Focus',
      description: 'Your satisfaction and success is at the heart of everything we do.',
    },
    {
      icon: '🔬',
      title: 'Innovation',
      description: 'Continuously developing sustainable packaging technologies.',
    },
  ];

  const milestones = [
    { year: '1998', title: 'Founded', desc: 'PackEdge started with a vision for sustainable packaging' },
    { year: '2005', title: 'Certified', desc: 'Achieved ISO environmental certification' },
    { year: '2015', title: 'Expanded', desc: 'Opened regional distribution centers across Asia' },
    { year: '2024', title: 'Global Leader', desc: 'Now serving 50K+ businesses worldwide' },
  ];

  return (
    <div className="space-y-16 p-7 md:p-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
          OUR STORY
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          Building a <span className="italic text-[#639922]">Sustainable Future</span>
        </h1>
        <p className="text-sm text-[#888] font-light leading-relaxed mb-6">
          Since 1998, PackEdge has been at the forefront of sustainable packaging innovation. We believe that beautiful, 
          eco-friendly packaging should be accessible to every business, regardless of size. Our mission is to transform 
          the packaging industry by proving that sustainability and quality are not mutually exclusive.
        </p>
        <Link
          to="/categories"
          className="inline-block px-6 py-2.5 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition"
        >
          Explore Our Products →
        </Link>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#e4e4e0] bg-white p-8">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="font-playfair text-xl font-bold text-[#1a1a1a] mb-3">Our Mission</h3>
          <p className="text-sm text-[#555] leading-relaxed font-light">
            To empower eco-conscious businesses with premium sustainable packaging solutions that protect 
            products, reduce environmental impact, and inspire positive change in the packaging industry.
          </p>
        </div>
        <div className="rounded-2xl border border-[#e4e4e0] bg-white p-8">
          <div className="text-3xl mb-4">🌱</div>
          <h3 className="font-playfair text-xl font-bold text-[#1a1a1a] mb-3">Our Vision</h3>
          <p className="text-sm text-[#555] leading-relaxed font-light">
            A world where sustainable packaging is the standard, not the exception. Where every business 
            can make environmentally responsible choices without compromising on quality or design.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
            OUR VALUES
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            What Drives <span className="italic text-[#639922]">Our Commitment</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e4e4e0] bg-white p-6 hover:border-[#bbb] transition"
            >
              <div className="text-3xl mb-3">{value.icon}</div>
              <h3 className="font-playfair font-bold text-[#1a1a1a] mb-2">
                {value.title}
              </h3>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline/Milestones */}
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
            OUR JOURNEY
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            Key Milestones in Our <span className="italic text-[#639922]">History</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e4e4e0] bg-white p-6 text-center"
            >
              <div className="font-playfair text-2xl font-bold text-[#639922] mb-2">
                {milestone.year}
              </div>
              <h4 className="font-playfair font-bold text-[#1a1a1a] mb-2">
                {milestone.title}
              </h4>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                {milestone.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="relative rounded-2xl overflow-hidden bg-[#EAF3DE] p-10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-dots)"/>
        </svg>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
            OUR IMPACT
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            Making a <span className="italic text-[#639922]">Real Difference</span>
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <div className="font-playfair text-3xl font-bold text-[#639922] mb-2">1.2M</div>
              <p className="text-xs text-[#888] font-light">Trees Saved</p>
            </div>
            <div>
              <div className="font-playfair text-3xl font-bold text-[#639922] mb-2">94%</div>
              <p className="text-xs text-[#888] font-light">Recycling Rate</p>
            </div>
            <div>
              <div className="font-playfair text-3xl font-bold text-[#639922] mb-2">50K+</div>
              <p className="text-xs text-[#888] font-light">Customers Trust Us</p>
            </div>
          </div>
          
          <p className="text-sm text-[#555] font-light leading-relaxed mb-6">
            Through our sustainable packaging solutions, we've helped businesses reduce their carbon footprint 
            while delivering exceptional quality. Every box, wrap, and bag is a step toward a cleaner planet.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative rounded-2xl bg-[#1a1a1a] p-8 flex items-center justify-between flex-wrap gap-6 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-cta-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-cta-dots)"/>
        </svg>
        
        <div className="relative z-10">
          <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-2">
            Ready to Partner with <span className="italic text-[#97C459]">PackEdge</span>?
          </h3>
          <p className="text-xs text-white text-opacity-50">
            Join thousands of eco-conscious businesses making a difference.
          </p>
        </div>
        <Link
          to="/categories"
          className="relative z-10 px-6 py-2.5 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition whitespace-nowrap"
        >
          Start Your Journey →
        </Link>
      </div>
    </div>
  );
}
