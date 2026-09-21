import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

interface HeroProps {
  onBookClick: (serviceName?: string) => void;
}

const PRIMARY_PHONE = "7588316966";

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-36 px-4 sm:px-6 overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Label Badge: "Find Your Inner Peace" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold uppercase tracking-[0.2em]">
          Find Your Inner Peace
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.18] mb-6 tracking-tight">
          Your birth date holds clues.<br />
          <span className="text-pink-700">Let’s read them together.</span>
        </h1>

        {/* Hero Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          The universe doesn't make mistakes. You have a unique rhythm, and numbers can help you discover it — so you never have to feel lost.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button 
            onClick={() => onBookClick("Personal Numerology Reading (₹1,099)")} 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-8 py-4 sm:px-9 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <PhoneCall size={20} /> 
            Book a Call
          </button>
          <a 
            href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent("Hi Nandinii, I'd like to ask a quick question before booking a consultation.")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-800 border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 px-8 py-4 sm:px-9 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-md active:scale-95"
          >
            <MessageCircle size={20} className="text-green-600" /> 
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] bg-pink-100/40 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
