import React, { useState } from 'react';
import { ArrowUp, Send, Loader2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';
      
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email }).toString(),
      });
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 leading-none mb-1">
                Numerology By
              </span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                Nandini <span className="text-blush-400">Chauhan</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Helping souls find their natural rhythm through the ancient wisdom of numbers. Modern, simple, and caring.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-pink-600 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-pink-600 transition-colors">About Us</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-pink-600 transition-colors">All Services</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="hover:text-pink-600 transition-colors">Common FAQs</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe to learn simple numerology tips. Small insights can solve big problems.
            </p>
            <form className="relative" onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email" 
                className="w-full bg-pink-50 border border-pink-100 rounded-full py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-1.5 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
            {status === 'success' && <p className="text-[10px] text-green-600 mt-1 font-bold">Thank you for subscribing 🌸</p>}
            {status === 'error' && <p className="text-[10px] text-red-500 mt-1">Something went wrong. Please try again.</p>}
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">
            © 2026 Numerology by Nandini Chauhan. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-800 transition-colors uppercase tracking-widest"
          >
            Back to Top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;