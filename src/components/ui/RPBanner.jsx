import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { RP_DISCLAIMER } from '../../data/navigation';

const RPBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone]       = useState(false);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => setGone(true), 220);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(dismiss, 3000);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, []);

  if (gone) return null;

  return (
    <div
      className="rp-banner fixed top-0 left-0 right-0 z-[200]"
      data-mounted={mounted}
      data-exiting={exiting}
    >
      <div className="bg-bolt-dark px-6 py-1.5 flex items-center relative">
        <p className="flex-1 text-center text-[11px] text-white/50">
          {RP_DISCLAIMER.pre}
          <span className="text-white/75">{RP_DISCLAIMER.highlight}</span>
          {RP_DISCLAIMER.post}
        </p>
        <button
          onClick={dismiss}
          className="absolute right-4 text-white/25 hover:text-white/60 transition-colors duration-150"
          aria-label="Fermer"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default RPBanner;
