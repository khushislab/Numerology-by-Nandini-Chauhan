import React from 'react';
import { PhoneCall } from 'lucide-react';

interface ContactProps {
  onBookClick: () => void;
}

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
        
        <div className="inline-block group scale-110 md:scale-125">
          <button 
            onClick={onBookClick}
            className="flex items-center gap-4 bg-blush-400 text-white px-14 py-7 rounded-full text-2xl font-bold shadow-2xl hover:bg-blush-500 transition-all transform hover:-translate-y-2 active:scale-95"
          >
            <PhoneCall size={32} />
            Book Your Consultation
          </button>
        </div>
        
        <div className="mt-20 flex flex-col items-center gap-3">
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-2">Direct Contact</p>
          <div className="text-blush-400 font-bold text-3xl cursor-default">
            +91 7448222924
          </div>
          <div className="w-12 h-1 bg-blush-100 rounded-full mt-4"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-blush-100/30 to-transparent"></div>
    </section>
  );
};

export default Contact;