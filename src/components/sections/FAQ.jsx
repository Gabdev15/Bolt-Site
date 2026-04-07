import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 py-10 last:border-0">
      <button
        className="w-full flex justify-between items-center text-left group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-3xl font-bold pr-12 text-white group-hover:text-bolt-green transition-colors duration-200">{question}</h3>
        <span
          className="faq-icon flex-shrink-0 bg-white/10 rounded-full p-2 group-hover:bg-bolt-green"
          data-open={isOpen || undefined}
        >
          <Plus size={24} className="text-white" />
        </span>
      </button>
      <div className="faq-content" data-open={isOpen || undefined} aria-hidden={!isOpen}>
        <div className="faq-content-inner">
          <div className="faq-answer mt-8 pb-2 text-gray-400 leading-relaxed max-w-4xl text-xl">{answer}</div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => (
  <div id="entreprise" className="py-40 bg-[#0E1010] text-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-5xl md:text-7xl font-bold mb-20">Foire aux questions</h2>
      {FAQ_ITEMS.map(({ question, answer }) => (
        <FAQItem key={question} question={question} answer={answer} />
      ))}
    </div>
  </div>
);

export default FAQ;
