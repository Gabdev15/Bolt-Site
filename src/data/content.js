export const HERO = {
  label: 'Bolt Drive',
  title: 'Pourquoi conduire quand il y a Bolt ?',
  description: "Pas de vérifications de service, de formulaires d'assurance, de prix de carburant ou de frais de stationnement. Roulez dans des voitures neuves à des tarifs bas avec les locations de voitures Bolt Drive.",
  cta: 'Commencer à conduire',
  backgroundImage: 'https://madeinvilnius.lt/wp-content/uploads/2025/06/bolt-drive-automobilis-vw-id-buzz-5-scaled.jpg',
};

export const FEATURES = {
  title: 'Location à la demande',
  subtitle: 'Payez pour le temps et la distance parcourus, rien de plus.',
  items: [
    {
      title: 'Rouler pour quelques minutes',
      description: 'Réservez une voiture, déverrouillez-la avec votre téléphone, et payez pour le temps ou la distance parcourue.',
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_2_24b4eed746.webp',
      alt: 'Minutes',
    },
    {
      title: 'Rouler pour plusieurs jours',
      description: "Louez à long terme, payez un tarif fixe affiché à l'avance, et réservez jusqu'à 30 jours à l'avance.",
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_1_fc24e16faf.webp',
      alt: 'Days',
    },
    {
      title: 'Stationner gratuitement',
      description: 'Pas de frais dans les zones désignées, que vous fassiez une pause ou terminiez votre trajet.',
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_3_a55319cc15.webp',
      alt: 'Parking',
    },
  ],
};

export const HOW_IT_WORKS = {
  title: 'Commencer à conduire',
  subtitle: 'Louez une voiture plus rapidement que trouver une place de parking.',
  cta: 'Commencer à conduire',
  steps: [
    {
      title: 'Créer un compte',
      description: 'Tout ce dont vous avez besoin est un permis de conduire valide et une carte de crédit.',
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_13_d6f922ca54.webp',
    },
    {
      title: 'Trouver une voiture à proximité',
      description: "Localisez une voiture en utilisant la carte de l'application ou en repérant une dans la rue.",
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_12_b008054e3e.webp',
    },
    {
      title: "Déverrouiller avec l'application",
      description: "Tout ce dont vous avez besoin, c'est de votre téléphone pour entrer, les clés sont à l'intérieur.",
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_11_e830d4118c.webp',
    },
    {
      title: 'Terminer votre trajet',
      description: 'Garez-vous, laissez la clé à l\'intérieur et poursuivez votre journée.',
      image: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_10_e2c56e25dc.webp',
    },
  ],
};

export const TESTIMONIAL = {
  quote: "« Je trouve que l'application est aussi assez intuitive. J'aime beaucoup le compteur qui montre pendant que vous conduisez combien vous dépensez, ce que les autres applications n'ont pas. »",
  author: 'Nikhil (Berlin)',
  role: 'Utilisateur de Bolt Drive',
  backgroundImage: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_9_e2fbc8e66e.webp',
};

export const VEHICLE_TYPES = {
  title: "Louez la voiture qu'il vous faut",
  subtitle: 'Toutes les voitures sont entièrement assurées, avec le plein et prêtes à rouler.',
};

export const PRICING_TABS = {
  title: 'Payez à la minute, à la journée, ou à la distance',
  subtitle: "Tous les tarifs incluent l'assurance, le carburant, et le stationnement.",
  cta: 'Commencer dès maintenant',
  tabs: [
    {
      label: 'Prépaiement',
      title: 'Réservez et partez à tout moment',
      desc: 'Payez à la minute ou au kilomètre et conduisez aussi longtemps et aussi loin que vous le souhaitez.',
      img: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_16_f6e3c84092.webp',
      alt: 'Prepayment',
    },
    {
      label: 'Locations longue durée',
      title: "Réservez jusqu'à 30 jours à l'avance",
      desc: "Payez un tarif fixe pour le nombre exact d'heures ou de jours pendant lesquels vous avez besoin de conduire.",
      img: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_15_8a3be56ca6.webp',
      alt: 'Long Term',
    },
  ],
};

export const CITY_SECTION = {
  title: 'Bolt Drive dans votre ville',
  description: "Consultez l'application pour trouver des parkings gratuits, des bornes de recharge et plus encore.",
  cta: 'Ouvrir Bolt',
  backgroundImage: 'https://assets.cms.bolt.eu/Bolt_Drive_Media_18_2312b11f16.webp',
};

export const BOOKING_PAGE = {
  location: 'Paris, France',
  confirmationTitle: 'Réservation confirmée !',
  confirmationCta: "Retour à l'accueil",
  confirmationVehiclePrefix: 'Votre',
  confirmationVehicleSuffix: 'vous attend. Paiement sur place.',
  confirmButtonLabel: 'Confirmer la réservation',
  confirmationPaymentNote: 'Paiement sur place. Annulation gratuite.',
  summaryTitle: 'Récapitulatif',
  totalLabel: 'Total estimé',
  steps: {
    dateTime: 'Date & Heure',
    vehicle: 'Véhicule',
    driver: 'Conducteur',
  },
  placeholders: {
    firstName: 'John',
    lastName: 'Doe',
    age: '25',
    phone: '06 12 34 56 78',
  },
};

export const BOOKING_FLOW = {
  title: 'Réserver un véhicule',
  label: '🚗 Bolt Drive',
  taxRate: 0.05,
  steps: ['Véhicule', 'Date & Heure', 'Adresse', 'Confirmation'],
  addressPlaceholder: 'Ex: 12 Rue de la Paix, 75001 Paris',
  cancelNote: "✓ Annulation gratuite jusqu'à 24h avant le départ",
  backButton: 'Retour',
  nextButton: 'Continuer',
  confirmButtonLabel: 'Confirmer la réservation',
  confirmationTitle: 'Réservation confirmée !',
  confirmationMessage: 'Votre demande a été envoyée avec succès. Vous recevrez une confirmation par email sous peu.',
  available: 'Disponible',
  unavailable: 'Bientôt disponible',
  vehicleStepTitle: 'Choisissez votre véhicule',
  vehicleStepSubtitle: 'Sélectionnez la voiture qui vous convient le mieux',
  dateTimeStepTitle: 'Quand souhaitez-vous conduire ?',
  dateTimeStepSubtitle: "Sélectionnez la date, l'heure et la durée",
  addressStepTitle: 'Où voulez-vous récupérer le véhicule ?',
  addressStepSubtitle: 'Saisissez votre adresse de prise en charge',
  confirmStepTitle: 'Confirmez votre réservation',
  confirmStepSubtitle: 'Vérifiez tous les détails avant de confirmer',
  summaryCardTitle: 'Récapitulatif',
};
