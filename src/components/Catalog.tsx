import React, { useState, useMemo } from 'react';
import { Download, ArrowRight, Shield, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { PRODUCT_CATEGORIES, CONTACT_INFO } from '../data/cerramaxData';
import { CategoryItemData } from '../types';
import { ImageStreamHero, StreamImage } from './ui/image-stream-hero';

interface CatalogProps {
  onQuoteCategory: (categoryTitle: string) => void;
  onDownloadCatalog: () => void;
}

// Imágenes de alta resolución del catálogo técnico de cerrajería y herrajes
const STREAM_IMAGES: StreamImage[] = [
  {
    src: '/assets/hero/smart_digital_lock_1789061354632.jpg',
    alt: 'Cerradura digital inteligente Cerramax con sensor biométrico',
    title: 'Cerraduras Digitales',
  },
  {
    src: '/assets/hero/master_key_cylinder_1789061369777.jpg',
    alt: 'Cilindros de precisión y sistemas de llave maestra computarizados',
    title: 'Llaves Maestras',
  },
  {
    src: '/assets/hero/heavy_duty_lock_1789061384640.jpg',
    alt: 'Cerradura de embutir pesada en acero inoxidable grado 304',
    title: 'Cerraduras de Embutir',
  },
  {
    src: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    alt: 'Cerradura de sobreponer acorazada para portones y rejas',
    title: 'Cerraduras de Sobreponer',
  },
  {
    src: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    alt: 'Candados de máxima resistencia en acero cementado para faenas',
    title: 'Candados de Seguridad',
  },
  {
    src: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    alt: 'Barras antipánico certificadas para vías de evacuación',
    title: 'Barras Antipánico',
  },
  {
    src: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    alt: 'Cierrapuertas hidráulicos regulables para alto tráfico peatonal',
    title: 'Cierrapuertas Hidráulicos',
  },
  {
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    alt: 'Manillas arquitectónicas y herrajes en acero inoxidable',
    title: 'Manillas y Herrajes',
  },
];

type CategoryFilter = 'todas' | 'cerraduras' | 'digitales' | 'evacuacion' | 'herrajes';

export const Catalog: React.FC<CatalogProps> = ({ onQuoteCategory, onDownloadCatalog }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('todas');

  const filteredCategories = useMemo(() => {
    if (activeFilter === 'todas') return PRODUCT_CATEGORIES;
    if (activeFilter === 'cerraduras') {
      return PRODUCT_CATEGORIES.filter((c) => ['embutir', 'sobreponer', 'cilindros-maestras', 'candados'].includes(c.id));
    }
    if (activeFilter === 'digitales') {
      return PRODUCT_CATEGORIES.filter((c) => ['digitales'].includes(c.id));
    }
    if (activeFilter === 'evacuacion') {
      return PRODUCT_CATEGORIES.filter((c) => ['barras-antipanico', 'cierrapuertas'].includes(c.id));
    }
    if (activeFilter === 'herrajes') {
      return PRODUCT_CATEGORIES.filter((c) => ['manillas-herrajes'].includes(c.id));
    }
    return PRODUCT_CATEGORIES;
  }, [activeFilter]);

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

  const scrollToGrid = () => {
    const gridEl = document.getElementById('catalogo-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-heading"
      className="bg-[#0E1013] text-white py-14 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Sutil halo de iluminación de fondo */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFC400]/5 blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10 space-y-12 sm:space-y-16">

        {/* ── APARTADO REDISEÑADO CON CORREDOR 3D IMAGE STREAM ──────────────── */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#15171A] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <ImageStreamHero
            images={STREAM_IMAGES}
            cards={10}
            speed={16}
            axis={52}
            className="w-full h-[460px] sm:h-[520px] lg:h-[580px]"
          >
            {/* Overlay sutil para legibilidad del contenido central */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15171A] via-[#15171A]/70 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#15171A]/50 to-[#15171A]/95 pointer-events-none" />

            {/* Contenido Central Flotante */}
            <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 sm:py-14 px-5 text-center pointer-events-auto">
              {/* Badge Superior */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FFC400]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC400]" aria-hidden="true" />
                <span>Catálogo Técnico de Alta Seguridad · Cerramax</span>
              </div>

              {/* Título y Subtítulo Central */}
              <div className="max-w-3xl px-2 space-y-3 sm:space-y-4">
                <h2
                  id="catalogo-heading"
                  className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-balance"
                >
                  Productos de seguridad para cada tipo de puerta
                </h2>
                <p className="max-w-2xl mx-auto text-[#9DA3AD] text-sm sm:text-base md:text-lg leading-relaxed text-balance">
                  Soluciones ensayadas bajo norma para puertas de madera, metal, vidrio y vías de evacuación con stock disponible para despacho inmediato.
                </p>
              </div>

              {/* Barra de Acciones del Stream Hero */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2">
                <button
                  id="btn-descargar-catalogo-s3"
                  type="button"
                  onClick={onDownloadCatalog}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#FFC400] text-[#15171A] hover:bg-[#FFD54F] active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,196,0,0.3)] cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Descargar catálogo (PDF, {CONTACT_INFO.catalogSize})</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToGrid}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/10 active:scale-95 transition-all backdrop-blur-sm cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#9DA3AD]" aria-hidden="true" />
                  <span>Explorar categorías ({PRODUCT_CATEGORIES.length})</span>
                </button>
              </div>
            </div>
          </ImageStreamHero>
        </div>

        {/* ── SELECCIÓN INTERACTIVA DE CATEGORÍAS ─────────────────────── */}
        <div id="catalogo-grid" className="space-y-8 scroll-mt-24">
          
          {/* Header de la Grilla con Filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase text-[#FFC400] tracking-widest block mb-1">
                Líneas Especializadas
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Explora el equipamiento según tu requerimiento
              </h3>
            </div>

            {/* Píldoras de Filtro Rápido */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'todas', label: 'Todas las líneas' },
                { id: 'cerraduras', label: 'Cerraduras' },
                { id: 'digitales', label: 'Biometría & Smart' },
                { id: 'evacuacion', label: 'Vías de Escape' },
                { id: 'herrajes', label: 'Herrajes Inox' },
              ].map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id as CategoryFilter)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFC400] text-[#15171A] font-bold shadow-sm'
                        : 'bg-white/5 text-[#9DA3AD] hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grilla de Tarjetas Rediseñadas con Estética de Alta Ingeniería */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredCategories.map((cat) => {
              const isFeatured = cat.featured;

              return (
                <div
                  key={cat.id}
                  onClick={(e) => handleCategoryClick(cat, e)}
                  className={`group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm ${
                    isFeatured
                      ? 'bg-[#181B20] border-[#FFC400]/60 shadow-[0_12px_36px_rgba(255,196,0,0.15)] ring-1 ring-[#FFC400]/40'
                      : 'bg-[#15171A] border-white/10 hover:border-white/30 hover:bg-[#1A1D22] shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <div>
                    {/* Contenedor Fotográfico con Aspecto 4:3 y Hover Zoom */}
                    <div className="relative aspect-4/3 w-full bg-[#1A1C20] overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                      />
                      
                      {/* Gradiente inferior en la imagen para transición suave */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#15171A] via-transparent to-transparent opacity-80" />

                      {/* Insignia de Certificación / Destacado */}
                      {isFeatured ? (
                        <div className="absolute top-3 left-3 bg-[#FFC400] text-[#15171A] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
                          <Shield className="w-3 h-3" />
                          <span>Destacado B2B</span>
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 bg-[#15171A]/80 backdrop-blur-md text-[#D1D5DB] border border-white/10 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#FFC400]" />
                          <span>Norma EN / NCh</span>
                        </div>
                      )}
                    </div>

                    {/* Contenido Textual de la Tarjeta */}
                    <div className="p-5 space-y-2">
                      <h4 className="text-base sm:text-lg font-bold leading-snug text-white group-hover:text-[#FFC400] transition-colors">
                        {cat.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#9DA3AD] leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Pie de Acción: Cotizar esta categoría */}
                  <div className="p-5 pt-0 mt-auto">
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#FFC400] group-hover:text-[#FFD54F]">
                      <span>Cotizar esta categoría</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
export default Catalog;
