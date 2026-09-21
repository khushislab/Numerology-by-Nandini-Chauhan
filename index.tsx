import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, MessageCircle, PhoneCall, Check, 
  MousePointer2, Sparkles, ShieldCheck, ChevronDown, ChevronUp, Send, Loader2,
  CheckCircle2, Instagram, Facebook, Clock, User, Shield
} from 'lucide-react';

// --- CONFIG ---
const NEWSLETTER_URL = process.env.NEWSLETTER_URL || 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';
const PRIMARY_PHONE = "7588316966";
const SECONDARY_PHONE = "7448222924";
const INSTAGRAM_URL = "https://www.instagram.com/numeroby.nandinii?stkn=MW13bHRub2pheGg0Nw==";
const FACEBOOK_URL = "https://www.facebook.com/share/1FCPVDz1iL/";

// --- FLOATING NUMBERS ---
const FloatingNumbers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbers = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      val: (i % 9) + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      baseSize: 4 + Math.random() * 6,
      speed: 0.01 + Math.random() * 0.03,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = containerRef.current?.querySelectorAll('.floating-number');
      if (!elements) return;
      elements.forEach((el, index) => {
        const num = numbers[index];
        const x = (window.innerWidth / 2 - e.clientX) * num.speed;
        const y = (window.innerHeight / 2 - e.clientY) * num.speed;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        if (dist < 200) el.classList.add('active');
        else el.classList.remove('active');
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [numbers]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {numbers.map((n, i) => (
        <span key={i} className="floating-number text-pink-200/40" style={{ top: `${n.top}%`, left: `${n.left}%`, fontSize: `${n.baseSize}rem` }}>
          {n.val}
        </span>
      ))}
    </div>
  );
};

// --- NAVBAR ---
const Navbar: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3' : 'bg-white/90 md:bg-transparent backdrop-blur-sm py-3 sm:py-4'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group shrink-0">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-gray-500 group-hover:text-pink-700 transition-colors leading-none mb-0.5 sm:mb-1">
            Numerology By
          </span>
          <span className="text-base sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-none">
            Nandinii <span className="text-pink-700">Chauhan</span>
          </span>
        </a>
        
        {/* Quick Navigation Panel (Visible directly on both desktop and mobile) */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="flex items-center gap-1.5 sm:gap-4 md:gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-700 hover:text-pink-700 transition-colors uppercase tracking-wider whitespace-nowrap px-1 sm:px-1.5 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Book Call CTA button */}
          <button 
            onClick={onBookClick}
            className="bg-pink-700 hover:bg-pink-800 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Book Call</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero: React.FC<{ onBookClick: (serviceName?: string) => void }> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-36 px-4 sm:px-6 overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Label Badge: "Find Your Inner Peace" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold uppercase tracking-[0.2em]">
          Find Your Inner Peace
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.18] mb-6 tracking-tight">
          Your birth date holds clues.<br />
          <span className="text-pink-700">Let’s read them together.</span>
        </h1>

        {/* Hero Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          The universe doesn't make mistakes. You have a unique rhythm, and numbers can help you discover it — so you never have to feel lost.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button 
            onClick={() => onBookClick("Personal Numerology Reading (₹1,099)")} 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-8 py-4 sm:px-9 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <PhoneCall size={20} /> 
            Book a Call
          </button>
          <a 
            href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent("Hi Nandinii, I'd like to ask a quick question before booking a consultation.")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-800 border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 px-8 py-4 sm:px-9 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-md active:scale-95"
          >
            <MessageCircle size={20} className="text-green-600" /> 
            Chat on WhatsApp
          </a>
        </div>

        {/* 100% Online Consultation & Working Hours */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-700 font-semibold">
          <div className="inline-flex items-center gap-2 bg-pink-50/80 border border-pink-200 px-4 py-2 rounded-full shadow-xs">
            <Shield size={16} className="text-pink-700 shrink-0" />
            <span>100% Online Consultations (Worldwide)</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-pink-50/80 border border-pink-200 px-4 py-2 rounded-full shadow-xs">
            <Clock size={16} className="text-pink-700 shrink-0" />
            <span>Working Hours: Mon – Sat, 10:00 AM – 7:30 PM IST</span>
          </div>
        </div>

      </div>

      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] bg-pink-100/40 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
    </section>
  );
};

