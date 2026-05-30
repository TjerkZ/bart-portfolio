import { PageOverlay } from '../components/PageOverlay';
import { Carousel } from '../components/Carousel';

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
    title: 'The Answering Machine',
    year: '2024',
    status: 'Released',
    logline: 'A loss in the family tears apart a modern family.',
    role: 'Writer · Director · Production Design · Sound',
    watch: { label: 'Watch it here', href: 'https://youtu.be/p2vFvi7msWE' },
    cover: '/images/films/answering-machine/answering-machine.png',
    images: ['/images/films/answering-machine/answering-machine.png'],
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
    watch: { label: 'Watch it', href: 'https://youtu.be/nwbNu4qtC1k' },
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
    watch: { label: 'Watch it', href: 'https://youtu.be/92H1Pq6oJ8A' },
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
  const gallery = f.images.length > 0 ? f.images : [f.cover];
  return (
    <article className="space-y-4">
      <Carousel images={gallery} />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display font-black text-3xl md:text-4xl">{f.title}</h3>
        <p className="font-mono text-xs text-[#e8b94a] uppercase tracking-[0.18em]">
          {f.year} · {f.status}
        </p>
      </div>
      <p className="text-[#f6f1e6]/80 leading-relaxed max-w-3xl">{f.logline}</p>
      <p className="font-mono text-xs text-[#f6f1e6]/55 uppercase tracking-wider">{f.role}</p>
      {f.watch && (
        <a href={f.watch.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#e8b94a] hover:underline">
          {f.watch.label} <span aria-hidden>↗</span>
        </a>
      )}
    </article>
  );
}

export function FilmPage() {
  return (
    <PageOverlay
      vibe="film"
      kicker="World 04 · Film"
      title={'Film.'}
      lede="Explore a curated collection of short films and commercial projects I've brought to life over the years, where I took on a wide range of creative and production roles throughout the process."
    >
      <p className="text-[#f6f1e6]/80 leading-relaxed max-w-3xl -mt-6 mb-12">
        From scriptwriting and pre-production to location scouting, cinematography, directing, acting, sound design, and editing, each project reflects a hands-on approach to storytelling from concept to final cut.
      </p>
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
              <Carousel images={p.images} />
            </article>
          ))}
        </div>
      </section>
    </PageOverlay>
  );
}
