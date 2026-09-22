import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreeReading from './components/FreeReading';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Ethics from './components/Ethics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingNumbers from './components/FloatingNumbers';
import BookingModal from './components/BookingModal';
import FreeReadingModal from './components/FreeReadingModal';
import ApplicationsSheetModal from './components/ApplicationsSheetModal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isFreeReadingOpen, setIsFreeReadingOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName || null);
    setIsBookingOpen(true);
  };
  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  const openFreeReading = () => setIsFreeReadingOpen(true);
  const closeFreeReading = () => setIsFreeReadingOpen(false);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  // Secret keyboard shortcut (Ctrl+Alt+A or Shift+Ctrl+L) for quick owner access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) || 
          (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L'))) {
        e.preventDefault();
        setIsSheetOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <FloatingNumbers />
      <Navbar onBookClick={() => openBooking()} />
      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <Services onBookClick={openBooking} />
        <Testimonials />
        <FreeReading onApplyClick={openFreeReading} />
        <HowItWorks />
        <Ethics />
        <FAQ />
        <Contact onBookClick={() => openBooking()} />
      </main>
      <Footer onOpenAdminSheet={openSheet} />
      <FloatingWhatsApp />
      {isBookingOpen && <BookingModal onClose={closeBooking} selectedService={selectedService} />}
      {isFreeReadingOpen && <FreeReadingModal onClose={closeFreeReading} />}
      {isSheetOpen && (
        <ApplicationsSheetModal 
          onClose={closeSheet} 
          onOpenApplyModal={() => {
            closeSheet();
            openFreeReading();
          }} 
        />
      )}
    </div>
  );
};

export default App;
