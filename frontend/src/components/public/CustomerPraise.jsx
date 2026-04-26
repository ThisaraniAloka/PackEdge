import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerPraise() {
  const testimonials = [
    {
      id: 1,
      author: 'Sarah Johnson',
      company: 'EcoShop',
      quote: 'PackEdge packaging is beautiful and truly eco-friendly. We switched our entire product line.',
      rating: 5,
      initials: 'SJ',
    },
    {
      id: 2,
      author: 'Mike Chen',
      company: 'Green Goods Co.',
      quote: 'Outstanding quality, fast shipping, and the team is incredibly helpful. Highly recommended!',
      rating: 5,
      initials: 'MC',
    },
    {
      id: 3,
      author: 'Lisa Rodriguez',
      company: 'Sustainable Goods',
      quote: 'The best sustainable packaging we\'ve found. Our customers love the unboxing experience.',
      rating: 5,
      initials: 'LR',
    },
  ];

  return (
    <section>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
          TESTIMONIALS
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
          What Our <span className="italic text-[#639922]">Customers Say</span>
        </h2>
        <p className="text-sm text-[#888] font-light max-w-xl mx-auto">
          Trusted by eco-conscious businesses across Sri Lanka and beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id}
            className="p-6 rounded-2xl border border-[#e4e4e0] bg-white"
            style={{ animation: `fadeUp 0.4s ease both ${i * 0.1}s` }}
          >
            <div className="flex gap-0.5 mb-2.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-[#EF9F27] text-sm">★</span>
              ))}
            </div>
            <p className="text-xs text-[#555] leading-relaxed italic font-playfair mb-2.5 flex-1">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-2 pt-2.5 border-t border-[#f0f0ee]">
              <div className="w-8 h-8 rounded-full bg-[#EAF3DE] flex items-center justify-center text-xs font-bold text-[#639922] flex-shrink-0">
                {testimonial.initials}
              </div>
              <div>
                <div className="text-xs font-medium text-[#1a1a1a]">
                  {testimonial.author}
                </div>
                <div className="text-[10px] text-[#aaa]">
                  {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bar */}
      <div className="relative rounded-2xl bg-[#1a1a1a] p-6 flex items-center justify-between flex-wrap gap-3 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="c-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#c-dots)"/>
        </svg>
        <div className="relative z-10">
          <div className="font-playfair text-lg font-bold text-white">
            Ready to <span className="italic text-[#97C459]">go green</span>?
          </div>
          <div className="text-xs text-white text-opacity-45 mt-1">
            Start your custom packaging journey today.
          </div>
        </div>
        <Link
          to="/categories"
          className="relative z-10 px-6 py-2.5 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition"
        >
          Get a free quote →
        </Link>
      </div>
    </section>
  );
}
