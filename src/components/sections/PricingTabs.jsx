import React, { useState } from 'react';

const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-40 bg-[#F5F6F7]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-bolt-dark">Payez à la minute, à la journée, ou à la distance</h2>
          <p className="text-3xl text-gray-500 max-w-5xl">Tous les tarifs incluent l'assurance, le carburant, et le stationnement.</p>
        </div>
        <div className="flex border-b border-gray-300 mb-16">
          <button
            className={`pb-6 px-4 mr-12 font-bold text-2xl border-b-4 transition-colors ${activeTab === 0 ? 'border-bolt-dark text-bolt-dark' : 'border-transparent text-gray-500 hover:text-bolt-dark'}`}
            onClick={() => setActiveTab(0)}
          >
            Prépaiement
          </button>
          <button
            className={`pb-6 px-4 font-bold text-2xl border-b-4 transition-colors ${activeTab === 1 ? 'border-bolt-dark text-bolt-dark' : 'border-transparent text-gray-500 hover:text-bolt-dark'}`}
            onClick={() => setActiveTab(1)}
          >
            Locations longue durée
          </button>
        </div>
        <div className="bg-white rounded-[40px] p-12 md:p-20 shadow-sm">
          {activeTab === 0 && (
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-5xl font-bold mb-8 text-bolt-dark">Réservez et partez à tout moment</h3>
                <p className="text-2xl text-gray-500 mb-12">Payez à la minute ou au kilomètre et conduisez aussi longtemps et aussi loin que vous le souhaitez.</p>
                <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition">
                  Commencer dès maintenant
                </button>
              </div>
              <div className="order-first md:order-last">
                <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_16_f6e3c84092.webp" alt="Prepayment" className="w-full rounded-[32px]" />
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-5xl font-bold mb-8 text-bolt-dark">Réservez jusqu'à 30 jours à l'avance</h3>
                <p className="text-2xl text-gray-500 mb-12">Payez un tarif fixe pour le nombre exact d'heures ou de jours pendant lesquels vous avez besoin de conduire.</p>
                <button className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition">
                  Commencer dès maintenant
                </button>
              </div>
              <div className="order-first md:order-last">
                <img src="https://assets.cms.bolt.eu/Bolt_Drive_Media_15_8a3be56ca6.webp" alt="Long Term" className="w-full rounded-[32px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingTabs;
