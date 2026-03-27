import React, { useState } from 'react';
import { X, Car, MapPin, Calendar, Clock, ChevronRight, LogOut, User, List, Star, Zap, Shield } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const BOLT_LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4yNjIgMHYzMC4wNzRoLTcuMTM2VjEuNTA0TDU1LjI2MiAwek0zNC45NDUgMzIuOTI0YzEuOTcgMCAzLjU2OCAxLjU4NCAzLjU2OCAzLjUzOCAwIDEuOTU0LTEuNTk4IDMuNTM4LTMuNTY4IDMuNTM4cy0zLjU2OC0xLjU4NC0zLjU2OC0zLjUzOGMwLTEuOTU0IDEuNTk3LTMuNTM4IDMuNTY4LTMuNTM4em0wLTI0LjM4M2M2LjA3NSAwIDExLjAxIDQuODg0IDExLjAxIDEwLjkxOCAwIDYuMDM1LTQuOTM1IDEwLjkyLTExLjAxIDEwLjkyLTYuMDg1IDAtMTEuMDEtNC44ODUtMTEuMDEtMTAuOTIgMC02LjAzNCA0LjkzNS0xMC45MTggMTEuMDEtMTAuOTE4em0wIDE0LjQ1NmMxLjk3MiAwIDMuNTY4LTEuNTgyIDMuNTY4LTMuNTM4IDAtMS45NTUtMS41OTYtMy41MzgtMy41NjgtMy41MzhzLTMuNTY4IDEuNTgzLTMuNTY4IDMuNTM4YzAgMS45NTYgMS41OTYgMy41MzggMy41NjggMy41Mzh6bS0yMi40NDggMGMxLjIzIDAgMi4yMy0uOTkyIDIuMjMtMi4yMWEyLjIyNCAyLjIyNCAwIDAwLTIuMjMtMi4yMTJINy4xNDZ2NC40MjJoNS4zNTF6TTcuMTQ2IDcuMDc3djQuNDIyaDMuOTY0YzEuMjI5IDAgMi4yMy0uOTkzIDIuMjMtMi4yMTJhMi4yMjQgMi4yMjQgMCAwMC0yLjIzLTIuMjFINy4xNDZ6bTExLjkyMiA3LjA5NWMxLjcyNCAxLjY5IDIuNzk1IDQuMDMgMi43ODUgNi42MTQgMCA1LjEzLTQuMTkyIDkuMjg4LTkuMzY2IDkuMjg4SDBWMGgxMS4xYzUuMTczIDAgOS4zNjUgNC4xNTcgOS4zNjUgOS4yODcgMCAxLjc5LS41MDUgMy40Ny0xLjM5NyA0Ljg4NXpNNjguNzQgMTYuMDJoLTMuNTU4djUuNTUzYzAgMS42OC41NDUgMi45MTggMS45NzIgMi45MTguOTIyIDAgMS41OTYtLjIwNiAxLjU5Ni0uMjA2djUuMjA5cy0xLjQ3Ny44ODQtMy40NzkuODg0aC0uMDg5Yy0uMDkgMC0uMTY4LS4wMS0uMjU4LS4wMWgtLjA2OWMtLjA0IDAtLjA5LS4wMS0uMTI5LS4wMS0zLjk4NC0uMjA2LTYuNjktMi42OTItNi42OS03LjAwN1Y1LjA0MWw3LjEzNi0xLjUwM3Y1LjQwNWgzLjU2OHY3LjA3N3oiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

const RATE = 700;
const TAX_RATE = 0.05;

