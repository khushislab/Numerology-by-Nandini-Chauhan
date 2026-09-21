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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3' : 'bg-white/90 md:bg-transparent backdrop-blur-sm py-3 sm:py-4'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group shrink-0">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-gray-500 group-hover:text-pink-700 transition-colors leading-none mb-0.5 sm:mb-1">
            Numerology By
          </span>
          <span className="text-base sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-none">
            Nandinii <span className="text-pink-700">Chauhan</span>
          </span>
        </a>

        {/* Quick Navigation Panel (Visible on all devices, including mobile) */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="flex items-center gap-1.5 sm:gap-4 md:gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-700 hover:text-pink-700 transition-colors uppercase tracking-wider whitespace-nowrap px-1 sm:px-1.5 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Book Call Action */}
          <button 
            onClick={onBookClick}
            className="bg-pink-700 hover:bg-pink-800 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Book Call</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
