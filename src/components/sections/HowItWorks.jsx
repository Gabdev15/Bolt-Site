import React from 'react';

const Step = ({ number, title, description, image }) => (
  <div className="flex flex-col md:flex-row items-center gap-24 mb-32 last:mb-0">
    <div className={`w-full md:w-1/2 ${number % 2 === 0 ? 'md:order-2' : ''}`}>
      <img src={image} alt={title} className="rounded-[40px] w-full shadow-2xl" />
    </div>
    <div className={`w-full md:w-1/2 ${number % 2 === 0 ? 'md:order-1' : ''}`}>
      <div className="bg-[#EBF9F1] text-bolt-green font-bold w-16 h-16 rounded-full flex items-center justify-center mb-8 text-2xl">
        {number}
      </div>
      <h3 className="text-5xl font-bold mb-6 text-bolt-dark">{title}</h3>
      <p className="text-gray-500 text-2xl leading-relaxed">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => (
  <div id="clients" className="py-40 bg-[#F5F6F7]">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="mb-32">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bolt-dark">Commencer à conduire</h2>
        <p className="text-3xl text-gray-500 mb-12">Louez une voiture plus rapidement que trouver une place de parking.</p>
        <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition transform hover:scale-[1.02]">
          Commencer à conduire
        </button>
      </div>
      <div className="max-w-[1400px] mx-auto">
        <Step number={1} title="Créer un compte" description="Tout ce dont vous avez besoin est un permis de conduire valide et une carte de crédit." image="https://assets.cms.bolt.eu/Bolt_Drive_Media_13_d6f922ca54.webp" />
        <Step number={2} title="Trouver une voiture à proximité" description="Localisez une voiture en utilisant la carte de l'application ou en repérant une dans la rue." image="https://assets.cms.bolt.eu/Bolt_Drive_Media_12_b008054e3e.webp" />
        <Step number={3} title="Déverrouiller avec l'application" description="Tout ce dont vous avez besoin, c'est de votre téléphone pour entrer, les clés sont à l'intérieur." image="https://assets.cms.bolt.eu/Bolt_Drive_Media_11_e830d4118c.webp" />
        <Step number={4} title="Terminer votre trajet" description="Garez-vous, laissez la clé à l'intérieur et poursuivez votre journée." image="https://assets.cms.bolt.eu/Bolt_Drive_Media_10_e2c56e25dc.webp" />
      </div>
    </div>
  </div>
);

export default HowItWorks;
