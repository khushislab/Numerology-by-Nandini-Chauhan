import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import { addApplication } from '../utils/applicationsStore';

interface FreeReadingModalProps {
  onClose: () => void;
}

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9dW68vhergae2730iJTTHu8zn0w4JbveLzs1LxOuw_gwTRylYiWJhe6PdjBJyS6TCtw/exec';

const FreeReadingModal: React.FC<FreeReadingModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    dob: '',
    guidance: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) return;

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      whatsapp: formData.whatsapp.trim(),
      dob: formData.dob.trim(),
      email: formData.email.trim(),
      guidance: formData.guidance.trim()
    };

    try {
      // POST request to Google Apps Script endpoint with no-cors mode
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      // Also save to internal local store for client-side review if needed
      addApplication({
        name: payload.name,
        phone: payload.whatsapp,
        email: payload.email,
        dob: payload.dob,
        guidanceNeed: payload.guidance
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-pink-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                <Sparkles size={13} />
                Special: Free Reading Draw
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
              Apply for a Free Reading
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
              Takes just one minute. Every Thursday & Saturday (10–11 AM), I select recipients through a fair draw.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="e.g. Aarti Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    WhatsApp Number *
                  </label>
                  <input 
                    type="tel" 
                    name="whatsapp" 
                    required
                    placeholder="10-digit number"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Date of Birth
                  </label>
                  <input 
                    type="text" 
                    name="dob" 
                    placeholder="DD/MM/YYYY"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Email Address (Optional)
                </label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  What guidance are you seeking right now? (Optional)
                </label>
                <textarea 
                  name="guidance" 
                  rows={2}
                  placeholder="e.g. Career decision, personal clarity, or relationship transition..."
                  value={formData.guidance}
                  onChange={handleInputChange}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:ring-2 focus:ring-pink-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-700 hover:bg-pink-800 disabled:bg-pink-400 text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Free Reading Application</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-pink-600" />
                  Your details stay private
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-pink-600" />
                  Draws: Thu & Sat
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-200">
              <CheckCircle2 size={36} />
            </div>
            <span className="inline-block bg-pink-100 text-pink-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Entry Received
            </span>
            <h4 className="text-2xl font-extrabold text-gray-900 mb-2">Application Submitted!</h4>
            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed mb-6">
              Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>. Your application has been securely recorded for this week's free reading draw (Thursday & Saturday, 10–11 AM). Nandinii will reach out directly on WhatsApp if your name is drawn.
            </p>

            <button 
              onClick={onClose}
              className="bg-pink-700 hover:bg-pink-800 text-white font-bold px-8 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FreeReadingModal;
