import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Timer, Minus, Plus, User, Phone, Lock } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BOLT_LOGO_DARK } from '../data/assets';
import { VEHICLES } from '../data/vehicles';
import { BOOKING_PAGE } from '../data/content';
import { db } from '../lib/firebase';

export default function BookingPage({ onClose, user, onSignIn }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 150);
  };

  const [date, setDate]       = useState('');
  const [time, setTime]       = useState('18:00');
  const [hours, setHours]     = useState(1);

  const maxHours = BOOKING_PAGE.durationLimits[time] ?? 1;

  const timeOptions = (() => {
    const [minH] = BOOKING_PAGE.timeMin.split(':').map(Number);
    const [maxH] = BOOKING_PAGE.timeMax.split(':').map(Number);
    const opts = [];
    for (let h = minH; h <= maxH; h++) opts.push(`${String(h).padStart(2, '0')}:00`);
    return opts;
  })();

  const handleTimeChange = (e) => {
    const raw = e.target.value;
    const clamped = raw < BOOKING_PAGE.timeMin ? BOOKING_PAGE.timeMin
                  : raw > BOOKING_PAGE.timeMax ? BOOKING_PAGE.timeMax
                  : raw;
    setTime(clamped);
    const max = BOOKING_PAGE.durationLimits[clamped] ?? 1;
    setHours(h => Math.min(h, max));
  };
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
  const [confirmed, setConfirmed]       = useState(false);
  const [confirmClosing, setConfirmClosing] = useState(false);

  const handleConfirmClose = () => {
    setConfirmClosing(true);
    setTimeout(onClose, 200);
  };

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

  const [paying, setPaying] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    const parsedAge = parseInt(driver.age, 10);
    if (!canConfirm || paying || isNaN(parsedAge) || parsedAge < 18) return;
    setPaying('shrinking');
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        date,
        time,
        hours,
        vehicle,
        vehicleName: selectedVehicle.name,
        vehiclePrice: selectedVehicle.price,
        totalPrice: selectedVehicle.price * hours,
        driver: { ...driver, age: parsedAge },
        status: 'pending',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Firestore write error:', err.code, err.message);
    }
    setTimeout(() => setPaying('success'), 500);
    setTimeout(() => { setPaying(false); setConfirmed(true); }, 1800);
  };

  if (confirmed) {
    return (
      <div className="confirm-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/50">
        <div className={confirmClosing ? 'confirm-card-out' : 'confirm-card-in'}>
          <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 p-10 max-w-sm w-full text-center">
            <div className="relative w-20 h-20 mx-auto mb-7">
              <div className="absolute inset-0 rounded-full bg-bolt-green/10" />
              <div className="absolute top-2 left-2 w-16 h-16 bg-bolt-green rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-bolt-dark mb-2">{BOOKING_PAGE.confirmationTitle}</h2>
            <p className="text-gray-400 text-sm mb-8">
              {BOOKING_PAGE.confirmationVehiclePrefix}{' '}
              <span className="font-semibold text-bolt-dark">{selectedVehicle?.name}</span>{' '}
              {BOOKING_PAGE.confirmationVehicleSuffix}
            </p>
            <button
              onClick={handleConfirmClose}
              style={{ transition: 'transform 130ms cubic-bezier(0.23, 1, 0.32, 1), background-color 130ms ease' }}
              className="w-full bg-bolt-green text-white py-4 rounded-2xl font-bold text-base hover:bg-[#29a366] active:scale-[0.97]"
            >
              {BOOKING_PAGE.confirmationCta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 bg-[#f8f9fa] overflow-y-auto ${closing ? 'booking-closing' : 'booking-open'}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={handleClose} className="flex items-center gap-2 text-gray-600 hover:text-bolt-dark transition font-medium">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>
          <img src={BOLT_LOGO_DARK} alt="Bolt" className="h-6" />
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
                <h2 className="text-2xl font-bold text-bolt-dark">{BOOKING_PAGE.steps.dateTime}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="booking-date" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                    <Calendar size={11} />Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full block border border-gray-200 rounded-2xl px-4 py-3.5 text-base text-bolt-dark bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition"
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                    <Clock size={11} />Heure
                  </label>
                  <select
                    id="booking-time"
                    value={time}
                    onChange={handleTimeChange}
                    className="w-full block border border-gray-200 rounded-2xl px-4 py-3.5 text-base text-bolt-dark bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-bolt-green/20 focus:border-bolt-green transition appearance-none cursor-pointer"
                  >
                    {timeOptions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                    <Timer size={11} />{BOOKING_PAGE.labelDuration}
                  </label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-3.5 bg-gray-50 hover:border-gray-300 transition">
                    <button
                      type="button"
                      onClick={() => setHours(h => Math.max(1, h - 1))}
                      disabled={hours <= 1}
                      aria-label={`Réduire la durée, actuellement ${hours} ${hours > 1 ? BOOKING_PAGE.hourPlural : BOOKING_PAGE.hourSingular}`}
                      style={{ transition: 'transform 130ms cubic-bezier(0.23, 1, 0.32, 1), border-color 130ms ease, color 130ms ease, background-color 130ms ease, box-shadow 130ms ease' }}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base text-gray-400 hover:border-bolt-green hover:text-bolt-green hover:bg-bolt-green/5 hover:shadow-md active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm select-none"
                    ><Minus size={14} strokeWidth={2.5} /></button>
                    <span className="font-bold text-bolt-dark tabular-nums">{hours} {hours > 1 ? BOOKING_PAGE.hourPlural : BOOKING_PAGE.hourSingular}</span>
                    <button
                      type="button"
                      onClick={() => setHours(h => Math.min(maxHours, h + 1))}
                      disabled={hours >= maxHours}
                      aria-label={`Augmenter la durée, actuellement ${hours} ${hours > 1 ? BOOKING_PAGE.hourPlural : BOOKING_PAGE.hourSingular}`}
                      style={{ transition: 'transform 130ms cubic-bezier(0.23, 1, 0.32, 1), border-color 130ms ease, color 130ms ease, background-color 130ms ease, box-shadow 130ms ease' }}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base text-gray-400 hover:border-bolt-green hover:text-bolt-green hover:bg-bolt-green/5 hover:shadow-md active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm select-none"
                    ><Plus size={14} strokeWidth={2.5} /></button>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2 — Véhicule */}
            <section className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all ${!step1Done ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step1Done ? 'bg-bolt-green text-white' : 'bg-gray-200 text-gray-400'}`}>2</span>
                <h2 className="text-2xl font-bold text-bolt-dark">{BOOKING_PAGE.steps.vehicle}</h2>
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
                      : <p className="text-bolt-green font-bold mt-1">${v.price}<span className="text-xs font-normal">{BOOKING_PAGE.perHour}</span></p>
                    }
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3 — Conducteur */}
            <section className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all ${!step2Done ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step2Done ? 'bg-bolt-green text-white' : 'bg-gray-200 text-gray-400'}`}>3</span>
                <h2 className="text-2xl font-bold text-bolt-dark">{BOOKING_PAGE.steps.driver}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="driver-firstName" className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    <User size={12} className="inline mr-1" />Prénom
                  </label>
                  <input
                    id="driver-firstName"
                    type="text"
                    placeholder={BOOKING_PAGE.placeholders.firstName}
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
                    placeholder={BOOKING_PAGE.placeholders.lastName}
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
                    placeholder={BOOKING_PAGE.placeholders.age}
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
                    placeholder={BOOKING_PAGE.placeholders.phone}
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
              <h3 className="text-lg font-bold text-bolt-dark mb-5">{BOOKING_PAGE.summaryTitle}</h3>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lieu</span>
                  <span className="font-medium text-bolt-dark">{BOOKING_PAGE.location}</span>
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
                <div className="flex justify-between">
                  <span className="text-gray-500">{BOOKING_PAGE.labelDuration}</span>
                  <span className="font-medium text-bolt-dark">{hours} {hours > 1 ? BOOKING_PAGE.hourPlural : BOOKING_PAGE.hourSingular}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-5 flex justify-between items-center">
                <span className="text-gray-500 text-sm">{BOOKING_PAGE.totalLabel}</span>
                <span className="text-2xl font-bold text-bolt-dark">${(selectedVehicle?.price ?? 0) * hours}</span>
              </div>
              {!user ? (
                <div className="text-center py-2">
                  <p className="font-bold text-bolt-dark mb-1">{BOOKING_PAGE.loginPromptTitle}</p>
                  <p className="text-xs text-gray-400 mb-4">{BOOKING_PAGE.loginPromptSubtitle}</p>
                  <button
                    onClick={onSignIn}
                    className="w-full bg-bolt-green text-white font-bold py-3.5 rounded-2xl hover:bg-[#29a366] transition flex items-center justify-center gap-2"
                  >
                    <img src={BOLT_LOGO_DARK} alt="Bolt" className="h-4 brightness-0 invert" />
                    {BOOKING_PAGE.loginCta}
                  </button>
                </div>
              ) : (
                <>
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
                        BOOKING_PAGE.confirmButtonLabel
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-3">{BOOKING_PAGE.confirmationPaymentNote}</p>
                </>
              )}
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
