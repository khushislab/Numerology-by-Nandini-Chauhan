import React from 'react';
import { Check } from 'lucide-react';

interface ServiceItem {
  name: string;
  price: number;
  description: string;
  outcomes: string[];
}

interface ServicesProps {
  onBookClick: () => void;
}

const services: ServiceItem[] = [
  {
    name: "Personal Numerology Reading",
    price: 499,
    description: "Understand who you really are and your life's purpose.",
    outcomes: ["Feel clear about your next step", "Understand why problems repeat", "Feel calm and less confused", "Know what to focus on"]
  },
  {
    name: "Relationship Compatibility",
    price: 599,
    description: "See how your numbers vibe with your partner's.",
    outcomes: ["Reduce arguments and stress", "Understand your partner's nature", "Bring back the harmony", "Know the best way to talk"]
  },
  {
    name: "Career & Business",
    price: 799,
    description: "Find the right work path for financial peace.",
    outcomes: ["Choose the right job or business", "Pick the best dates for deals", "Attract better growth", "Feel confident in work"]
  },
  {
    name: "Name Analysis / Correction",
    price: 399,
    description: "Check if your name energy matches your goals.",
    outcomes: ["Remove small blocks in life", "Feel more lucky and positive", "Improve your daily energy", "Better first impressions"]
  },
  {
    name: "Baby Name Numerology",
    price: 800,
    description: "Gift your child a name that brings balance.",
    outcomes: ["Give them a balanced start", "Support their natural talents", "Peaceful family energy", "A life full of harmony"]
  },
  {
    name: "House / Property",
    price: 399,
    description: "Ensure your home is a place of rest.",
    outcomes: ["Sleep better at night", "Feel happy being home", "Positive family time", "Remove heavy feelings"]
  },
  {
    name: "Mobile Number",
    price: 399,
    description: "Your digital identity matters too.",
    outcomes: ["Better calls and messages", "Help your business grow", "Clearer communication", "Positive digital vibes"]
  },
  {
    name: "Yearly Forecast",
    price: 399,
    description: "Know what to expect in the coming 12 months.",
    outcomes: ["Plan your year better", "Avoid unnecessary risks", "Know when to wait or act", "Less surprises, more peace"]
  },
  {
    name: "Emotional Healing",
    price: 599,
    description: "Special guidance for tough times.",
    outcomes: ["Release old hurts", "Stop overthinking", "Find emotional strength", "Wake up feeling lighter"]
  },
  {
    name: "Life Pattern Analysis",
    price: 699,
    description: "Deep dive into recurring life cycles.",
    outcomes: ["Break old habits", "Find why life repeats", "Master your time cycles", "Feel in control of life"]
  }
];

const Services: React.FC<ServicesProps> = ({ onBookClick }) => {
  return (
    <section id="services" className="py-24 px-6 bg-white relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Choose what you need today. Simple solutions for a peaceful tomorrow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-blush-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blush-400 transition-colors">{service.name}</h3>
              <p className="text-gray-500 text-sm mb-8">{service.description}</p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {service.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 text-[15px] text-gray-600 font-medium">
                    <Check size={18} className="text-blush-400 mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">₹{service.price}</span>
                <button 
                  onClick={onBookClick}
                  className="bg-blush-100 text-blush-600 px-8 py-3 rounded-full text-sm font-bold hover:bg-blush-400 hover:text-white transition-all transform active:scale-95"
                >
                  Book a Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;