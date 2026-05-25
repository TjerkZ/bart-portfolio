import { PageOverlay } from '../components/PageOverlay';

interface Film {
  title: string;
  year: string;
  status: string;
  logline: string;
  role: string;
  watch?: { label: string; href: string };
  imageNote: string;
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
    imageNote: 'TODO: hero still',
  },
  {
    title: 'My Joint with John',
    year: '2025',
    status: 'Festival run',
    logline:
      'Following a devastating pitch, a struggling writer smokes a joint with his best friend — leading to a conversation that alters their lives forever.',
    role: 'Co-writer · Producer · Director · Editor',
    watch: { label: 'Watch the teaser', href: '#' },
    imageNote: 'TODO: stills MJWJ 1-6.jpeg',
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
    imageNote: 'TODO: stills POTC 1-3.png',
  },
];

interface PromoSpot {
  client: string;
  year: string;
  title: string;
  contribution: string;
  watch?: { label: string; href: string };
}

const promos: PromoSpot[] = [
  {
    client: 'DAF Trucks',
    year: '2019',
    title: 'Holiday Greetings — Corporate video',
    contribution: 'Writing · Producing · Directing',
    watch: { label: 'Watch it', href: '#' },
  },
  {
    client: 'DOE040',
    year: '2019',
    title: 'Promotional video — democratic school',
    contribution: 'Writing · Producing · Directing',
    watch: { label: 'Watch it', href: '#' },
  },
  {
    client: 'JUMBO Supermarkets',
    year: '2021',
    title: 'Promotional campaign',
    contribution: 'Project manager · Graphic design',
  },
];

function FilmEntry({ f }: { f: Film }) {
  return (
    <article className="space-y-4">
      <div className="aspect-video w-full rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
        <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
          {f.imageNote}
        </span>
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
        <ul className="space-y-1 rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10">
          {promos.map((p) => (
            <li
              key={p.client + p.title}
              className="px-5 py-5 border-b border-white/10 last:border-b-0 flex flex-wrap items-baseline gap-x-6 gap-y-1"
            >
              <span className="font-display font-bold text-lg">{p.client}</span>
              <span className="text-[#f6f1e6]/75 flex-1 min-w-[14rem]">
                {p.title}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8b94a]">
                {p.year}
              </span>
              <span className="w-full font-mono text-xs text-[#f6f1e6]/55 uppercase tracking-wider">
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
              </span>
            </li>
          ))}
        </ul>
      </section>
    </PageOverlay>
  );
}
