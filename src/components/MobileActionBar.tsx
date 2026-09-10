import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/cerramaxData';
import { Button } from './ui/Button';

interface MobileActionBarProps {
  onQuoteClick: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const quoteSection = document.getElementById('cotizar');
    if (!quoteSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide bar when user reaches quote section to prevent obscuring the form submit button
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(quoteSection);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Acciones rápidas de contacto"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[90] h-[64px] bg-[#1C1E22] border-t border-[rgba(255,255,255,0.12)] px-4 flex items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-bottom duration-200"
    >
      {/* Botón Primario Cotizar */}
      <div className="flex-1">
        <Button
          id="mobile-action-cotizar"
          label="Solicitar cotización"
          onClick={onQuoteClick}
          href="#cotizar"
          variant="primary"
          size="md"
          fullWidth
        />
      </div>

      {/* Botón WhatsApp directo */}
      <a
        href={CONTACT_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Cerramax"
        className="w-12 h-12 rounded-[2px] bg-[#26292E] border border-[rgba(255,255,255,0.12)] text-[#FFC400] hover:bg-[#FFC400] hover:text-[#1C1E22] flex items-center justify-center shrink-0 transition-colors"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* Botón Llamar directo */}
      <a
        href={CONTACT_INFO.phoneHref}
        aria-label="Llamar a Cerramax por teléfono"
        className="w-12 h-12 rounded-[2px] bg-[#26292E] border border-[rgba(255,255,255,0.12)] text-white hover:bg-white hover:text-[#1C1E22] flex items-center justify-center shrink-0 transition-colors"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
      </a>
    </div>
  );
};
