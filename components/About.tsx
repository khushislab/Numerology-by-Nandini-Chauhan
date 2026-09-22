import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-8 sm:py-16 md:py-24 bg-pink-50/40 px-3 sm:px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          
          {/* Portrait with balanced sizing matching intro text */}
          <div className="relative group w-full max-w-[170px] sm:max-w-[280px] md:max-w-[380px] mx-auto">
            <div className="aspect-[4/5] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-md sm:shadow-xl relative z-10 ring-2 sm:ring-6 ring-white transition-transform duration-500 hover:scale-[1.01] bg-pink-50">
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
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-full h-full border sm:border-2 border-pink-200 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] -z-10 opacity-70"></div>
          </div>
          
          {/* Bio & Intro */}
          <div className="space-y-3 sm:space-y-6 text-center md:text-left">
            <div>
              <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-1 sm:mb-2">
                Nandinii J <span className="text-pink-700">Chauhan</span>
              </h2>
              <div className="w-10 sm:w-16 h-1 sm:h-1.5 bg-pink-700 rounded-full mx-auto md:mx-0"></div>
            </div>

            <div className="space-y-2 sm:space-y-4 text-gray-700 leading-relaxed text-xs sm:text-base md:text-lg">
              <p>
                Hi, I'm Nandinii J Chauhan. I know life can feel heavy and confusing when you don't know what step to take next. I understand how numbers quietly shape our choices, emotions, and direction.
              </p>
              <p>
                I'm certified in Chinese and Pythagorean Numerology, and I hold a master certification in Vedic Numerology.
              </p>
              <p className="text-xs sm:text-base md:text-xl text-gray-900 border-l-2 sm:border-l-4 border-pink-600 pl-2.5 sm:pl-4 py-1.5 sm:py-2 font-medium italic bg-white/80 rounded-r-xl sm:rounded-r-2xl shadow-2xs sm:shadow-sm text-left">
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
