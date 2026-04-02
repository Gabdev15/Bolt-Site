import React, { useState } from 'react';
import { ChevronRight, Star, CheckCircle, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PRIUS = {
  id: 'prius',
  name: 'Toyota Prius',
  year: '2023',
  type: 'Hybride',
  seats: 5,
  transmission: 'Automatique',
  rating: 4.9,
  reviews: 128,
  price: 700,
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg/1280px-2023_Toyota_Prius_XLE_%28US%29%2C_front_8.27.22.jpg',
  features: [['⚡', 'Hybride'], ['🛡️', 'Assuré'], ['⛽', 'Inclus']],
};

const PriusCard = () => (
  <Card className="overflow-hidden border-slate-200 shadow-lg">
    <div className="relative">
      <img src={PRIUS.image} alt={PRIUS.name} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <p className="text-white font-bold text-2xl">{PRIUS.name}</p>
        <p className="text-white/80 text-sm mt-1">{PRIUS.type} · {PRIUS.seats} places · {PRIUS.year}</p>
      </div>
      <div className="absolute top-4 left-4 flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
        <CheckCircle size={14} /> Disponible
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-yellow-300 text-sm font-semibold bg-black/30 px-3 py-1.5 rounded-full">
        <Star size={14} fill="currentColor" />
        <span>{PRIUS.rating}</span>
        <span className="text-white/70 text-xs font-normal">· {PRIUS.reviews} avis</span>
      </div>
    </div>
    <CardContent className="pt-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">Prix par heure</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${PRIUS.price}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm font-medium">Transmission</p>
          <p className="text-lg font-semibold mt-1">{PRIUS.transmission}</p>
        </div>
      </div>

      <div>
        <p className="text-slate-600 text-sm font-medium mb-3">Inclus</p>
        <div className="flex gap-2 flex-wrap">
          {PRIUS.features.map(([icon, label]) => (
            <span key={label} className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-sm text-slate-700 font-medium px-3 py-2 rounded-lg">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 space-y-3">
        <p className="text-slate-600 text-sm font-medium">Détails du véhicule</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Année</p>
            <p className="font-semibold text-sm mt-1">{PRIUS.year}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Sièges</p>
            <p className="font-semibold text-sm mt-1">{PRIUS.seats} places</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Type</p>
            <p className="font-semibold text-sm mt-1">{PRIUS.type}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-slate-500 text-xs font-medium">Évaluation</p>
            <p className="font-semibold text-sm mt-1 text-yellow-500">{PRIUS.rating}/5.0</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BookingFlow = ({ user, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">🚗 Bolt Drive</p>
            <DialogTitle className="text-2xl">Conduire maintenant</DialogTitle>
            <p className="text-slate-500 text-sm mt-2">Réservez la Toyota Prius et commencez à conduire</p>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-8">
          <div className="max-w-lg mx-auto">
            <PriusCard />

            <div className="mt-8 space-y-4">
              <Button
                onClick={() => window.location.href = 'tel:+1234567890'}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-green-700 shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Appeler pour réserver
              </Button>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                <p className="text-slate-600 text-sm font-medium">
                  📍 Récupération à <span className="font-semibold">Townsend, USA</span>
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Paiement sur place. Annulation gratuite jusqu'à 24h avant le départ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;
