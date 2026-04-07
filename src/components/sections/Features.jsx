import React from 'react';
import { FEATURES } from '../../data/content';

const Features = () => (
  <div id="produits" className="py-40 bg-[#0E1010] text-white">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="mb-32 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-bold mb-8">{FEATURES.title}</h2>
        <p className="text-3xl text-gray-400">{FEATURES.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-20">
        {FEATURES.items.map(({ title, description, image, alt }) => (
          <div key={title} className="group text-center md:text-left">
            <div className="mb-12 h-[500px] w-full flex items-center justify-center">
              <img src={image} alt={alt} className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
            </div>
            <h3 className="text-4xl font-bold mb-6">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-2xl">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Features;
