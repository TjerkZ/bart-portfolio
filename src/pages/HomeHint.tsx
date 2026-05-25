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
      <FaceTitleHUD />
      {/* Top-left brand */}
      <div className="absolute top-5 left-5 pointer-events-auto inline-flex flex-col gap-0.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-soft">
        <span className="font-display font-black text-base md:text-lg text-ink leading-none tracking-tight">
          Bart van de Steeg
          <span className="text-[#ff5470]">.</span>
        </span>
        <span className="font-display italic text-[11px] md:text-xs text-ink-soft leading-none mt-1">
          aka Burt Burlington
        </span>
      </div>

      {/* Top-right status */}
      <div className="absolute top-5 right-5 pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-soft text-xs md:text-sm font-semibold text-ink">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
          <span className="relative rounded-full bg-emerald-500 w-2 h-2" />
        </span>
        6 worlds
      </div>

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
