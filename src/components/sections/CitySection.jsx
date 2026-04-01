import React from 'react';

const CitySection = () => (
  <div className="relative py-48 bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(https://assets.cms.bolt.eu/Bolt_Drive_Media_18_2312b11f16.webp)' }}>
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Bolt Drive dans votre ville</h2>
        <p className="text-xl text-gray-200 mb-10 leading-relaxed">Consultez l'application pour trouver des parkings gratuits, des bornes de recharge et plus encore.</p>
        <button className="bg-bolt-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#29a366] transition shadow-lg inline-flex items-center">
          Ouvrir Bolt
        </button>
      </div>
    </div>
  </div>
);

export default CitySection;