// --- ABOUT ---
const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-pink-50/40 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Portrait with high-contrast frame */}
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 ring-8 ring-white transition-transform duration-500 hover:scale-[1.01]">
              <img 
                src="https://i.ibb.co/ym81L0YS/Gemini-Generated-Image-3d3xsn3d3xsn3d3x.png" 
                alt="Nandinii Chauhan - Numerologist" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-pink-200 rounded-[2.5rem] md:rounded-[3.5rem] -z-10 opacity-70"></div>
          </div>
          
          {/* Bio & Intro Requested by User */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
                Meet Your Numerologist
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-3 mb-2">
                Nandinii <span className="text-pink-700">Chauhan</span>
              </h2>
              <div className="w-16 h-1.5 bg-pink-700 rounded-full"></div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
              <p>
                Hi, I'm Nandinii Chauhan. I know life can feel heavy and confusing when you don't know what step to take next. I understand how numbers quietly shape our choices, emotions, and direction.
              </p>
              <p>
                I'm certified in Chinese and Pythagorean Numerology, and I hold a master certification in Vedic Numerology.
              </p>
              <p className="text-xl text-gray-900 border-l-4 border-pink-600 pl-4 py-2 font-medium italic bg-white/80 rounded-r-2xl shadow-sm">
                "I show you how to align with the cosmic numbers that were always meant to lead you."
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// --- SERVICES DATA ---
interface ServiceItem {
  name: string;
  regularPrice: string;
  price: string;
  off: string;
  subtitle: string;
  outcomes: string[];
  popular?: boolean;
}

const servicesList: ServiceItem[] = [
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
    price: "1,199",
    off: "52%",
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
    price: "1,199",
    off: "52%",
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
    price: "1,199",
    off: "52%",
    subtitle: "Gentle wellness guidance from your numbers. Not medical advice.",
    outcomes: [
      "Body areas that may need extra care",
      "Times when your energy may run low",
      "Colors and habits that may help"
    ]
  }
];

