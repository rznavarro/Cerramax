import React from 'react';
import { BRANDS_DATA } from '../data/cerramaxData';

export const BrandStrip: React.FC = () => {
  return (
    <section
      id="marcas"
      aria-labelledby="marcas-heading"
      className="bg-white py-12 lg:py-16 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Título semántico H2 */}
        <h2
          id="marcas-heading"
          className="text-center sm:text-left text-[#5E656E] font-bold text-xs sm:text-sm uppercase tracking-[0.15em] mb-8"
        >
          Marcas que distribuimos con certificación oficial
        </h2>

        {/* Fila / Grilla de Marcas Monocromas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-between">
          {BRANDS_DATA.map((brand, idx) => (
            <div
              key={idx}
              className="h-12 flex items-center justify-center sm:justify-start px-3 py-2 rounded-[2px] bg-[#F2F3F5]/60 border border-[#E5E7EB] select-none"
              title={`Distribuidor oficial ${brand.name}`}
            >
              <span
                className="text-[#1C1E22]/70 font-extrabold text-base sm:text-lg tracking-wider uppercase font-sans text-center w-full"
                style={{
                  fontFamily: 'var(--font-family)',
                  letterSpacing: '0.08em'
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
