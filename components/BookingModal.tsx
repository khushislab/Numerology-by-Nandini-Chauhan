import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
  selectedService?: string | null;
}

const PRIMARY_PHONE = "7588316966";

const availableServices = [
  "Personal Numerology Reading (₹1,099)",
  "Relationship Compatibility (₹1,299)",
  "Career & Business (₹1,299)",
  "Name Analysis and Correction (₹1,499)",
  "Baby Name Numerology (₹1,499)",
  "Litigation / Divorce (₹1,299)",
  "House / Property (₹1,199)",
  "Mobile Number (₹1,499)",
  "Yearly Forecast (₹1,499)",
  "Marriage Matching (₹1,299)",
  "Business Partnership Matching (₹1,299)",
  "Muhurat (Auspicious Timing) (₹1,199)",
  "Medical Numerology (₹1,199)"
];

const BookingModal: React.FC<BookingModalProps> = ({ onClose, selectedService }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: selectedService || availableServices[0]
  });

  useEffect(() => {
    if (selectedService) {
      const match = availableServices.find(s => 
        s.toLowerCase().includes(selectedService.toLowerCase().split(' (')[0].trim()) ||
        selectedService.toLowerCase().includes(s.toLowerCase().split(' (')[0].trim())
      ) || selectedService;
      setFormData(prev => ({ ...prev, service: match }));
    }
  }, [selectedService]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz2Lqd9myCymPjbTVzCenaovhGDyJcJ6hk1q6fo7PcYmQAviO2AtZyOVnTc8oxcFQugaQ/exec';
      
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 
          ...formData,
          type: 'booking'
        }).toString(),
      });
      
      const message = `Hi Nandinii, I would like to book a numerology consultation.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
      
      setStatus('success');
      setTimeout(onClose, 2500);
    } catch (err) {
      const message = `Hi Nandinii, I would like to book a numerology consultation.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}`;
      window.open(`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
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
                    {availableServices.map(s => (
                      <option key={s} value={s}>
                        {s}
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

export default BookingModal;
