import React, { useMemo, useState } from 'react';
import { Lock, Users, Gauge, Cog, ArrowRight, Sparkles } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { VEHICLE_TYPES } from '../../data/content';

const CATEGORY_STYLES = {
  'Citadine':    'bg-sky-50 text-sky-700',
  'Électrique':  'bg-emerald-50 text-emerald-700',
  'Hybride':     'bg-lime-50 text-lime-700',
  'Luxe':        'bg-amber-50 text-amber-800',
};

const VehicleCard = ({ vehicle }) => {
  const isAvailable = !vehicle.locked;
  const categoryClass = CATEGORY_STYLES[vehicle.category] ?? 'bg-gray-100 text-gray-600';

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center h-[360px]">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-bolt-green/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
          <span className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryClass}`}>
            {vehicle.category}
          </span>
          {vehicle.tag && isAvailable && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-bolt-dark bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles size={11} className="text-bolt-green" />
              {vehicle.tag}
            </span>
          )}
        </div>

        {vehicle.locked && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10" />
        )}

        <img
          src={vehicle.img}
          alt={vehicle.name}
          className={`relative w-4/5 object-contain transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1 ${vehicle.locked ? 'grayscale opacity-60' : ''}`}
        />

        {/* Status pill */}
        <span className={`absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${isAvailable ? 'bg-white text-gray-700 shadow-sm' : 'bg-white/90 text-gray-400'}`}>
          {isAvailable ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bolt-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bolt-green" />
              </span>
              Disponible
            </>
          ) : (
            <>
              <Lock size={10} />
              Prochainement
            </>
          )}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-bolt-dark leading-tight">{vehicle.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{vehicle.desc}</p>
          </div>
          {isAvailable && (
            <div className="text-right shrink-0">
              <div className="text-xl font-bold text-bolt-dark leading-none">${vehicle.price}</div>
              <div className="text-xs text-gray-400 mt-1">/heure</div>
            </div>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span>{vehicle.seats} places</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog size={14} className="text-gray-400" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={14} className="text-gray-400" />
            <span>{vehicle.range}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          disabled={!isAvailable}
          className={`mt-1 flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            isAvailable
              ? 'bg-bolt-dark text-white hover:bg-bolt-green'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Réserver' : 'Bientôt disponible'}
          {isAvailable && <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
        </button>
      </div>
    </div>
  );
};

const VehicleTypes = () => {
  const categories = useMemo(
    () => ['Tous', ...Array.from(new Set(VEHICLES.map(v => v.category)))],
    []
  );
  const [active, setActive] = useState('Tous');

  const filtered = active === 'Tous' ? VEHICLES : VEHICLES.filter(v => v.category === active);
  const availableCount = VEHICLES.filter(v => !v.locked).length;

  return (
    <div id="flottes" className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bolt-green mb-4">
              <span className="w-6 h-[2px] bg-bolt-green" />
              Notre flotte
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-bolt-dark leading-tight">
              {VEHICLE_TYPES.title}
            </h2>
            <p className="text-xl text-gray-500">
              {VEHICLE_TYPES.subtitle}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bolt-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bolt-green" />
            </span>
            <span className="font-semibold text-bolt-dark">{availableCount}</span> véhicule{availableCount > 1 ? 's' : ''} disponible{availableCount > 1 ? 's' : ''}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-bolt-dark text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-gray-200 hover:text-bolt-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(v => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleTypes;
