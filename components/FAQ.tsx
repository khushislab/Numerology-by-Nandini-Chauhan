import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "How long is one numerology call?",
    a: "Each call is usually 30 to 45 minutes, depending on the service you choose."
  },
  {
    q: "Do I need to believe in numerology for this to work?",
    a: "No. You only need an open mind. This is about understanding patterns, not blind belief."
  },
  {
    q: "Will you tell me my future?",
    a: "No. I do not predict events. I help you understand your nature, patterns, and choices."
  },
  {
    q: "What information do you need from me?",
    a: "Only basic details like: Date of birth and Name. Your information is kept private."
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. Your details are never shared with anyone. Your session is completely confidential."
  },
  {
    q: "Do you give remedies or suggestions?",
    a: "Yes, only simple and practical guidance if needed. No fear-based or extreme remedies."
  },
  {
    q: "What if I don't resonate after the call?",
    a: "That’s okay. The session is about clarity, not forcing belief."
  },
  {
    q: "How do I book a consultation?",
    a: "Click Book a Call, fill the form, and connect on WhatsApp. Payment is done after details are clearly explained."
  },
  {
    q: "How will I receive my appointment confirmation?",
    a: "After payment, you will get your call time on WhatsApp. You will know exactly when the call will happen."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-pink-50/10 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Common Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-pink-50 shadow-sm overflow-hidden">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-pink-50/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-gray-800">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="text-pink-600" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-pink-50 pt-4">
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