import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-8 sm:py-12 md:py-14 bg-pink-50/40 px-3 sm:px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          
          {/* Portrait with balanced sizing */}
          <div className="relative group w-full max-w-[170px] sm:max-w-[220px] md:max-w-[280px] mx-auto">
            <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg relative z-10 ring-2 sm:ring-4 ring-white transition-transform duration-500 hover:scale-[1.01] bg-pink-50">
              <img 
                src="/nandini-chauhan.jpg" 
                alt="Nandinii J Chauhan - Numerologist" 
                className="w-full h-full object-cover object-top"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "https://plain-apac-prod-public.komododecks.com/202609/21/d3vg3vNXUQ6ERrND2d31/image.jpg";
                }}
              />
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-full h-full border sm:border-2 border-pink-200 rounded-2xl sm:rounded-3xl -z-10 opacity-70"></div>
          </div>
          
          {/* Bio & Intro */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
                Nandinii J <span className="text-pink-700">Chauhan</span>
              </h2>
              <div className="w-10 sm:w-14 h-1 bg-pink-700 rounded-full mx-auto md:mx-0"></div>
            </div>

            <div className="space-y-2 sm:space-y-3 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-sm">
              <p>
                Hi, I'm Nandinii J Chauhan. I know life can feel heavy and confusing when you don't know what step to take next. I understand how numbers quietly shape our choices, emotions, and direction.
              </p>
              <p>
                I'm certified in Chinese and Pythagorean Numerology, and I hold a master certification in Vedic Numerology.
              </p>
              <p className="text-xs sm:text-sm md:text-sm text-gray-900 border-l-2 sm:border-l-3 border-pink-600 pl-2.5 sm:pl-3 py-1 sm:py-1.5 font-medium italic bg-white/80 rounded-r-xl shadow-2xs text-left">
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
