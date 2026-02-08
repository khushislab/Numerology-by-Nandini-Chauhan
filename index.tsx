
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, MessageCircle, PhoneCall, Check, 
  MousePointer2, CreditCard, Sparkles, Heart, 
  Brain, Navigation, Sun, ChevronLeft, ChevronRight, 
  Quote, ShieldCheck, ChevronDown, ChevronUp, Send, Loader2, ArrowUp, CheckCircle2 
} from 'lucide-react';

// --- CONFIG ---
const NEWSLETTER_URL = process.env.NEWSLETTER_URL || 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';
const PRIMARY_PHONE = "7588316966";
const SECONDARY_PHONE = "7448222924";

// --- COMPONENTS ---

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
        <span key={i} className="floating-number" style={{ top: `${n.top}%`, left: `${n.left}%`, fontSize: `${n.baseSize}rem` }}>
          {n.val}
        </span>
      ))}
    </div>
  );
};

const Navbar: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' }, { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' }, { name: 'How It Works', href: '#how-it-works' },
    { name: 'Value', href: '#value' }, { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }, { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 group-hover:text-blush-400 transition-colors leading-none mb-1">Numerology By</span>
          <span className="text-xl md:text-2xl font-bold text-gray-900 leading-none">Nandini <span className="text-blush-400">Chauhan</span></span>
        </a>
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-[10px] font-bold text-gray-500 hover:text-blush-400 transition-colors uppercase tracking-[0.2em]">{link.name}</a>
          ))}
          <button onClick={onBookClick} className="bg-blush-400 text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-blush-500 transition-all shadow-md active:scale-95">Book a Call</button>
        </div>
        <button className="lg:hidden text-gray-700 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 shadow-2xl py-8 px-6 space-y-5 animate-fade-in">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-xl font-bold text-gray-800" onClick={(e) => handleLinkClick(e, link.href)}>{link.name}</a>
          ))}
          <button onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }} className="block w-full text-center bg-blush-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95">Book a Call</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <section id="home" className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden scroll-mt-20">
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blush-100 text-blush-600 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">Find Your Inner Peace</div>
      <h1 className="text-5xl md:text-8xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">Your Life Path Number carries clues<br /><span className="text-blush-400">that helps you understand yourself.</span></h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
        The universe doesn't make mistakes. You have a special rhythm, and <span className="text-gray-900 font-semibold underline decoration-blush-300 underline-offset-4">numbers can help you find it</span>, so you are not feeling lost.
      </p>
      <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">"I'm Nandini. I show you how to align with the cosmic numbers that were always meant to lead you."</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <button onClick={onBookClick} className="w-full md:w-auto flex items-center justify-center gap-3 bg-blush-400 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-blush-500 transition-all shadow-xl transform hover:-translate-y-1 active:scale-95">
          <PhoneCall size={22} /> Book a Call — Let’s Talk It Through
        </button>
        <a href={`https://wa.me/91${PRIMARY_PHONE}?text=Hi Nandini, I want to ask a question before booking a consultation.`} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-blush-200 px-10 py-5 rounded-full text-xl font-bold hover:bg-blush-50 transition-all shadow-md active:scale-95">
          <MessageCircle size={22} className="text-green-500" /> Chat on WhatsApp — Ask First
        </a>
      </div>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-br from-blush-100/40 via-white to-transparent rounded-full blur-[120px] -z-10"></div>
  </section>
);

