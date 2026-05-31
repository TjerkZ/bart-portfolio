import { Link, useLocation } from 'react-router-dom';
import { FACES } from '../scene/faces';

export function Dock() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Site sections"
      data-site-chrome
      className="fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 z-40 max-w-[calc(100vw-1rem)]"
    >
      <div className="flex gap-1 p-2 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 shadow-soft overflow-x-auto">
        {FACES.map((f) => {
          const active = pathname === f.path;
          return (
            <Link
              key={f.id}
              to={f.path}
              className={[
                'shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl',
                'min-w-[68px] md:min-w-[82px] text-[10px] md:text-xs font-bold tracking-wide',
                'transition-colors transition-transform duration-150 ease-out',
                active
                  ? 'bg-ink text-paper'
                  : 'text-ink hover:bg-ink/5 hover:-translate-y-0.5',
              ].join(' ')}
            >
              <span
                className="block w-6 h-6 md:w-7 md:h-7 rounded-md shadow-chip"
                style={{ backgroundColor: f.dockColor }}
              />
              <span className="whitespace-nowrap">{f.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
