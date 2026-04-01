import React, { useState } from 'react';
import { X, Car, MapPin, Calendar, Clock, ChevronRight, LogOut, User, List, Star, Zap, Shield, CheckCircle, TrendingUp } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const BOLT_LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4yNjIgMHYzMC4wNzRoLTcuMTM2VjEuNTA0TDU1LjI2MiAwek0zNC45NDUgMzIuOTI0YzEuOTcgMCAzLjU2OCAxLjU4NCAzLjU2OCAzLjUzOCAwIDEuOTU0LTEuNTk4IDMuNTM4LTMuNTY4IDMuNTM4cy0zLjU2OC0xLjU4NC0zLjU2OC0zLjUzOGMwLTEuOTU0IDEuNTk3LTMuNTM4IDMuNTY4LTMuNTM4em0wLTI0LjM4M2M2LjA3NSAwIDExLjAxIDQuODg0IDExLjAxIDEwLjkxOCAwIDYuMDM1LTQuOTM1IDEwLjkyLTExLjAxIDEwLjkyLTYuMDg1IDAtMTEuMDEtNC44ODUtMTEuMDEtMTAuOTIgMC02LjAzNCA0LjkzNS0xMC45MTggMTEuMDEtMTAuOTE4em0wIDE0LjQ1NmMxLjk3MiAwIDMuNTY4LTEuNTgyIDMuNTY4LTMuNTM4IDAtMS45NTUtMS41OTYtMy41MzgtMy41NjgtMy41MzhzLTMuNTY4IDEuNTgzLTMuNTY4IDMuNTM4YzAgMS45NTYgMS41OTYgMy41MzggMy41NjggMy41Mzh6bS0yMi40NDggMGMxLjIzIDAgMi4yMy0uOTkyIDIuMjMtMi4yMWEyLjIyNCAyLjIyNCAwIDAwLTIuMjMtMi4yMTJINy4xNDZ2NC40MjJoNS4zNTF6TTcuMTQ2IDcuMDc3djQuNDIyaDMuOTY0YzEuMjI5IDAgMi4yMy0uOTkzIDIuMjMtMi4yMTJhMi4yMjQgMi4yMjQgMCAwMC0yLjIzLTIuMjFINy4xNDZ6bTExLjkyMiA3LjA5NWMxLjcyNCAxLjY5IDIuNzk1IDQuMDMgMi43ODUgNi42MTQgMCA1LjEzLTQuMTkyIDkuMjg4LTkuMzY2IDkuMjg4SDBWMGgxMS4xYzUuMTczIDAgOS4zNjUgNC4xNTcgOS4zNjUgOS4yODcgMCAxLjc5LS41MDUgMy40Ny0xLjM5NyA0Ljg4NXpNNjguNzQgMTYuMDJoLTMuNTU4djUuNTUzYzAgMS42OC41NDUgMi45MTggMS45NzIgMi45MTguOTIyIDAgMS41OTYtLjIwNiAxLjU5Ni0uMjA2djUuMjA5cy0xLjQ3Ny44ODQtMy40NzkuODg0aC0uMDg5Yy0uMDkgMC0uMTY4LS4wMS0uMjU4LS4wMWgtLjA2OWMtLjA0IDAtLjA5LS4wMS0uMTI5LS4wMS0zLjk4NC0uMjA2LTYuNjktMi42OTItNi42OS03LjAwN1Y1LjA0MWw3LjEzNi0xLjUwM3Y1LjQwNWgzLjU2OHY3LjA3N3oiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

const RATE = 700;
const TAX_RATE = 0.05;

