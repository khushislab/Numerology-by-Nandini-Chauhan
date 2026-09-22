import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { 
    q: "What information do I need to share for a consultation?", 
    a: "Only your full official name and date of birth (DD-MM-YYYY). Exact birth time is not strictly required in Chaldean or Pythagorean numerology, making it easy and accessible even if you don't possess a birth certificate." 
  },
  { 
    q: "Do you make scary or fatalistic predictions?", 
    a: "Never. Nandinii’s practice is strictly rooted in self-awareness, positive clarity, and free will. Numbers show patterns and life weather forecasts — you always hold the umbrella and make your own empowered choices." 
  },
  { 
    q: "How are the sessions conducted and in what languages?", 
    a: "Sessions are held 1-on-1 via private phone call or Google Meet video link, according to your preference. Consultations are available in both English and Hindi." 
  },
  { 
    q: "How long does one consultation take?", 
    a: "Most sessions take 45 to 60 minutes. There is no rushing — we take the time to review your questions and ensure you walk away with genuine peace of mind." 
  },
  { 
    q: "What if I am not sure which reading I need?", 
    a: "You can click 'Ask on WhatsApp' on the last card or message +91 75883 16966. Simply tell Nandinii what you are experiencing in 2–3 sentences, and she will recommend the most helpful reading with zero pressure." 
  },
  { 
    q: "When and how do I receive my written notes or report?", 
    a: "Your personalized summary guide is delivered directly via WhatsApp or email within 24 to 48 hours following your consultation call." 
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-8 sm:py-16 md:py-24 px-3 sm:px-6 bg-pink-50/20 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4 sm:mb-10 md:mb-12">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block">
            Frequently Asked Questions
          </span>
        </div>

        <div className="space-y-2 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-pink-100 shadow-2xs sm:shadow-sm overflow-hidden">
              <button 
                className="w-full p-3 sm:p-5 md:p-6 text-left flex justify-between items-center hover:bg-pink-50/50 transition-colors cursor-pointer" 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-gray-900 text-xs sm:text-base md:text-lg pr-2 sm:pr-4 leading-snug">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="text-pink-700 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <ChevronDown className="text-gray-500 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-3 pb-3.5 pt-2 sm:px-6 sm:pb-6 sm:pt-4 text-gray-700 text-[11px] sm:text-sm leading-relaxed border-t border-pink-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
