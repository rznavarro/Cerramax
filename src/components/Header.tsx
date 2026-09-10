import React, { useState, useEffect } from 'react';
import { Logo } from './ui/Logo';

interface HeaderProps {
  onQuoteClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="fixed-header-logo"
      aria-label="Cabecera con logotipo Cerramax"
      className="fixed top-3 left-3 sm:top-4 sm:left-6 md:top-5 md:left-8 z-[200] pointer-events-auto transition-all duration-300"
    >
      <div
        className={`transition-all duration-300 rounded-full flex items-center ${
          isScrolled
            ? 'bg-[#15171A]/95 backdrop-blur-md border border-white/15 px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#FFC400]/50'
            : 'bg-transparent border border-transparent px-1 py-1'
        }`}
      >
        <Logo variant="light" isScrolled={true} showBadge={false} />
      </div>
    </header>
  );
};


