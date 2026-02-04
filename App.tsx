
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Value from './components/Value';
import Testimonials from './components/Testimonials';
import Ethics from './components/Ethics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingNumbers from './components/FloatingNumbers';
import BookingModal from './components/BookingModal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative min-h-screen">
      <FloatingNumbers />
      <Navbar onBookClick={openBooking} />
      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <Services onBookClick={openBooking} />
        <HowItWorks />
        <Value />
        <Testimonials />
        <Ethics />
        <FAQ />
        <Contact onBookClick={openBooking} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      {isBookingOpen && <BookingModal onClose={closeBooking} />}
    </div>
  );
};

export default App;
