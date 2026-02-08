
import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

const PRIMARY_PHONE = "7588316966";

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blush-100 text-blush-600 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
          Find Your Inner Peace
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
          Your Life Path Number carries clues<br />
          <span className="text-blush-400">that helps you understand yourself.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          The universe doesn't make mistakes. You have a special rhythm, and <span className="text-gray-900 font-semibold underline decoration-blush-300 underline-offset-4">numbers can help you find it</span>, so you are not feeling lost.
        </p>

        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
          "I'm Nandini. I show you how to align with the cosmic numbers that were always meant to lead you."
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          <button 
            onClick={onBookClick}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-blush-400 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-blush-500 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
          >
            <PhoneCall size={22} />
            Book a Call — Let’s Talk It Through
          </button>
          <a 
            href={`https://wa.me/91${PRIMARY_PHONE}?text=Hi Nandini, I want to ask a question before booking a consultation.`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-blush-200 px-10 py-5 rounded-full text-xl font-bold hover:bg-blush-50 transition-all shadow-md active:scale-95"
          >
            <MessageCircle size={22} className="text-green-500" />
            Chat on WhatsApp — Ask First
          </a>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-2">
           <div className="flex -space-x-3 mb-2">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-white bg-blush-100 flex items-center justify-center text-[10px] font-bold text-blush-600">+495</div>
           </div>
           <p className="text-sm text-gray-400 font-medium tracking-wide">
             No drama. No scary claims. <span className="text-blush-500">Just calm, honest guidance.</span>
           </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-br from-blush-100/40 via-white to-transparent rounded-full blur-[120px] -z-10"></div>
    </section>
  );
};

export default Hero;
