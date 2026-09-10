export type ClientType = 'constructora' | 'administracion' | 'hogar';

export interface HotspotCoordinate {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
}

export interface HotspotData {
  id: string;
  coords: {
    desktop: HotspotCoordinate;
    tablet: HotspotCoordinate;
    mobile: HotspotCoordinate;
  };
  title: string;
  text: string;
}

export interface StatItemData {
  value: string;
  label: string;
}

export interface ProfileCardData {
  id: string;
  tipo: ClientType;
  title: string;
  description: string;
  ctaLabel: string;
  iconName: 'Building2' | 'Building' | 'Home';
}

export interface CategoryItemData {
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface StepItemData {
  number: number;
  title: string;
  description: string;
}

export interface BrandData {
  name: string;
  country: string;
}

export interface TestimonialData {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  segment: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export interface QuoteFormData {
  tipo: ClientType;
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  comuna: string;
  necesidad: string;
  fileName?: string;
  fileSize?: string;
  consentimiento: boolean;
  honeypot: string;
}

export interface FormErrors {
  [key: string]: string;
}
