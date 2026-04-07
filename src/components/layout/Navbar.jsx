import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { BOLT_LOGO_WHITE, FR_FLAG } from '../../data/assets';
import { NAV_LINKS } from '../../data/navigation';
import { AUTH_LABELS } from '../../data/auth';

const Navbar = ({ onSignIn, onDashboard, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-bolt-dark/95 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex justify-between h-24 items-center">
            <a href="#">
              <img src={BOLT_LOGO_WHITE} alt="Bolt" className="h-8" />
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-8">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} className="text-white font-bold text-sm hover:text-bolt-green transition-colors">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-sm font-bold bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm">
                  <img src={FR_FLAG} alt="FR" className="w-5 h-auto mr-2 rounded-sm" />
                  <span>FR</span>
                </button>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-sm">{user.displayName || user.email}</span>
                    <button onClick={onDashboard} className="bg-bolt-green text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#29a366] transition shadow-sm">
                      {AUTH_LABELS.driveCta}
                    </button>
                    <button onClick={() => signOut(auth)} className="bg-white/10 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition border border-white/20">
                      {AUTH_LABELS.logout}
                    </button>
                  </div>
                ) : (
                  <button onClick={onSignIn} className="bg-white text-bolt-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition shadow-sm">
                    {AUTH_LABELS.signup}
                  </button>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white bg-white/10 p-2 rounded-full">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - rendered outside nav to avoid z-index issues */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 mobile-menu">
          <div className={`bg-bolt-dark w-full h-screen overflow-y-auto px-6 pb-6 border-t border-gray-800 ${isScrolled ? 'pt-20' : 'pt-24'}`}>
            {/* Close button */}
            <div className="flex justify-end mb-6">
              <button onClick={() => setIsOpen(false)} className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setIsOpen(false)} className="block text-2xl font-bold text-white">
                  {label}
                </a>
              ))}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-white font-bold text-lg">{user.displayName || user.email}</p>
                    <button onClick={() => { onDashboard(); setIsOpen(false); }} className="w-full bg-bolt-green text-white px-6 py-4 rounded-full font-bold text-lg">
                      {AUTH_LABELS.driveCta}
                    </button>
                    <button onClick={() => signOut(auth)} className="w-full bg-white/10 text-white px-6 py-4 rounded-full font-bold text-lg border border-white/20">
                      {AUTH_LABELS.logout}
                    </button>
                  </div>
                ) : (
                  <button onClick={onSignIn} className="w-full bg-white text-bolt-dark px-6 py-4 rounded-full font-bold text-lg">
                    {AUTH_LABELS.signup}
                  </button>
                )}
                <div className="flex items-center justify-between text-white">
                  <button className="flex items-center text-sm font-bold bg-white/10 px-4 py-2 rounded-full">
                    <img src={FR_FLAG} alt="FR" className="w-5 h-auto mr-2 rounded-sm" />
                    <span>FR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
