import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState('Innovative');
  const words = ['Innovative', 'Sustainable', 'Eco-Friendly', 'Custom'];
  let wordIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      setCurrentWord(words[wordIndex]);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#EAF3DE] min-h-[400px] flex items-center justify-center p-14 text-center">
      {/* Decorative blobs */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-[rgba(99,153,34,0.12)]"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 rounded-full bg-[rgba(29,158,117,0.1)]"></div>

      {/* Dotted pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.13] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)"/>
      </svg>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
          CREATIVE PACKAGING CO.
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
          <span className="text-[#639922] italic transition-all duration-500 inline-block min-w-[200px]">{currentWord}</span>
          <br />
          Packaging Solutions
        </h1>
        <p className="text-sm text-[#555] font-light leading-relaxed max-w-md mx-auto mb-6">
          Empowering eco-conscious businesses with beautifully crafted, sustainable packaging that leaves a lasting impression — not a lasting footprint.
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap mb-6">
          <Link
            to="/categories"
            className="px-6 py-2.5 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition"
          >
            Explore Products →
          </Link>
          <button className="px-6 py-2.5 text-xs font-medium border border-[#639922] text-[#3B6D11] rounded-full hover:bg-[#639922] hover:text-white transition">
            Get in Touch
          </button>
        </div>
        <div className="flex gap-4 justify-center flex-wrap text-xs font-medium">
          <span className="text-[#639922] flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#639922] text-white text-[6px]">✓</span>
            ISO Certified
          </span>
          <span className="text-[#639922] flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#639922] text-white text-[6px]">✓</span>
            Carbon Neutral
          </span>
          <span className="text-[#639922] flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#639922] text-white text-[6px]">✓</span>
            Sri Lanka Made
          </span>
        </div>
      </div>
    </div>
  );
}
