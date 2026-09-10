import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profiles } from './components/Profiles';
import { Catalog } from './components/Catalog';
import { AboutUs } from './components/AboutUs';
import { HowWeWork } from './components/HowWeWork';
import { BrandStrip } from './components/BrandStrip';
import { Testimonials } from './components/Testimonials';
import { QuoteForm } from './components/QuoteForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { CatalogModal } from './components/CatalogModal';
import { ClientType } from './types';

export function App() {
  const [selectedClientType, setSelectedClientType] = useState<ClientType>('constructora');
  const [prefilledNeed, setPrefilledNeed] = useState<string>('');
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState<boolean>(false);

  const handleSelectProfile = (tipo: ClientType) => {
    setSelectedClientType(tipo);
  };

  const handleQuoteCategory = (categoryTitle: string) => {
    setPrefilledNeed(`Me interesa cotizar: ${categoryTitle}. `);
  };

  const handleQuoteClick = () => {
    const formHeading = document.getElementById('cotizar-heading');
    const formSection = document.getElementById('cotizar');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (formHeading) {
      formHeading.focus();
    }
  };

  const handleCatalogClick = () => {
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-white text-[#1C1E22] flex flex-col selection:bg-[#FFC400] selection:text-[#1C1E22]">
      {/* Enlace de salto de accesibilidad para teclado */}
      <a
        href="#cotizar"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-[#FFC400] focus:text-[#1C1E22] focus:font-bold focus:shadow-md"
      >
        Saltar al formulario de cotización
      </a>

      {/* S0. Header y Barra Superior */}
      <Header onQuoteClick={handleQuoteClick} />

      <main id="main-content" className="flex-1">
        {/* S1. Hero Principal con Dispersión Cinemática de Soluciones */}
        <Hero
          onQuoteClick={handleQuoteClick}
          onCatalogClick={handleCatalogClick}
          onQuoteCategory={handleQuoteCategory}
        />

        {/* S2. Perfiles de Cliente */}
        <Profiles onSelectProfile={handleSelectProfile} />

        {/* S3. Catálogo de Productos y Soluciones */}
        <Catalog
          onQuoteCategory={handleQuoteCategory}
          onDownloadCatalog={() => setIsCatalogModalOpen(true)}
        />

        {/* S4. Nosotros y Respaldo Técnico */}
        <AboutUs />

        {/* S5. Cómo Trabajamos para Empresas y Obras */}
        <HowWeWork onQuoteClick={handleQuoteClick} />

        {/* S6. Marcas que Distribuimos */}
        <BrandStrip />

        {/* S7. Testimonios Verificados */}
        <Testimonials />

        {/* S8. Formulario de Cotización Dual-Panel */}
        <QuoteForm
          selectedClientType={selectedClientType}
          prefilledNeed={prefilledNeed}
          onClientTypeChange={(tipo) => setSelectedClientType(tipo)}
          onClearPrefilledNeed={() => setPrefilledNeed('')}
        />

        {/* S9. Preguntas Frecuentes (FAQ) */}
        <FAQ />
      </main>

      {/* S10. Pie de Página */}
      <Footer
        onQuoteCategory={handleQuoteCategory}
        onDownloadCatalog={() => setIsCatalogModalOpen(true)}
      />

      {/* Barra fija inferior de conversión en móviles (<768px) */}
      <MobileActionBar onQuoteClick={handleQuoteClick} />

      {/* Modal de descarga de catálogo */}
      <CatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onQuoteCategory={handleQuoteCategory}
      />
    </div>
  );
}

export default App;
