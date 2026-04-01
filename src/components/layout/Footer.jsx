import React from 'react';

const FR_FLAG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K";

const Footer = () => (
  <footer className="bg-[#F5F6F7] pt-40 pb-20 border-t border-gray-200">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Services</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            {['Trajets','Trottinettes','Vélos électriques','Bolt Drive','Bolt Food','Bolt Market','Bolt Business','Bolt Plus'].map(s => (
              <li key={s}><a href="#" className="hover:text-bolt-green">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Générer des revenus</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            {['Chauffeurs partenaires','Livraison Bolt','Commerçants','L\'équipe Bolt','Bolt Franchise'].map(s => (
              <li key={s}><a href="#" className="hover:text-bolt-green">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Entreprise</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            {['À propos','Carrières','Durabilité','Presse','Blog','Lignes directrices de marque'].map(s => (
              <li key={s}><a href="#" className="hover:text-bolt-green">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-10 text-bolt-dark text-xl">Support</h4>
          <ul className="space-y-6 text-lg text-gray-500 font-medium">
            {['Clients','Chauffeur','Livreur','Flottes','Restaurants'].map(s => (
              <li key={s}><a href="#" className="hover:text-bolt-green">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-200 space-y-4">
        <p className="text-center text-bolt-dark font-bold text-sm">
          ⚠️ Ce site est un projet RP uniquement — il ne représente pas le vrai site de l'entreprise Bolt et n'y est pas affilié.
        </p>
        <div className="flex justify-end">
          <button className="flex items-center text-lg font-bold bg-white border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50">
            <img src={FR_FLAG} alt="FR" className="w-6 h-auto mr-2 rounded-sm" />
            <span>FR</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
