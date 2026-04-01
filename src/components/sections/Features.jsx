import React from 'react';

const Features = () => (
  <div id="produits" className="py-40 bg-[#0E1010] text-white">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="mb-32 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-bold mb-8">Location à la demande</h2>
        <p className="text-3xl text-gray-400">Payez pour le temps et la distance parcourus, rien de plus.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-20">
        <div className="group text-center md:text-left">
          <div className="mb-12 h-[500px] w-full flex items-center justify-center">
            <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_2_24b4eed746.webp" alt="Minutes" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
          </div>
          <h3 className="text-4xl font-bold mb-6">Rouler pour quelques minutes</h3>
          <p className="text-gray-400 leading-relaxed text-2xl">Réservez une voiture, déverrouillez-la avec votre téléphone, et payez pour le temps ou la distance parcourue.</p>
        </div>
        <div className="group text-center md:text-left">
          <div className="mb-12 h-[500px] w-full flex items-center justify-center">
            <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_1_fc24e16faf.webp" alt="Days" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
          </div>
          <h3 className="text-4xl font-bold mb-6">Rouler pour plusieurs jours</h3>
          <p className="text-gray-400 leading-relaxed text-2xl">Louez à long terme, payez un tarif fixe affiché à l'avance, et réservez jusqu'à 30 jours à l'avance.</p>
        </div>
        <div className="group text-center md:text-left">
          <div className="mb-12 h-[500px] w-full flex items-center justify-center">
            <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_3_a55319cc15.webp" alt="Parking" className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" />
          </div>
          <h3 className="text-4xl font-bold mb-6">Stationner gratuitement</h3>
          <p className="text-gray-400 leading-relaxed text-2xl">Pas de frais dans les zones désignées, que vous fassiez une pause ou terminiez votre trajet.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
