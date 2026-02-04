import React from 'react';
import { MousePointer2, CreditCard, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <MousePointer2 className="w-10 h-10 text-blush-400" />,
    title: "Choose your consultation",
    description: "Pick the service that fits your current situation best."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-blush-400" />,
    title: "Book & pay securely",
    description: "Confirm your slot and make a small payment for our time."
  },
  {
    icon: <Sparkles className="w-10 h-10 text-blush-400" />,
    title: "Get clarity on your call",
    description: "We talk, I listen, and you walk away feeling lighter."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-blush-100/10 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">It's Very Simple</h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-0.5 bg-blush-200 -z-10"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-lg flex items-center justify-center mx-auto mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-blush-100">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;