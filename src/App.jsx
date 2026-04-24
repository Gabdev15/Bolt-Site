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
import AdminDashboard from './admin/AdminDashboard';

import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Testimonial from './components/sections/Testimonial';
import VehicleTypes from './components/sections/VehicleTypes';
import PricingTabs from './components/sections/PricingTabs';
import CitySection from './components/sections/CitySection';
import FAQ from './components/sections/FAQ';

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

function AppContent() {
  const [showSignIn, setShowSignIn]   = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser]               = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // If user logs out while on admin page, redirect home
      if (!u) setCurrentPage('home');
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase());

  const handleBooking = () => setShowBooking(true);

  return (
    <>
      <RPBanner />
      {currentPage === 'admin' && isAdmin ? (
        <AdminDashboard onBack={() => setCurrentPage('home')} />
      ) : (
        <div className="min-h-screen bg-white font-sans text-bolt-dark selection:bg-bolt-green selection:text-white">
          {showSignIn  && <SignInModal onClose={() => setShowSignIn(false)} />}
          {showBooking && <BookingPage user={user} onClose={() => setShowBooking(false)} onSignIn={() => setShowSignIn(true)} />}
          <Navbar
            onSignIn={() => setShowSignIn(true)}
            onDashboard={handleBooking}
            onAdmin={() => setCurrentPage('admin')}
            isAdmin={isAdmin}
            user={user}
          />
          <main>
            <Hero onStartDriving={handleBooking} />
            <Features />
            <HowItWorks onStartDriving={handleBooking} />
            <Testimonial />
            <VehicleTypes onStartDriving={handleBooking} />
            <PricingTabs onStartDriving={handleBooking} />
            <CitySection onStartDriving={handleBooking} />
            <FAQ />
          </main>
          <Footer />
        </div>
      )}
    </>
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
