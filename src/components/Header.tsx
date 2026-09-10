import React from 'react';
import { Logo } from './ui/Logo';

interface HeaderProps {
  onQuoteClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-[100] w-full bg-transparent py-4 sm:py-6 px-5 sm:px-8 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="pointer-events-auto">
          <Logo variant="light" isScrolled={true} showBadge={false} />
        </div>
      </div>
    </header>
  );
};

