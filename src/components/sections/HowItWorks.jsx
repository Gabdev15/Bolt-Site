import React from 'react';
import { HOW_IT_WORKS } from '../../data/content';

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

const HowItWorks = ({ onStartDriving = () => {} }) => (
  <div id="clients" className="py-40 bg-[#F5F6F7]">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <div className="mb-32">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-bolt-dark">{HOW_IT_WORKS.title}</h2>
        <p className="text-3xl text-gray-500 mb-12">{HOW_IT_WORKS.subtitle}</p>
        <button onClick={onStartDriving} className="bg-bolt-green text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#29a366] transition transform hover:scale-[1.02]">
          {HOW_IT_WORKS.cta}
        </button>
      </div>
      <div className="max-w-[1400px] mx-auto">
        {HOW_IT_WORKS.steps.map(({ title, description, image }, i) => (
          <Step key={title} number={i + 1} title={title} description={description} image={image} />
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
