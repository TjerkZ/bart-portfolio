import { useState } from 'react';

interface CarouselProps {
  images: string[];
  /** Tailwind aspect class for the frame. */
  aspect?: string;
  className?: string;
  /** Accessible label for the images (e.g. the project title). */
  alt?: string;
  /** object-fit for the image. 'cover' crops to fill; 'contain' shows the full image (letterboxed). */
  fit?: 'cover' | 'contain';
}

export function Carousel({ images, aspect = 'aspect-video', className = '', alt = '', fit = 'cover' }: CarouselProps) {
  const [i, setI] = useState(0);
  if (images.length === 0) return null;

  const go = (delta: number) =>
    setI((prev) => (prev + delta + images.length) % images.length);

  return (
    <div className={`relative ${aspect} w-full rounded-xl overflow-hidden bg-black ${className}`}>
      <img
        src={images[i]}
        alt={images.length > 1 ? `${alt} (${i + 1} of ${images.length})` : alt}
        loading="lazy"
        className={`block w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} select-none`}
        draggable={false}
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white text-lg grid place-items-center backdrop-blur"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white text-lg grid place-items-center backdrop-blur"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`w-2 h-2 rounded-full transition ${idx === i ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
