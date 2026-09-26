import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 105;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Prominent Blinking Top Banner Strip */}
      <div className="blink-top-strip text-white text-xs sm:text-sm md:text-sm py-2 sm:py-2.5 px-3 sm:px-4 text-center font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-md tracking-wide leading-tight transition-colors">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-pink-100 animate-ping shrink-0"></span>
        <span className="truncate sm:overflow-visible">✨ Free Readings Every Thu & Sat (10–11 AM IST)</span>
        <a 
          href="#free-reading" 
          onClick={(e) => handleLinkClick(e, '#free-reading')} 
          className="bg-white text-pink-800 hover:bg-pink-100 hover:text-pink-900 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap ml-1 cursor-pointer shrink-0 shadow-xs transition-transform active:scale-95 flex items-center gap-1"
        >
          <span>Apply Now</span>
          <span>→</span>
        </a>
      </div>

      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5 sm:py-2.5' : 'bg-white/95 md:bg-white/90 backdrop-blur-sm py-1.5 sm:py-3 border-b border-pink-100/60'}`}>
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4">
          
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group shrink-0">
            <span className="text-xs sm:text-base md:text-lg font-black text-gray-900 group-hover:text-pink-700 transition-colors leading-tight tracking-wider uppercase">
              NUMEROLOGY <span className="text-pink-700">BY</span>
            </span>
            <span className="text-[8px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors leading-none mt-0.5">
              NANDINII J CHAUHAN
            </span>
          </a>

          {/* Quick Navigation Panel */}
          <div className="flex items-center gap-1 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-0.5 sm:gap-3 md:gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)} 
                  className="text-[9px] sm:text-xs md:text-sm font-bold transition-colors uppercase tracking-wider whitespace-nowrap px-1 sm:px-1.5 py-0.5 sm:py-1 text-gray-700 hover:text-pink-700"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Book Call Action */}
            <button 
              onClick={onBookClick}
              className="bg-pink-700 hover:bg-pink-800 text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-5 py-1 sm:py-2 rounded-full shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              <span className="hidden sm:inline">Book Call</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
