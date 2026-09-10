import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  FileDown,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Configuración de Soluciones y Tarjetas Cerramax
// ---------------------------------------------------------------------------

export interface HeroCardItem {
  id: string;
  title: string;
  badge: string;
  specs: string;
  src: string;
  alt: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: HeroCardItem;
  target: StackSpreadTarget;
  targetSm?: { x: number; y: number };
  stackRotate?: number;
  stackOffset?: { x: number; y: number };
  z?: number;
}

// 8 Soluciones estratégicas de cerrajería y herrajes Cerramax
const CARDS: StackSpreadCard[] = [
  // 1. Arriba Izquierda: Cerradura Digital Biométrica
  {
    item: {
      id: 'digitales',
      title: 'Cerraduras Digitales & Biometría',
      badge: 'Biometría 24/7',
      specs: 'Huella, RFID y app móvil',
      src: '/assets/hero/smart_digital_lock_1789061354632.jpg',
      alt: 'Cerradura digital inteligente Cerramax con lector biométrico iluminado',
    },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -15,
    target: { x: -30, y: -34, rotate: -4, scale: 0.95, w: 17, h: 23 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // 2. Arriba Centro: Llaves Maestras & Gran Maestra
  {
    item: {
      id: 'cilindros-maestras',
      title: 'Sistemas de Llave Maestra',
      badge: 'Amaestramiento',
      specs: 'Cilindros computarizados',
      src: '/assets/hero/master_key_cylinder_1789061369777.jpg',
      alt: 'Cilindros de precisión y llaves maestras computarizadas',
    },
    stackOffset: { x: 0, y: -12 },
    stackRotate: -2,
    target: { x: 0, y: -36, rotate: 1, scale: 0.9, w: 22, h: 22 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // 3. Arriba Derecha: Cerradura de Embutir Pesada Inox
  {
    item: {
      id: 'embutir',
      title: 'Cerraduras de Embutir Pesadas',
      badge: 'Acero Inox 304',
      specs: 'Triple pitón macizo',
      src: '/assets/hero/heavy_duty_lock_1789061384640.jpg',
      alt: 'Cerradura de embutir en acero inoxidable de alta seguridad',
    },
    stackOffset: { x: 10, y: -10 },
    stackRotate: 16,
    target: { x: 30, y: -34, rotate: 4, scale: 0.95, w: 17, h: 23 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // 4. Lateral Izquierdo: Cerraduras de Sobreponer Blindadas
  {
    item: {
      id: 'sobreponer',
      title: 'Cerraduras de Sobreponer Blindadas',
      badge: 'Grado Faena',
      specs: 'Caja soldable acorazada',
      src: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85',
      alt: 'Cerradura de sobreponer para portones y accesos principales',
    },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -6,
    target: { x: -37, y: 0, rotate: -5, scale: 0.92, w: 16, h: 28 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // 5. Lateral Derecho: Candados Acorazados Anticorte
  {
    item: {
      id: 'candados',
      title: 'Candados Acorazados Anticorte',
      badge: 'Anticorte Boron',
      specs: 'Grado industrial faena',
      src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=85',
      alt: 'Candado acorazado de máxima seguridad',
    },
    stackOffset: { x: 17, y: 1 },
    stackRotate: 7,
    target: { x: 37, y: 0, rotate: 5, scale: 0.92, w: 16, h: 28 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // 6. Abajo Izquierda: Barras Antipánico Certificadas
  {
    item: {
      id: 'barras-antipanico',
      title: 'Barras Antipánico Certificadas',
      badge: 'Norma EN 1125',
      specs: 'Salidas de emergencia',
      src: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=85',
      alt: 'Barra antipánico certificada cortafuego en puerta de escape',
    },
    stackOffset: { x: -7, y: 10 },
    stackRotate: 5,
    target: { x: -29, y: 34, rotate: 3, scale: 0.95, w: 17, h: 23 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // 7. Abajo Centro: Cierrapuertas Hidráulicos
  {
    item: {
      id: 'cierrapuertas',
      title: 'Cierrapuertas Hidráulicos',
      badge: 'Alto Tráfico',
      specs: 'Fuerza EN 2-6 regulable',
      src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
      alt: 'Cierra-puertas hidráulico para accesos de alto tráfico',
    },
    stackOffset: { x: 4, y: 11 },
    stackRotate: 2,
    target: { x: 0, y: 36, rotate: -2, scale: 0.9, w: 22, h: 22 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // 8. Abajo Derecha: Manillas Arquitectónicas & Herrajes
  {
    item: {
      id: 'manillas-herrajes',
      title: 'Manillas Arquitectónicas Inox 316',
      badge: 'Diseño Inox 316',
      specs: 'Acabados satinados',
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      alt: 'Herrajes y manillas arquitectónicas de acero inoxidable',
    },
    stackOffset: { x: 14, y: 10 },
    stackRotate: -8,
    target: { x: 29, y: 34, rotate: -3, scale: 0.95, w: 17, h: 23 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// Constantes físicas y límites de scroll
const SCATTER_START = 0.08;
const SCATTER_END = 0.88;
const PARALLAX_X = 2.4;
const PARALLAX_Y = 2.0;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };

const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 23,
    card: { w: 42, h: 18 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

// ---------------------------------------------------------------------------
// Componente de Tarjeta Individual
// ---------------------------------------------------------------------------

interface CardProps {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
  onCardClick?: (title: string) => void;
  key?: React.Key;
}

const Card: React.FC<CardProps> = ({
  card,
  progress,
  reduce,
  clusterRotation,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
  onCardClick,
}) => {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer group"
      onClick={() => onCardClick?.(item.title)}
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
      whileHover={{ scale: restScale * 1.05, zIndex: 30 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative h-full w-full overflow-hidden shadow-2xl border border-white/10 bg-[#1A1C20] transition-all duration-300 group-hover:border-[#FFC400]/70 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
        style={{ borderRadius: `${cardRadius}px` }}
      >
        {/* Imagen de alta definición del producto */}
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
        />

        {/* Gradiente sutil y etiqueta limpia que solo se revela al pasar el mouse */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171A]/90 via-[#15171A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="min-w-0 pr-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#FFC400]">
              {item.badge}
            </span>
            <p className="text-xs font-semibold text-white truncate drop-shadow-sm">
              {item.title}
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#FFC400] shrink-0 inline-flex items-center gap-0.5">
            Cotizar <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Componente Principal: Hero Stack Spread
// ---------------------------------------------------------------------------

export interface HeroProps {
  onQuoteClick: () => void;
  onCatalogClick: () => void;
  onQuoteCategory?: (title: string) => void;
  scrollLength?: number;
}

export const Hero: React.FC<HeroProps> = ({
  onQuoteClick,
  onCatalogClick,
  onQuoteCategory,
  scrollLength = 320,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { small: isSmall, colX, card: fixedCard } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Hold clustered, scatter outwards smoothly, then settle into full view
  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, 'change', (p) => {
    setSpread((was) => (was ? p > 0.9 : p >= 0.95));
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  // Animaciones del texto central
  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [0.15, 0.45], [0, 1]);
  const copyScale = useTransform(progress, [0.15, 0.75], [0.88, 1]);
  const hintOpacity = useTransform(progress, [0, SCATTER_START * 1.5], [1, 0]);

  const handleCardClick = (title: string) => {
    if (onQuoteCategory) {
      onQuoteCategory(title);
    }
    onQuoteClick();
  };

  return (
    <section
      id="hero"
      ref={wrapRef}
      aria-label="Presentación interactiva Cerramax"
      className="relative w-full bg-[#15171A] text-white"
      style={{ height: `${scrollLength}vh` }}
    >
      {/* Contenedor fijo pegado al viewport (sticky stage) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Glow de fondo radial arquitectónico suave */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 196, 0, 0.05) 0%, rgba(21, 23, 26, 0.9) 70%, #15171A 100%)',
          }}
        />

        {/* Tarjetas interactivas que se dispersan geométricamente en el perímetro */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {CARDS.map((card, i) => (
            <Card
              key={card.item.id}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={true}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={0.84}
              cardRadius={12}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, CARDS.length) : 0}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        {/* Texto Central Minimalista: ubicado en el centro exacto entre las imágenes */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[15] flex flex-col items-center justify-center px-6 text-center select-none"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {/* Titular Minimalista Escultural */}
          <h1
            className="w-full whitespace-pre-line text-[2.6rem] sm:text-[3.6rem] md:text-[4.2vw] font-normal leading-[1.04] tracking-tight text-white max-w-[15ch]"
            style={{
              fontFamily: 'var(--font-family)',
              letterSpacing: '-0.03em',
            }}
          >
            Seguridad
            <span className="opacity-40"> que </span>
            <span className="font-semibold text-[#FFC400]">Responde.</span>
          </h1>

          {/* CTAs Minimalistas */}
          <div className="pointer-events-auto mt-6 sm:mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFC400] text-[#15171A] text-xs sm:text-sm font-bold shadow-md hover:bg-[#FFD54F] hover:shadow-[0_4px_20px_rgba(255,196,0,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Cotizar proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onCatalogClick}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>Ver catálogo</span>
            </button>
          </div>
        </motion.div>

        {/* Indicador inferior sutil de scroll */}
        <motion.div
          className="pointer-events-none relative z-20 pb-4 sm:pb-6 flex flex-col items-center gap-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#8F96A0]"
          style={{ opacity: hintOpacity }}
        >
          <span>Scroll para desplegar</span>
          <ChevronDown className="w-4 h-4 text-[#FFC400] animate-bounce" />
        </motion.div>

      </div>
    </section>
  );
};
