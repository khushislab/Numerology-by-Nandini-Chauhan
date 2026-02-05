import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const About: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    <section id="about" className="py-24 bg-blush-100/20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative z-10 ring-8 ring-white/40 transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="https://i.ibb.co/ym81L0YS/Gemini-Generated-Image-3d3xsn3d3xsn3d3x.png" 
                alt="Nandini Chauhan" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-blush-200 rounded-[3rem] md:rounded-[4rem] -z-10 opacity-50"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Nandini <span className="text-blush-400">Chauhan</span>
              </h2>
              <div className="w-20 h-1.5 bg-blush-300 rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Hi, I’m Nandini Chauhan. I know life can feel heavy and confusing when you don’t know what step to take next. I’ve spent many years understanding how numbers quietly shape our choices, emotions, and direction. My focus is to listen to you first and help you see the patterns in your own life clearly. Together, we find a path that feels natural to you — one that works with your number alignment, not against it.
              </p>
              <p className="text-2xl text-gray-800 border-l-4 border-blush-200 pl-6 py-2 font-medium">
                "I show you how to align with the cosmic numbers that were always meant to lead you."
              </p>
            </div>
            
            <div className="pt-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blush-100">
                <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-widest">Join our Newsletter</h4>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Subscribe to receive small, kind notes about your numbers. Let these simple tips help you feel a bit more "in flow" every single day.
                </p>
                <form className="relative" onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email" 
                    className="w-full bg-pink-50 border border-pink-100 rounded-full py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 top-2 bg-pink-600 text-white p-2.5 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-50"
                  >
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

export default About;