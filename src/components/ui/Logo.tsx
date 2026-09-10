import React, { useState } from 'react';

export interface LogoProps {
  variant?: 'dark' | 'light';
  layout?: 'horizontal' | 'stacked';
  align?: 'left' | 'center';
  isScrolled?: boolean;
  className?: string;
  useImage?: boolean;
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  layout = 'horizontal',
  align = 'center',
  isScrolled = false,
  className = '',
  useImage = false,
  showBadge = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light';
  const isStacked = layout === 'stacked';
  const isLeft = align === 'left';

  // Responsive heights
  const containerHeight = isStacked
    ? 'auto'
    : isScrolled
    ? '40px'
    : '48px';

  // If user explicitly asks for image or as option, render official graphic asset
  if (useImage && !imgError) {
    return (
      <a
        href="#top"
        aria-label="Cerramax - Inicio"
        className={`inline-flex items-center select-none transition-transform duration-200 hover:opacity-95 ${className}`}
      >
        <img
          src="/cerramax-logo.jpg"
          alt="Cerramax Cerraduras y Herrajes 24/7"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`object-contain transition-all duration-200 ${
            isStacked ? 'h-24 sm:h-28 w-auto' : isScrolled ? 'h-10 w-auto' : 'h-12 w-auto'
          }`}
        />
      </a>
    );
  }

  return (
    <a
      href="#top"
      aria-label="Cerramax - Inicio"
      className={`inline-flex ${
        isStacked
          ? `flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'} gap-2`
          : 'items-center gap-3'
      } select-none transition-all duration-200 group ${className}`}
      style={{ minHeight: containerHeight }}
    >
      {/* 1. Golden Emblem: Circular Segmented "C" with Precision Key */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
          isStacked ? 'w-14 h-14 sm:w-16 sm:h-16' : isScrolled ? 'w-9 h-9' : 'w-11 h-11'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Rich Golden Radial & Linear Gradients */}
            <radialGradient id="cmGoldOuter" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="25%" stopColor="#FACC15" />
              <stop offset="60%" stopColor="#CA8A04" />
              <stop offset="85%" stopColor="#854D0E" />
              <stop offset="100%" stopColor="#543105" />
            </radialGradient>

            <linearGradient id="cmGoldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="70%" stopColor="#A16207" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id="cmKeyGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="35%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>

            {/* Subtle Drop Shadow */}
            <filter id="cmShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Golden "C" Outer Ring with Chamfered Segments */}
          <g filter="url(#cmShadow)">
            {/* Upper Arc Segment */}
            <path
              d="M 50 10 
                 A 40 40 0 0 1 84 32 
                 L 70 38 
                 A 26 26 0 0 0 50 24 
                 A 26 26 0 0 0 24 50 
                 L 10 50 
                 A 40 40 0 0 1 50 10 Z"
              fill="url(#cmGoldOuter)"
              stroke="url(#cmGoldBevel)"
              strokeWidth="0.8"
            />
            {/* Lower Arc Segment */}
            <path
              d="M 10 50 
                 L 24 50 
                 A 26 26 0 0 0 50 76 
                 A 26 26 0 0 0 72 61 
                 L 86 67 
                 A 40 40 0 0 1 50 90 
                 A 40 40 0 0 1 10 50 Z"
              fill="url(#cmGoldOuter)"
              stroke="url(#cmGoldBevel)"
              strokeWidth="0.8"
            />
            {/* Interlocking Segment Seams / Cuts */}
            <path d="M 48 10 L 52 24" stroke="#854D0E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 48 76 L 52 90" stroke="#854D0E" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Central Horizontal High-Precision Key */}
          <g filter="url(#cmShadow)">
            {/* Key Bow (Circular Head with Fingerprint Pattern) */}
            <g transform="translate(68, 50)">
              <rect x="-14" y="-12" width="28" height="24" rx="10" fill="url(#cmGoldOuter)" stroke="#FFE58F" strokeWidth="0.8" />
              {/* Bow Hole */}
              <circle cx="2" cy="0" r="3.5" fill="#1C1E22" />
              {/* Biometric Fingerprint Ridges on Key Bow */}
              <path d="M -8 -6 A 7 7 0 0 1 -8 6" stroke="#92400E" strokeWidth="0.7" fill="none" />
              <path d="M -5 -8 A 10 10 0 0 1 -5 8" stroke="#FEF08A" strokeWidth="0.6" fill="none" opacity="0.8" />
              <path d="M -2 -9 A 12 12 0 0 1 -2 9" stroke="#92400E" strokeWidth="0.7" fill="none" />
            </g>

            {/* Key Collar / Shoulder Stop */}
            <rect x="50" y="46.5" width="4" height="7" rx="0.5" fill="#FEF08A" stroke="#854D0E" strokeWidth="0.5" />

            {/* Key Blade with Security Bitting & Dimple Drill Cuts */}
            <path
              d="M 50 48.5 
                 H 26 
                 L 22 50 
                 L 26 51.5 
                 H 30 
                 L 31 53 
                 H 34 
                 L 35 51.5 
                 H 40 
                 L 41 53.5 
                 H 44 
                 L 45 51.5 
                 H 50 Z"
              fill="url(#cmKeyGrad)"
              stroke="#854D0E"
              strokeWidth="0.5"
            />

            {/* Laser Dimple Pin Cavities on Blade */}
            <circle cx="28" cy="50" r="0.8" fill="#451A03" />
            <circle cx="33" cy="50" r="0.8" fill="#451A03" />
            <circle cx="38" cy="50" r="0.9" fill="#451A03" />
            <circle cx="43" cy="50" r="0.8" fill="#451A03" />
            <line x1="25" y1="50" x2="48" y2="50" stroke="#FEF08A" strokeWidth="0.4" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* 2. Typographic Wordmark & 24/7 Security Badge */}
      <div
        className={`flex flex-col ${
          isStacked ? (isLeft ? 'items-start' : 'items-center') : 'justify-center'
        } leading-none`}
      >
        {/* Brand Name: CERRA (Silver Chrome) + MAX (Brushed Gold) */}
        <div className="flex items-center tracking-tight">
          <span
            className="font-black"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: isStacked ? '1.75rem' : isScrolled ? '1.25rem' : '1.45rem',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 30%, #94A3B8 70%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.25))',
            }}
          >
            CERRA
          </span>
          <span
            className="font-black"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: isStacked ? '1.75rem' : isScrolled ? '1.25rem' : '1.45rem',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              background: 'linear-gradient(180deg, #FEF08A 0%, #F59E0B 40%, #D97706 75%, #92400E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))',
            }}
          >
            MAX
          </span>
        </div>

        {/* 3. The Signature 24/7 Security Pill Badge (Fingerprint - Keypad - Padlock - 24/7) */}
        {showBadge && (!isScrolled || isStacked) && (
          <div
            className={`mt-1.5 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border shadow-xs transition-colors ${
              isLight
                ? 'bg-[#0E1013] border-[#CA8A04]/60 text-white'
                : 'bg-[#15171A] border-[#D97706]/50 text-white'
            }`}
            style={{
              background: 'radial-gradient(ellipse at top, #1E2229 0%, #0D0F12 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(254, 240, 138, 0.25)'
            }}
          >
            {/* Mini Fingerprint */}
            <svg
              viewBox="0 0 14 14"
              className="w-2.5 h-2.5 text-[#FACC15]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M7 1.5A5.5 5.5 0 0 0 1.5 7v1" strokeLinecap="round" />
              <path d="M12.5 7A5.5 5.5 0 0 0 7 1.5" strokeLinecap="round" />
              <path d="M4 6.5A3 3 0 0 1 10 6.5V8" strokeLinecap="round" />
              <path d="M6 7.5a1 1 0 0 1 2 0v2" strokeLinecap="round" />
            </svg>

            {/* Mini 3x3 Keypad Matrix */}
            <div className="grid grid-cols-3 gap-0.5 w-2 h-2" aria-hidden="true">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-[2px] h-[2px] rounded-full bg-[#FACC15]" />
              ))}
            </div>

            {/* Mini Smart Padlock with circuit nodes */}
            <svg
              viewBox="0 0 14 14"
              className="w-2.5 h-2.5 text-[#FACC15]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              aria-hidden="true"
            >
              <path d="M4.5 5V3.5a2.5 2.5 0 0 1 5 0V5" strokeLinecap="round" />
              <rect x="3" y="5" width="8" height="6" rx="1" fill="#CA8A04" stroke="#FACC15" />
              <circle cx="7" cy="8" r="0.8" fill="#1C1E22" />
            </svg>

            {/* 24/7 Typography */}
            <span
              className="text-[0.625rem] font-black tracking-wider uppercase"
              style={{
                fontFamily: 'var(--font-family)',
                color: '#FACC15',
                letterSpacing: '0.04em',
                lineHeight: 1
              }}
            >
              24/7
            </span>
          </div>
        )}
      </div>
    </a>
  );
};
