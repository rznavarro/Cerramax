import {
  HotspotData,
  StatItemData,
  ProfileCardData,
  CategoryItemData,
  StepItemData,
  BrandData,
  TestimonialData,
  FAQItemData
} from '../types';

export const CONTACT_INFO = {
  phoneDisplay: '+56 9 6123 4567',
  phoneHref: 'tel:+56961234567',
  whatsappHref: 'https://wa.me/56961234567?text=Hola%20Cerramax,%20necesito%20cotizar%20cerraduras%20para%20un%20proyecto',
  email: 'ventas@cerramax.cl',
  emailHref: 'mailto:ventas@cerramax.cl',
  address: 'Av. Manuel Antonio Matta 1248, Santiago',
  addressShort: 'Av. Matta 1248, Santiago',
  schedule: 'Lun a vie 8:30 a 18:30 · Sáb 9:00 a 13:00',
  legalName: 'Cerramax SpA',
  catalogSize: '8.4 MB'
};

export const HERO_DATA = {
  h1: 'Cerraduras y cerrajería de confianza en Chile',
  subhead: 'Cerraduras, candados y herrajes de seguridad para constructoras, edificios y hogares. Stock permanente, asesoría técnica y despacho rápido según comuna.',
  primaryCta: 'Solicitar cotización',
  secondaryCta: 'Ver catálogo',
  microTrust: [
    'Factura para empresas',
    'Despacho a obra',
    'Garantía en todos los productos'
  ]
};

export const HERO_HOTSPOTS: HotspotData[] = [
  {
    id: 'hotspot-1',
    coords: {
      desktop: { x: 38, y: 32 },
      tablet: { x: 36, y: 30 },
      mobile: { x: 35, y: 28 }
    },
    title: 'Cilindro de alta seguridad',
    text: 'Resiste ganzúa, bumping, taladrado y duplicados no autorizados.'
  },
  {
    id: 'hotspot-2',
    coords: {
      desktop: { x: 74, y: 44 },
      tablet: { x: 72, y: 42 },
      mobile: { x: 70, y: 40 }
    },
    title: 'Pestillo reversible',
    text: 'Mecanismo adaptable para puertas de apertura izquierda o derecha.'
  },
  {
    id: 'hotspot-3',
    coords: {
      desktop: { x: 50, y: 64 },
      tablet: { x: 52, y: 62 },
      mobile: { x: 50, y: 58 }
    },
    title: 'Acero inoxidable 304',
    text: 'Soporta humedad, salinidad costera y uso intensivo en faena.'
  }
];

export const HERO_STATS: StatItemData[] = [
  { value: '+1.200', label: 'Obras y proyectos abastecidos' },
  { value: '+450', label: 'Productos con stock en bodega' },
  { value: '24h', label: 'Compromiso de cotización hábil' }
];

export const PROFILE_CARDS: ProfileCardData[] = [
  {
    id: 'perfil-constructora',
    tipo: 'constructora',
    title: 'Constructoras y contratistas',
    description: 'Abastecemos obras completas con precios por volumen, despacho programado y un ejecutivo que conoce tu proyecto.',
    ctaLabel: 'Cotizar para mi obra',
    iconName: 'Building2'
  },
  {
    id: 'perfil-administracion',
    tipo: 'administracion',
    title: 'Administración de edificios',
    description: 'Sistemas de llave maestra, reposición rápida y el mismo estándar de seguridad en todos tus edificios.',
    ctaLabel: 'Cotizar para mis edificios',
    iconName: 'Building'
  },
  {
    id: 'perfil-hogar',
    tipo: 'hogar',
    title: 'Hogares y pymes',
    description: 'Te recomendamos la cerradura adecuada para tu puerta y presupuesto, con garantía oficial y asesoría técnica.',
    ctaLabel: 'Pedir recomendación',
    iconName: 'Home'
  }
];

export const PRODUCT_CATEGORIES: CategoryItemData[] = [
  {
    id: 'embutir',
    title: 'Cerraduras de embutir',
    description: 'Para puertas de departamentos, oficinas y obras nuevas de alto tráfico.',
    image: '/assets/hero/heavy_duty_lock_1789061384640.jpg'
  },
  {
    id: 'sobreponer',
    title: 'Cerraduras de sobreponer',
    description: 'Seguridad acorazada para portones, accesos perimetrales y rejas de servicio.',
    image: '/assets/catalog/rim_lock.jpg'
  },
  {
    id: 'digitales',
    title: 'Cerraduras digitales',
    description: 'Biometría 24/7, apertura con huella, tarjeta RFID, clave numérica o app móvil.',
    image: '/assets/hero/smart_digital_lock_1789061354632.jpg'
  },
  {
    id: 'cilindros-maestras',
    title: 'Cilindros y llaves maestras',
    description: 'Sistemas de amaestramiento computarizado para condominios y plantas industriales.',
    image: '/assets/hero/master_key_cylinder_1789061369777.jpg',
    featured: true
  },
  {
    id: 'candados',
    title: 'Candados de alta seguridad',
    description: 'Acero cementado y aleaciones endurecidas para containers, faenas y bodegas.',
    image: '/assets/catalog/armored_padlock.jpg'
  },
  {
    id: 'barras-antipanico',
    title: 'Barras antipánico',
    description: 'Certificación de escape rápido para vías de evacuación en colegios y centros comerciales.',
    image: '/assets/catalog/panic_exit_bar.jpg'
  },
  {
    id: 'cierrapuertas',
    title: 'Cierrapuertas hidráulicos',
    description: 'Velocidad y golpe final regulables con resistencia a ráfagas de viento y alto tránsito.',
    image: '/assets/catalog/door_closer.jpg'
  },
  {
    id: 'manillas-herrajes',
    title: 'Manillas y herrajes',
    description: 'Acero inoxidable 304, rosetas arquitectónicas y manillones para puertas de acceso.',
    image: '/assets/catalog/door_handle.jpg'
  }
];

