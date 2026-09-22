import React, { useRef, useState } from 'react';
import { MousePointer2, User, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    stepBadge: "Step 1",
    icon: <MousePointer2 className="w-7 h-7 sm:w-8 sm:h-8 text-pink-700" />,
    title: "1. Book a Call or WhatsApp"
  },
  {
    num: "02",
    stepBadge: "Step 2",
    icon: <User className="w-7 h-7 sm:w-8 sm:h-8 text-pink-700" />,
    title: "2. Share Name & Date of Birth"
  },
  {
    num: "03",
    stepBadge: "Step 3",
    icon: <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-pink-700" />,
    title: "3. Get Your Reading & Follow-Up"
  }
];

const HowItWorks: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / steps.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.8;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < steps.length && newIndex !== activeStep) {
        setActiveStep(newIndex);
      }
    }
  };

  return (
    <section id="how-it-works" className="py-10 sm:py-12 md:py-14 bg-pink-50/30 px-4 sm:px-6 scroll-mt-20 border-t border-pink-100/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-2 sm:mb-3">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-xl mx-auto px-2">
            From booking to consultation, everything is designed to be calm, simple, and reassuring.
          </p>
        </div>

        {/* Mobile Step Switcher & Swipe Hint */}
        <div className="flex md:hidden items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-1.5">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => scrollToStep(idx)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  activeStep === idx 
                    ? 'bg-pink-700 text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-pink-100 hover:bg-pink-50'
                }`}
              >
                <span>{step.stepBadge}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-pink-700 font-medium">
            <span>Swipe</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Horizontal Container on Mobile / 3-Column Grid on Desktop */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-4 md:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-6 border border-pink-100/90 shadow-2xs hover:shadow-md transition-all text-center flex flex-col justify-between relative group"
            >
              {/* Step number watermark */}
              <div className="absolute top-3 right-4 text-xl sm:text-2xl font-black text-pink-100 select-none group-hover:text-pink-200 transition-colors">
                {step.num}
              </div>

              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-pink-50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto border border-pink-200 mb-3 sm:mb-4">
                  {step.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-base font-bold text-gray-900">{step.title}</h3>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-50 text-[11px] font-bold text-pink-700 uppercase tracking-wider md:hidden">
                {step.stepBadge} of 3
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls / Indicators */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-4">
          <button
            onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`p-2 rounded-full border transition-all ${
              activeStep === 0 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-pink-200 bg-white text-pink-700 hover:bg-pink-50 shadow-xs cursor-pointer'
            }`}
            aria-label="Previous step"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeStep === idx ? 'w-6 bg-pink-700' : 'w-2 bg-pink-200 hover:bg-pink-300'
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className={`p-2 rounded-full border transition-all ${
              activeStep === steps.length - 1 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-pink-200 bg-white text-pink-700 hover:bg-pink-50 shadow-xs cursor-pointer'
            }`}
            aria-label="Next step"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
