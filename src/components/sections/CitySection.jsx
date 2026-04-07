import React from 'react';
import { CITY_SECTION } from '../../data/content';

const CitySection = ({ onStartDriving }) => (
  <div className="relative py-48 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${CITY_SECTION.backgroundImage})` }}>
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{CITY_SECTION.title}</h2>
        <p className="text-xl text-gray-200 mb-10 leading-relaxed">{CITY_SECTION.description}</p>
        <button onClick={onStartDriving} className="bg-bolt-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#29a366] transition shadow-lg inline-flex items-center">
          {CITY_SECTION.cta}
        </button>
      </div>
    </div>
  </div>
);

export default CitySection;