const About: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch(NEWSLETTER_URL, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }).toString(),
      });
      setStatus('success'); setEmail('');
    } catch (err) { setStatus('error'); }
  };

  return (
    <section id="about" className="py-24 bg-blush-100/20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative z-10 ring-8 ring-white/40 transition-transform duration-500 hover:scale-[1.02]">
              <img src="https://i.ibb.co/ym81L0YS/Gemini-Generated-Image-3d3xsn3d3xsn3d3x.png" alt="Nandini Chauhan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-blush-200 rounded-[3rem] md:rounded-[4rem] -z-10 opacity-50"></div>
          </div>
          <div className="space-y-8">
            <div><h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">Nandini <span className="text-blush-400">Chauhan</span></h2><div className="w-20 h-1.5 bg-blush-300 rounded-full"></div></div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>Hi, I’m Nandini Chauhan. I know life can feel heavy and confusing when you don’t know what step to take next. I’ve spent many years understanding how numbers quietly shape our choices, emotions, and direction. My focus is to listen to you first and help you see the patterns in your own life clearly. Together, we find a path that feels natural to you — one that works with your number alignment, not against it.</p>
              <p className="text-2xl text-gray-800 border-l-4 border-blush-200 pl-6 py-2 font-medium">"I show you how to align with the cosmic numbers that were always meant to lead you."</p>
            </div>
            <div className="pt-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blush-100">
                <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-widest">Join our Newsletter</h4>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">Subscribe to receive small, kind notes about your numbers. Let these simple tips help you feel a bit more "in flow" every single day.</p>
                <form className="relative" onSubmit={handleSubmit}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="w-full bg-pink-50 border border-pink-100 rounded-full py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200" />
                  <button type="submit" disabled={status === 'loading'} className="absolute right-2 top-2 bg-pink-600 text-white p-2.5 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-50">
                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </form>
                {status === 'success' && <p className="text-xs text-green-600 mt-2 font-bold px-2">Thank you for subscribing 🌸</p>}
                {status === 'error' && <p className="text-xs text-red-500 mt-2 px-2">Something went wrong. Please try again.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const servicesList = [
    { name: "Personal Numerology Reading", price: 499, description: "Understand who you really are and your life's purpose.", outcomes: ["Feel clear about your next step", "Understand why problems repeat", "Feel calm and less confused", "Know what to focus on"] },
    { name: "Relationship Compatibility", price: 599, description: "See how your numbers vibe with your partner's.", outcomes: ["Reduce arguments and stress", "Understand your partner's nature", "Bring back the harmony", "Know the best way to talk"] },
    { name: "Career & Business", price: 799, description: "Find the right work path for financial peace.", outcomes: ["Choose the right job or business", "Pick the best dates for deals", "Attract better growth", "Feel confident in work"] },
    { name: "Name Analysis / Correction", price: 399, description: "Check if your name energy matches your goals.", outcomes: ["Remove small blocks in life", "Feel more lucky and positive", "Improve your daily energy", "Better first impressions"] },
    { name: "Baby Name Numerology", price: 800, description: "Gift your child a name that brings balance.", outcomes: ["Give them a balanced start", "Support their natural talents", "Peaceful family energy", "A life full of harmony"] },
    { name: "House / Property", price: 399, description: "Ensure your home is a place of rest.", outcomes: ["Sleep better at night", "Feel happy being home", "Positive family time", "Remove heavy feelings"] },
    { name: "Mobile Number", price: 399, description: "Your digital identity matters too.", outcomes: ["Better calls and messages", "Help your business grow", "Clearer communication", "Positive digital vibes"] },
    { name: "Yearly Forecast", price: 399, description: "Know what to expect in the coming 12 months.", outcomes: ["Plan your year better", "Avoid unnecessary risks", "Know when to wait or act", "Less surprises, more peace"] },
    { name: "Emotional Healing", price: 599, description: "Special guidance for tough times.", outcomes: ["Release old hurts", "Stop overthinking", "Find emotional strength", "Wake up feeling lighter"] },
    { name: "Life Pattern Analysis", price: 699, description: "Deep dive into recurring life cycles.", outcomes: ["Break old habits", "Find why life repeats", "Master your time cycles", "Feel in control of life"] }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-white relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16"><h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h2><p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">Choose what you need today. Simple solutions for a peaceful tomorrow.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-blush-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blush-400 transition-colors">{service.name}</h3>
              <p className="text-gray-500 text-sm mb-8">{service.description}</p>
              <div className="space-y-4 mb-10 flex-grow">
                {service.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 text-[15px] text-gray-600 font-medium"><Check size={18} className="text-blush-400 mt-0.5 shrink-0" /><span>{outcome}</span></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">₹{service.price}</span>
                <button onClick={onBookClick} className="bg-blush-100 text-blush-600 px-8 py-3 rounded-full text-sm font-bold hover:bg-blush-400 hover:text-white transition-all transform active:scale-95">Book a Call</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-24 bg-blush-100/10 px-6 scroll-mt-20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">It's Very Simple</h2>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-0.5 bg-blush-200 -z-10"></div>
        {[
          { icon: <MousePointer2 className="w-10 h-10 text-blush-400" />, title: "Choose your consultation", description: "Pick the service that fits your current situation best." },
          { icon: <CreditCard className="w-10 h-10 text-blush-400" />, title: "Book & pay securely", description: "Confirm your slot and make a small payment for our time." },
          { icon: <Sparkles className="w-10 h-10 text-blush-400" />, title: "Get clarity on your call", description: "We talk, I listen, and you walk away feeling lighter." }
        ].map((step, index) => (
          <div key={index} className="text-center space-y-4">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-lg flex items-center justify-center mx-auto mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-blush-100">{step.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed text-lg">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Value: React.FC = () => (
  <section id="value" className="py-24 px-6 bg-white scroll-mt-20">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">What You Will Actually Get</h2>
      <p className="text-gray-500 text-xl mb-16 max-w-2xl mx-auto">Beyond charts and numbers, this is how your life feels after our talk.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <Brain className="text-blush-400" />, title: "Clear mind for decisions", desc: "Stop the mental fog and choose your path with confidence." },
          { icon: <Navigation className="text-blush-400" />, title: "Confidence in next steps", desc: "Know exactly where you are going and why it's right for you." },
          { icon: <Heart className="text-blush-400" />, title: "Emotional relief and calm", desc: "Let go of the heavy anxiety and breathe a sigh of relief." },
          { icon: <Sun className="text-blush-400" />, title: "Understanding problems", desc: "See the root cause of why things happen so you can fix them." }
        ].map((v, i) => (
          <div key={i} className="p-10 rounded-[2.5rem] bg-blush-100/20 border border-white shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-blush-50">{v.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
            <p className="text-gray-600 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Khushi Chauhan", quote: "After our call, I felt like a weight was lifted. I knew exactly what to do. Now I'm in my dream role!" },
    { name: "Bhavyaa", quote: "Learning my numbers helped me accept myself. I feel so much more calm and peaceful now." },
    { name: "Shivani Singh", quote: "The yearly forecast showed me it was just a waiting phase. I stayed patient, and now we're growing again." },
    { name: "Mrunmayee Mahajan", quote: "Wow...amazinggg....I mean what an insight" }
  ];
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const next = () => { if (isAnimating) return; setIsAnimating(true); setCurrent((prev) => (prev + 1) % reviews.length); setTimeout(() => setIsAnimating(false), 500); };
  const prev = () => { if (isAnimating) return; setIsAnimating(true); setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length); setTimeout(() => setIsAnimating(false), 500); };
  useEffect(() => { const timer = setInterval(next, 6000); return () => clearInterval(timer); }, [current, isAnimating]);

  return (
    <section id="testimonials" className="py-24 px-6 bg-pink-50/30 overflow-hidden relative scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-10"><Quote size={120} className="text-pink-400" /></div>
        <h2 className="text-3xl md:text-5xl font-bold mb-16 relative z-10">Happy Hearts</h2>
        <div className="relative z-10">
          <div className={`bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-pink-50 transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-medium text-gray-800 leading-relaxed">"{reviews[current].quote}"</p>
              <div className="flex flex-col items-center pt-8 border-t border-pink-50"><h4 className="font-bold text-gray-900 text-lg uppercase tracking-wider">{reviews[current].name}</h4><div className="flex gap-1 mt-1 text-pink-300">{[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}</div></div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <button onClick={prev} className="w-14 h-14 rounded-full border-2 border-pink-200 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all active:scale-90"><ChevronLeft size={28} /></button>
            <div className="flex items-center gap-2">{reviews.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-pink-400' : 'w-2 bg-pink-200'}`} />)}</div>
            <button onClick={next} className="w-14 h-14 rounded-full border-2 border-pink-200 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all active:scale-90"><ChevronRight size={28} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    { q: "How long is one numerology call?", a: "Each call is usually 30 to 45 minutes, depending on the service you choose." },
    { q: "Do I need to believe in numerology for this to work?", a: "No. You only need an open mind. This is about understanding patterns, not blind belief." },
    { q: "Will you tell me my future?", a: "No. I do not predict events. I help you understand your nature, patterns, and choices." },
    { q: "What information do you need from me?", a: "Only basic details like: Date of birth and Name. Your information is kept private." },
    { q: "Is my personal information safe?", a: "Yes. Your details are never shared with anyone. Your session is completely confidential." },
    { q: "Do you give remedies or suggestions?", a: "Yes, only simple and practical guidance if needed. No fear-based or extreme remedies." },
    { q: "What if I don't resonate after the call?", a: "That’s okay. The session is about clarity, not forcing belief." },
    { q: "How do I book a consultation?", a: "Click Book a Call, fill the form, and connect on WhatsApp. Payment is done after details are clearly explained." },
    { q: "How will I receive my appointment confirmation?", a: "After payment, you will get your call time on WhatsApp. You will know exactly when the call will happen." }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 px-6 bg-pink-50/10 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-pink-50 shadow-sm overflow-hidden">
              <button className="w-full p-6 text-left flex justify-between items-center hover:bg-pink-50/30 transition-colors" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-bold text-gray-800">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="text-pink-600" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === i && <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-pink-50 pt-4">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden scroll-mt-20">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="mb-16">
        <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-10 leading-tight">"If you reached here, something brought you. <br /><span className="text-blush-400">Trust that feeling.</span>"</h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">Don't stay stuck in confusion. A simple, honest conversation can change everything.</p>
      </div>
      <div className="inline-block group scale-110 md:scale-125">
        <button onClick={onBookClick} className="flex items-center gap-4 bg-blush-400 text-white px-14 py-7 rounded-full text-2xl font-bold shadow-2xl hover:bg-blush-500 transition-all transform hover:-translate-y-2 active:scale-95"><PhoneCall size={32} /> Book Your Consultation</button>
      </div>
      <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-blush-100/30 border border-blush-100">
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Primary Contact</p>
          <div className="text-blush-500 font-bold text-2xl md:text-3xl cursor-default tracking-tight">+{PRIMARY_PHONE}</div>
          <div className="w-10 h-1 bg-blush-200 rounded-full mt-2"></div>
        </div>
        <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Secondary Contact</p>
          <div className="text-gray-600 font-bold text-2xl md:text-3xl cursor-default tracking-tight">+{SECONDARY_PHONE}</div>
          <div className="w-10 h-1 bg-gray-200 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-blush-100/30 to-transparent"></div>
  </section>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch(NEWSLETTER_URL, {
        method: 'POST', mode: 'no-cors', body: new URLSearchParams({ email }).toString(),
      });
      setStatus('success'); setEmail('');
    } catch (err) { setStatus('error'); }
  };
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <span className="flex flex-col"><span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 leading-none mb-1">Numerology By</span><span className="text-2xl font-bold text-gray-900 leading-none">Nandini <span className="text-blush-400">Chauhan</span></span></span>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Helping souls find their natural rhythm through the ancient wisdom of numbers. Modern, simple, and caring.</p>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 tracking-widest uppercase">
               <span>Main: {PRIMARY_PHONE}</span>
            </div>
          </div>
          <div><h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Quick Links</h4><ul className="space-y-3 text-sm text-gray-500"><li><a href="#home" className="hover:text-pink-600 transition-colors">Home</a></li><li><a href="#about" className="hover:text-pink-600 transition-colors">About Us</a></li><li><a href="#services" className="hover:text-pink-600 transition-colors">All Services</a></li><li><a href="#faq" className="hover:text-pink-600 transition-colors">Common FAQs</a></li></ul></div>
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Subscribe to receive small, kind notes about your numbers. Let these simple tips help you feel a bit more "in flow" every single day.</p>
            <form className="relative" onSubmit={handleSubmit}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="w-full bg-pink-50 border border-pink-100 rounded-full py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200" />
              <button type="submit" className="absolute right-2 top-1.5 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-50">{status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}</button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6"><p className="text-xs text-gray-400">© 2026 Numerology by Nandini Chauhan. All rights reserved.</p></div>
      </div>
    </footer>
  );
};

const BookingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: "Personal Numerology Reading (₹499)" });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Capture lead data first to ensure no submission is lost
      await fetch(NEWSLETTER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 
          ...formData,
          type: 'booking'
        }).toString(),
      });
      
      // Auto-trigger WhatsApp message to Primary
      const msg = `Hi Nandini, I want to book a numerology consultation. \n\nMy name is ${formData.name} \nMy Phone: ${formData.phone} \nSelected Service: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
      
      setStatus('success');
      // Briefly show success then close
      setTimeout(onClose, 2500);
    } catch (err) {
      // Even if network fails, we still try to open WhatsApp as a fallback
      const msg = `Hi Nandini, I want to book a numerology consultation. \n\nMy name is ${formData.name} \nMy Phone: ${formData.phone} \nSelected Service: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
      setStatus('success');
      setTimeout(onClose, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900"><X size={24} /></button>
        {status !== 'success' ? (
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Book a Call</h2><p className="text-gray-500 mb-8">Start your journey to clarity. Fill in your details below.</p>
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Full Name</label><input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blush-400" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Phone Number</label><input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+91..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blush-400" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Service</label><select name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blush-400 appearance-none">
                  {["Personal Numerology Reading (₹499)", "Relationship Compatibility (₹599)", "Career & Business Numerology (₹799)", "Name Analysis / Correction (₹399)", "Baby Name Numerology (₹800)", "House / Property Numerology (₹399)", "Mobile Number Numerology (₹399)", "Yearly Forecast (₹399)", "Emotional Healing Guidance (₹599)", "Life Pattern Analysis (₹699)"].map(s => <option key={s} value={s}>{s}</option>)}
                </select></div>
              </div>
              <div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Email Address</label><input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blush-400" /></div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-blush-400 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blush-500 shadow-lg active:scale-95 disabled:opacity-50">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                Confirm & Open WhatsApp
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Captured!</h2><p className="text-gray-500 mb-8 leading-relaxed">Your details have been saved. Opening WhatsApp now to finalize your slot...</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 animate-[progress_2s_ease-in-out]"></div></div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  return (
    <div className="relative min-h-screen">
      <FloatingNumbers />
      <Navbar onBookClick={openBooking} />
      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <Services onBookClick={openBooking} />
        <HowItWorks />
        <Value />
        <Testimonials />
        <section className="py-16 px-6 bg-white border-y border-pink-50"><div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-8"><div className="shrink-0 bg-white p-6 rounded-full shadow-inner"><ShieldCheck size={64} className="text-pink-600" /></div><div className="text-center md:text-left"><h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Professional & Ethical Guidance</h3><p className="text-sm text-gray-500 leading-relaxed italic">"Numerology is a guidance tool. It does not replace medical, legal, or financial advice. We do not make magical claims or promises of instant riches. Results vary based on personal effort and life situation. We are here to support your clarity, not to dictate your life."</p></div></div></section>
        <FAQ />
        <Contact onBookClick={openBooking} />
      </main>
      <Footer />
      <a href={`https://wa.me/91${PRIMARY_PHONE}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 active:scale-95 group"><div className="hidden md:block overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-500 font-bold">Chat Now</div><MessageCircle size={28} /></a>
      {isBookingOpen && <BookingModal onClose={closeBooking} />}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}