// --- SERVICES COMPONENT ---
const Services: React.FC<{ onBookClick: (serviceName?: string) => void }> = ({ onBookClick }) => {
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

        {/* Responsive grid for services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl p-7 sm:p-8 border ${service.popular ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-gray-200'} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative group`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 bg-pink-700 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors leading-snug">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              {/* Concrete Outcomes (High Contrast) */}
              <div className="space-y-3 mb-8 flex-grow">
                {service.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    <Check size={16} className="text-pink-700 mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm text-gray-400 line-through font-semibold">
                      ₹{service.regularPrice}
                    </span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      {service.off} OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      ₹{service.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-pink-700 font-semibold block mt-0.5">
                    Launch price now
                  </span>
                </div>

                <button 
                  onClick={() => onBookClick(`${service.name} (₹${service.price})`)}
                  className="bg-pink-700 hover:bg-pink-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0"
                >
                  <PhoneCall size={15} />
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

// --- HOW IT WORKS ---
const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <MousePointer2 className="w-8 h-8 text-pink-700" />,
      title: "1. Book a Call or WhatsApp",
      description: "Pick the reading that fits your question and confirm your preferred slot via our quick form or message Nandinii directly on WhatsApp."
    },
    {
      num: "02",
      icon: <User className="w-8 h-8 text-pink-700" />,
      title: "2. Share Name & Date of Birth",
      description: "Send your official full name, preferred name, and birth date. All personal information is treated with strict confidentiality."
    },
    {
      num: "03",
      icon: <Sparkles className="w-8 h-8 text-pink-700" />,
      title: "3. Get Your Reading & Follow-Up",
      description: "Connect for a relaxed 45-min 1-on-1 call (phone or video), ask your questions, and receive your written summary guide within 24–48 hours."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-pink-50/30 px-6 scroll-mt-20 border-t border-pink-100/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
            From booking to consultation, everything is designed to be calm, simple, and reassuring.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm hover:shadow-md transition-all text-center space-y-4 relative"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto border border-pink-200">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ETHICS ---
const Ethics: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white border-y border-pink-100">
      <div className="max-w-4xl mx-auto bg-pink-50/50 rounded-3xl p-8 md:p-12 border border-pink-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <ShieldCheck size={52} className="text-pink-700" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Professional & Ethical Guidance</h3>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "Numerology is a tool for self-understanding and timing alignment. It does not replace professional medical, psychological, legal, or financial counsel. We do not make fear-based claims, extreme predictions, or promises of overnight wealth. We are here to support your clarity, confidence, and peace of mind."
          </p>
        </div>
      </div>
    </section>
  );
};

// --- FAQ ---
const FAQ: React.FC = () => {
  const faqs = [
    { 
      q: "What information do I need to share for a consultation?", 
      a: "Only your full official name and date of birth (DD-MM-YYYY). Exact birth time is not strictly required, making it easy and accessible even if you don't possess a birth certificate." 
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
      q: "When and how do I receive my written notes or report?", 
      a: "Your personalized summary guide is delivered directly via WhatsApp or email within 24 to 48 hours following your consultation call." 
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-pink-50/20 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            Common Questions
          </h2>
          <p className="text-base text-gray-700">
            Clear answers to help you feel confident before booking.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-pink-50/50 transition-colors" 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-gray-900 text-base sm:text-lg pr-4">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="text-pink-700 shrink-0" size={20} /> : <ChevronDown className="text-gray-500 shrink-0" size={20} />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-700 text-sm leading-relaxed border-t border-pink-100 pt-4">
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

// --- CONTACT ---
const Contact: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <section id="contact" className="py-28 px-6 bg-white relative overflow-hidden scroll-mt-20">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      
      <div className="mb-14">
        <span className="text-xs font-bold tracking-[0.2em] text-pink-800 uppercase bg-pink-100 px-3.5 py-1 rounded-full">
          Take The Next Step
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
          "If you've made it this far, something brought you here. <br />
          <span className="text-pink-700">Trust that feeling.</span>"
        </h2>
        <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Don't stay stuck in confusion. A simple, honest conversation can change everything.
        </p>
      </div>

      {/* Main CTA Button */}
      <div className="mb-16">
        <button 
          onClick={onBookClick} 
          className="inline-flex items-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-10 py-5 sm:px-12 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <PhoneCall size={24} /> 
          Book Your Consultation
        </button>
      </div>

      {/* Direct Contact Options with Tappable Links */}
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xs mb-6">
          Reach Out Directly
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Primary Phone Link */}
          <div className="bg-pink-50/60 p-6 rounded-3xl border border-pink-200">
            <span className="block text-[11px] font-bold text-pink-800 uppercase tracking-widest mb-1.5">
              Primary Number (Call & WhatsApp)
            </span>
            <a 
              href={`tel:+91${PRIMARY_PHONE}`} 
              className="text-pink-800 hover:text-pink-900 font-extrabold text-2xl tracking-tight block hover:underline"
            >
              +91 {PRIMARY_PHONE.slice(0, 5)} {PRIMARY_PHONE.slice(5)}
            </a>
            <p className="text-xs text-gray-600 mt-2">Tap to call directly</p>
          </div>

          {/* Secondary Phone Link */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
            <span className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">
              Secondary Number
            </span>
            <a 
              href={`tel:+91${SECONDARY_PHONE}`} 
              className="text-gray-900 hover:text-pink-700 font-extrabold text-2xl tracking-tight block hover:underline"
            >
              +91 {SECONDARY_PHONE.slice(0, 5)} {SECONDARY_PHONE.slice(5)}
            </a>
            <p className="text-xs text-gray-600 mt-2">Tap to call directly</p>
          </div>
        </div>

      </div>

    </div>
  </section>
);

// --- FOOTER ---
const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch(NEWSLETTER_URL, {
        method: 'POST', 
        mode: 'no-cors', 
        body: new URLSearchParams({ email }).toString(),
      });
      setStatus('success'); 
      setEmail('');
    } catch (err) { 
      setStatus('error'); 
    }
  };

  return (
    <footer className="bg-white pt-20 pb-12 px-6 border-t border-pink-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">
          
          <div className="space-y-4">
            <span className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 leading-none mb-1">Numerology By</span>
              <span className="text-2xl font-extrabold text-gray-900 leading-none">Nandinii <span className="text-pink-700">Chauhan</span></span>
            </span>
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              Helping souls find their natural rhythm through the ancient wisdom of numbers. Modern, simple, and caring.
            </p>
            <div className="text-xs font-bold text-gray-600 tracking-wider">
              <span>Direct: +91 {PRIMARY_PHONE}</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={INSTAGRAM_URL}
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 hover:bg-pink-700 hover:text-white transition-all shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={FACEBOOK_URL}
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 hover:bg-pink-700 hover:text-white transition-all shadow-sm"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-gray-700">
              <li><a href="#home" className="hover:text-pink-700 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-pink-700 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-pink-700 transition-colors">Service</a></li>
              <li><a href="#contact" className="hover:text-pink-700 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Join Our Newsletter</h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Subscribe to receive small, kind notes about your numbers and upcoming cosmic cycles.
            </p>
            <form className="relative" onSubmit={handleSubmit}>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email" 
                className="w-full bg-pink-50/70 border border-pink-200 rounded-full py-3 px-5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-600" 
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bg-pink-700 text-white p-2 rounded-full hover:bg-pink-800 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
            {status === 'success' && <p className="text-xs text-green-700 font-bold">Thank you for subscribing 🌸</p>}
            {status === 'error' && <p className="text-xs text-red-600 font-medium">Please try again later.</p>}
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Numerology by Nandinii Chauhan. All rights reserved.</p>
          <p>Designed with care for peaceful clarity.</p>
        </div>
      </div>
    </footer>
  );
};

