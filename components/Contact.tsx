import React from 'react';
import { PhoneCall } from 'lucide-react';

interface ContactProps {
  onBookClick: () => void;
}

const PRIMARY_PHONE = "7588316966";
const SECONDARY_PHONE = "7448222924";

const Contact: React.FC<ContactProps> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="mb-6 sm:mb-8 md:mb-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Take The Next Step
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-3 leading-snug">
            "If you've made it this far, something brought you here. <br />
            <span className="text-pink-700">Trust that feeling.</span>"
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-xl mx-auto leading-relaxed font-medium">
            Don't stay stuck in confusion. A simple, honest conversation can change everything.
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="mb-8 sm:mb-10">
          <button 
            onClick={onBookClick} 
            className="inline-flex items-center gap-2 bg-pink-700 hover:bg-pink-800 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <PhoneCall size={18} /> 
            Book Your Consultation
          </button>
        </div>

        {/* Direct Contact Options with Tappable Links */}
        <div className="max-w-xl mx-auto">
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4">
            Reach Out Directly
          </p>
          
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Primary Phone Link */}
            <div className="bg-pink-50/60 p-4 sm:p-5 rounded-2xl border border-pink-200">
              <span className="block text-[10px] sm:text-[11px] font-bold text-pink-800 uppercase tracking-widest mb-1">
                Primary (Call & WhatsApp)
              </span>
              <a 
                href={`tel:+91${PRIMARY_PHONE}`} 
                className="text-pink-800 hover:text-pink-900 font-extrabold text-lg sm:text-xl tracking-tight block hover:underline"
              >
                +91 {PRIMARY_PHONE.slice(0, 5)} {PRIMARY_PHONE.slice(5)}
              </a>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Tap to call directly</p>
            </div>

            {/* Secondary Phone Link */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200">
              <span className="block text-[10px] sm:text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1">
                Secondary Number
              </span>
              <a 
                href={`tel:+91${SECONDARY_PHONE}`} 
                className="text-gray-900 hover:text-pink-700 font-extrabold text-lg sm:text-xl tracking-tight block hover:underline"
              >
                +91 {SECONDARY_PHONE.slice(0, 5)} {SECONDARY_PHONE.slice(5)}
              </a>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Tap to call directly</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
