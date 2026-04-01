import React, { useState } from 'react';
import { X, Car, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  <div className="flex items-center justify-center gap-2 sm:gap-3 py-4 border-b border-slate-200">
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
              done ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
              : active ? 'ring-2 ring-green-600 ring-offset-2 bg-white text-green-600'
              : 'bg-slate-100 text-slate-500'
            }`}>
              {done ? <CheckCircle size={18} /> : i + 1}
            </div>
            <span className={`text-[11px] font-semibold hidden sm:block transition-colors duration-300 ${
              active ? 'text-green-600 font-bold'
              : done ? 'text-green-600/70'
              : 'text-slate-400'
            }`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-1 w-6 sm:w-10 mx-0.5 sm:mx-1 transition-all duration-500 rounded-full ${
              done ? 'bg-green-600 shadow-md shadow-green-600/20' : 'bg-slate-200'
            }`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const StepVehicle = ({ selected, onSelect }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Choisissez votre véhicule</h2>
      <p className="text-slate-500 text-sm mt-2">Sélectionnez la voiture qui vous convient le mieux</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CARS.map(car => (
        <button
          key={car.id}
          onClick={() => car.available && onSelect(car)}
          disabled={!car.available}
          className={`text-left rounded-xl border-2 overflow-hidden transition-all duration-200 ${
            !car.available ? 'opacity-50 cursor-not-allowed border-slate-200'
            : selected?.id === car.id
              ? 'border-green-600 shadow-lg shadow-green-600/15 scale-[1.01]'
              : 'border-slate-200 hover:border-green-600/40 hover:shadow-md'
          }`}
        >
          <div className="relative">
            <img src={car.image} alt={car.name} className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {!car.available ? (
              <span className="absolute top-3 left-3 bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Bientôt disponible
              </span>
            ) : (
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                Disponible
              </span>
            )}
            {selected?.id === car.id && (
              <div className="absolute top-3 right-3 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-yellow-400 text-sm font-semibold">
              <Star size={12} fill="currentColor" />
              <span>{car.rating}</span>
              <span className="text-white/60 text-xs font-normal">· {car.reviews} avis</span>
            </div>
          </div>

          <div className="p-4 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg leading-tight">{car.name}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{car.type} · {car.seats} places · {car.transmission}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-xl font-bold text-green-600">${car.price}</p>
                <p className="text-slate-400 text-xs">/heure</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {car.features.map(([icon, label]) => (
                <span key={label} className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium px-2.5 py-1 rounded-full">
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

const StepDateTime = ({ date, setDate, time, setTime, hours, setHours, car }) => (
  <div className="space-y-6 max-w-lg">
    <div>
      <h2 className="text-2xl font-bold">Quand souhaitez-vous conduire ?</h2>
      <p className="text-slate-500 text-sm mt-2">Sélectionnez la date, l'heure et la durée</p>
    </div>

    <Card className="border-green-600/20 bg-green-50/30">
      <CardContent className="pt-6 flex items-center gap-4">
        <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded-lg" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{car.name} <span className="text-slate-400 font-normal">{car.year}</span></p>
          <p className="text-green-600 text-sm font-semibold mt-1">${car.price}<span className="text-slate-400 font-normal">/heure</span></p>
        </div>
      </CardContent>
    </Card>

    <div>
      <label className="text-sm font-semibold block mb-2">Date de départ</label>
      <div className="relative flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/10 transition-all">
        <Calendar size={18} className="text-green-600 shrink-0" />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="flex-1 outline-none text-sm bg-transparent font-medium"
        />
      </div>
    </div>

    <div>
      <label className="text-sm font-semibold block mb-2">Heure de départ</label>
      <div className="relative flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/10 transition-all">
        <Clock size={18} className="text-green-600 shrink-0" />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="flex-1 outline-none text-sm bg-transparent font-medium"
        />
      </div>
    </div>

    <div>
      <label className="text-sm font-semibold block mb-2">Durée de conduite</label>
      <div className="flex items-center justify-between border-2 border-slate-200 rounded-lg p-3 bg-slate-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setHours(h => Math.max(1, h - 1))}
          className="text-xl font-bold"
        >
          −
        </Button>
        <div className="text-center">
          <div className="text-3xl font-bold">{hours}</div>
          <div className="text-xs text-slate-500 font-medium">{hours > 1 ? 'heures' : 'heure'}</div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setHours(h => Math.min(24, h + 1))}
          className="text-xl font-bold"
        >
          +
        </Button>
      </div>
    </div>
  </div>
);

const StepAddress = ({ address, setAddress, car, date, time, hours }) => (
  <div className="space-y-6 max-w-lg">
    <div>
      <h2 className="text-2xl font-bold">Où voulez-vous récupérer le véhicule ?</h2>
      <p className="text-slate-500 text-sm mt-2">Saisissez votre adresse de prise en charge</p>
    </div>

    <div className="flex items-start gap-3 border-2 border-slate-200 rounded-lg p-4 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/10 transition-all">
      <MapPin size={18} className="text-green-600 mt-1 shrink-0" />
      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Ex: 12 Rue de la Paix, 75001 Paris"
        rows={2}
        className="flex-1 outline-none text-sm bg-transparent placeholder-slate-400 font-medium resize-none"
      />
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
          <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded-lg" />
          <div>
            <p className="font-semibold text-sm">{car.name}</p>
            <p className="text-slate-500 text-xs mt-0.5">{car.type} · {car.seats} places</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Date</p>
            <p className="font-semibold text-sm mt-1">{date || '—'}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Heure</p>
            <p className="font-semibold text-sm mt-1">{time || '—'}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 col-span-2">
            <p className="text-slate-500 text-xs font-medium">Durée</p>
            <p className="font-semibold text-sm mt-1">{hours} {hours > 1 ? 'heures' : 'heure'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StepConfirmation = ({ car, date, time, hours, address, onConfirm, confirmed }) => {
  const subtotal = car.price * hours;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-pulse">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold">Réservation confirmée !</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
          Votre demande a été envoyée avec succès. Vous recevrez une confirmation par email sous peu.
        </p>
        <Card className="mt-8 w-full border-green-600/20 bg-green-50/30">
          <CardContent className="pt-6 space-y-3">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Résumé de la réservation</p>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Véhicule</p>
              <p className="font-semibold text-sm">{car.name} {car.year}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-slate-500 font-medium mb-1">Durée</p>
                <p className="font-bold">{hours}h</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-slate-500 font-medium mb-1">Prix</p>
                <p className="font-bold text-green-600">${total.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-slate-500 font-medium mb-1">Date</p>
                <p className="font-bold text-sm">{date}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-slate-500 text-xs font-medium mb-1">Adresse</p>
              <p className="font-medium text-xs">{address}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold">Confirmez votre réservation</h2>
        <p className="text-slate-500 text-sm mt-2">Vérifiez tous les détails avant de confirmer</p>
      </div>

      <Card>
        <div className="relative">
          <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold text-lg">{car.name}</p>
            <p className="text-white/70 text-xs mt-0.5">{car.type} · {car.seats} places · {car.year}</p>
          </div>
        </div>
        <CardContent className="pt-4 grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Date</p>
            <p className="font-semibold text-sm mt-1">{date}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Heure</p>
            <p className="font-semibold text-sm mt-1">{time}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Durée</p>
            <p className="font-semibold text-sm mt-1">{hours} {hours > 1 ? 'heures' : 'heure'}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Adresse</p>
            <p className="font-semibold text-sm mt-1 truncate">{address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Détail du prix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">${car.price} × {hours} {hours > 1 ? 'heures' : 'heure'}</span>
            <span className="font-semibold">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Taxe (5%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-3">
            <span className="font-semibold">Total</span>
            <span className="text-green-600 font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onConfirm}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-green-700 shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
      >
        Confirmer la réservation <ChevronRight size={18} />
      </Button>
      <p className="text-xs text-center text-slate-500 font-medium">✓ Annulation gratuite jusqu'à 24h avant le départ</p>
    </div>
  );
};

const BookingFlow = ({ user, onClose }) => {
  const [step, setStep] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [address, setAddress] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const canNext = () => {
    if (step === 0) return !!selectedCar;
    if (step === 1) return !!date && !!time;
    if (step === 2) return address.trim().length > 3;
    return true;
  };

  const next = () => { if (canNext()) setStep(s => Math.min(3, s + 1)); };
  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200 shrink-0">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">🚗 Bolt Drive</p>
            <DialogTitle className="text-xl">Réserver un véhicule</DialogTitle>
          </div>
        </DialogHeader>

        <StepIndicator current={step} />

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 0 && <StepVehicle selected={selectedCar} onSelect={setSelectedCar} />}
          {step === 1 && selectedCar && <StepDateTime car={selectedCar} date={date} setDate={setDate} time={time} setTime={setTime} hours={hours} setHours={setHours} />}
          {step === 2 && selectedCar && <StepAddress car={selectedCar} date={date} time={time} hours={hours} address={address} setAddress={setAddress} />}
          {step === 3 && selectedCar && <StepConfirmation car={selectedCar} date={date} time={time} hours={hours} address={address} onConfirm={() => setConfirmed(true)} confirmed={confirmed} />}
        </div>

        {!confirmed && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center gap-3 shrink-0 bg-white">
            {step > 0 && (
              <Button
                onClick={back}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Retour
              </Button>
            )}
            {step < 3 && (
              <Button
                onClick={next}
                disabled={!canNext()}
                className="flex-1 bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30"
              >
                Continuer <ChevronRight size={16} />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;
