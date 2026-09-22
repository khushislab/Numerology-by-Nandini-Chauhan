
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Ethics: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 md:py-10 px-3 sm:px-6 bg-white border-y border-pink-50">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 border border-gray-100 flex flex-row items-center gap-3 sm:gap-5 md:gap-6">
        <div className="shrink-0 bg-white p-2 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl shadow-xs border border-pink-100 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-pink-600" />
        </div>
        <div className="text-left">
          <h3 className="text-xs sm:text-base md:text-base font-bold text-gray-900 mb-1 tracking-tight">
            Professional & Ethical Guidance
          </h3>
          <p className="text-[10px] sm:text-xs md:text-xs text-gray-600 leading-relaxed italic">
            "Numerology is a guidance tool. It does not replace medical, legal, or financial advice. We do not make magical claims or promises of instant riches. Results vary based on personal effort and life situation. We are here to support your clarity, not to dictate your life."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ethics;
