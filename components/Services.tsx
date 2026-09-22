import React from 'react';
import { Check, PhoneCall } from 'lucide-react';

interface ServiceItem {
  name: string;
  regularPrice: string;
  price: string;
  off: string;
  subtitle: string;
  outcomes: string[];
  popular?: boolean;
}

interface ServicesProps {
  onBookClick: (serviceName?: string) => void;
}

const services: ServiceItem[] = [
  {
    name: "Personal Numerology Reading",
    regularPrice: "2,499",
    price: "1,099",
    off: "56%",
    popular: true,
    subtitle: "Learn who you are from your birth date and name.",
    outcomes: [
      "Your Life Path, Destiny and Soul Urge numbers",
      "Your natural strengths",
      "Habits that may be holding you back"
    ]
  },
  {
    name: "Relationship Compatibility",
    regularPrice: "2,999",
    price: "1,299",
    off: "57%",
    subtitle: "Understand how you and your partner connect.",
    outcomes: [
      "Compare both birth dates",
      "See what causes fights or distance",
      "Simple tips to get along better"
    ]
  },
  {
    name: "Career & Business",
    regularPrice: "2,999",
    price: "1,299",
    off: "57%",
    subtitle: "Find work that fits you.",
    outcomes: [
      "Best jobs or fields for your numbers",
      "Check your business name",
      "Tips to grow your own work"
    ]
  },
  {
    name: "Name Analysis and Correction",
    regularPrice: "3,999",
    price: "1,499",
    off: "63%",
    subtitle: "Check if your name works for you.",
    outcomes: [
      "Find your name number",
      "Match it with your birth date numbers",
      "Small spelling changes, if needed"
    ]
  },
  {
    name: "Baby Name Numerology",
    regularPrice: "3,999",
    price: "1,499",
    off: "63%",
    subtitle: "Pick a name for your little one.",
    outcomes: [
      "Name ideas that suit your baby's birth date",
      "Check how the name goes with your surname",
      "Learn what the name's number means"
    ]
  },
  {
    name: "Litigation / Divorce",
    regularPrice: "2,999",
    price: "1,299",
    off: "57%",
    subtitle: "Find calm and clarity in a hard time.",
    outcomes: [
      "Understand what your numbers say about this phase",
      "Are there signs of divorce seperations",
      "Know your strengths right now",
      "Stay steady during hearings and talks"
    ]
  },
  {
    name: "House / Property",
    regularPrice: "2,499",
    price: "1,139",
    off: "54%",
    subtitle: "Check if a home or shop suits you.",
    outcomes: [
      "Check your house, flat, plot or shop number",
      "See if it fits you and your family",
      "Easy fixes that need no construction"
    ]
  },
  {
    name: "Mobile Number",
    regularPrice: "3,999",
    price: "1,499",
    off: "63%",
    subtitle: "Is your number right for you?",
    outcomes: [
      "Complete digit sequence and total vibration breakdown",
      "See if it matches your birth date numbers",
      "Get help choosing a new one",
      "Identify number combinations that attract unnecessary delays or tension"
    ]
  },
  {
    name: "Yearly Forecast",
    regularPrice: "3,999",
    price: "1,499",
    off: "63%",
    subtitle: "Your year ahead, month by month.",
    outcomes: [
      "Find your Personal Year Number",
      "Know the best months to act and the months to rest",
      "Tips for the harder months"
    ]
  },
  {
    name: "Marriage Matching",
    regularPrice: "2,999",
    price: "1,299",
    off: "57%",
    subtitle: "Check if two people are a good match for marriage.",
    outcomes: [
      "Compare both birth dates",
      "See where you match and where you differ",
      "Easy tips to build a strong bond"
    ]
  },
  {
    name: "Business Partnership Matching",
    regularPrice: "2,999",
    price: "1,299",
    off: "57%",
    subtitle: "See if you and your partner will work well together.",
    outcomes: [
      "Compare both partners' numbers",
      "Find out who is best at which job",
      "Spot problems early"
    ]
  },
  {
    name: "Muhurat (Auspicious Timing)",
    regularPrice: "2,499",
    price: "1,139",
    off: "54%",
    subtitle: "Pick the best date and time for something important.",
    outcomes: [
      "Weddings, housewarming and travel",
      "Business launch, contract signing and property purchase",
      "Times to avoid"
    ]
  },
  {
    name: "Medical Numerology",
    regularPrice: "2,499",
    price: "1,139",
    off: "54%",
    subtitle: "Gentle wellness guidance from your numbers. Not medical advice.",
    outcomes: [
      "Body areas that may need extra care",
      "Times when your energy may run low",
      "Colors and habits that may help"
    ]
  }
];

const Services: React.FC<ServicesProps> = ({ onBookClick }) => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 bg-white relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Consultations & Readings
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Every session is 1-on-1, private, and practical. Choose the guidance you need today.
          </p>
        </div>

        {/* Services Grid - 2 columns on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-8 border ${
                service.popular ? 'border-pink-500 ring-1 sm:ring-2 ring-pink-500/20' : 'border-gray-200'
              } shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col relative group`}
            >
              {service.popular && (
                <div className="absolute -top-2.5 right-2 sm:-top-3.5 sm:right-6 bg-pink-700 text-white text-[8px] sm:text-[11px] font-bold uppercase tracking-wider px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-2 sm:mb-4">
                <h3 className="text-xs sm:text-lg md:text-2xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors leading-tight">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm mt-1 font-medium leading-tight line-clamp-2 md:line-clamp-none">
                  {service.subtitle}
                </p>
              </div>

              {/* Concrete Outcomes */}
              <div className="space-y-1 sm:space-y-2 md:space-y-3 mb-3 sm:mb-6 md:mb-8 flex-grow">
                {service.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-1 sm:gap-2 text-[9px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
                    <Check size={12} className="text-pink-700 mt-0.5 shrink-0 sm:w-4 sm:h-4" />
                    <span className="line-clamp-2 sm:line-clamp-none">{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Button */}
              <div className="mt-auto pt-2.5 sm:pt-4 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                <div>
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5">
                    <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 line-through font-semibold">
                      ₹{service.regularPrice}
                    </span>
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1 py-0.2 rounded-full whitespace-nowrap">
                      {service.off} OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm sm:text-xl md:text-3xl font-black text-gray-900 tracking-tight">
                      ₹{service.price}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onBookClick(`${service.name} (₹${service.price})`)}
                  className="w-full sm:w-auto bg-pink-700 hover:bg-pink-800 text-white px-2 py-1.5 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full text-[9px] sm:text-xs md:text-sm font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  <PhoneCall size={11} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Book Call</span>
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
