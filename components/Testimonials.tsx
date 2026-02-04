import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Khushi Chauhan",
    quote: "After our call, I felt like a weight was lifted. I knew exactly what to do. Now I'm in my dream role!"
  },
  {
    name: "Bhavyaa",
    quote: "Learning my numbers helped me accept myself. I feel so much more calm and peaceful now."
  },
  {
    name: "Shivani Singh",
    quote: "The yearly forecast showed me it was just a waiting phase. I stayed patient, and now we're growing again."
  },
  {
    name: "Mrunmayee Mahajan",
    quote: "Wow...amazinggg....I mean what an insight"
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current, isAnimating]);

  return (
    <section id="testimonials" className="py-24 px-6 bg-pink-50/30 overflow-hidden relative scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-10">
          <Quote size={120} className="text-pink-400" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-16 relative z-10">Happy Hearts</h2>
        
        <div className="relative z-10">
          <div className={`bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-pink-50 transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-medium text-gray-800 leading-relaxed">
                "{reviews[current].quote}"
              </p>
              
              <div className="flex flex-col items-center pt-8 border-t border-pink-50">
                <h4 className="font-bold text-gray-900 text-lg uppercase tracking-wider">{reviews[current].name}</h4>
                <div className="flex gap-1 mt-1 text-pink-300">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={prev} 
              className="w-14 h-14 rounded-full border-2 border-pink-200 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all shadow-sm active:scale-90"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-pink-400' : 'w-2 bg-pink-200'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="w-14 h-14 rounded-full border-2 border-pink-200 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all shadow-sm active:scale-90"
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;