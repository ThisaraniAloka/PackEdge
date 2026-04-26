import React from 'react';

export default function SustainableStory() {
  const items = [
    { icon: '♻️', text: '100% recyclable and biodegradable materials in every product' },
    { icon: '🌍', text: 'Reduces your carbon footprint by up to 40%' },
    { icon: '🏅', text: 'Certified by international eco-standards organisations' },
    { icon: '🌱', text: 'Active support for reforestation projects across Sri Lanka' },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#EAF3DE] p-10">
      {/* Dotted pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sus-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#639922"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sus-dots)"/>
      </svg>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#888] border border-[#ccc] rounded-full px-3 py-1 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#639922]"></span>
            OUR MISSION
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
            Committed to a <span className="italic text-[#639922]">Greener Future</span>
          </h2>
          <p className="text-sm text-[#888] font-light mb-6">
            Every box, wrap, and bag we produce is a step toward a cleaner planet.
          </p>
          <div className="flex flex-col gap-2.5">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white bg-opacity-70 border border-[rgba(99,153,34,0.2)]"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm flex-shrink-0 border border-[rgba(99,153,34,0.2)]">
                  {item.icon}
                </div>
                <p className="text-xs text-[#3B6D11] leading-relaxed pt-1">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-2.5">
          <div className="rounded-2xl bg-white border border-[rgba(99,153,34,0.25)] p-6 text-center">
            <div className="text-4xl mb-2">🌿</div>
            <div className="font-playfair text-2xl font-bold text-[#27500A] mb-1">
              Since 1998
            </div>
            <div className="text-xs text-[#639922]">
              Crafting sustainable packaging
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl bg-white border border-[rgba(99,153,34,0.25)] p-3 text-center">
              <div className="font-playfair text-xl font-bold text-[#639922]">
                40%
              </div>
              <div className="text-xs text-[#777] mt-1">
                Less carbon emissions
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-[rgba(99,153,34,0.25)] p-3 text-center">
              <div className="font-playfair text-xl font-bold text-[#639922]">
                Zero
              </div>
              <div className="text-xs text-[#777] mt-1">
                Plastic waste policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
