import React from 'react';
import { Lock } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { VEHICLE_TYPES } from '../../data/content';

const VehicleCard = ({ vehicle }) => (
  <div className="group flex flex-col">
    {/* Image area */}
    <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-5 flex items-center justify-center h-[460px]">
      {vehicle.locked && (
        <div className="absolute inset-0 bg-white/30 z-10" />
      )}
      <img
        src={vehicle.img}
        alt={vehicle.name}
        className={`w-4/5 object-contain transition-transform duration-500 group-hover:scale-105 ${vehicle.locked ? 'grayscale opacity-50' : ''}`}
      />
      {vehicle.locked && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full z-20">
          <Lock size={10} />
          Prochainement
        </span>
      )}
      {!vehicle.locked && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white text-gray-500 text-xs px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-bolt-green" />
          Disponible
        </span>
      )}
    </div>

    {/* Info */}
    <div className="flex flex-col gap-1 px-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{vehicle.category}</span>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-bold text-bolt-dark">{vehicle.name}</h3>
        {!vehicle.locked && (
          <span className="text-lg font-bold text-bolt-dark">${vehicle.price}<span className="text-sm font-normal text-gray-400">/heure</span></span>
        )}
      </div>
      <p className="text-gray-400 text-sm">{vehicle.desc}</p>
    </div>
  </div>
);

const VehicleTypes = () => (
  <div id="flottes" className="py-32 bg-white">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-bolt-dark leading-tight">
          {VEHICLE_TYPES.title}
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl">
          {VEHICLE_TYPES.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {VEHICLES.map(v => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  </div>
);

export default VehicleTypes;
