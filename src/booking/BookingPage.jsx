import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, Phone, Lock } from 'lucide-react';

const BOLT_LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4yNjIgMHYzMC4wNzRoLTcuMTM2VjEuNTA0TDU1LjI2MiAwek0zNC45NDUgMzIuOTI0YzEuOTcgMCAzLjU2OCAxLjU4NCAzLjU2OCAzLjUzOCAwIDEuOTU0LTEuNTk4IDMuNTM4LTMuNTY4IDMuNTM4cy0zLjU2OC0xLjU4NC0zLjU2OC0zLjUzOGMwLTEuOTU0IDEuNTk3LTMuNTM4IDMuNTY4LTMuNTM4em0wLTI0LjM4M2M2LjA3NSAwIDExLjAxIDQuODg0IDExLjAxIDEwLjkxOCAwIDYuMDM1LTQuOTM1IDEwLjkyLTExLjAxIDEwLjkyLTYuMDg1IDAtMTEuMDEtNC44ODUtMTEuMDEtMTAuOTIgMC02LjAzNCA0LjkzNS0xMC45MTggMTEuMDEtMTAuOTE4em0wIDE0LjQ1NmMxLjk3MiAwIDMuNTY4LTEuNTgyIDMuNTY4LTMuNTM4IDAtMS45NTUtMS41OTYtMy41MzgtMy41NjgtMy41MzhzLTMuNTY4IDEuNTgzLTMuNTY4IDMuNTM4YzAgMS45NTYgMS41OTYgMy41MzggMy41NjggMy41Mzh6bS0yMi40NDggMGMxLjIzIDAgMi4yMy0uOTkyIDIuMjMtMi4yMWEyLjIyNCAyLjIyNCAwIDAwLTIuMjMtMi4yMTJINy4xNDZ2NC40MjJoNS4zNTF6TTcuMTQ2IDcuMDc3djQuNDIyaDMuOTY0YzEuMjI5IDAgMi4yMy0uOTkzIDIuMjMtMi4yMTJhMi4yMjQgMi4yMjQgMCAwMC0yLjIzLTIuMjFINy4xNDZ6bTExLjkyMiA3LjA5NWMxLjcyNCAxLjY5IDIuNzk1IDQuMDMgMi43ODUgNi42MTQgMCA1LjEzLTQuMTkyIDkuMjg4LTkuMzY2IDkuMjg4SDBWMGgxMS4xYzUuMTczIDAgOS4zNjUgNC4xNTcgOS4zNjUgOS4yODcgMCAxLjc5LS41MDUgMy40Ny0xLjM5NyA0Ljg4NXpNNjguNzQgMTYuMDJoLTMuNTU4djUuNTUzYzAgMS42OC41NDUgMi45MTggMS45NzIgMi45MTguOTIyIDAgMS41OTYtLjIwNiAxLjU5Ni0uMjA2djUuMjA5cy0xLjQ3Ny44ODQtMy40NzkuODg0aC0uMDg5Yy0uMDkgMC0uMTY4LS4wMS0uMjU4LS4wMWgtLjA2OWMtLjA0IDAtLjA5LS4wMS0uMTI5LS4wMS0zLjk4NC0uMjA2LTYuNjktMi42OTItNi42OS03LjAwN1Y1LjA0MWw3LjEzNi0xLjUwM3Y1LjQwNWgzLjU2OHY3LjA3N3oiIGZpbGw9IiMyRjMxM0YiLz48L3N2Zz4=";

const VEHICLES = [
  { id: 'civic',  name: 'Honda Civic',   category: 'Citadine',   price: 550,  img: '/honda.png',       locked: true },
  { id: 'leaf',   name: 'Nissan Leaf',   category: 'Électrique', price: 750,  img: '/nissanleaf.png',  locked: true },
  { id: 'prius',  name: 'Toyota Prius',  category: 'Hybride',    price: 650,  img: '/toyotaprius.png', locked: false },
  { id: 'lexus',  name: 'Lexus ES',      category: 'Luxe',       price: 1200, img: '/lexuses.png',     locked: true },
];

