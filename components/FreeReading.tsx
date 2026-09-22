import React from 'react';
import { Sparkles, Gift, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface FreeReadingProps {
  onApplyClick: () => void;
}

const FreeReading: React.FC<FreeReadingProps> = ({ onApplyClick }) => {
  return (
    <section id="free-reading" className="py-16 sm:py-20 bg-pink-50/80 border-y border-pink-100 px-4 sm:px-6 relative overflow-hidden scroll-mt-24">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-pink-200/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* Animated blinking special card */}
        <div className="blink-card bg-white/95 rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-pink-300 shadow-xl relative overflow-hidden">
          
          {/* Top highlight ribbon / badge */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="blink-tag inline-flex items-center gap-2 bg-pink-100 text-pink-800 border border-pink-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles size={16} className="text-pink-600 animate-spin-slow" />
              <span>SPECIAL: FREE READING</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60">
              <Clock size={14} />
              <span>Thu & Sat (10:00 – 11:00 AM IST)</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            A free reading for someone who needs it.
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
            Not everyone can pay for guidance right now. Every Thursday and Saturday, Nandini gives free readings to people who need them.
          </p>

          {/* How it works */}
          <div className="bg-pink-50/50 rounded-2xl p-5 sm:p-7 border border-pink-100/80 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-700"></span>
              How it works
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-800 font-extrabold flex items-center justify-center text-sm shrink-0 border border-pink-200">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    Fill out a short form.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    It takes one minute.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-800 font-extrabold flex items-center justify-center text-sm shrink-0 border border-pink-200">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    Winners are picked by a fair draw.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Completely transparent.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-800 font-extrabold flex items-center justify-center text-sm shrink-0 border border-pink-200">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    Winners get a free reading
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    On Thursday or Saturday, 10–11 AM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onApplyClick}
              className="inline-flex items-center justify-center gap-2.5 bg-pink-700 hover:bg-pink-800 text-white px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Apply for a Free Reading</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium sm:ml-auto">
              <ShieldCheck size={16} className="text-pink-600 shrink-0" />
              <span>Your details are kept strictly private & secure.</span>
            </div>
          </div>

          {/* Microcopy disclaimer */}
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-5 leading-relaxed pt-5 border-t border-gray-100">
            Spots are limited. Not picked this time? You can apply again next week. Your details stay private.
          </p>

        </div>
      </div>
    </section>
  );
};

export default FreeReading;
