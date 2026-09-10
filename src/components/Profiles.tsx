import React from 'react';
import { Building2, Building, Home, ArrowRight } from 'lucide-react';
import { PROFILE_CARDS } from '../data/cerramaxData';
import { ClientType } from '../types';

interface ProfilesProps {
  onSelectProfile: (tipo: ClientType) => void;
}

export const Profiles: React.FC<ProfilesProps> = ({ onSelectProfile }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#1C1E22]" aria-hidden="true" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#1C1E22]" aria-hidden="true" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#1C1E22]" aria-hidden="true" />;
      default:
        return <Building2 className="w-6 h-6 text-[#1C1E22]" aria-hidden="true" />;
    }
  };

  const handleClick = (tipo: ClientType, e: React.MouseEvent) => {
    e.preventDefault();
    onSelectProfile(tipo);
    const formHeading = document.getElementById('cotizar-heading');
    const formSection = document.getElementById('cotizar');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (formHeading) {
      formHeading.focus();
    }
  };

  return (
    <section
      id="perfiles"
      aria-labelledby="perfiles-heading"
      className="bg-white pt-16 md:pt-24 lg:pt-32 pb-16 lg:pb-24 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Cabecera de Sección */}
        <div className="max-w-[65ch]">
          <h2
            id="perfiles-heading"
            className="text-[#1C1E22] font-bold text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.12] tracking-tight"
            style={{
              fontFamily: 'var(--font-family)',
              fontStretch: '110%',
              letterSpacing: '-0.01em'
            }}
          >
            ¿Para qué proyecto buscas cerraduras?
          </h2>
          <p className="mt-3 text-[#5E656E] text-base sm:text-lg leading-[1.6]">
            Selecciona tu perfil para acceder a condiciones comerciales, asesoría a la medida y atención prioritaria.
          </p>
        </div>

        {/* Grilla de 3 Perfiles (4 columnas cada una en Desktop) */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROFILE_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative group bg-white border border-[#DDE0E4] hover:border-[#1C1E22] rounded-[4px] p-6 lg:p-8 flex flex-col justify-between transition-all duration-150 ease-in-out cursor-pointer hover:shadow-md"
              onClick={(e) => handleClick(card.tipo, e)}
            >
              <div>
                {/* Ícono en círculo sobrio */}
                <div className="w-12 h-12 rounded-full bg-[#F2F3F5] group-hover:bg-[#FFC400] transition-colors flex items-center justify-center mb-6">
                  {getIcon(card.iconName)}
                </div>

                {/* Título de perfil */}
                <h3
                  className="text-xl font-bold text-[#1C1E22] group-hover:text-black leading-snug"
                  style={{ fontStretch: '105%' }}
                >
                  {card.title}
                </h3>

                {/* Descripción concisa (<=120 caracteres) */}
                <p className="mt-3 text-[#5E656E] text-[0.9375rem] leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              {/* Botón de acción / Enlace estirado */}
              <div className="mt-8 pt-4 border-t border-[#F2F3F5] flex items-center justify-between">
                <span className="text-[0.9375rem] font-bold text-[#1C1E22] group-hover:underline underline-offset-4 decoration-2">
                  {card.ctaLabel}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#F2F3F5] group-hover:bg-[#1C1E22] group-hover:text-white flex items-center justify-center text-[#1C1E22] transition-colors">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
