import React from 'react';
import { STEPS_DATA, CONTACT_INFO } from '../data/cerramaxData';
import { Button } from './ui/Button';
import { TextLink } from './ui/TextLink';

interface HowWeWorkProps {
  onQuoteClick: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onQuoteClick }) => {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-trabajamos-heading"
      className="relative bg-[#1C1E22] text-white py-16 lg:py-24 overflow-hidden border-b border-[#26292E]"
    >
      {/* Imagen de fondo oscurecida al 88% */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-12"
        />
        <div className="absolute inset-0 bg-[#1C1E22]/90 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Cabecera */}
        <div className="max-w-[700px]">
          <h2
            id="como-trabajamos-heading"
            className="text-white font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
            style={{
              fontFamily: 'var(--font-family)',
              fontStretch: '110%',
              letterSpacing: '-0.01em'
            }}
          >
            Así cotizas y compras para tu obra
          </h2>
          <p className="mt-3 text-[#B4BAC2] text-base sm:text-lg leading-[1.6]">
            Un flujo ágil y confiable que elimina tiempos muertos en adquisiciones para que tu equipo reciba los herrajes exactos sin sorpresas.
          </p>
        </div>

        {/* 4 Pasos en grilla */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          
          {/* Línea horizontal continua en desktop */}
          <div
            className="hidden lg:block absolute top-7 left-6 right-6 h-[1px] bg-white/20 z-0"
            aria-hidden="true"
          />

          {STEPS_DATA.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col">
              
              {/* Número de paso en tipografía display amarilla */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center justify-center w-14 h-14 rounded-[2px] bg-[#26292E] border-2 border-[#FFC400] text-[#FFC400] font-extrabold text-2xl leading-none font-tabular shadow-md"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontStretch: '125%'
                  }}
                >
                  {step.number}
                </span>
                <span className="lg:hidden text-xs font-bold uppercase tracking-wider text-[#FFC400]">
                  Paso 0{step.number}
                </span>
              </div>

              {/* Título de paso */}
              <h3
                className="text-lg sm:text-xl font-bold text-white leading-snug"
                style={{ fontStretch: '105%' }}
              >
                {step.title}
              </h3>

              {/* Descripción */}
              <p className="mt-2 text-sm text-[#B4BAC2] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA y Enlace a WhatsApp */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[rgba(255,255,255,0.12)] flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Button
            label="Solicitar cotización"
            onClick={onQuoteClick}
            href="#cotizar"
            variant="primary"
            size="lg"
          />
          <TextLink
            label="o escríbenos por WhatsApp"
            href={CONTACT_INFO.whatsappHref}
            variant="on-dark"
            external
          />
        </div>

      </div>
    </section>
  );
};
