import React from 'react';
import { TESTIMONIAL } from '../../data/content';

const Testimonial = () => (
  <div id="chauffeurs" className="py-48 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={TESTIMONIAL.backgroundImage} className="w-full h-full object-cover" alt="Testimonial background" />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center text-white">
      <blockquote className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        {TESTIMONIAL.quote}
      </blockquote>
      <div className="font-bold text-2xl">{TESTIMONIAL.author}</div>
      <div className="opacity-90 mt-2 text-xl">{TESTIMONIAL.role}</div>
    </div>
  </div>
);

export default Testimonial;
