import { PageOverlay } from '../components/PageOverlay';

interface Film {
  title: string;
  year: string;
  status: string;
  logline: string;
  role: string;
  watch?: { label: string; href: string };
  images: string[];
  cover: string;
}

const films: Film[] = [
  {
    title: 'Oh, Flinkies! It\'s Fazmagoo!',
    year: '2026',
    status: 'Pre-production',
    logline:
      'Fazmagoo, a dimension-hopping cosmic wizard cursed with accompanying the most miserable people in the world, takes on Gregory — a deeply insecure man struggling to come to terms with the fact that his girlfriend\'s ex was extremely well-endowed.',
    role: 'Writer · Director · Producer',
    watch: { label: 'fazmagoo.com', href: 'https://www.fazmagoo.com' },
    cover: '/images/updates/20-05-2026.png',
    images: [],
  },
  {
    title: 'My Joint with John',
    year: '2025',
    status: 'Festival run',
    logline:
      'Following a devastating pitch, a struggling writer smokes a joint with his best friend — leading to a conversation that alters their lives forever.',
    role: 'Co-writer · Producer · Director · Editor',
    watch: { label: 'Watch the teaser', href: '#' },
    cover: '/images/films/mjwj/mjwj-1.jpeg',
    images: [
      '/images/films/mjwj/mjwj-1.jpeg',
      '/images/films/mjwj/mjwj-2.jpeg',
      '/images/films/mjwj/mjwj-3.jpeg',
      '/images/films/mjwj/mjwj-4.jpeg',
      '/images/films/mjwj/mjwj-5.jpeg',
      '/images/films/mjwj/mjwj-6.jpeg',
    ],
  },
  {
    title: 'Passion of the Chris',
    year: '2023',
    status: 'Released',
    logline:
      'A brilliant writer is divinely chosen to save the world by writing the magnum opus of God.',
    role: 'Writer · Producer · Editor · Lead actor',
    watch: {
      label: 'Watch on YouTube',
      href: 'https://www.youtube.com/watch?v=KS_vc3duufE',
    },
    cover: '/images/films/potc/potc-1.png',
    images: [
      '/images/films/potc/potc-1.png',
      '/images/films/potc/potc-2.png',
      '/images/films/potc/potc-3.png',
    ],
  },
];

interface PromoSpot {
  client: string;
  year: string;
  title: string;
  contribution: string;
  watch?: { label: string; href: string };
  images: string[];
}

const promos: PromoSpot[] = [
  {
    client: 'DAF Trucks',
    year: '2019',
    title: 'Holiday Greetings — Corporate video',
    contribution: 'Writing · Producing · Directing',
    watch: { label: 'Watch it', href: '#' },
    images: [
      '/images/promo/daf/daf-thumbnail-1.png',
      '/images/promo/daf/daf-thumbnail-2.png',
    ],
  },
  {
    client: 'DOE040',
    year: '2019',
    title: 'Promotional video — democratic school',
    contribution: 'Writing · Producing · Directing',
    watch: { label: 'Watch it', href: '#' },
    images: [
      '/images/promo/doe040/doe040-1.jpg',
      '/images/promo/doe040/doe040-2.jpg',
      '/images/promo/doe040/doe040-3.jpg',
      '/images/promo/doe040/doe040-4.jpg',
    ],
  },
  {
    client: 'JUMBO Supermarkets',
    year: '2021',
    title: 'Promotional campaign',
    contribution: 'Project manager · Graphic design',
    images: [
      '/images/promo/jumbo/jumbo-1.jpeg',
      '/images/promo/jumbo/jumbo-2.jpeg',
      '/images/promo/jumbo/jumbo-3.jpeg',
      '/images/promo/jumbo/jumbo-4.jpeg',
    ],
  },
];

function FilmEntry({ f }: { f: Film }) {
  return (
    <article className="space-y-4">
      <div className="aspect-video w-full rounded-xl border border-white/10 bg-black overflow-hidden">
        <img
          src={f.cover}
          alt={f.title}
          loading="lazy"
          className="block w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display font-black text-3xl md:text-4xl">
          {f.title}
        </h3>
        <p className="font-mono text-xs text-[#e8b94a] uppercase tracking-[0.18em]">
          {f.year} · {f.status}
        </p>
      </div>
      <p className="text-[#f6f1e6]/80 leading-relaxed max-w-3xl">{f.logline}</p>
      <p className="font-mono text-xs text-[#f6f1e6]/55 uppercase tracking-wider">
        {f.role}
      </p>
      {f.watch && (
        <a
          href={f.watch.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#e8b94a] hover:underline"
        >
          {f.watch.label} <span aria-hidden>↗</span>
        </a>
      )}
      {f.images.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
          {f.images.slice(1).map((src) => (
            <div key={src} className="aspect-video bg-black rounded overflow-hidden">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="block w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export function FilmPage() {
  return (
    <PageOverlay
      vibe="film"
      kicker="World 04 · Film"
      title={'The frame.'}
      lede="Short films I co-wrote, produced, directed, or starred in. Most start as scripts in the Screenwriting room and end up here, somewhere between a hard drive and a festival queue."
    >
      <section className="space-y-16">
        {films.map((f) => (
          <FilmEntry key={f.title} f={f} />
        ))}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Promotional work
        </h2>
        <p className="text-[#f6f1e6]/60 mb-8 max-w-2xl">
          Commercial pieces shot for brands and institutions.
        </p>
        <div className="space-y-10">
          {promos.map((p) => (
            <article
              key={p.client + p.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 space-y-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="font-display font-bold text-xl md:text-2xl">
                  {p.client}
                </span>
                <span className="text-[#f6f1e6]/75 flex-1 min-w-[14rem]">
                  {p.title}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8b94a]">
                  {p.year}
                </span>
              </div>
              <p className="font-mono text-xs text-[#f6f1e6]/55 uppercase tracking-wider">
                {p.contribution}
                {p.watch && (
                  <>
                    {' · '}
                    <a
                      href={p.watch.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#e8b94a] hover:underline"
                    >
                      {p.watch.label} ↗
                    </a>
                  </>
                )}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {p.images.map((src) => (
                  <div key={src} className="aspect-video bg-black rounded overflow-hidden">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="block w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageOverlay>
  );
}
