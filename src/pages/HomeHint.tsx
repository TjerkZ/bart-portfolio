import { motion } from 'framer-motion';
import { FaceTitleHUD } from '../components/FaceTitleHUD';

export function HomeHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed inset-0 z-10 pointer-events-none"
    >
      {/* Centered brand name — sized to match the section label */}
      <div className="fixed inset-x-0 top-6 md:top-8 z-10 flex justify-center pointer-events-none px-4">
        <h1 className="font-display font-black text-5xl md:text-7xl text-ink leading-none text-center drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
          Bart van de Steeg
          <span className="text-[#ff5470]">.</span>
        </h1>
      </div>

      <FaceTitleHUD />

      {/* Bottom hint, above the Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-32 md:bottom-36 pointer-events-auto inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-soft text-xs md:text-sm font-medium text-ink-soft whitespace-nowrap">
        <span>Drag to spin</span>
        <span className="opacity-40">·</span>
        <span>
          <kbd className="font-mono text-[10px] font-bold bg-ink text-paper px-2 py-0.5 rounded">
            click
          </kbd>{' '}
          a face to enter
        </span>
      </div>
    </motion.div>
  );
}
