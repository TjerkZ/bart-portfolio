import { AnimatePresence, motion } from 'framer-motion';
import { FACES, findFaceById } from '../scene/faces';
import { useFrontFace } from '../scene/frontFaceStore';

export function FaceTitleHUD() {
  const id = useFrontFace();
  const face = id ? findFaceById(id) : null;
  const index = id ? FACES.findIndex((f) => f.id === id) : -1;

  return (
    <div className="fixed inset-x-0 top-24 md:top-28 z-10 flex justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {face && (
          <motion.div
            key={face.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-display text-[11px] md:text-xs font-bold tracking-[0.28em] uppercase text-ink-soft/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
              World {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-ink leading-none mt-1 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
              {face.label}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
