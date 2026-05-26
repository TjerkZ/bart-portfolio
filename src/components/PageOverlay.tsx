import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { FaceId } from '../scene/faces';

interface VibeStyle {
  bg: string;
  text: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  divider: string;
  kicker: string;
}

const VIBE_STYLES: Record<FaceId, VibeStyle> = {
  home: {
    bg: 'bg-gradient-to-b from-[#fff5e9] via-[#ffe9d2] to-[#fcd5b2]',
    text: 'text-ink',
    cardBg: 'bg-white/75',
    cardBorder: 'border-ink/10',
    accent: 'text-[#d4732d]',
    divider: 'border-ink/10',
    kicker: 'text-[#d4732d]',
  },
  about: {
    bg: 'bg-gradient-to-b from-[#fff8ee] via-[#fbecd0] to-[#f3dcb0]',
    text: 'text-ink',
    cardBg: 'bg-white/70',
    cardBorder: 'border-ink/10',
    accent: 'text-[#b27a3e]',
    divider: 'border-ink/10',
    kicker: 'text-[#b27a3e]',
  },
  screenwriting: {
    bg: 'bg-gradient-to-b from-[#fbf6e4] to-[#f1e6c4]',
    text: 'text-[#1a1a1a]',
    cardBg: 'bg-white/75',
    cardBorder: 'border-[#1a1a1a]/12',
    accent: 'text-[#a04040]',
    divider: 'border-[#1a1a1a]/12',
    kicker: 'text-[#a04040]',
  },
  film: {
    bg: 'bg-gradient-to-b from-[#332238] via-[#221428] to-[#100817]',
    text: 'text-[#f6f1e6]',
    cardBg: 'bg-white/[0.06]',
    cardBorder: 'border-white/10',
    accent: 'text-[#e8b94a]',
    divider: 'border-white/10',
    kicker: 'text-[#e8b94a]',
  },
  comedy: {
    bg: 'bg-gradient-to-b from-[#3a0e1c] via-[#260612] to-[#160410]',
    text: 'text-[#fff5d1]',
    cardBg: 'bg-white/[0.06]',
    cardBorder: 'border-white/10',
    accent: 'text-[#ffd86b]',
    divider: 'border-white/10',
    kicker: 'text-[#ffb866]',
  },
  esports: {
    bg: 'bg-gradient-to-b from-[#0e1530] via-[#0a0e26] to-[#06081c]',
    text: 'text-[#d8e7ff]',
    cardBg: 'bg-white/[0.05]',
    cardBorder: 'border-[#41e1c7]/25',
    accent: 'text-[#41e1c7]',
    divider: 'border-white/10',
    kicker: 'text-[#41e1c7]',
  },
};

function VibeDecoration({ vibe }: { vibe: FaceId }) {
  if (vibe === 'film') {
    return (
      <>
        <div className="fixed inset-x-0 top-0 h-10 md:h-16 bg-black z-30 pointer-events-none" />
        <div className="fixed inset-x-0 bottom-0 h-10 md:h-16 bg-black z-30 pointer-events-none" />
      </>
    );
  }
  if (vibe === 'comedy') {
    return <div className="fixed inset-0 vibe-spotlight pointer-events-none z-0" />;
  }
  if (vibe === 'esports') {
    return <div className="fixed inset-0 vibe-scanlines pointer-events-none z-0" />;
  }
  return null;
}

function BackPill({ vibe }: { vibe: FaceId }) {
  const isDark = vibe === 'film' || vibe === 'comedy' || vibe === 'esports';
  return (
    <Link
      to="/"
      className={[
        'fixed top-5 left-5 z-40 inline-flex items-center gap-2',
        'px-4 py-2 rounded-full backdrop-blur-md shadow-soft',
        'font-semibold text-sm transition',
        isDark
          ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
          : 'bg-white/85 hover:bg-white text-ink border border-ink/10',
      ].join(' ')}
    >
      <span aria-hidden>←</span> back to cube
    </Link>
  );
}

interface PageHeroProps {
  vibe: FaceId;
  kicker: string;
  title: string;
  lede: string;
}

export function PageHero({ vibe, kicker, title, lede }: PageHeroProps) {
  const v = VIBE_STYLES[vibe];
  return (
    <header className="space-y-5 max-w-3xl">
      <p className={`text-[11px] md:text-xs font-bold tracking-[0.28em] uppercase ${v.kicker}`}>
        {kicker}
      </p>
      <h1 className="font-display font-black leading-[0.92] tracking-tight text-5xl md:text-7xl lg:text-[8.5rem]">
        {title}
      </h1>
      <p className="text-lg md:text-xl leading-relaxed opacity-85 max-w-2xl">
        {lede}
      </p>
    </header>
  );
}

interface PageOverlayProps {
  vibe: FaceId;
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}

export function PageOverlay({
  vibe,
  kicker,
  title,
  lede,
  children,
}: PageOverlayProps) {
  const v = VIBE_STYLES[vibe];
  return (
    <motion.div
      key={vibe}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{
        opacity: 1,
        scale: 1,
        // Hold off until the camera has mostly finished orbiting to the face.
        transition: { duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
      exit={{
        opacity: 0,
        scale: 1.03,
        // Leave quickly so the cube is revealed for the orbit.
        transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
      }}
      className={`fixed inset-0 z-20 overflow-auto ${v.bg} ${v.text}`}
    >
      <VibeDecoration vibe={vibe} />
      <BackPill vibe={vibe} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-32">
        <PageHero vibe={vibe} kicker={kicker} title={title} lede={lede} />
        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </motion.div>
  );
}

export { VIBE_STYLES };
