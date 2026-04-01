import React from 'react';

const CarType = ({ title, desc, img }) => (
  <div className="group cursor-pointer">
    <div className="h-[400px] bg-gray-100 rounded-[32px] mb-8 overflow-hidden relative">
      <img src={img} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
    </div>
    <h3 className="text-3xl font-bold mb-3 text-bolt-dark">{title}</h3>
    <p className="text-gray-500 text-xl">{desc}</p>
  </div>
);

const VehicleTypes = () => (
  <div id="flottes" className="py-40 bg-white">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bolt-dark">Louez la voiture qu'il vous faut</h2>
        <p className="text-3xl text-gray-500 max-w-5xl">Petite ou grande, économique ou premium. Toutes les voitures sont entièrement assurées, avec le plein et prêtes à rouler.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        <CarType title="Voitures de tous les jours" desc="Quand vous avez juste besoin de roues." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_8_b36cd35d7b.webp" />
        <CarType title="SUVs" desc="Quand vous avez besoin de sièges supplémentaires." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_7_30e438e9a1.webp" />
        <CarType title="Vans et camions" desc="Quand vous avez du cargo à transporter." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_6_c5c718bad6.webp" />
        <CarType title="Voitures de luxe" desc="Quand vous voulez conduire avec style." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_5_0cbbe86e4e.webp" />
        <CarType title="Voitures de tiers" desc="Louez en quelques minutes avec Bolt Drive." img="https://assets.cms.bolt.eu/Bolt_Drive_Media_4_1e03231590.webp" />
      </div>
    </div>
  </div>
);

export default VehicleTypes;
