import React from 'react';

const Testimonial = () => (
  <div id="chauffeurs" className="py-48 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_9_e2fbc8e66e.webp" className="w-full h-full object-cover" alt="Testimonial background" />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center text-white">
      <blockquote className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        « Je trouve que l'application est aussi assez intuitive. J'aime beaucoup le compteur qui montre pendant que vous conduisez combien vous dépensez, ce que les autres applications n'ont pas. »
      </blockquote>
      <div className="font-bold text-2xl">Nikhil (Berlin)</div>
      <div className="opacity-90 mt-2 text-xl">Utilisateur de Bolt Drive</div>
    </div>
  </div>
);

export default Testimonial;
