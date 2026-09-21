import React from 'react';

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

export default About;
