import React from 'react';
import { PhoneCall } from 'lucide-react';

interface ContactProps {
  onBookClick: () => void;
}

const PRIMARY_PHONE = "7588316966";
const SECONDARY_PHONE = "7448222924";

const Contact: React.FC<ContactProps> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-28 px-6 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Take The Next Step
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
            "If you've made it this far, something brought you here. <br />
            <span className="text-pink-700">Trust that feeling.</span>"
          </h2>
          <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Don't stay stuck in confusion. A simple, honest conversation can change everything.
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="mb-16">
          <button 
            onClick={onBookClick} 
            className="inline-flex items-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-10 py-5 sm:px-12 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <PhoneCall size={24} /> 
            Book Your Consultation
          </button>
        </div>

        {/* Direct Contact Options with Tappable Links */}
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xs mb-6">
            Reach Out Directly
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Primary Phone Link */}
            <div className="bg-pink-50/60 p-6 rounded-3xl border border-pink-200">
              <span className="block text-[11px] font-bold text-pink-800 uppercase tracking-widest mb-1.5">
                Primary Number (Call & WhatsApp)
              </span>
              <a 
                href={`tel:+91${PRIMARY_PHONE}`} 
                className="text-pink-800 hover:text-pink-900 font-extrabold text-2xl tracking-tight block hover:underline"
              >
                +91 {PRIMARY_PHONE.slice(0, 5)} {PRIMARY_PHONE.slice(5)}
              </a>
              <p className="text-xs text-gray-600 mt-2">Tap to call directly</p>
            </div>

            {/* Secondary Phone Link */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <span className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                Secondary Number
              </span>
              <a 
                href={`tel:+91${SECONDARY_PHONE}`} 
                className="text-gray-900 hover:text-pink-700 font-extrabold text-2xl tracking-tight block hover:underline"
              >
                +91 {SECONDARY_PHONE.slice(0, 5)} {SECONDARY_PHONE.slice(5)}
              </a>
              <p className="text-xs text-gray-600 mt-2">Tap to call directly</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
