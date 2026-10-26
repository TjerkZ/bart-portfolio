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
  /** Optional YouTube video shown as the first slide, before the images. */
  youtubeId?: string;
}

export function Carousel({ images, aspect = 'aspect-video', className = '', alt = '', fit = 'cover', youtubeId }: CarouselProps) {
  const [i, setI] = useState(0);
  const slides = youtubeId ? [`youtube:${youtubeId}`, ...images] : images;
  if (slides.length === 0) return null;

  const go = (delta: number) =>
    setI((prev) => (prev + delta + slides.length) % slides.length);
  const onVideo = youtubeId !== undefined && i === 0;

  return (
    <div className={`relative ${aspect} w-full rounded-xl overflow-hidden bg-black ${className}`}>
      {onVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={alt}
          className="block w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img
          src={slides[i]}
          alt={slides.length > 1 ? `${alt} (${i + 1} of ${slides.length})` : alt}
          loading="lazy"
          className={`block w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} select-none`}
          draggable={false}
        />
      )}
      {slides.length > 1 && (
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
          {/* On the video slide the dots move to the top so they don't cover YouTube's controls. */}
          <div className={`absolute ${onVideo ? 'top-2' : 'bottom-2'} left-1/2 -translate-x-1/2 flex gap-1.5`}>
            {slides.map((src, idx) => (
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
