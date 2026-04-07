import React, { useState, useRef, useEffect } from 'react';

const TABS = [
  {
    label: 'Prépaiement',
    title: 'Réservez et partez à tout moment',
    desc: 'Payez à la minute ou au kilomètre et conduisez aussi longtemps et aussi loin que vous le souhaitez.',
    img: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_16_f6e3c84092.webp',
    alt: 'Prepayment',
  },
  {
    label: 'Locations longue durée',
    title: "Réservez jusqu'à 30 jours à l'avance",
    desc: "Payez un tarif fixe pour le nombre exact d'heures ou de jours pendant lesquels vous avez besoin de conduire.",
    img: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_15_8a3be56ca6.webp',
    alt: 'Long Term',
  },
];

const PricingTabs = ({ onStartDriving }) => {
  const [activeTab, setActiveTab] = useState(0);
  const btnRefs = useRef([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updatePillPosition = () => {
      const btn = btnRefs.current[activeTab];
      if (btn) {
        setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
      }
    };

    // Calculate on mount and when activeTab changes
    updatePillPosition();

    // Recalculate on window resize and orientation change
    window.addEventListener('resize', updatePillPosition);
    window.addEventListener('orientationchange', updatePillPosition);

    return () => {
      window.removeEventListener('resize', updatePillPosition);
      window.removeEventListener('orientationchange', updatePillPosition);
    };
  }, [activeTab]);

  return (
    <div className="py-40 bg-[#F5F6F7]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-bolt-dark">Payez à la minute, à la journée, ou à la distance</h2>
          <p className="text-3xl text-gray-500 max-w-5xl">Tous les tarifs incluent l'assurance, le carburant, et le stationnement.</p>
        </div>

        {/* Tab bar — segmented slider */}
        <div className="inline-flex bg-gray-200 rounded-full p-1.5 mb-16 relative">
          {/* Sliding pill */}
          <span
            className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
            style={{ left: pillStyle.left, width: pillStyle.width }}
          />
          {TABS.map((tab, i) => (
            <button
              key={i}
              ref={el => (btnRefs.current[i] = el)}
              onClick={() => setActiveTab(i)}
              className={`relative z-10 px-8 py-3 font-bold text-lg rounded-full transition-colors duration-300 whitespace-nowrap ${
                activeTab === i ? 'text-bolt-dark' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {TABS.map((tab, i) => (
              <div
                key={i}
                className="min-w-full p-12 md:p-20 grid md:grid-cols-2 gap-20 items-center"
                aria-hidden={activeTab !== i}
              >
                <div>
                  <h3 className="text-5xl font-bold mb-8 text-bolt-dark">{tab.title}</h3>
                  <p className="text-2xl text-gray-500 mb-12">{tab.desc}</p>
                  <button
                    onClick={onStartDriving}
                    className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition"
                    tabIndex={activeTab !== i ? -1 : 0}
                  >
                    Commencer dès maintenant
                  </button>
                </div>
                <div className="order-first md:order-last">
                  <img src={tab.img} alt={tab.alt} className="w-full rounded-[32px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingTabs;