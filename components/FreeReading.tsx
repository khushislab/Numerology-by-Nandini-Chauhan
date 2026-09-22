import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface FreeReadingProps {
  onApplyClick: () => void;
}

const FreeReading: React.FC<FreeReadingProps> = ({ onApplyClick }) => {
  return (
    <section id="free-reading" className="py-8 sm:py-16 md:py-20 bg-pink-50/80 border-y border-pink-100 px-3 sm:px-6 relative overflow-hidden scroll-mt-20">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-pink-200/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* Animated blinking special card - compact and horizontal on mobile */}
        <div className="blink-card bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border-2 border-pink-300 shadow-lg sm:shadow-xl relative overflow-hidden">
          
          {/* Top highlight ribbon / badge */}
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-6">
            <div className="blink-tag inline-flex items-center gap-1.5 bg-pink-100 text-pink-800 border border-pink-200 px-2.5 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles size={13} className="text-pink-600 sm:w-4 sm:h-4" />
              <span>SPECIAL: FREE READING</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-pink-700 bg-pink-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-pink-200/60 shrink-0">
              <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>Thu & Sat (10–11 AM)</span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="mb-3 sm:mb-6">
            <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug mb-1 sm:mb-2">
              A free reading for someone who needs it.
            </h2>
            <p className="text-gray-700 text-xs sm:text-base md:text-lg leading-relaxed font-normal">
              Not everyone can pay for guidance right now. Every Thursday & Saturday, Nandinii offers free readings.
            </p>
          </div>

          {/* How it works - horizontal 3-column layout on mobile */}
          <div className="bg-pink-50/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 md:p-7 border border-pink-100/80 mb-3.5 sm:mb-6">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-pink-100 text-pink-800 font-black flex items-center justify-center text-[10px] sm:text-xs shrink-0 border border-pink-200">
                  1
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Quick Form
                  </p>
                  <p className="text-[9px] sm:text-xs text-gray-600 hidden sm:block mt-0.5">
                    Takes 1 minute
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-pink-100 text-pink-800 font-black flex items-center justify-center text-[10px] sm:text-xs shrink-0 border border-pink-200">
                  2
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Fair Draw
                  </p>
                  <p className="text-[9px] sm:text-xs text-gray-600 hidden sm:block mt-0.5">
                    Transparent pick
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-pink-100 text-pink-800 font-black flex items-center justify-center text-[10px] sm:text-xs shrink-0 border border-pink-200">
                  3
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Free Call
                  </p>
                  <p className="text-[9px] sm:text-xs text-gray-600 hidden sm:block mt-0.5">
                    Thu & Sat 10 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA & Privacy Row */}
          <div className="flex flex-row items-center justify-between gap-2 pt-1 sm:pt-2">
            <button
              onClick={onApplyClick}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-pink-700 hover:bg-pink-800 text-white px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <span>Apply for Free Reading</span>
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1 text-[9px] sm:text-xs text-gray-500 font-medium text-right sm:text-left">
              <ShieldCheck size={14} className="text-pink-600 shrink-0 hidden sm:block" />
              <span>100% Private & Free</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FreeReading;
