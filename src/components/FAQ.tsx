import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail, Sparkles } from 'lucide-react';
import { FAQS_DATA, CONTACT_INFO } from '../data/cerramaxData';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([FAQS_DATA[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-heading"
      className="bg-[#0B0C0E] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden"
    >
      {/* Halo de luz sutil en el fondo */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC400]/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        
        {/* Cabecera de Preguntas */}
        <div className="max-w-[700px] mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FFC400] mb-3">
            <Sparkles className="w-3 h-3 text-[#FFC400]" />
            <span>Resolución de dudas técnicas</span>
          </div>

          <h2
            id="preguntas-heading"
            className="text-white font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.15] tracking-tight"
            style={{
              fontFamily: 'var(--font-family)',
              fontStretch: '105%',
              letterSpacing: '-0.01em'
            }}
          >
            Preguntas frecuentes sobre cerraduras y despacho
          </h2>
          <p className="mt-3 text-[#9DA3AD] text-base sm:text-lg leading-[1.6]">
            Respuestas directas a las consultas más habituales de nuestros clientes y empresas colaboradoras.
          </p>
        </div>

        {/* Acordeón de FAQs en fondo negro */}
        <div className="max-w-3xl space-y-3.5">
          {FAQS_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#15171A] border-[#FFC400]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    : 'bg-[#121417] border-white/10 hover:border-white/20 hover:bg-[#16181C]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC400]"
                >
                  <span
                    className={`text-base sm:text-[1.0625rem] font-bold leading-snug transition-colors ${
                      isOpen ? 'text-[#FFC400]' : 'text-white'
                    }`}
                    style={{ fontStretch: '105%' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#FFC400] text-[#15171A]'
                        : 'bg-white/10 text-white/80 border border-white/5'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={faq.id}
                    className="px-5 sm:px-6 pb-6 pt-1 text-[0.9375rem] sm:text-base text-[#9DA3AD] leading-relaxed border-t border-white/10 animate-in fade-in duration-150"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque de ayuda adicional al pie del acordeón */}
        <div className="mt-10 p-5 bg-[#15171A] border border-white/10 rounded-xl max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-[#D1D5DB]">
            <HelpCircle className="w-5 h-5 text-[#FFC400] shrink-0" aria-hidden="true" />
            <span>¿Tienes otra consulta técnica sobre cerraduras?</span>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFC400] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={CONTACT_INFO.emailHref}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFC400] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

