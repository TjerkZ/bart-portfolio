import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// pdf.js needs its worker. Vite resolves this URL to a hashed asset at build time.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface ScriptViewerProps {
  /** PDF URL (served from /public). */
  url: string;
  /** Title shown in the modal header. */
  title: string;
  onClose: () => void;
}

export function ScriptViewer({ url, title, onClose }: ScriptViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape; hide site chrome (dock + back pill) while open so the
  // viewer's own title bar and page navigation aren't covered by it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('script-viewer-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('script-viewer-open');
    };
  }, [onClose]);

  const go = (delta: number) =>
    setPage((p) => Math.min(Math.max(1, p + delta), numPages || 1));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — script viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 bg-[#111] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display font-bold text-lg md:text-xl truncate">{title}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={url}
            download
            className="px-3 py-1.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 transition"
          >
            Download
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 text-xl leading-none transition"
          >
            ×
          </button>
        </div>
      </div>

      {/* Document */}
      <div
        className="flex-1 overflow-auto grid place-items-start justify-center py-6"
        onClick={(e) => e.stopPropagation()}
      >
        {error ? (
          <p className="text-white/80 mt-12 px-6 text-center">
            Couldn&rsquo;t load this script.{' '}
            <a href={url} className="underline" target="_blank" rel="noreferrer">
              Open it directly
            </a>
            .
          </p>
        ) : (
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPage(1);
            }}
            onLoadError={(e) => setError(e.message)}
            loading={<p className="text-white/70 mt-12">Loading script…</p>}
          >
            <Page
              pageNumber={page}
              width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 32 : 800)}
              renderAnnotationLayer={false}
              renderTextLayer
              className="shadow-2xl"
            />
          </Document>
        )}
      </div>

      {/* Footer page nav */}
      {numPages > 1 && !error && (
        <div
          className="flex items-center justify-center gap-4 px-6 py-3 bg-[#111] text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={page <= 1}
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 disabled:opacity-40 transition"
          >
            ‹ Prev
          </button>
          <span className="font-mono text-sm tabular-nums">
            {page} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={page >= numPages}
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 disabled:opacity-40 transition"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
