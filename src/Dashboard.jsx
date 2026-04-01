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
  <div className="flex items-center gap-0">
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              done ? 'bg-bolt-green text-white shadow-md shadow-bolt-green/30'
              : active ? 'bg-bolt-green text-white shadow-md shadow-bolt-green/30'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {done ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block ${active ? 'text-bolt-green' : done ? 'text-bolt-green/60' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-10 sm:w-16 mx-1 mb-4 transition-all duration-500 ${done ? 'bg-bolt-green' : 'bg-gray-100'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ── Step 1 — Choisir un véhicule ── */
const StepVehicle = ({ selected, onSelect }) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-2xl font-bold text-bolt-dark">Choisissez votre véhicule</h2>
      <p className="text-gray-400 text-sm mt-1">Sélectionnez la voiture qui vous convient</p>
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
      <h2 className="text-2xl font-bold text-bolt-dark">Date & Heure</h2>
      <p className="text-gray-400 text-sm mt-1">Quand souhaitez-vous conduire ?</p>
    </div>

    {/* Selected car reminder */}
    <div className="flex items-center gap-3 bg-bolt-green/5 border border-bolt-green/20 rounded-2xl p-4">
      <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded-xl" />
      <div>
        <p className="font-bold text-bolt-dark text-sm">{car.name} {car.year}</p>
        <p className="text-gray-400 text-xs">${car.price}/heure</p>
      </div>
    </div>

    {/* Date */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2 block">Date de départ</label>
      <div className="border-2 border-gray-100 rounded-2xl h-14 flex items-center px-4 gap-3 focus-within:border-bolt-green transition-colors bg-white">
        <Calendar size={18} className="text-gray-300 shrink-0" />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark font-medium"
        />
      </div>
    </div>

    {/* Time */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2 block">Heure de départ</label>
      <div className="border-2 border-gray-100 rounded-2xl h-14 flex items-center px-4 gap-3 focus-within:border-bolt-green transition-colors bg-white">
        <Clock size={18} className="text-gray-300 shrink-0" />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="flex-1 outline-none text-sm bg-transparent text-bolt-dark font-medium"
        />
      </div>
    </div>

    {/* Duration */}
    <div>
      <label className="text-sm font-bold text-bolt-dark mb-2 block">Durée de conduite</label>
      <div className="border-2 border-gray-100 rounded-2xl h-16 flex items-center px-3 bg-white">
        <button
          type="button"
          onClick={() => setHours(h => Math.max(1, h - 1))}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-bolt-green hover:text-bolt-green transition font-bold text-xl"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <span className="text-3xl font-bold text-bolt-dark">{hours}</span>
          <span className="text-gray-400 text-sm ml-2">{hours > 1 ? 'heures' : 'heure'}</span>
        </div>
        <button
          type="button"
          onClick={() => setHours(h => Math.min(24, h + 1))}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-bolt-green hover:text-bolt-green transition font-bold text-xl"
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
      <h2 className="text-2xl font-bold text-bolt-dark">Adresse de prise en charge</h2>
      <p className="text-gray-400 text-sm mt-1">Où voulez-vous récupérer le véhicule ?</p>
    </div>

    <div className="border-2 border-gray-100 rounded-2xl flex items-start p-4 gap-3 focus-within:border-bolt-green transition-colors bg-white">
      <MapPin size={18} className="text-bolt-green mt-0.5 shrink-0" />
      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Ex: 12 Rue de la Paix, 75001 Paris"
        rows={2}
        className="flex-1 outline-none text-sm bg-transparent text-bolt-dark placeholder-gray-300 font-medium resize-none"
      />
    </div>

    {/* Summary preview */}
    <div className="bg-[#F5F6F7] rounded-2xl p-5 space-y-3">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Récapitulatif</p>
      <div className="flex items-center gap-3">
        <img src={car.image} alt={car.name} className="w-16 h-11 object-cover rounded-xl" />
        <div>
          <p className="font-bold text-bolt-dark text-sm">{car.name} {car.year}</p>
          <p className="text-gray-400 text-xs">{car.type} · {car.seats} places</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white rounded-xl p-2.5">
          <p className="text-gray-400">Date</p>
          <p className="font-semibold text-bolt-dark mt-0.5">{date || '—'}</p>
        </div>
        <div className="bg-white rounded-xl p-2.5">
          <p className="text-gray-400">Heure</p>
          <p className="font-semibold text-bolt-dark mt-0.5">{time || '—'}</p>
        </div>
        <div className="bg-white rounded-xl p-2.5 col-span-2">
          <p className="text-gray-400">Durée</p>
          <p className="font-semibold text-bolt-dark mt-0.5">{hours} {hours > 1 ? 'heures' : 'heure'}</p>
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
        <div className="w-20 h-20 rounded-full bg-bolt-green/10 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-bolt-green" />
        </div>
        <h2 className="text-2xl font-bold text-bolt-dark">Pré-commande envoyée !</h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          Votre demande a été transmise. Vous recevrez une confirmation par email sous peu.
        </p>
        <div className="bg-bolt-green/8 border border-bolt-green/20 rounded-2xl p-4 mt-6 w-full text-left">
          <p className="text-xs font-bold text-bolt-green uppercase tracking-wider mb-2">Détails</p>
          <p className="text-sm font-semibold text-bolt-dark">{car.name} · {hours}h · ${total.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{date} à {time} — {address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold text-bolt-dark">Confirmez votre réservation</h2>
        <p className="text-gray-400 text-sm mt-1">Vérifiez les détails avant de confirmer</p>
      </div>

      {/* Car */}
      <div className="border-2 border-gray-100 rounded-2xl overflow-hidden">
        <div className="relative">
          <img src={car.image} alt={car.name} className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <p className="text-white font-bold text-lg leading-tight">{car.name} {car.year}</p>
            <p className="text-white/60 text-xs">{car.type} · {car.seats} places</p>
          </div>
        </div>
        <div className="p-4 bg-white grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Date</p>
            <p className="font-semibold text-bolt-dark mt-0.5">{date}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Heure</p>
            <p className="font-semibold text-bolt-dark mt-0.5">{time}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Durée</p>
            <p className="font-semibold text-bolt-dark mt-0.5">{hours} {hours > 1 ? 'heures' : 'heure'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Adresse</p>
            <p className="font-semibold text-bolt-dark mt-0.5 truncate">{address}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-[#F5F6F7] rounded-2xl p-5 space-y-2.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Prix</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>${car.price} × {hours} {hours > 1 ? 'heures' : 'heure'}</span>
          <span className="font-medium text-bolt-dark">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Taxe (5%)</span>
          <span className="font-medium text-bolt-dark">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-bolt-dark pt-3 border-t border-gray-200 text-base">
          <span>Total</span>
          <span className="text-bolt-green text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-bolt-green text-white py-4 rounded-full font-bold text-base hover:bg-[#29a366] active:scale-[0.98] transition-all shadow-lg shadow-bolt-green/25 flex items-center justify-center gap-2"
      >
        Confirmer la réservation <ChevronRight size={18} />
      </button>
      <p className="text-xs text-center text-gray-400">Annulation gratuite jusqu'à 24h avant le départ</p>
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
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-gray-100 shrink-0">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-bolt-green uppercase tracking-wider">Bolt Drive</p>
            <h1 className="text-lg font-bold text-bolt-dark leading-tight">Conduire maintenant</h1>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-bolt-dark transition"
          >
            <X size={17} />
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
          <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3 shrink-0 bg-white">
            {step > 0 && (
              <button
                onClick={back}
                className="flex items-center gap-1.5 px-5 py-3 rounded-full border-2 border-gray-100 text-gray-500 font-bold text-sm hover:border-gray-300 hover:text-bolt-dark transition"
              >
                <ChevronLeft size={16} /> Retour
              </button>
            )}
            {step < 3 && (
              <button
                onClick={next}
                disabled={!canNext()}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all ${
                  canNext()
                    ? 'bg-bolt-green text-white hover:bg-[#29a366] shadow-lg shadow-bolt-green/25 active:scale-[0.98]'
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