const NavItem = ({ icon, label, id, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      active === id
        ? 'bg-bolt-green text-white shadow-sm'
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ icon, label, value, color = 'text-bolt-green' }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
    <div className={`w-10 h-10 rounded-xl bg-bolt-green/10 flex items-center justify-center ${color} shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-bolt-dark">{value}</p>
      <p className="text-sm text-gray-400 mt-0.5">{label}</p>
    </div>
  </div>
);

const ReservationsSection = () => (
  <section>
    <h2 className="text-xl font-bold text-bolt-dark mb-6">Mes réservations</h2>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F5F6F7] flex items-center justify-center mb-4">
        <List size={28} className="text-gray-300" />
      </div>
      <p className="text-lg font-semibold text-bolt-dark">Aucune réservation pour l'instant</p>
      <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
        Vos prochaines locations apparaîtront ici dès que vous aurez effectué une réservation.
      </p>
    </div>
  </section>
);

const ProfilSection = ({ user }) => (
  <section>
    <h2 className="text-xl font-bold text-bolt-dark mb-6">Mon profil</h2>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-bolt-green flex items-center justify-center text-white text-2xl font-bold shadow">
          {user.displayName?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-bold text-bolt-dark text-xl">{user.displayName}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="bg-[#F5F6F7] rounded-xl p-4 text-sm text-gray-500 flex items-center gap-2">
        <Shield size={16} className="text-bolt-green shrink-0" />
        La modification du profil sera disponible prochainement.
      </div>
    </div>
  </section>
);

const Dashboard = ({ user, onClose }) => {
  const [activeNav, setActiveNav] = useState('reserver');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [address, setAddress] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const subtotal = RATE * hours;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const initial = user.displayName?.[0]?.toUpperCase() || '?';
  const firstName = user.displayName?.split(' ')[0] || 'là';

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 250);
  };

  return (
    <div className="fixed inset-0 z-[90] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Panel */}
      <div className={`relative ml-auto w-full max-w-[1200px] h-full bg-[#F5F6F7] flex shadow-2xl overflow-hidden ${isClosing ? 'dashboard-closing' : 'dashboard-open'}`}>

        {/* ── Sidebar ── */}
        <aside className="w-60 shrink-0 bg-bolt-dark flex flex-col h-full hidden lg:flex">
          <div className="px-6 py-8 border-b border-white/10">
            <img src={BOLT_LOGO} alt="Bolt" className="h-7" />
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1">
            <NavItem icon={<Car size={18} />}  label="Réserver"          id="reserver"     active={activeNav} onClick={setActiveNav} />
            <NavItem icon={<List size={18} />} label="Mes réservations"  id="reservations" active={activeNav} onClick={setActiveNav} />
            <NavItem icon={<User size={18} />} label="Profil"            id="profil"       active={activeNav} onClick={setActiveNav} />
          </nav>

          <div className="px-3 py-6 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 mb-4">
              <div className="w-9 h-9 rounded-full bg-bolt-green flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initial}
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-semibold truncate">{user.displayName}</p>
                <p className="text-white/40 text-xs truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { signOut(auth); onClose(); }}
              className="w-full flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition px-4 py-2.5 rounded-xl hover:bg-white/10"
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#F5F6F7]/90 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-bolt-dark">Bonjour, {firstName} 👋</h1>
              <p className="text-sm text-gray-400 mt-0.5">Bienvenue sur votre espace Bolt Drive</p>
            </div>
            <button onClick={handleClose} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-bolt-dark transition shadow-sm">
              <X size={18} />
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<Car size={20} />}   label="Courses effectuées" value="0" />
              <StatCard icon={<MapPin size={20} />} label="Km parcourus"       value="0 km" />
              <StatCard icon={<Zap size={20} />}    label="Économies réalisées" value="$0" />
            </div>

            {/* Nav tabs (mobile) */}
            <div className="flex lg:hidden gap-2">
              {[['reserver','Réserver'],['reservations','Réservations'],['profil','Profil']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveNav(id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeNav === id ? 'bg-bolt-green text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeNav === 'reserver' && (
              <section>
                <h2 className="text-xl font-bold text-bolt-dark mb-6">Réserver un véhicule</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                  {/* Car card */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="relative">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg/1280px-2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg"
                        alt="Toyota Prius"
                        className="w-full h-52 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-bolt-green text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Disponible
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-bolt-dark">Toyota Prius</h3>
                          <p className="text-gray-400 text-sm mt-0.5">Hybride · 5 places · Automatique</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                          <Star size={14} fill="currentColor" /> 4.9
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[['⚡','Hybride'],['🛡️','Assuré'],['⛽','Inclus']].map(([icon, label]) => (
                          <div key={label} className="bg-[#F5F6F7] rounded-xl px-3 py-2 text-center">
                            <p className="text-lg">{icon}</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-3xl font-bold text-bolt-green">$700</span>
                          <span className="text-gray-400 text-sm ml-1">/heure</span>
                        </div>
                        <span className="text-xs text-gray-400">Taxe 5% incluse au total</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking form */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5">
                    <h3 className="font-bold text-bolt-dark text-lg">Détails de la réservation</h3>

                    {ordered && (
                      <div className="bg-bolt-green/10 border border-bolt-green/30 text-bolt-green rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
                        <ChevronRight size={16} /> Pré-commande envoyée avec succès !
                      </div>
                    )}

                    {/* Date */}
                    <div>
                      <label className="text-sm font-semibold text-bolt-dark mb-1.5 block">Date</label>
                      <div className="border border-gray-200 rounded-xl h-11 flex items-center px-3 gap-2 focus-within:border-bolt-green transition-colors">
                        <Calendar size={16} className="text-gray-400 shrink-0" />
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}
                          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark" />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="text-sm font-semibold text-bolt-dark mb-1.5 block">Heure de départ</label>
                      <div className="border border-gray-200 rounded-xl h-11 flex items-center px-3 gap-2 focus-within:border-bolt-green transition-colors">
                        <Clock size={16} className="text-gray-400 shrink-0" />
                        <input type="time" value={time} onChange={e => setTime(e.target.value)}
                          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark" />
                      </div>
                    </div>

                    {/* Hours stepper */}
                    <div>
                      <label className="text-sm font-semibold text-bolt-dark mb-1.5 block">Durée de conduite</label>
                      <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setHours(h => Math.max(1, h - 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-bolt-green hover:text-bolt-green transition font-bold text-xl text-gray-400">
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-3xl font-bold text-bolt-dark">{hours}</span>
                          <span className="text-gray-400 text-sm ml-2">{hours > 1 ? 'heures' : 'heure'}</span>
                        </div>
                        <button type="button" onClick={() => setHours(h => Math.min(24, h + 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-bolt-green hover:text-bolt-green transition font-bold text-xl text-gray-400">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-sm font-semibold text-bolt-dark mb-1.5 block">Adresse de prise en charge</label>
                      <div className="border border-gray-200 rounded-xl h-11 flex items-center px-3 gap-2 focus-within:border-bolt-green transition-colors">
                        <MapPin size={16} className="text-gray-400 shrink-0" />
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                          placeholder="Ex: 12 Rue de la Paix, Paris"
                          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark placeholder-gray-300" />
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-[#F5F6F7] rounded-xl p-4 space-y-2.5">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$700 × {hours} {hours > 1 ? 'heures' : 'heure'}</span>
                        <span className="font-medium text-bolt-dark">${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Taxe (5%)</span>
                        <span className="font-medium text-bolt-dark">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-bolt-dark pt-2.5 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-bolt-green text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setOrdered(true)}
                      className="w-full bg-bolt-green text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#29a366] active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      Pré-commander <ChevronRight size={16} />
                    </button>
                    <p className="text-xs text-center text-gray-400">Annulation gratuite jusqu'à 24h avant le départ</p>
                  </div>
                </div>
              </section>
            )}

            {activeNav === 'reservations' && <ReservationsSection />}
            {activeNav === 'profil' && <ProfilSection user={user} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
