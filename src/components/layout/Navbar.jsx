import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const BOLT_LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4yNjIgMHYzMC4wNzRoLTcuMTM2VjEuNTA0TDU1LjI2MiAwek0zNC45NDUgMzIuOTI0YzEuOTcgMCAzLjU2OCAxLjU4NCAzLjU2OCAzLjUzOCAwIDEuOTU0LTEuNTk4IDMuNTM4LTMuNTY4IDMuNTM4cy0zLjU2OC0xLjU4NC0zLjU2OC0zLjUzOGMwLTEuOTU0IDEuNTk3LTMuNTM4IDMuNTY4LTMuNTM4em0wLTI0LjM4M2M2LjA3NSAwIDExLjAxIDQuODg0IDExLjAxIDEwLjkxOCAwIDYuMDM1LTQuOTM1IDEwLjkyLTExLjAxIDEwLjkyLTYuMDg1IDAtMTEuMDEtNC44ODUtMTEuMDEtMTAuOTIgMC02LjAzNCA0LjkzNS0xMC45MTggMTEuMDEtMTAuOTE4em0wIDE0LjQ1NmMxLjk3MiAwIDMuNTY4LTEuNTgyIDMuNTY4LTMuNTM4IDAtMS45NTUtMS41OTYtMy41MzgtMy41NjgtMy41MzhzLTMuNTY4IDEuNTgzLTMuNTY4IDMuNTM4YzAgMS45NTYgMS41OTYgMy41MzggMy41NjggMy41Mzh6bS0yMi40NDggMGMxLjIzIDAgMi4yMy0uOTkyIDIuMjMtMi4yMWEyLjIyNCAyLjIyNCAwIDAwLTIuMjMtMi4yMTJINy4xNDZ2NC40MjJoNS4zNTF6TTcuMTQ2IDcuMDc3djQuNDIyaDMuOTY0YzEuMjI5IDAgMi4yMy0uOTkzIDIuMjMtMi4yMTJhMi4yMjQgMi4yMjQgMCAwMC0yLjIzLTIuMjFINy4xNDZ6bTExLjkyMiA3LjA5NWMxLjcyNCAxLjY5IDIuNzk1IDQuMDMgMi43ODUgNi42MTQgMCA1LjEzLTQuMTkyIDkuMjg4LTkuMzY2IDkuMjg4SDBWMGgxMS4xYzUuMTczIDAgOS4zNjUgNC4xNTcgOS4zNjUgOS4yODcgMCAxLjc5LS41MDUgMy40Ny0xLjM5NyA0Ljg4NXpNNjguNzQgMTYuMDJoLTMuNTU4djUuNTUzYzAgMS42OC41NDUgMi45MTggMS45NzIgMi45MTguOTIyIDAgMS41OTYtLjIwNiAxLjU5Ni0uMjA2djUuMjA5cy0xLjQ3Ny44ODQtMy40NzkuODg0aC0uMDg5Yy0uMDkgMC0uMTY4LS4wMS0uMjU4LS4wMWgtLjA2OWMtLjA0IDAtLjA5LS4wMS0uMTI5LS4wMS0zLjk4NC0uMjA2LTYuNjktMi42OTItNi42OS03LjAwN1Y1LjA0MWw3LjEzNi0xLjUwM3Y1LjQwNWgzLjU2OHY3LjA3N3oiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

const FR_FLAG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K";

const navLinks = [
  { label: 'Produits', href: '#produits' },
  { label: 'Clients', href: '#clients' },
  { label: 'Chauffeurs', href: '#chauffeurs' },
  { label: 'Flottes', href: '#flottes' },
  { label: 'FAQ', href: '#entreprise' },
];

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
              <img src={BOLT_LOGO} alt="Bolt" className="h-8" />
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-8">
                {navLinks.map(({ label, href }) => (
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
                      Conduire maintenant
                    </button>
                    <button onClick={() => signOut(auth)} className="bg-white/10 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition border border-white/20">
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <button onClick={onSignIn} className="bg-white text-bolt-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition shadow-sm">
                    S'inscrire
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
        <div className="lg:hidden fixed inset-0 z-50">
          <div className={`bg-bolt-dark w-full h-screen overflow-y-auto px-6 pb-6 border-t border-gray-800 ${isScrolled ? 'pt-20' : 'pt-24'}`}>
            <div className="space-y-6">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setIsOpen(false)} className="block text-2xl font-bold text-white">
                  {label}
                </a>
              ))}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-white font-bold text-lg">{user.displayName || user.email}</p>
                    <button onClick={() => { onDashboard(); setIsOpen(false); }} className="w-full bg-bolt-green text-white px-6 py-4 rounded-full font-bold text-lg">
                      Conduire maintenant
                    </button>
                    <button onClick={() => signOut(auth)} className="w-full bg-white/10 text-white px-6 py-4 rounded-full font-bold text-lg border border-white/20">
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <button onClick={onSignIn} className="w-full bg-white text-bolt-dark px-6 py-4 rounded-full font-bold text-lg">
                    S'inscrire
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
