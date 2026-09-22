import React from 'react';
import { MessageCircle, PhoneCall, Clock, Shield } from 'lucide-react';

interface HeroProps {
  onBookClick: (serviceName?: string) => void;
}

const PRIMARY_PHONE = "7588316966";

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative pt-28 pb-14 md:pt-36 md:pb-20 px-4 sm:px-6 overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Label Badge: "Numerology for Inner Peace" */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 md:mb-6 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
          Numerology for Inner Peace
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-4 md:mb-5 tracking-tight">
          Your birth date holds clues.<br />
          <span className="text-pink-700">Let’s read them together.</span>
        </h1>

        {/* Hero Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Your birth date contains numbers that can reveal patterns about who you are and where you’re headed.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
          <button 
            onClick={() => onBookClick("Personal Numerology Reading (₹1,099)")} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-700 hover:bg-pink-800 text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-sm sm:text-base font-bold transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <PhoneCall size={17} /> 
            Book a Call
          </button>
          <a 
            href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent("Hi Nandinii, I'd like to ask a quick question before booking a consultation.")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-sm sm:text-base font-bold transition-all shadow-xs active:scale-95"
          >
            <MessageCircle size={17} className="text-green-600" /> 
            Chat on WhatsApp
          </a>
        </div>

        {/* 100% Online Consultation & Working Hours */}
        <div className="mt-6 md:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-700 font-semibold">
          <div className="inline-flex items-center gap-1.5 bg-pink-50/80 border border-pink-200 px-3 py-1.5 rounded-full shadow-2xs">
            <Shield size={14} className="text-pink-700 shrink-0" />
            <span>100% Online Consultations (Worldwide)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-pink-50/80 border border-pink-200 px-3 py-1.5 rounded-full shadow-2xs">
            <Clock size={14} className="text-pink-700 shrink-0" />
            <span>Working Hours: Mon – Sat, 10:00 AM – 7:30 PM IST</span>
          </div>
        </div>

      </div>

      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] bg-pink-100/40 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
