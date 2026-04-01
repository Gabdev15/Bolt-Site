import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 py-10 last:border-0">
      <button
        className="w-full flex justify-between items-start text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-3xl font-bold pr-12 text-white group-hover:text-bolt-green transition-colors">{question}</h3>
        <span className="flex-shrink-0 mt-2 bg-white/10 rounded-full p-2 group-hover:bg-bolt-green group-hover:text-white transition-colors">
          {isOpen ? <Minus size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-8 text-gray-400 leading-relaxed max-w-4xl text-xl">{answer}</div>
      )}
    </div>
  );
};

const FAQ = () => (
  <div id="entreprise" className="py-40 bg-[#0E1010] text-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-5xl md:text-7xl font-bold mb-20">Foire aux questions</h2>
      <FAQItem question="Qu'en est-il du stationnement ? Où puis-je me garer avec Bolt Drive ?" answer="Lorsque vous louez une voiture avec Bolt Drive, les frais de stationnement sont inclus dans le prix de votre location, pour que vous puissiez profiter du stationnement gratuit dans la zone opérationnelle dès que vous avez besoin de faire un arrêt." />
      <FAQItem question="Que se passe-t-il si je raye ou endommage la voiture ?" answer="En cas d'endommagement de la voiture, des frais peuvent vous être facturés. Pour plus de détails, veuillez lire les Conditions d'utilisation de Bolt Drive." />
      <FAQItem question="Quel type de voiture puis-je louer avec Bolt Drive?" answer="La marque et le modèle spécifique de la voiture de location dépendent de la disponibilité. Nos catégories de véhicules sont les suivantes : citadine, compacte, électrique et SUV." />
      <FAQItem question="Comment payer pour Bolt Drive ?" answer="Payez simplement avec votre appli Bolt comme vous le feriez pour un trajet Bolt ou une trottinette (carte de crédit/débit ou Apple Pay)." />
      <FAQItem question="Comment déverrouiller une voiture Bolt Drive ?" answer="Une fois que vous avez trouvé la voiture que vous souhaitez louer, il vous suffit d'appuyer sur le bouton dans votre appli Bolt pour déverrouiller le véhicule et commencer à conduire !" />
      <FAQItem question="Où je trouve les clés de la voiture ?" answer="Une fois que vous avez déverrouillé la voiture avec votre appli Bolt, vous trouverez les clés à l'intérieur de la voiture." />
      <FAQItem question="Puis-je faire des trajets interurbains avec les voitures Bolt Drive ?" answer="Certains véhicules prennent en charge les voyages interurbains, et des frais interurbains sont facturés à la fin du trajet." />
    </div>
  </div>
);

export default FAQ;