// --- BOOKING MODAL ---
const BookingModal: React.FC<{ onClose: () => void; selectedService?: string | null }> = ({ onClose, selectedService }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    service: selectedService || `${servicesList[0].name} (₹${servicesList[0].price})` 
  });

  useEffect(() => {
    if (selectedService) {
      const match = servicesList.find(s => 
        selectedService.toLowerCase().includes(s.name.toLowerCase()) || 
        s.name.toLowerCase().includes(selectedService.toLowerCase().split(' (')[0].trim())
      );
      if (match) {
        setFormData(prev => ({ ...prev, service: `${match.name} (₹${match.price})` }));
      } else {
        setFormData(prev => ({ ...prev, service: selectedService }));
      }
    }
  }, [selectedService]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };
  
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await fetch(NEWSLETTER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 
          ...formData,
          type: 'booking'
        }).toString(),
      });
      
      const msg = `Hi Nandinii, I would like to book a numerology consultation.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
      
      setStatus('success');
      setTimeout(onClose, 2500);
    } catch (err) {
      const msg = `Hi Nandinii, I would like to book a numerology consultation.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
      setStatus('success');
      setTimeout(onClose, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-900">
          <X size={24} />
        </button>
        {status !== 'success' ? (
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">Book a Consultation</h2>
            <p className="text-gray-600 text-sm mb-6">Start your journey to clarity. Fill in your details below.</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  required 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-pink-600 focus:outline-none" 
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Phone / WhatsApp</label>
                  <input 
                    required 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    type="tel" 
                    placeholder="+91..." 
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-pink-600 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Selected Service</label>
                  <select 
                    name="service" 
                    value={formData.service} 
                    onChange={handleInputChange} 
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-3 px-4 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-pink-600 focus:outline-none cursor-pointer"
                  >
                    {servicesList.map(s => (
                      <option key={s.name} value={`${s.name} (₹${s.price})`}>
                        {s.name} (₹{s.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  required 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-pink-600 focus:outline-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full bg-pink-700 hover:bg-pink-800 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50 transition-all"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />}
                Confirm & Open WhatsApp
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Your consultation request has been recorded. Opening WhatsApp now to finalize your appointment time...
            </p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP COMPONENT ---
const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName || null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <FloatingNumbers />
      <Navbar onBookClick={() => openBooking()} />
      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <Services onBookClick={openBooking} />
        <HowItWorks />
        <Ethics />
        <FAQ />
        <Contact onBookClick={() => openBooking()} />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent("Hi Nandinii, I would like to enquire about a numerology consultation.")}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 group"
      >
        <div className="hidden sm:block overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-300 font-bold text-sm">
          Chat with Nandinii
        </div>
        <MessageCircle size={24} />
      </a>

      {isBookingOpen && (
        <BookingModal onClose={closeBooking} selectedService={selectedService} />
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
