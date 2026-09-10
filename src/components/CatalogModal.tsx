import React, { useEffect } from 'react';
import { Download, X, FileText, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO, PRODUCT_CATEGORIES } from '../data/cerramaxData';
import { Button } from './ui/Button';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuoteCategory: (categoryTitle: string) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onQuoteCategory
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate a simple client-side text/PDF representation of the catalog
    const content = `CATÁLOGO TÉCNICO CERRAMAX 2026 - CERRADURAS Y HERRAJES DE SEGURIDAD
${CONTACT_INFO.legalName} - ${CONTACT_INFO.address}
Fono: ${CONTACT_INFO.phoneDisplay} | Correo: ${CONTACT_INFO.email}

RESUMEN DE PRODUCTOS CON STOCK DISPONIBLE:
1. Cerraduras de Embutir - Para puertas de acceso principal e interiores.
2. Cerraduras de Sobreponer - Alta resistencia para puertas y rejas.
3. Cerraduras Digitales y Biométricas - Clave, tarjeta y Bluetooth.
4. Cilindros y Llaves Maestras - Sistemas de amaestramiento para edificios.
5. Candados de Seguridad - Acero macizo para faenas y bodegas.
6. Barras Antipánico - Certificadas para vías de evacuación.
7. Cierrapuertas Hidráulicos - Grado comercial de alto tráfico.
8. Manillas, Pomos y Herrajes Arquitectónicos en Acero 304.

CONDICIONES COMERCIALES B2B:
- Facturación electrónica inmediata.
- Precios por volumen y cubicación sobre plano.
- Despacho coordinado a obra en Santiago y regiones.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Catalogo-Cerramax-2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-catalogo-title"
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#15171A]/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="bg-white text-[#1C1E22] rounded-[4px] border border-[#DDE0E4] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5E656E] hover:text-[#1C1E22] p-1 focus-visible:outline-2 focus-visible:outline-[#1C1E22]"
          aria-label="Cerrar ventana de catálogo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-[2px] bg-[#FFC400]/20 text-[#1C1E22] flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3
              id="modal-catalogo-title"
              className="text-xl font-bold text-[#1C1E22] leading-tight"
              style={{ fontStretch: '105%' }}
            >
              Catálogo General Cerramax 2026
            </h3>
            <p className="text-xs text-[#5E656E]">
              Formato digital · {CONTACT_INFO.catalogSize} · Edición técnica
            </p>
          </div>
        </div>

        <p className="text-sm text-[#5E656E] leading-relaxed mb-5">
          Descarga la guía completa con especificaciones técnicas, planos de perforación, tablas de compatibilidad y fichas de cerraduras certificadas.
        </p>

        <div className="bg-[#F2F3F5] rounded-[2px] p-4 mb-6 border border-[#DDE0E4]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1E22] mb-2">
            Contenido del documento:
          </h4>
          <ul className="text-xs text-[#5E656E] space-y-1.5 list-disc list-inside">
            <li>Línea completa de cerraduras de embutir y sobreponer</li>
            <li>Esquemas para sistemas de llave maestra y amaestramiento</li>
            <li>Herrajes para vías de escape y normativas de evacuación</li>
            <li>Guía de cubicación rápida para jefes de adquisiciones</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            label="Descargar archivo ahora"
            onClick={handleDownload}
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            fullWidth
          />
          <Button
            label="Cerrar"
            onClick={onClose}
            variant="secondary-light"
            size="md"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
