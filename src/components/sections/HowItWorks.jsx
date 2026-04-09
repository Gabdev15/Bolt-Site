import React from 'react';
import { HOW_IT_WORKS } from '../../data/content';

const Step = ({ number, title, description, image }) => (
  <div className="group grid grid-cols-[72px_1fr] md:grid-cols-[140px_1fr_260px] gap-x-8 md:gap-x-12 gap-y-6 items-start py-10 md:py-14 border-t border-gray-200">

    {/* Number — typographic hero */}
    <div
      aria-hidden="true"
      className="text-7xl md:text-8xl font-black text-bolt-dark leading-none tracking-tighter select-none transition-colors duration-200 group-hover:text-bolt-green"
    >
      {String(number).padStart(2, '0')}
    </div>

    {/* Text */}
    <div className="pt-1">
      <h3 className="text-2xl md:text-4xl font-bold text-bolt-dark leading-tight tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
        {description}
      </p>
    </div>

    {/* Image — secondary, right column, desktop only */}
    <div className="hidden md:block row-span-1 self-center">
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover rounded-2xl"
      />
    </div>

  </div>
);

const HowItWorks = ({ onStartDriving = () => {} }) => {
  const { eyebrow, title, subtitle, cta, steps } = HOW_IT_WORKS;

  return (
    <section id="clients" className="bg-bolt-gray py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <span className="text-bolt-green font-bold text-xs tracking-[0.2em] uppercase mb-5 block">
              {eyebrow}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-bolt-dark tracking-tight leading-[0.95] mb-5">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-sm">
              {subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onStartDriving}
              className="inline-flex items-center gap-2.5 bg-bolt-green text-white font-bold text-base px-8 py-4 rounded-full transition-colors duration-150 hover:bg-bolt-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-green focus-visible:ring-offset-2"
            >
              {cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Steps ── */}
        <div>
          {steps.map(({ title: t, description, image }, i) => (
            <Step
              key={t}
              number={i + 1}
              title={t}
              description={description}
              image={image}
            />
          ))}
          {/* Closing border */}
          <div className="border-t border-gray-200" />
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
