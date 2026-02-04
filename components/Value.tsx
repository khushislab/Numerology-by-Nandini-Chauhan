import React from 'react';
import { Heart, Brain, Navigation, Sun } from 'lucide-react';

const values = [
  {
    icon: <Brain className="text-blush-400" />,
    title: "Clear mind for decisions",
    desc: "Stop the mental fog and choose your path with confidence."
  },
  {
    icon: <Navigation className="text-blush-400" />,
    title: "Confidence in next steps",
    desc: "Know exactly where you are going and why it's right for you."
  },
  {
    icon: <Heart className="text-blush-400" />,
    title: "Emotional relief and calm",
    desc: "Let go of the heavy anxiety and breathe a sigh of relief."
  },
  {
    icon: <Sun className="text-blush-400" />,
    title: "Understanding problems",
    desc: "See the root cause of why things happen so you can fix them."
  }
];

const Value: React.FC = () => {
  return (
    <section id="value" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">What You Will Actually Get</h2>
        <p className="text-gray-500 text-xl mb-16 max-w-2xl mx-auto">
          Beyond charts and numbers, this is how your life feels after our talk.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-blush-100/20 border border-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-blush-50">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;