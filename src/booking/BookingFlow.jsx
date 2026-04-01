import React, { useState } from 'react';
import { X, Car, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, Star, Zap, Shield, CheckCircle, Users, Gauge } from 'lucide-react';

const CARS = [
  {
    id: 'prius',
    name: 'Toyota Prius',
    year: '2023',
    type: 'Hybride',
    seats: 5,
    transmission: 'Automatique',
    rating: 4.9,
    reviews: 128,
    price: 700,
    available: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg/1280px-2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg',
    features: [['⚡', 'Hybride'], ['🛡️', 'Assuré'], ['⛽', 'Inclus']],
  },
  {
    id: 'model3',
    name: 'Tesla Model 3',
    year: '2024',
    type: 'Électrique',
    seats: 5,
    transmission: 'Automatique',
    rating: 5.0,
    reviews: 64,
    price: 950,
    available: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_%28facelift%2C_red%29%2C_front_8.15.19.jpg/1280px-2019_Tesla_Model_3_Performance_AWD_%28facelift%2C_red%29%2C_front_8.15.19.jpg',
    features: [['⚡', 'Électrique'], ['🛡️', 'Assuré'], ['📱', 'Connecté']],
  },
];

const STEPS = ['Véhicule', 'Date & Heure', 'Adresse', 'Confirmation'];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-3 sm:gap-4">
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              done ? 'bg-bolt-green text-white shadow-lg shadow-bolt-green/25'
              : active ? 'ring-2 ring-bolt-green ring-offset-2 bg-white text-bolt-green'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {done ? <CheckCircle size={18} className="stroke-2" /> : i + 1}
            </div>
            <span className={`text-[11px] font-semibold hidden sm:block transition-colors duration-300 ${
              active ? 'text-bolt-green font-bold'
              : done ? 'text-bolt-green/70'
              : 'text-gray-400'
            }`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-1 w-8 sm:w-12 mx-0.5 sm:mx-1 transition-all duration-500 rounded-full ${
              done ? 'bg-bolt-green shadow-md shadow-bolt-green/20' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ── Step 1 — Choisir un véhicule ── */
const StepVehicle = ({ selected, onSelect }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-bolt-dark">Choisissez votre véhicule</h2>
      <p className="text-gray-500 text-sm mt-2">Sélectionnez la voiture qui vous convient le mieux</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CARS.map(car => (
        <button
          key={car.id}
          onClick={() => car.available && onSelect(car)}
          disabled={!car.available}
          className={`text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
            !car.available ? 'opacity-60 cursor-not-allowed border-transparent'
            : selected?.id === car.id
              ? 'border-bolt-green shadow-lg shadow-bolt-green/15 scale-[1.01]'
              : 'border-gray-100 hover:border-bolt-green/40 hover:shadow-md'
          }`}
        >
          {/* Image */}
          <div className="relative">
            <img src={car.image} alt={car.name} className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {!car.available ? (
              <span className="absolute top-3 left-3 bg-gray-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                Bientôt disponible
              </span>
            ) : (
              <span className="absolute top-3 left-3 bg-bolt-green text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                Disponible
              </span>
            )}
            {selected?.id === car.id && (
              <div className="absolute top-3 right-3 w-7 h-7 bg-bolt-green rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-yellow-400 text-sm font-semibold">
              <Star size={12} fill="currentColor" />
              <span>{car.rating}</span>
              <span className="text-white/60 text-xs font-normal">· {car.reviews} avis</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-bolt-dark text-lg leading-tight">{car.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{car.type} · {car.seats} places · {car.transmission}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-xl font-bold text-bolt-green">${car.price}</p>
                <p className="text-gray-400 text-xs">/heure</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {car.features.map(([icon, label]) => (
                <span key={label} className="flex items-center gap-1 bg-gray-50 border border-gray-100 text-xs text-gray-500 font-medium px-2.5 py-1 rounded-full">
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

/* ── Step 2 — Date & Heure ── */
const StepDateTime = ({ date, setDate, time, setTime, hours, setHours, car }) => (
  <div className="space-y-6 max-w-lg">
    <div>
      <h2 className="text-2xl font-bold text-bolt-dark">Quand souhaitez-vous conduire ?</h2>
      <p className="text-gray-500 text-sm mt-2">Sélectionnez la date, l'heure et la durée</p>
    </div>

    {/* Selected car reminder */}
    <div className="flex items-center gap-4 bg-white border-2 border-bolt-green/15 rounded-xl p-4 shadow-sm shadow-bolt-green/5">
      <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded-lg" />
      <div className="flex-1">
        <p className="font-bold text-bolt-dark text-sm">{car.name} <span className="text-gray-400 font-normal">{car.year}</span></p>
        <p className="text-bolt-green text-sm font-semibold mt-1">${car.price}<span className="text-gray-400 font-normal">/heure</span></p>
      </div>
    </div>

    {/* Date */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2.5 block">Date de départ</label>
      <div className="relative bg-white border-2 border-gray-200 rounded-xl h-14 flex items-center px-4 gap-3 focus-within:border-bolt-green focus-within:shadow-lg focus-within:shadow-bolt-green/10 transition-all duration-200">
        <Calendar size={18} className="text-bolt-green shrink-0" />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark font-medium placeholder-gray-400"
        />
      </div>
    </div>

    {/* Time */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2.5 block">Heure de départ</label>
      <div className="relative bg-white border-2 border-gray-200 rounded-xl h-14 flex items-center px-4 gap-3 focus-within:border-bolt-green focus-within:shadow-lg focus-within:shadow-bolt-green/10 transition-all duration-200">
        <Clock size={18} className="text-bolt-green shrink-0" />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark font-medium placeholder-gray-400"
        />
      </div>
    </div>

    {/* Duration */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2.5 block">Durée de conduite</label>
      <div className="bg-white border-2 border-gray-200 rounded-xl h-16 flex items-center justify-between px-4 transition-all duration-200">
        <button
          type="button"
          onClick={() => setHours(h => Math.max(1, h - 1))}
          className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-100 text-gray-600 hover:bg-bolt-green/10 hover:text-bolt-green transition-all duration-200 font-bold text-lg active:scale-95"
        >
          −
        </button>
        <div className="flex-1 text-center px-6">
          <span className="text-4xl font-bold text-bolt-dark">{hours}</span>
          <span className="text-gray-500 text-xs font-medium mt-1 block">{hours > 1 ? 'heures' : 'heure'}</span>
        </div>
        <button
          type="button"
          onClick={() => setHours(h => Math.min(24, h + 1))}
          className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-100 text-gray-600 hover:bg-bolt-green/10 hover:text-bolt-green transition-all duration-200 font-bold text-lg active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

/* ── Step 3 — Adresse ── */
const StepAddress = ({ address, setAddress, car, date, time, hours }) => (
  <div className="space-y-6 max-w-lg">
    <div>
      <h2 className="text-2xl font-bold text-bolt-dark">Où voulez-vous récupérer le véhicule ?</h2>
      <p className="text-gray-500 text-sm mt-2">Saisissez votre adresse de prise en charge</p>
    </div>

    <div className="bg-white border-2 border-gray-200 rounded-xl flex items-start p-4 gap-3 focus-within:border-bolt-green focus-within:shadow-lg focus-within:shadow-bolt-green/10 transition-all duration-200">
      <MapPin size={18} className="text-bolt-green mt-1 shrink-0" />
      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Ex: 12 Rue de la Paix, 75001 Paris"
        rows={2}
        className="flex-1 outline-none text-sm bg-transparent text-bolt-dark placeholder-gray-400 font-medium resize-none"
      />
    </div>

    {/* Summary preview */}
    <div className="bg-white border-2 border-gray-100 rounded-xl p-5 space-y-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Récapitulatif</p>
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded-lg" />
        <div>
          <p className="font-bold text-bolt-dark text-sm">{car.name}</p>
          <p className="text-gray-500 text-xs mt-0.5">{car.type} · {car.seats} places</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 text-sm">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-xs font-medium">Date</p>
          <p className="font-bold text-bolt-dark mt-1">{date || '—'}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-xs font-medium">Heure</p>
          <p className="font-bold text-bolt-dark mt-1">{time || '—'}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 col-span-2">
          <p className="text-gray-500 text-xs font-medium">Durée</p>
          <p className="font-bold text-bolt-dark mt-1">{hours} {hours > 1 ? 'heures' : 'heure'}</p>
        </div>
      </div>
    </div>
  </div>
);

/* ── Step 4 — Confirmation ── */
const StepConfirmation = ({ car, date, time, hours, address, onConfirm, confirmed }) => {
  const subtotal = car.price * hours;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
        <div className="w-24 h-24 rounded-full bg-bolt-green/10 flex items-center justify-center mb-6 animate-pulse">
          <CheckCircle size={48} className="text-bolt-green" />
        </div>
        <h2 className="text-3xl font-bold text-bolt-dark">Réservation confirmée !</h2>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
          Votre demande a été envoyée avec succès. Vous recevrez une confirmation par email sous peu.
        </p>
        <div className="bg-white border-2 border-bolt-green/20 rounded-xl p-5 mt-8 w-full text-left space-y-3">
          <p className="text-xs font-bold text-bolt-green uppercase tracking-wider">Résumé de la réservation</p>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Véhicule</p>
            <p className="font-bold text-bolt-dark text-sm">{car.name} {car.year}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-gray-500 font-medium mb-1">Durée</p>
              <p className="font-bold text-bolt-dark">{hours}h</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-gray-500 font-medium mb-1">Prix</p>
              <p className="font-bold text-bolt-green">${total.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-gray-500 font-medium mb-1">Date</p>
              <p className="font-bold text-bolt-dark">{date}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-500 text-xs font-medium mb-1">Adresse</p>
            <p className="text-bolt-dark text-xs font-medium">{address}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold text-bolt-dark">Confirmez votre réservation</h2>
        <p className="text-gray-500 text-sm mt-2">Vérifiez tous les détails avant de confirmer</p>
      </div>

      {/* Car */}
      <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="relative">
          <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold text-lg leading-tight">{car.name}</p>
            <p className="text-white/70 text-xs mt-0.5">{car.type} · {car.seats} places · {car.year}</p>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-500 text-xs font-medium">Date</p>
            <p className="font-bold text-bolt-dark mt-1 text-sm">{date}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-500 text-xs font-medium">Heure</p>
            <p className="font-bold text-bolt-dark mt-1 text-sm">{time}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-500 text-xs font-medium">Durée</p>
            <p className="font-bold text-bolt-dark mt-1 text-sm">{hours} {hours > 1 ? 'h' : 'h'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-500 text-xs font-medium">Adresse</p>
            <p className="font-bold text-bolt-dark mt-1 text-sm truncate">{address}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white border-2 border-gray-100 rounded-xl p-5 space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Détail du prix</p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">${car.price} × {hours} {hours > 1 ? 'heure' : 'heure'}</span>
          <span className="font-semibold text-bolt-dark">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxe (5%)</span>
          <span className="font-semibold text-bolt-dark">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100 mt-4">
          <span className="font-bold text-bolt-dark text-base">Total</span>
          <span className="text-bolt-green font-bold text-2xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-bolt-green text-white py-4 rounded-xl font-bold text-base hover:bg-[#29a366] active:scale-[0.98] transition-all shadow-lg shadow-bolt-green/30 flex items-center justify-center gap-2"
      >
        Confirmer la réservation <ChevronRight size={18} />
      </button>
      <p className="text-xs text-center text-gray-500 font-medium">✓ Annulation gratuite jusqu'à 24h avant le départ</p>
    </div>
  );
};

/* ── Main Component ── */
const Dashboard = ({ user, onClose }) => {
  const [step, setStep] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [address, setAddress] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 250);
  };

  const canNext = () => {
    if (step === 0) return !!selectedCar;
    if (step === 1) return !!date && !!time;
    if (step === 2) return address.trim().length > 3;
    return true;
  };

  const next = () => { if (canNext()) setStep(s => Math.min(3, s + 1)); };
  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Panel — full screen on mobile, centered card on desktop */}
      <div className={`relative w-full sm:max-w-2xl sm:max-h-[92vh] h-full sm:h-auto bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isClosing ? 'dashboard-closing' : 'dashboard-open'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold text-bolt-green uppercase tracking-widest">🚗 Bolt Drive</p>
            <h1 className="text-xl font-bold text-bolt-dark">Réserver un véhicule</h1>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-bolt-dark transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-center shrink-0">
          <StepIndicator current={step} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 0 && <StepVehicle selected={selectedCar} onSelect={setSelectedCar} />}
          {step === 1 && selectedCar && <StepDateTime car={selectedCar} date={date} setDate={setDate} time={time} setTime={setTime} hours={hours} setHours={setHours} />}
          {step === 2 && selectedCar && <StepAddress car={selectedCar} date={date} time={time} hours={hours} address={address} setAddress={setAddress} />}
          {step === 3 && selectedCar && <StepConfirmation car={selectedCar} date={date} time={time} hours={hours} address={address} onConfirm={() => setConfirmed(true)} confirmed={confirmed} />}
        </div>

        {/* Footer nav */}
        {!confirmed && (
          <div className="px-6 py-5 border-t border-gray-100 flex items-center gap-3 shrink-0 bg-white">
            {step > 0 && (
              <button
                onClick={back}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <ChevronLeft size={16} /> Retour
              </button>
            )}
            {step < 3 && (
              <button
                onClick={next}
                disabled={!canNext()}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm transition-all duration-200 ${
                  canNext()
                    ? 'bg-bolt-green text-white hover:bg-[#29a366] shadow-lg shadow-bolt-green/30 active:scale-[0.98]'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Continuer <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