export default function BookingPage({ onClose, user }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 150);
  };

  const [date, setDate]       = useState('');
  const [time, setTime]       = useState('18:00');
  const [vehicle, setVehicle] = useState(null);

  const [firstName, lastName] = (user?.displayName || '').split(' ').reduce(
    ([f, l], word, i) => i === 0 ? [word, l] : [f, l ? l + ' ' + word : word],
    ['', '']
  );

  const [driver, setDriver] = useState({
    firstName: firstName || '',
    lastName:  lastName  || '',
    age:   '',
    phone: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      const [parsedFirst, parsedLast] = user.displayName.split(' ').reduce(
        ([f, l], word, i) => i === 0 ? [word, l] : [f, l ? l + ' ' + word : word],
        ['', '']
      );
      setDriver(prev => ({
        ...prev,
        firstName: prev.firstName || parsedFirst,
        lastName: prev.lastName || parsedLast
      }));
    }
  }, [user?.displayName]);

  const step1Done = date !== '';
  const step2Done = step1Done && vehicle !== null;
  const parsedAge = parseInt(driver.age, 10);
  const canConfirm = step2Done && driver.firstName && driver.lastName && driver.age && driver.phone && !isNaN(parsedAge) && parsedAge >= 18;

  const selectedVehicle = VEHICLES.find(v => v.id === vehicle);

  const [paying, setPaying] = useState(false); // 'idle' | 'shrinking' | 'success'

  const handleConfirm = (e) => {
    e.preventDefault();
    const parsedAge = parseInt(driver.age, 10);
    if (!canConfirm || paying || isNaN(parsedAge) || parsedAge < 18) return;
    setPaying('shrinking');
    setTimeout(() => setPaying('success'), 500);
    setTimeout(() => { setPaying(false); setConfirmed(true); }, 1800);
  };

  return (
    <div className={`fixed inset-0 z-50 ${confirmed ? 'bg-bolt-gray flex flex-col items-center justify-center' : 'bg-[#f8f9fa] overflow-y-auto'} ${closing ? 'booking-closing' : 'booking-open'}`}>
      {confirmed ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-bolt-green rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-bolt-dark mb-2">Réservation confirmée !</h2>
          <p className="text-gray-500 mb-8">Votre {selectedVehicle?.name} vous attend. Paiement sur place.</p>
          <button onClick={handleClose} className="w-full bg-bolt-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#29a366] transition">
            Retour à l'accueil
          </button>
        </div>
      ) : (
        <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={handleClose} className="flex items-center gap-2 text-gray-600 hover:text-bolt-dark transition font-medium">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>
          <img src={BOLT_LOGO} alt="Bolt" className="h-6" />
          <div className="w-20" />
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — steps */}
          <div className="lg:col-span-8 space-y-6">

            {/* Step 1 — Date & Heure */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-bolt-green text-white flex items-center justify-center font-bold text-sm">1</span>
                <h2 className="text-2xl font-bold text-bolt-dark">Date &amp; Heure</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <Calendar size={12} className="inline mr-1" />Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-base text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <Clock size={12} className="inline mr-1" />Heure
                  </label>
                  <input
                    id="booking-time"
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-base text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
              </div>
            </section>

            {/* Step 2 — Véhicule */}
            <section className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all ${!step1Done ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step1Done ? 'bg-bolt-green text-white' : 'bg-gray-200 text-gray-400'}`}>2</span>
                <h2 className="text-2xl font-bold text-bolt-dark">Véhicule</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {VEHICLES.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicle(v.id)}
                    disabled={v.locked}
                    aria-pressed={vehicle === v.id}
                    className={`group relative text-left p-5 rounded-2xl border-2 transition-all ${
                      v.locked
                        ? 'border-gray-100 bg-gray-50 opacity-60'
                        : vehicle === v.id
                          ? 'border-bolt-green bg-white shadow-xl shadow-gray-200/50'
                          : 'border-gray-100 bg-gray-50 hover:border-bolt-green/40 hover:bg-white'
                    }`}
                  >
                    {v.locked && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full">
                        <Lock size={9} />
                        Prochainement
                      </span>
                    )}
                    {!v.locked && vehicle === v.id && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-bolt-green rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <img
                      src={v.img}
                      alt={v.name}
                      className={`h-24 sm:h-32 w-full object-contain mb-3 transition-transform duration-300 ${!v.locked ? 'group-hover:scale-110' : 'grayscale'}`}
                    />
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">{v.category}</p>
                    <p className="font-bold text-bolt-dark">{v.name}</p>
                    {v.locked
                      ? <p className="text-gray-400 text-xs font-medium mt-1">Prochainement disponible</p>
                      : <p className="text-bolt-green font-bold mt-1">${v.price}</p>
                    }
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3 — Conducteur */}
            <section className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all ${!step2Done ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step2Done ? 'bg-bolt-green text-white' : 'bg-gray-200 text-gray-400'}`}>3</span>
                <h2 className="text-2xl font-bold text-bolt-dark">Conducteur</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="driver-firstName" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <User size={12} className="inline mr-1" />Prénom
                  </label>
                  <input
                    id="driver-firstName"
                    type="text"
                    placeholder="John"
                    value={driver.firstName}
                    onChange={e => setDriver(d => ({ ...d, firstName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
                <div>
                  <label htmlFor="driver-lastName" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <User size={12} className="inline mr-1" />Nom
                  </label>
                  <input
                    id="driver-lastName"
                    type="text"
                    placeholder="Doe"
                    value={driver.lastName}
                    onChange={e => setDriver(d => ({ ...d, lastName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
                <div>
                  <label htmlFor="driver-age" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Âge</label>
                  <input
                    id="driver-age"
                    type="number"
                    placeholder="25"
                    min="18"
                    value={driver.age}
                    onChange={e => setDriver(d => ({ ...d, age: e.target.value }))}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
                <div>
                  <label htmlFor="driver-phone" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <Phone size={12} className="inline mr-1" />Téléphone
                  </label>
                  <input
                    id="driver-phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={driver.phone}
                    onChange={e => setDriver(d => ({ ...d, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-bolt-dark focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right — Récapitulatif */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-bolt-dark mb-5">Récapitulatif</h3>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lieu</span>
                  <span className="font-medium text-bolt-dark">Townsend, Tennessee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-bolt-dark">{date || <span className="text-gray-300">Choisir une date</span>}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Heure</span>
                  <span className="font-medium text-bolt-dark">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Véhicule</span>
                  <span className="font-medium text-bolt-dark">{selectedVehicle?.name || <span className="text-gray-300">À choisir</span>}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-5 flex justify-between items-center">
                <span className="text-gray-500 text-sm">Total estimé</span>
                <span className="text-2xl font-bold text-bolt-dark">${selectedVehicle?.price ?? 0}</span>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm || !!paying}
                  style={{ height: '3.5rem' }}
                  className={`bg-bolt-green text-white font-bold text-base transition-colors
                    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
                    ${!paying ? 'w-full rounded-2xl hover:bg-[#29a366]' : ''}
                    ${paying === 'shrinking' ? 'confirm-btn-shrink' : ''}
                    ${paying === 'success'   ? 'confirm-btn-expand w-full rounded-2xl' : ''}
                  `}
                >
                  {paying === 'success' ? (
                    <span className="success-wrapper flex items-center justify-center gap-2">
                      <svg width="22" height="22" viewBox="0 0 88 88" fill="none">
                        <circle
                          className="success-circle"
                          cx="44" cy="44" r="42"
                          stroke="white" strokeWidth="6"
                          fill="none" strokeLinecap="round"
                        />
                        <path
                          className="success-check"
                          d="M26 44 L38 56 L62 32"
                          stroke="white" strokeWidth="6"
                          fill="none" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                      Réservation confirmée
                    </span>
                  ) : paying === 'shrinking' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </span>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">Paiement sur place. Annulation gratuite.</p>
            </div>
          </aside>

        </div>
      </main>
      </>
      )}
    </div>
  );
}