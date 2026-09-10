import React from 'react';
import { Check } from 'lucide-react';
import { ABOUT_CHECKLIST, ABOUT_QUOTE, CONTACT_INFO } from '../data/cerramaxData';

export const AboutUs: React.FC = () => {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-heading"
      className="bg-white py-16 lg:py-24 border-b border-[#DDE0E4] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Collage Fotográfico (Cols 1-5 en Desktop) */}
          <div className="lg:col-span-5 relative">
            {/* Bloque de acento decorativo que asoma arriba a la izquierda */}
            <div
              className="hidden sm:block absolute -top-4 -left-4 w-40 h-40 bg-[#FFC400] rounded-[2px] z-0 select-none"
              aria-hidden="true"
            />

            {/* Foto principal 4:5 */}
            <div className="relative z-10 aspect-[4/5] w-full rounded-[4px] overflow-hidden shadow-lg bg-[#26292E]">
              <img
                src="/assets/about/warehouse.jpg"
                alt="Bodega central de distribución y stock continuo de Cerramax"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Foto secundaria 1:1 superpuesta abajo a la derecha */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 z-20 w-44 h-44 aspect-square rounded-[4px] overflow-hidden border-[6px] border-white shadow-xl bg-[#1C1E22]">
              <img
                src="/assets/about/workbench.jpg"
                alt="Mesa de armado de cilindros y sistemas de llave maestra en Cerramax"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Columna Derecha: Texto, Checklist y Cita (Cols 7-12 en Desktop) */}
          <div className="lg:col-span-7">
            <h2
              id="nosotros-heading"
              className="text-[#1C1E22] font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
              style={{
                fontFamily: 'var(--font-family)',
                fontStretch: '110%',
                letterSpacing: '-0.01em'
              }}
            >
              Especialistas en cerraduras de alta seguridad
            </h2>

            {/* Párrafo de Entidad (GEO y buscadores semánticos) */}
            <p className="mt-5 text-[#5E656E] text-base sm:text-lg leading-[1.6] max-w-[65ch]">
              Cerramax es un proveedor chileno de cerraduras, candados y herrajes de seguridad ubicado en {CONTACT_INFO.address}. Abastecemos de forma continua a constructoras, administraciones de edificios, contratistas y hogares con asesoría experta y despacho a todo Chile.
            </p>

            {/* Checklist de 6 atributos en 2 columnas */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ABOUT_CHECKLIST.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-[2px] bg-[#FFC400] text-[#1C1E22] flex items-center justify-center shrink-0 shadow-2xs"
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-[#1C1E22]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* QuoteBlock con cita del liderazgo técnico */}
            <blockquote className="mt-8 bg-[#F2F3F5] border-l-4 border-[#FFC400] rounded-r-[4px] p-6 text-[#1C1E22]">
              <p className="text-[0.9375rem] sm:text-base italic leading-relaxed text-[#1C1E22]">
                "{ABOUT_QUOTE.quote}"
              </p>
              <footer className="mt-3 pt-3 border-t border-[#DDE0E4]/60 flex items-center gap-2">
                <cite className="not-italic text-sm font-bold text-[#1C1E22]">
                  {ABOUT_QUOTE.name}
                </cite>
                <span className="text-[#5E656E] text-sm">·</span>
                <span className="text-sm text-[#5E656E]">
                  {ABOUT_QUOTE.role}
                </span>
              </footer>
            </blockquote>

          </div>

        </div>
      </div>
    </section>
  );
};
