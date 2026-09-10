import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';
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
      className="bg-[#F2F3F5] py-16 lg:py-24 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Cabecera de Preguntas */}
        <div className="max-w-[700px] mb-10 lg:mb-12">
          <h2
            id="preguntas-heading"
            className="text-[#1C1E22] font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
            style={{
              fontFamily: 'var(--font-family)',
              fontStretch: '110%',
              letterSpacing: '-0.01em'
            }}
          >
            Preguntas frecuentes sobre cerraduras y despacho
          </h2>
          <p className="mt-3 text-[#5E656E] text-base sm:text-lg leading-[1.6]">
            Respuestas directas a las consultas más habituales de nuestros clientes y empresas colaboradoras.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="max-w-3xl space-y-3.5">
          {FAQS_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white border border-[#DDE0E4] rounded-[4px] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F2F3F5]/40 focus-visible:outline-2 focus-visible:outline-[#1C1E22]"
                >
                  <span
                    className="text-base sm:text-[1.0625rem] font-bold text-[#1C1E22] leading-snug"
                    style={{ fontStretch: '105%' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full bg-[#F2F3F5] flex items-center justify-center text-[#1C1E22] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FFC400]' : ''
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
                    className="px-5 sm:px-6 pb-6 pt-1 text-[0.9375rem] sm:text-base text-[#5E656E] leading-relaxed border-t border-[#F2F3F5] animate-in fade-in duration-150"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque de ayuda adicional al pie del acordeón */}
        <div className="mt-10 p-5 bg-white border border-[#DDE0E4] rounded-[4px] max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-[#1C1E22]">
            <HelpCircle className="w-5 h-5 text-[#FFC400] shrink-0" aria-hidden="true" />
            <span>¿Tienes otra consulta técnica sobre cerraduras?</span>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 text-[#1C1E22] hover:text-[#FFC400] transition-colors underline underline-offset-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
            <span className="text-[#DDE0E4]">|</span>
            <a
              href={CONTACT_INFO.emailHref}
              className="inline-flex items-center gap-1.5 text-[#1C1E22] hover:text-[#FFC400] transition-colors underline underline-offset-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
