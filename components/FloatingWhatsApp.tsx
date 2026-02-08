
import React from 'react';
import { MessageCircle } from 'lucide-react';

const PRIMARY_PHONE = "7588316966";

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={`https://wa.me/91${PRIMARY_PHONE}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 active:scale-95 group"
    >
      <div className="hidden md:block overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-500 font-bold">
        Chat Now
      </div>
      <MessageCircle size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
