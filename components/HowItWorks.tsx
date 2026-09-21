import React from 'react';
import { MousePointer2, User, Sparkles } from 'lucide-react';

const steps = [
  {
    num: "01",
    icon: <MousePointer2 className="w-8 h-8 text-pink-700" />,
    title: "1. Book a Call or WhatsApp",
    description: "Pick the reading that fits your question and confirm your preferred slot via our quick form or message Nandinii directly on WhatsApp."
  },
  {
    num: "02",
    icon: <User className="w-8 h-8 text-pink-700" />,
    title: "2. Share Name & Date of Birth",
    description: "Send your official full name, preferred name, and birth date. All personal information is treated with strict confidentiality."
  },
  {
    num: "03",
    icon: <Sparkles className="w-8 h-8 text-pink-700" />,
    title: "3. Get Your Reading & Follow-Up",
    description: "Connect for a relaxed 45-min 1-on-1 call (phone or video), ask your questions, and receive your written summary guide within 24–48 hours."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-pink-50/30 px-6 scroll-mt-20 border-t border-pink-100/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
            From booking to consultation, everything is designed to be calm, simple, and reassuring.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm hover:shadow-md transition-all text-center space-y-4 relative"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto border border-pink-200">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
