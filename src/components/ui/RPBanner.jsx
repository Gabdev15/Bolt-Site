import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { RP_DISCLAIMER } from '../../data/navigation';

const DURATION = 5000;

const RPBanner = () => {
  const [mounted, setMounted]   = useState(false);
  const [exiting, setExiting]   = useState(false);
  const [gone, setGone]         = useState(false);
  const [progress, setProgress] = useState(100);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => setGone(true), 220);
  };

  useEffect(() => {
    // rAF trick: let the browser paint the initial hidden state before transitioning in
    const frame = requestAnimationFrame(() => setMounted(true));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setProgress(0);
      const timer = setTimeout(dismiss, DURATION);
      return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
    }

    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.max(0, 1 - (Date.now() - start) / DURATION);
      setProgress(p * 100);
      if (p <= 0) { clearInterval(tick); dismiss(); }
    }, 50);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(tick);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="rp-banner fixed top-0 left-0 right-0 z-[200]"
      data-mounted={mounted}
      data-exiting={exiting}
    >
      <div className="bg-[#111] border-b border-white/10 text-white px-4 py-2.5 flex items-center gap-3 relative overflow-hidden">
        <AlertTriangle size={13} className="shrink-0 text-bolt-green" />
        <p className="flex-1 text-center text-xs font-medium text-white/70">
          {RP_DISCLAIMER.pre}<strong className="text-white font-semibold">{RP_DISCLAIMER.highlight}</strong>{RP_DISCLAIMER.post}
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 text-white/30 hover:text-white transition-colors duration-150 p-0.5 rounded-sm active:scale-95"
          aria-label="Fermer"
        >
          <X size={13} />
        </button>

        {/* Barre de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-bolt-green"
            style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
          />
        </div>
      </div>
    </div>
  );
};

export default RPBanner;
