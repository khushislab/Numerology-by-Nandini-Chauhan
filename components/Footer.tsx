import React, { useState } from 'react';
import { Send, Loader2, Instagram, Facebook, Lock } from 'lucide-react';

const PRIMARY_PHONE = "7588316966";
const INSTAGRAM_URL = "https://www.instagram.com/numeroby.nandinii?stkn=MW13bHRub2pheGg0Nw==";
const FACEBOOK_URL = "https://www.facebook.com/share/1FCPVDz1iL/";
const NEWSLETTER_URL = process.env.NEWSLETTER_URL || 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';

interface FooterProps {
  onOpenAdminSheet?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdminSheet }) => {
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
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 leading-none mb-1">NUMEROLOGY BY</span>
              <span className="text-2xl font-extrabold text-gray-900 leading-none uppercase">NANDINII J <span className="text-pink-700">CHAUHAN</span></span>
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
              <li><a href="#about" className="hover:text-pink-700 transition-colors">About Nandinii</a></li>
              <li><a href="#services" className="hover:text-pink-700 transition-colors">Our Services</a></li>
              <li><a href="#how-it-works" className="hover:text-pink-700 transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-pink-700 transition-colors">Common FAQs</a></li>
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
          <p>© 2026 Numerology by Nandinii J Chauhan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Designed with care for peaceful clarity.</p>
            {onOpenAdminSheet && (
              <button
                onClick={onOpenAdminSheet}
                className="text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1 text-[11px] p-1 rounded cursor-pointer"
                title="Private Owner Portal (Password Protected)"
              >
                <Lock size={11} className="text-gray-400" />
                <span>Owner Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
