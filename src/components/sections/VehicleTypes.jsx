import React, { useEffect, useRef, useState } from 'react';
import { VEHICLE_TYPES } from '../../data/content';

const FLEET_IMAGE = 'https://assets.cms.bolt.eu/Index_DT_Media_08_2b9a617d79.webp';

const VehicleTypes = ({ onStartDriving }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="flottes" className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div
          ref={ref}
          className={`absolute inset-0 transition-all duration-[1100ms] ease-out overflow-hidden ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.99] rounded-[4rem]'
          }`}
        >
          <img
            src={FLEET_IMAGE}
            alt="Flotte Bolt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-1/2 bottom-32 -translate-x-1/2 px-4">
            <button
              onClick={onStartDriving}
              className="inline-flex items-center gap-3 bg-bolt-green text-white font-bold text-lg px-12 py-5 rounded-full transition-all duration-150 hover:bg-bolt-green-dark shadow-lg shadow-bolt-green/30"
            >
              Réserver maintenant
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-32 text-center text-white">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {VEHICLE_TYPES.title}
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            {VEHICLE_TYPES.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypes;
