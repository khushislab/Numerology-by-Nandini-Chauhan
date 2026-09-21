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
    { name: 'Free Reading', href: '#free-reading', highlight: true },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90;
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
      {/* Thin Banner at the very top */}
      <div className="bg-pink-700 text-white text-[10px] sm:text-xs py-1.5 px-3 text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-200 animate-ping shrink-0"></span>
        <span className="font-semibold">✨ Special: Free Readings every Thursday & Saturday (10–11 AM)</span>
        <a 
          href="#free-reading" 
          onClick={(e) => handleLinkClick(e, '#free-reading')} 
          className="underline hover:text-pink-200 font-bold whitespace-nowrap ml-1 cursor-pointer"
        >
          Apply Now →
        </a>
      </div>

      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 sm:py-2.5' : 'bg-white/95 md:bg-white/90 backdrop-blur-sm py-2.5 sm:py-3 border-b border-pink-100/60'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group shrink-0">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-gray-500 group-hover:text-pink-700 transition-colors leading-none mb-0.5">
              Numerology By
            </span>
            <span className="text-sm sm:text-lg md:text-xl font-extrabold text-gray-900 leading-none">
              Nandinii J <span className="text-pink-700">Chauhan</span>
            </span>
          </a>

          {/* Quick Navigation Panel */}
          <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 sm:gap-3 md:gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)} 
                  className={`text-[10px] sm:text-xs md:text-sm font-bold transition-colors uppercase tracking-wider whitespace-nowrap px-1 sm:px-1.5 py-1 ${
                    link.highlight 
                      ? 'text-pink-700 hover:text-pink-800 font-extrabold bg-pink-50 rounded-md' 
                      : 'text-gray-700 hover:text-pink-700'
                  }`}
                >
                  {link.highlight ? '✨ Free Reading' : link.name}
                </a>
              ))}
            </div>

            {/* Book Call Action */}
            <button 
              onClick={onBookClick}
              className="bg-pink-700 hover:bg-pink-800 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
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
