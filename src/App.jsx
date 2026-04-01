import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RPBanner from './components/ui/RPBanner';
import SignInModal from './components/ui/SignInModal';
import BookingFlow from './booking/BookingFlow';

import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Testimonial from './components/sections/Testimonial';
import VehicleTypes from './components/sections/VehicleTypes';
import PricingTabs from './components/sections/PricingTabs';
import CitySection from './components/sections/CitySection';
import FAQ from './components/sections/FAQ';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-bolt-dark selection:bg-bolt-green selection:text-white">
      <RPBanner />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showBooking && user && <BookingFlow user={user} onClose={() => setShowBooking(false)} />}
      <Navbar onSignIn={() => setShowSignIn(true)} onDashboard={() => setShowBooking(true)} user={user} />
      <main>
        <Hero />
        <Features />
        <HowItWorks onStartDriving={() => user ? setShowBooking(true) : setShowSignIn(true)} />
        <Testimonial />
        <VehicleTypes />
        <PricingTabs />
        <CitySection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
