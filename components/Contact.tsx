
import React from 'react';
import { PhoneCall } from 'lucide-react';

interface ContactProps {
  onBookClick: () => void;
}

const PRIMARY_PHONE = "7588316966";
const SECONDARY_PHONE = "7448222924";

const Contact: React.FC<ContactProps> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-10 leading-tight">
            "If you reached here, something brought you. <br />
            <span className="text-blush-400">Trust that feeling.</span>"
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Don't stay stuck in confusion. A simple, honest conversation can change everything.
          </p>
        </div>
        
        <div className="inline-block group scale-110 md:scale-125 mb-24">
          <button 
            onClick={onBookClick}
            className="flex items-center gap-4 bg-blush-400 text-white px-14 py-7 rounded-full text-2xl font-bold shadow-2xl hover:bg-blush-500 transition-all transform hover:-translate-y-2 active:scale-95"
          >
            <PhoneCall size={32} />
            Book Your Consultation
          </button>
        </div>
        
        <div className="mt-20">
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-8">Reach Out Directly</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-blush-100/30 p-8 rounded-[2.5rem] border border-blush-100 group hover:border-blush-400 transition-all duration-300">
              <span className="block text-[10px] font-black text-blush-400 uppercase tracking-[0.3em] mb-3">Primary</span>
              <div className="text-blush-600 font-bold text-2xl md:text-3xl tracking-tighter">
                +{PRIMARY_PHONE}
              </div>
              <div className="w-8 h-1 bg-blush-200 rounded-full mt-4 mx-auto group-hover:w-16 transition-all"></div>
            </div>
            
            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-gray-300 transition-all duration-300">
              <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Secondary</span>
              <div className="text-gray-700 font-bold text-2xl md:text-3xl tracking-tighter">
                +{SECONDARY_PHONE}
              </div>
              <div className="w-8 h-1 bg-gray-200 rounded-full mt-4 mx-auto group-hover:w-16 transition-all"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-blush-100/30 to-transparent"></div>
    </section>
  );
};

export default Contact;
