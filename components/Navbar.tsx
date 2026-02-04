import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Value', href: '#value' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex flex-col group">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 group-hover:text-blush-400 transition-colors leading-none mb-1">
            Numerology By
          </span>
          <span className="text-xl md:text-2xl font-bold text-gray-900 leading-none">
            Nandini <span className="text-blush-400">Chauhan</span>
          </span>
        </a>

        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[10px] font-bold text-gray-500 hover:text-blush-400 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onBookClick}
            className="bg-blush-400 text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-blush-500 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Book a Call
          </button>
        </div>

        <button className="lg:hidden text-gray-700 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 shadow-2xl py-8 px-6 space-y-5 animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block text-xl font-bold text-gray-800" 
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }}
            className="block w-full text-center bg-blush-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95"
          >
            Book a Call
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;