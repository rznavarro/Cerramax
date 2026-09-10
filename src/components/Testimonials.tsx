import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/cerramaxData';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      className="bg-[#F2F3F5] py-16 lg:py-24 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Cabecera con nota de evaluación en Google */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#DDE0E4]">
          <div>
            <h2
              id="testimonios-heading"
              className="text-[#1C1E22] font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
              style={{
                fontFamily: 'var(--font-family)',
                fontStretch: '110%',
                letterSpacing: '-0.01em'
              }}
            >
              Lo que dicen quienes ya compran en Cerramax
            </h2>
            <p className="mt-2 text-[#5E656E] text-base">
              Experiencias reales de empresas constructoras, administradores y clientes en Chile.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1E22] bg-white px-3.5 py-2 rounded-[2px] border border-[#DDE0E4] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#1E7F3C]" aria-hidden="true" />
            <span>4,8 en Google · Valoraciones verificadas</span>
          </div>
        </div>

        {/* 3 Tarjetas de testimonios (Constructora, Administración, Pyme/Hogar) */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#DDE0E4] rounded-[4px] p-6 lg:p-8 flex flex-col justify-between shadow-2xs"
            >
              <div>
                {/* Comillas decorativas en color acento amarillo */}
                <div className="w-10 h-10 rounded-full bg-[#FFC400]/20 flex items-center justify-center text-[#1C1E22] mb-5" aria-hidden="true">
                  <Quote className="w-5 h-5 text-[#1C1E22]" />
                </div>

                {/* Cita textual */}
                <p className="text-[#1C1E22] text-[0.9375rem] sm:text-base leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Autor, cargo y segmento */}
              <div className="mt-6 pt-5 border-t border-[#F2F3F5]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1C1E22]">
                    {t.name}
                  </span>
                  <span className="text-[0.6875rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] bg-[#F2F3F5] text-[#5E656E]">
                    {t.segment}
                  </span>
                </div>
                <div className="text-xs text-[#5E656E] mt-0.5">
                  {t.role} · {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
