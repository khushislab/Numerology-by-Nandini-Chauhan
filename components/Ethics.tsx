
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Ethics: React.FC = () => {
  return (
    <section className="py-6 sm:py-16 px-3 sm:px-6 bg-white border-y border-pink-50">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-12 border border-gray-100 flex flex-row items-center gap-3 sm:gap-6 md:gap-8">
        <div className="shrink-0 bg-white p-2 sm:p-5 rounded-2xl sm:rounded-full shadow-xs border border-pink-100 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-pink-600" />
        </div>
        <div className="text-left">
          <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">
            Professional & Ethical Guidance
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed italic">
            "Numerology is a guidance tool. It does not replace medical, legal, or financial advice. We do not make magical claims or promises of instant riches. Results vary based on personal effort and life situation. We are here to support your clarity, not to dictate your life."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ethics;
