import { lazy, Suspense } from 'react';

const ScriptViewer = lazy(() =>
  import('./ScriptViewer').then((m) => ({ default: m.ScriptViewer })),
);

interface Props {
  url: string;
  title: string;
  onClose: () => void;
}

export function ScriptViewerLazy(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 text-white/80">
          Loading viewer…
        </div>
      }
    >
      <ScriptViewer {...props} />
    </Suspense>
  );
}
