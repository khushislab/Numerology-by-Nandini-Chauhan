
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Ethics: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white border-y border-pink-50">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 bg-white p-6 rounded-full shadow-inner">
          <ShieldCheck size={64} className="text-pink-600" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Professional & Ethical Guidance</h3>
          <p className="text-sm text-gray-500 leading-relaxed italic">
            "Numerology is a guidance tool. It does not replace medical, legal, or financial advice. We do not make magical claims or promises of instant riches. Results vary based on personal effort and life situation. We are here to support your clarity, not to dictate your life."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ethics;
