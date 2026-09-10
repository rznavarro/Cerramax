import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { Logo } from './ui/Logo';
import { CONTACT_INFO, PRODUCT_CATEGORIES } from '../data/cerramaxData';

interface FooterProps {
  onQuoteCategory: (categoryTitle: string) => void;
  onDownloadCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onQuoteCategory, onDownloadCatalog }) => {
  return (
    <footer className="bg-[#15171A] text-[#B4BAC2] pt-16 pb-20 lg:pb-16 border-t border-[#26292E] select-none">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Grilla principal de 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[rgba(255,255,255,0.1)]">
          
          {/* Columna 1 (Cols 1-4 en Desktop): Identidad e Información Corporativa */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Logo variant="light" layout="stacked" align="left" />
              <p className="mt-4 text-sm text-[#B4BAC2] leading-relaxed max-w-[34ch]">
                Proveedor especializado en cerraduras de alta seguridad, llaves maestras y herrajes para proyectos residenciales y corporativos en Chile.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#5E656E]">
              <Shield className="w-4 h-4 text-[#FFC400]" />
              <span>Garantía de fábrica en cada producto</span>
            </div>
          </div>

          {/* Columna 2 (Cols 5-7 en Desktop): Categorías de Productos */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Cerraduras y Herrajes
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#catalogo"
                    onClick={() => onQuoteCategory(cat.title)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onDownloadCatalog}
                  className="text-[#FFC400] hover:underline text-xs font-semibold pt-1 cursor-pointer"
                >
                  Descargar catálogo completo (PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3 (Cols 8-9 en Desktop): Para Empresas & Enlaces */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#como-trabajamos" className="hover:text-white transition-colors">
                  Compras para obras
                </a>
              </li>
              <li>
                <a href="#perfiles" className="hover:text-white transition-colors">
                  Perfiles y cotización
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Sobre Cerramax
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white transition-colors">
                  Clientes y proyectos
                </a>
              </li>
              <li>
                <a href="#preguntas" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 (Cols 10-12 en Desktop): Contacto Directo */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Atención y Bodega
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.schedule}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#FFC400] shrink-0" />
                <a href={CONTACT_INFO.phoneHref} className="hover:text-white font-tabular font-medium">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFC400] shrink-0" />
                <a href={CONTACT_INFO.emailHref} className="hover:text-white">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Barra inferior de derechos y razón social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E656E]">
          <p>
            © {new Date().getFullYear()} {CONTACT_INFO.legalName}. Todos los derechos reservados. Santiago de Chile.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#5E656E]">
              Distribución y despacho a todo Chile
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
