import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

import { NotificationProvider } from './context/NotificationContext';
import NotificationStack from './components/ui/NotificationStack';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RPBanner from './components/ui/RPBanner';
import SignInModal from './components/ui/SignInModal';
import BookingPage from './booking/BookingPage';

import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Testimonial from './components/sections/Testimonial';
import VehicleTypes from './components/sections/VehicleTypes';
import PricingTabs from './components/sections/PricingTabs';
import CitySection from './components/sections/CitySection';
import FAQ from './components/sections/FAQ';

function AppContent() {
  const [showSignIn, setShowSignIn]   = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser]               = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleBooking = () => setShowBooking(true);

  return (
    <div className="min-h-screen bg-white font-sans text-bolt-dark selection:bg-bolt-green selection:text-white">
      <RPBanner />
      {showSignIn  && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showBooking && <BookingPage user={user} onClose={() => setShowBooking(false)} />}
      <Navbar onSignIn={() => setShowSignIn(true)} onDashboard={handleBooking} user={user} />
      <main>
        <Hero onStartDriving={handleBooking} />
        <Features />
        <HowItWorks onStartDriving={handleBooking} />
        <Testimonial />
        <VehicleTypes />
        <PricingTabs onStartDriving={handleBooking} />
        <CitySection onStartDriving={handleBooking} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <NotificationStack />
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
