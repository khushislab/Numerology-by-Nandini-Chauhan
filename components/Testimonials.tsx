import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from 'lucide-react';

interface TestimonialItem {
  name: string;
  rating: number;
  text: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Bhavyaa",
    rating: 5,
    text: "I was not really sure if this is going to work in the start. But the readings and breakdown help me find my inner strenght.",
  },
  {
    name: "Khushi",
    rating: 5,
    text: "The session felt like speaking to a wise, comforting friend. It was deeply reassuring.",
  },
  {
    name: "Mrunmayee Mahajan",
    rating: 5,
    text: "That was so great... i mean what a beautiful insight. Thank you, Nandini.",
  },
  {
    name: "Shivani Singh",
    rating: 5,
    text: "The readings were spot on. I was actually able to understand life style patterns and why something is happening atm.",
  },
  {
    name: "Megha Gaikwad",
    rating: 5,
    text: "The whole experience was really wholesome. Thanks a lot for talking to me. The good part of the session was when you gave me an understanding about numbers.",
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-advance carousel smoothly if not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section id="testimonials" className="py-5 sm:py-10 md:py-12 bg-white px-2.5 sm:px-6 scroll-mt-20 border-t border-pink-100/60">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-3.5 sm:mb-7">
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold tracking-[0.18em] text-pink-800 uppercase bg-pink-100 px-2.5 py-0.5 sm:py-1 rounded-full">
            <HeartHandshake size={11} className="text-pink-600 sm:w-3 sm:h-3" />
            Client Love & Trust
          </span>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 sm:mt-2 mb-0.5 sm:mb-1">
            Hear from others
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-600 max-w-md mx-auto line-clamp-1 sm:line-clamp-none">
            Honest reflections from clients who found clarity and alignment through their numbers.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-full sm:max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Card - Horizontal and Sleek on Mobile */}
          <div className="bg-pink-50/40 rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-pink-200/80 shadow-2xs relative overflow-hidden transition-all duration-300">
            {/* Background delicate quote icon */}
            <div className="absolute top-1.5 right-2 sm:top-4 sm:right-5 text-pink-100/60 pointer-events-none select-none">
              <Quote size={28} className="sm:w-10 sm:h-10 rotate-180" />
            </div>

            <div className="relative z-10 flex flex-col justify-between min-h-[96px] sm:min-h-[150px]">
              {/* Rating */}
              <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2.5">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={11} className="sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[11px] sm:text-sm text-gray-800 italic leading-snug sm:leading-relaxed mb-2 sm:mb-3">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-pink-100">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center text-[10px] sm:text-xs shadow-2xs shrink-0">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-sm font-bold text-gray-900 leading-none">
                      {testimonials[currentIndex].name}
                    </h4>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Verified Consultation</span>
                  </div>
                </div>

                <div className="text-[9px] sm:text-xs text-pink-700 font-semibold">
                  {currentIndex + 1} / {total}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-2 sm:mt-3 px-1">
            {/* Indicator Dots */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 sm:h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-4 sm:w-5 bg-pink-700' : 'w-1 sm:w-1.5 bg-pink-200 hover:bg-pink-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={prevSlide}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-pink-200 text-pink-700 flex items-center justify-center hover:bg-pink-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={13} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-pink-200 text-pink-700 flex items-center justify-center hover:bg-pink-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight size={13} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
