
import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
}

const PRIMARY_PHONE = "7588316966";

const services = [
  "Personal Numerology Reading (₹499)",
  "Relationship Compatibility (₹599)",
  "Career & Business Numerology (₹799)",
  "Name Analysis / Correction (₹399)",
  "Baby Name Numerology (₹800)",
  "House / Property Numerology (₹399)",
  "Mobile Number Numerology (₹399)",
  "Yearly Forecast (₹399)",
  "Emotional Healing Guidance (₹599)",
  "Life Pattern Analysis (₹699)"
];

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';
      
      // Capture lead data silently first for guaranteed record
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 
          ...formData,
          type: 'booking'
        }).toString(),
      });
      
      // Prepare and trigger WhatsApp to Primary
      const message = `Hi Nandini, I want to book a numerology consultation. \n\nMy name is ${formData.name} \nMy Phone: ${formData.phone} \nSelected Service: ${formData.service}`;
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encoded}`, '_blank');
      
      setStatus('success');
      setTimeout(onClose, 2500);
    } catch (err) {
      console.error(err);
      // Fallback: Still open WhatsApp even if silent capture fails
      const message = `Hi Nandini, I want to book a numerology consultation. \n\nMy name is ${formData.name} \nMy Phone: ${formData.phone} \nSelected Service: ${formData.service}`;
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encoded}`, '_blank');
      setStatus('success');
      setTimeout(onClose, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors">
          <X size={24} />
        </button>

        {status !== 'success' ? (
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Book a Call</h2>
            <p className="text-gray-500 mb-8">Start your journey to clarity. Fill in your details below.</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Full Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="Your Name"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blush-400 font-medium"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder="+91..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blush-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blush-400 appearance-none font-medium"
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Email Address</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  placeholder="email@example.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blush-400 font-medium"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blush-400 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blush-500 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                Confirm & Open WhatsApp
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Captured!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Your details have been saved. Opening WhatsApp now to finalize your slot...
            </p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
