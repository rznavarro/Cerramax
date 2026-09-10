import React from 'react';
import { Download, ArrowRight, Shield } from 'lucide-react';
import { PRODUCT_CATEGORIES, CONTACT_INFO } from '../data/cerramaxData';
import { CategoryItemData } from '../types';
import { Button } from './ui/Button';

interface CatalogProps {
  onQuoteCategory: (categoryTitle: string) => void;
  onDownloadCatalog: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onQuoteCategory, onDownloadCatalog }) => {
  const handleCategoryClick = (category: CategoryItemData, e: React.MouseEvent) => {
    e.preventDefault();
    onQuoteCategory(category.title);
    const formSection = document.getElementById('cotizar');
    const formHeading = document.getElementById('cotizar-heading');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (formHeading) {
      formHeading.focus();
    }
  };

  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-heading"
      className="bg-[#F2F3F5] py-16 lg:py-24 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Cabecera de Catálogo */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#DDE0E4]">
          <div className="max-w-[720px]">
            <h2
              id="catalogo-heading"
              className="text-[#1C1E22] font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
              style={{
                fontFamily: 'var(--font-family)',
                fontStretch: '110%',
                letterSpacing: '-0.01em'
              }}
            >
              Productos de seguridad para cada tipo de puerta
            </h2>
            <p className="mt-3 text-[#5E656E] text-base sm:text-lg leading-[1.6]">
              Soluciones ensayadas bajo norma para puertas de madera, metal, vidrio y vías de evacuación con stock para despacho inmediato.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              id="btn-descargar-catalogo-s3"
              label={`Descargar catálogo (PDF, ${CONTACT_INFO.catalogSize})`}
              onClick={onDownloadCatalog}
              icon={<Download className="w-4 h-4" aria-hidden="true" />}
              variant="secondary-light"
              size="md"
            />
          </div>
        </div>

        {/* Grilla 4x2 de Categorías (4 columnas desktop, 3 tablet, 2 móvil) */}
        <div className="mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isFeatured = cat.featured;

            return (
              <div
                key={cat.id}
                onClick={(e) => handleCategoryClick(cat, e)}
                className={`group flex flex-col justify-between rounded-[4px] border transition-all duration-150 cursor-pointer overflow-hidden ${
                  isFeatured
                    ? 'bg-[#1C1E22] text-white border-[#FFC400] shadow-lg ring-1 ring-[#FFC400]/40'
                    : 'bg-white text-[#1C1E22] border-[#DDE0E4] hover:border-[#1C1E22] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Foto de producto 4:3 con insignia si es destacado */}
                  <div className="relative aspect-4/3 sm:aspect-4/3 w-full bg-[#E5E7EB] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isFeatured && (
                      <div className="absolute top-3 left-3 bg-[#FFC400] text-[#1C1E22] text-[0.6875rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] shadow-xs flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>Destacado B2B</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido de tarjeta */}
                  <div className="p-4 sm:p-5">
                    <h3
                      className={`text-[1.0625rem] sm:text-[1.1875rem] font-bold leading-tight ${
                        isFeatured ? 'text-white' : 'text-[#1C1E22]'
                      }`}
                      style={{ fontStretch: '105%' }}
                    >
                      {cat.title}
                    </h3>

                    {/* Descripción (oculta en móvil para escaneo rápido según spec) */}
                    <p
                      className={`hidden sm:block mt-2 text-xs sm:text-[0.875rem] leading-relaxed line-clamp-2 ${
                        isFeatured ? 'text-[#B4BAC2]' : 'text-[#5E656E]'
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Enlace a cotización */}
                <div className="p-4 sm:p-5 pt-0 mt-auto">
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold group-hover:underline underline-offset-4 ${
                      isFeatured ? 'text-[#FFC400]' : 'text-[#1C1E22]'
                    }`}
                  >
                    <span>Cotizar esta categoría</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
