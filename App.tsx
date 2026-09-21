import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreeReading from './components/FreeReading';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Ethics from './components/Ethics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingNumbers from './components/FloatingNumbers';
import BookingModal from './components/BookingModal';
import FreeReadingModal from './components/FreeReadingModal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isFreeReadingOpen, setIsFreeReadingOpen] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-white">
      <FloatingNumbers />
      <Navbar onBookClick={() => openBooking()} />
      <main>
        <Hero onBookClick={openBooking} />
        <FreeReading onApplyClick={openFreeReading} />
        <About />
        <Services onBookClick={openBooking} />
        <HowItWorks />
        <Ethics />
        <FAQ />
        <Contact onBookClick={() => openBooking()} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      {isBookingOpen && <BookingModal onClose={closeBooking} selectedService={selectedService} />}
      {isFreeReadingOpen && <FreeReadingModal onClose={closeFreeReading} />}
    </div>
  );
};

export default App;
