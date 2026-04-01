import React from 'react';

const Hero = () => (
  <div className="relative min-h-[600px] lg:h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://madeinvilnius.lt/wp-content/uploads/2025/06/bolt-drive-automobilis-vw-id-buzz-5-scaled.jpg)' }}>
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 w-full pt-32">
      <div className="max-w-4xl mr-auto text-left">
        <div className="inline-block text-gray-300/80 text-xl font-bold mb-4 tracking-wide">
          Bolt Drive
        </div>
        <h1 className="text-5xl md:text-[80px] leading-[1.1] font-bold text-white mb-8 tracking-tight">
          Pourquoi conduire quand il y a Bolt ?
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl">
          Pas de vérifications de service, de formulaires d'assurance, de prix de carburant ou de frais de stationnement. Roulez dans des voitures neuves à des tarifs bas avec les locations de voitures Bolt Drive.
        </p>
        <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition shadow-lg inline-flex items-center transform hover:scale-[1.02] duration-200">
          Commencer à conduire
        </button>
      </div>
    </div>
  </div>
);

export default Hero;