const NavItem = ({ icon, label, id, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
      active === id
        ? 'bg-bolt-green text-white shadow-lg shadow-bolt-green/20'
        : 'text-white/50 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={active === id ? 'text-white' : 'text-white/40'}>{icon}</span>
    {label}
    {active === id && <ChevronRight size={14} className="ml-auto opacity-60" />}
  </button>
);

const StatCard = ({ icon, label, value, sub }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/8 transition-colors">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-xl bg-bolt-green/15 flex items-center justify-center text-bolt-green">
        {icon}
      </div>
      <span className="text-white/20 text-xs font-medium">{sub}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/40 mt-0.5">{label}</p>
    </div>
  </div>
);

const ReservationsSection = () => (
  <section className="flex-1">
    <h2 className="text-xl font-bold text-white mb-6">Mes réservations</h2>
    <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
        <List size={26} className="text-white/20" />
      </div>
      <p className="text-lg font-bold text-white">Aucune réservation</p>
      <p className="text-sm text-white/40 mt-2 max-w-xs leading-relaxed">
        Vos prochaines locations apparaîtront ici dès que vous aurez effectué une réservation.
      </p>
    </div>
  </section>
);

const ProfilSection = ({ user }) => (
  <section>
    <h2 className="text-xl font-bold text-white mb-6">Mon profil</h2>
    <div className="max-w-md space-y-4">
      {/* Avatar card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-bolt-green flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-bolt-green/30 shrink-0">
          {user.displayName?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-bold text-white text-xl leading-tight">{user.displayName}</p>
          <p className="text-white/40 text-sm mt-0.5">{user.email}</p>
          <span className="inline-flex items-center gap-1.5 mt-2 bg-bolt-green/15 text-bolt-green text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-bolt-green"></span>
            Membre actif
          </span>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-bolt-green/15 flex items-center justify-center shrink-0 mt-0.5">
          <Shield size={15} className="text-bolt-green" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Modification du profil</p>
          <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
            La personnalisation du profil sera disponible prochainement.
          </p>
        </div>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Panel */}
      <div className={`relative ml-auto w-full max-w-[1200px] h-full bg-[#0E1010] flex shadow-2xl overflow-hidden ${isClosing ? 'dashboard-closing' : 'dashboard-open'}`}>

        {/* ── Sidebar ── */}
        <aside className="w-64 shrink-0 bg-[#080a0a] border-r border-white/[0.06] flex flex-col h-full hidden lg:flex">
          {/* Logo */}
          <div className="px-6 py-7 border-b border-white/[0.06]">
            <img src={BOLT_LOGO} alt="Bolt" className="h-7" />
            <p className="text-white/25 text-xs font-medium mt-2">Drive Dashboard</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-5 space-y-1">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-4 mb-3">Menu</p>
            <NavItem icon={<Car size={17} />}  label="Réserver"          id="reserver"     active={activeNav} onClick={setActiveNav} />
            <NavItem icon={<List size={17} />} label="Mes réservations"  id="reservations" active={activeNav} onClick={setActiveNav} />
            <NavItem icon={<User size={17} />} label="Profil"            id="profil"       active={activeNav} onClick={setActiveNav} />
          </nav>

          {/* User + Logout */}
          <div className="px-3 py-5 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 px-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-bolt-green flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-bolt-green/20">
                {initial}
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate leading-tight">{user.displayName}</p>
                <p className="text-white/30 text-xs truncate mt-0.5">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { signOut(auth); onClose(); }}
              className="w-full flex items-center gap-2.5 text-white/40 hover:text-white/80 text-sm font-medium transition-colors px-3 py-2.5 rounded-xl hover:bg-white/5"
            >
              <LogOut size={15} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0E1010]/80 backdrop-blur-md border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Bonjour, {firstName} 👋</h1>
              <p className="text-sm text-white/35 mt-0.5">Bienvenue sur votre espace Bolt Drive</p>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
            >
              <X size={17} />
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<Car size={18} />}        label="Courses effectuées"  value="0"     sub="Total" />
              <StatCard icon={<MapPin size={18} />}      label="Km parcourus"         value="0 km"  sub="Trajet" />
              <StatCard icon={<TrendingUp size={18} />}  label="Économies réalisées"  value="$0"    sub="Ce mois" />
            </div>

            {/* Mobile tabs */}
            <div className="flex lg:hidden gap-2">
              {[['reserver','Réserver'],['reservations','Réservations'],['profil','Profil']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveNav(id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    activeNav === id
                      ? 'bg-bolt-green text-white shadow-lg shadow-bolt-green/20'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            {/* ── Réserver ── */}
            {activeNav === 'reserver' && (
              <section>
                <h2 className="text-xl font-bold text-white mb-6">Réserver un véhicule</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

                  {/* Car card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                    <div className="relative">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg/1280px-2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg"
                        alt="Toyota Prius"
                        className="w-full h-52 object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1010]/80 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 bg-bolt-green text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Disponible
                      </span>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-yellow-400 text-sm font-semibold">
                        <Star size={13} fill="currentColor" />
                        <span>4.9</span>
                        <span className="text-white/40 text-xs font-normal ml-1">· 128 avis</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white">Toyota Prius 2023</h3>
                        <p className="text-white/40 text-sm mt-0.5">Hybride · 5 places · Automatique</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-5">
                        {[['⚡','Hybride'],['🛡️','Assuré'],['⛽','Inclus']].map(([icon, label]) => (
                          <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-2 py-2.5 text-center">
                            <p className="text-base">{icon}</p>
                            <p className="text-xs text-white/50 font-medium mt-0.5">{label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between pt-4 border-t border-white/10">
                        <div>
                          <span className="text-3xl font-bold text-white">$700</span>
                          <span className="text-white/40 text-sm ml-1.5">/heure</span>
                        </div>
                        <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">Taxe 5% incluse</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking form */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                    <h3 className="font-bold text-white text-lg">Détails de la réservation</h3>

                    {ordered && (
                      <div className="bg-bolt-green/10 border border-bolt-green/25 text-bolt-green rounded-2xl px-4 py-3.5 text-sm font-semibold flex items-center gap-2.5">
                        <CheckCircle size={16} className="shrink-0" />
                        Pré-commande envoyée avec succès !
                      </div>
                    )}

                    {/* Date */}
                    <div>
                      <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Date</label>
                      <div className="bg-white/5 border border-white/10 rounded-xl h-12 flex items-center px-4 gap-3 focus-within:border-bolt-green/50 focus-within:bg-bolt-green/5 transition-all">
                        <Calendar size={15} className="text-white/30 shrink-0" />
                        <input
                          type="date"
                          value={date}
                          onChange={e => setDate(e.target.value)}
                          className="flex-1 outline-none text-sm bg-transparent text-white [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Heure de départ</label>
                      <div className="bg-white/5 border border-white/10 rounded-xl h-12 flex items-center px-4 gap-3 focus-within:border-bolt-green/50 focus-within:bg-bolt-green/5 transition-all">
                        <Clock size={15} className="text-white/30 shrink-0" />
                        <input
                          type="time"
                          value={time}
                          onChange={e => setTime(e.target.value)}
                          className="flex-1 outline-none text-sm bg-transparent text-white [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Hours stepper */}
                    <div>
                      <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Durée de conduite</label>
                      <div className="bg-white/5 border border-white/10 rounded-xl h-14 flex items-center px-2">
                        <button
                          type="button"
                          onClick={() => setHours(h => Math.max(1, h - 1))}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition font-bold text-lg"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-white">{hours}</span>
                          <span className="text-white/40 text-sm ml-2">{hours > 1 ? 'heures' : 'heure'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setHours(h => Math.min(24, h + 1))}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Adresse de prise en charge</label>
                      <div className="bg-white/5 border border-white/10 rounded-xl h-12 flex items-center px-4 gap-3 focus-within:border-bolt-green/50 focus-within:bg-bolt-green/5 transition-all">
                        <MapPin size={15} className="text-white/30 shrink-0" />
                        <input
                          type="text"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          placeholder="Ex: 12 Rue de la Paix, Paris"
                          className="flex-1 outline-none text-sm bg-transparent text-white placeholder-white/20"
                        />
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-black/30 border border-white/[0.07] rounded-xl p-4 space-y-2.5">
                      <div className="flex justify-between text-sm text-white/40">
                        <span>$700 × {hours} {hours > 1 ? 'heures' : 'heure'}</span>
                        <span className="font-medium text-white/70">${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-white/40">
                        <span>Taxe (5%)</span>
                        <span className="font-medium text-white/70">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2.5 border-t border-white/10">
                        <span className="text-white">Total</span>
                        <span className="text-bolt-green text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setOrdered(true)}
                      className="w-full bg-bolt-green text-white py-4 rounded-full font-bold text-sm hover:bg-[#29a366] active:scale-[0.98] transition-all shadow-lg shadow-bolt-green/25 flex items-center justify-center gap-2"
                    >
                      Pré-commander <ChevronRight size={16} />
                    </button>
                    <p className="text-xs text-center text-white/25">Annulation gratuite jusqu'à 24h avant le départ</p>
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