export const ABOUT_CHECKLIST: string[] = [
  'Stock permanente para obras',
  'Asesoría técnica antes de comprar',
  'Sistemas de llave maestra',
  'Despacho a obra y a domicilio',
  'Factura para empresas',
  'Garantía y postventa'
];

export const ABOUT_QUOTE = {
  quote: 'En seguridad de accesos no se puede improvisar: cada cerradura debe cumplir la norma técnica y llegar a faena en la fecha coordinada.',
  name: 'Rodrigo Morales',
  role: 'Jefe de Operaciones Cerramax'
};

export const STEPS_DATA: StepItemData[] = [
  {
    number: 1,
    title: 'Envíanos tu lista o planos',
    description: 'Por formulario, correo o WhatsApp. Si no tienes lista, te ayudamos a armarla.'
  },
  {
    number: 2,
    title: 'Recibe tu cotización',
    description: 'En menos de 24 horas hábiles, con precios por volumen y plazos de entrega.'
  },
  {
    number: 3,
    title: 'Despacho a tu obra',
    description: 'Coordinamos fecha y horario para que el material llegue cuando lo necesitas.'
  },
  {
    number: 4,
    title: 'Postventa y reposición',
    description: 'Garantía, cambios y reposición de piezas con el mismo ejecutivo.'
  }
];

export const BRANDS_DATA: BrandData[] = [
  { name: 'Scanavini', country: 'Chile' },
  { name: 'Yale', country: 'Global' },
  { name: 'Poli', country: 'Chile' },
  { name: 'Odis', country: 'Chile' },
  { name: 'Cisa', country: 'Italia' },
  { name: 'Dormakaba', country: 'Suiza' }
];

export const TESTIMONIALS_DATA: TestimonialData[] = [
  {
    id: 'test-1',
    quote: 'Equipamos las puertas de 140 departamentos con cerraduras de embutir Cerramax. Cumplieron con el cronograma de despacho a faena sin ningún desfase.',
    name: 'Matías Silva',
    role: 'Jefe de Adquisiciones',
    company: 'Constructora Alerce',
    segment: 'Constructora'
  },
  {
    id: 'test-2',
    quote: 'El sistema de llave maestra para los 3 edificios que administramos en Providencia ordenó los accesos del personal de servicio y conserjería de forma impecable.',
    name: 'Lorena Navarrete',
    role: 'Administradora de Comunidades',
    company: 'Gestión Residencial',
    segment: 'Administración'
  },
  {
    id: 'test-3',
    quote: 'Necesitaba reforzar la seguridad del acceso principal de nuestro local comercial. La asesoría técnica telefónica fue precisa y la cerradura llegó al día siguiente.',
    name: 'Andrés Valenzuela',
    role: 'Dueño de negocio',
    company: 'Cafetería & Tostaduría Matta',
    segment: 'Hogar y Pyme'
  }
];

export const FAQS_DATA: FAQItemData[] = [
  {
    id: 'faq-1',
    question: '¿Hacen despacho a regiones?',
    answer: 'Sí, despachamos a todo Chile mediante empresas de transporte de carga y couriers coordinados directamente con tu faena, bodega o domicilio particular.'
  },
  {
    id: 'faq-2',
    question: '¿Venden a empresas con factura?',
    answer: 'Sí, emitimos factura electrónica para empresas y constructoras en todas nuestras ventas, facilitando la gestión tributaria y de costos de obra.'
  },
  {
    id: 'faq-3',
    question: '¿Pueden hacer un sistema de llave maestra para mi edificio?',
    answer: 'Sí, configuramos planes de amaestramiento de cilindros que permiten al administrador o conserje acceder a áreas comunes y mantener llaves individuales por departamento.'
  },
  {
    id: 'faq-4',
    question: '¿Las cerraduras tienen garantía?',
    answer: 'Todos nuestros productos cuentan con garantía directa del fabricante y respaldo de reposición ante cualquier desperfecto de fabricación o material.'
  },
  {
    id: 'faq-5',
    question: '¿Cómo envío la lista de herrajes de mi obra para cotizar?',
    answer: 'Puedes adjuntar planillas Excel, archivos PDF de cubicación o planos en nuestro formulario web, o enviarlos por correo a ventas@cerramax.cl.'
  }
];
