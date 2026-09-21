import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName || null);
    setIsBookingOpen(true);
  };
  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <FloatingNumbers />
      <Navbar onBookClick={() => openBooking()} />
      <main>
        <Hero onBookClick={openBooking} />
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
    </div>
  );
};

export default App;
