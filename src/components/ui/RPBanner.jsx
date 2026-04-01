import React, { useState } from 'react';
import { X } from 'lucide-react';

const RPBanner = () => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-bolt-green text-white px-4 py-3 flex items-center justify-between gap-4 shadow-md">
      <div className="flex-1 text-center text-sm font-medium">
        ⚠️ Ce site est un projet <strong>RP uniquement</strong> — il ne représente pas le vrai site de l'entreprise Bolt et n'y est pas affilié.
      </div>
      <button onClick={() => setVisible(false)} className="shrink-0 text-white/80 hover:text-white transition" aria-label="Fermer">
        <X size={18} />
      </button>
    </div>
  );
};

export default RPBanner;
