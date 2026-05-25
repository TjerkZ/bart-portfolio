import { PageOverlay } from '../components/PageOverlay';

interface Project {
  slug: string;
  title: string;
  year: string;
  status: string;
  logline: string;
}

const screenplays: Project[] = [
  {
    slug: 'INT. EVERYWHERE — PRE-PRODUCTION',
    title: 'Oh, Flinkies! It\'s Fazmagoo!',
    year: '2026',
    status: 'In production',
    logline:
      'Fazmagoo, a dimension-hopping cosmic wizard cursed with accompanying the most miserable people in the world, takes on Gregory — a deeply insecure man struggling to come to terms with the fact that his girlfriend\'s ex was extremely well-endowed.',
  },
  {
    slug: 'INT. APARTMENT — NIGHT',
    title: 'My Joint with John',
    year: '2025',
    status: 'Festival run',
    logline:
      'Following a devastating pitch, a struggling writer smokes a joint with his best friend — leading to a conversation that alters their lives forever.',
  },
  {
    slug: 'INT. STUDIO — DAY',
    title: 'The Answering Machine',
    year: '2024',
    status: 'Finished script',
    logline: 'In development. Logline coming soon.',
  },
  {
    slug: 'INT. WRITER\'S ROOM — DAY',
    title: 'Passion of the Chris',
    year: '2023',
    status: 'Released',
    logline:
      'A brilliant writer is divinely chosen to save the world by writing the magnum opus of God.',
  },
];

const loglines: Project[] = [
  {
    slug: 'EXT. ISLAND OF NYTRUSS — DAY',
    title: 'Nytruss Island',
    year: '',
    status: 'Children · Adventure',
    logline:
      'To help out the people of a village, the children investigate the island of Nytruss to find the reason why the vegetation has grown black and dead — and uncover a secret that none of them dared to imagine.',
  },
  {
    slug: 'INT. DEALER\'S OFFICE — NIGHT',
    title: 'The Buyer and the Seller',
    year: '2025',
    status: 'Drama · Crime',
    logline:
      'An arms dealer is skeptical of his buyer and gets into a conversation with him about life and death.',
  },
  {
    slug: 'INT. FAMILY HOME — DAY',
    title: 'Neanderthal',
    year: '2022',
    status: 'Tragedy',
    logline:
      'A boy with an abnormally large forehead is teased, and his family want to do nothing else than to support him.',
  },
  {
    slug: 'EXT. WOODS — NIGHT',
    title: 'Into the Wilderness',
    year: '2025',
    status: 'Action · Drama',
    logline:
      'A man is cornered in his tent in the middle of the woods by a bear that wants nothing else than to feast on his flesh.',
  },
];

function ProjectBlock({ p }: { p: Project }) {
  return (
    <article className="relative pl-6 md:pl-10 py-5 border-l-2 border-[#a04040]/30">
      <span className="absolute -left-[5px] top-7 w-2 h-2 bg-[#a04040] rounded-full" />
      <p className="font-mono text-[10px] md:text-[11px] tracking-wider text-[#a04040] uppercase">
        {p.slug}
      </p>
      <h3 className="font-display font-bold text-2xl md:text-3xl mt-1 leading-tight">
        {p.title}
      </h3>
      <p className="font-mono text-xs text-[#1a1a1a]/55 mt-1">
        {p.year && <span>{p.year} · </span>}
        {p.status}
      </p>
      <p className="mt-3 text-[#1a1a1a]/80 leading-relaxed max-w-2xl">
        {p.logline}
      </p>
    </article>
  );
}

export function ScreenwritingPage() {
  return (
    <PageOverlay
      vibe="screenwriting"
      kicker="World 03 · Screenwriting"
      title={'The script\nis the start.'}
      lede="Every film starts on a page. Here are the scripts that became films, the ones still being filmed, and the loglines that are waiting for a producer to fall in love."
    >
      <section className="space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
          Screenplays
        </h2>
        <div className="space-y-1">
          {screenplays.map((p) => (
            <ProjectBlock key={p.title} p={p} />
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Loglines
        </h2>
        <p className="text-[#1a1a1a]/65 mb-6 max-w-2xl">
          Stories looking for a home. If anything below catches your eye, let me
          know — most can still be developed in any direction.
        </p>
        <div className="space-y-1">
          {loglines.map((p) => (
            <ProjectBlock key={p.title} p={p} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Literary writing
        </h2>
        <p className="text-[#1a1a1a]/75 leading-relaxed max-w-2xl">
          Short stories and academic writing live here too. Most are not yet
          published online — ask if you'd like to read something specific.
        </p>
      </section>
    </PageOverlay>
  );
}
