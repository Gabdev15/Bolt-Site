import React from 'react';
import { FR_FLAG } from '../../data/assets';
import { FOOTER_SECTIONS, RP_DISCLAIMER } from '../../data/navigation';

const Footer = () => (
  <footer className="bg-[#F5F6F7] pt-40 pb-20 border-t border-gray-200">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
        {FOOTER_SECTIONS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-bold mb-10 text-bolt-dark text-xl">{title}</h4>
            <ul className="space-y-6 text-lg text-gray-500 font-medium">
              {links.map(s => (
                <li key={s}><a href="#" className="hover:text-bolt-green">{s}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-gray-200 space-y-4">
        <p className="text-center text-bolt-dark font-bold text-sm">{RP_DISCLAIMER.pre}{RP_DISCLAIMER.highlight}{RP_DISCLAIMER.post}</p>
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
