import { PageOverlay } from '../components/PageOverlay';

interface Project {
  slug: string;
  title: string;
  year: string;
  status: string;
  logline: string;
  thumbnail?: string;
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
    thumbnail: '/images/scripts/thumbnails/passion-of-the-chris.png',
  },
];

interface VaultItem {
  title: string;
  src: string;
}

const scriptVault: VaultItem[] = [
  { title: 'The Isle of Nytruss', src: '/images/scripts/thumbnails/the-isle-of-nytruss.png' },
  { title: 'Cabin in the Snow', src: '/images/scripts/thumbnails/cabin-in-the-snow.png' },
  { title: 'Carpe Diem, Bitch', src: '/images/scripts/thumbnails/carpe-diem-bitch.png' },
  { title: 'Draugr Episode 3', src: '/images/scripts/thumbnails/draugr-episode-3.png' },
  { title: 'Dulken\'s Delusion', src: '/images/scripts/thumbnails/dulkens-delusion.png' },
  { title: 'Flat Earth Voyage', src: '/images/scripts/thumbnails/flat-earth-voyage.png' },
  { title: 'Innergenerational Sacrifice', src: '/images/scripts/thumbnails/innergenerational-sacrifice.png' },
  { title: 'Iron Rush', src: '/images/scripts/thumbnails/iron-rush.png' },
  { title: 'Jitters', src: '/images/scripts/thumbnails/jitters.png' },
  { title: 'Live Shot', src: '/images/scripts/thumbnails/live-shot.png' },
  { title: 'Loathe of Fear', src: '/images/scripts/thumbnails/loathe-of-fear.png' },
  { title: 'Lonely Son', src: '/images/scripts/thumbnails/lonely-son.png' },
  { title: 'Noise Lust', src: '/images/scripts/thumbnails/noise-lust.png' },
  { title: 'Space Race 2', src: '/images/scripts/thumbnails/space-race-2.png' },
  { title: 'Stavn Momman', src: '/images/scripts/thumbnails/stavn-momman.png' },
  { title: 'Under the Spell of Alice', src: '/images/scripts/thumbnails/under-the-spell-of-alice.png' },
];

const prose: VaultItem[] = [
  { title: 'Bluffing in Derado', src: '/images/prose/bluffing-in-derado.png' },
  { title: 'Exiiogist Expedition', src: '/images/prose/exiiogist-expedition.png' },
  { title: 'Home for Christmas', src: '/images/prose/home-for-christmas.png' },
  { title: 'Red Pastures', src: '/images/prose/red-pastures.png' },
  { title: 'Space Race 2', src: '/images/prose/space-race-2.png' },
  { title: 'Window to the Stars', src: '/images/prose/window-to-the-stars.png' },
];

function ProjectBlock({ p }: { p: Project }) {
  return (
    <article className="relative pl-6 md:pl-10 py-5 border-l-2 border-[#a04040]/30 grid md:grid-cols-[1fr_auto] gap-6 items-start">
      <div>
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
      </div>
      {p.thumbnail && (
        <div className="w-32 md:w-36 shrink-0 rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/15">
          <img
            src={p.thumbnail}
            alt={p.title}
            loading="lazy"
            className="block w-full aspect-[2/3] object-cover"
          />
        </div>
      )}
    </article>
  );
}

function CoverTile({ item }: { item: VaultItem }) {
  return (
    <div className="space-y-2">
      <div className="rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/12 bg-white">
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="block w-full aspect-[2/3] object-cover"
        />
      </div>
      <p className="font-mono text-[11px] tracking-wider text-[#1a1a1a]/70 px-1">
        {item.title}
      </p>
    </div>
  );
}

export function ScreenwritingPage() {
  return (
    <PageOverlay
      vibe="screenwriting"
      kicker="World 03 · Screenwriting"
      title={'The script\nis the start.'}
      lede="Every film starts on a page. Here are the scripts that became films, the ones still being filmed, and the ones waiting in the vault for a producer to fall in love."
    >
      <section className="space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
          Featured screenplays
        </h2>
        <div className="space-y-1">
          {screenplays.map((p) => (
            <ProjectBlock key={p.title} p={p} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          The script vault
        </h2>
        <p className="text-[#1a1a1a]/65 mb-6 max-w-2xl">
          Finished and in-development scripts looking for a home. Ask if you'd
          like to read one.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {scriptVault.map((s) => (
            <CoverTile key={s.title} item={s} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Literary writing
        </h2>
        <p className="text-[#1a1a1a]/65 mb-6 max-w-2xl">
          Short stories — the prose I write between films. Most live on as PDFs;
          ask for any you'd like to read.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {prose.map((p) => (
            <CoverTile key={p.title} item={p} />
          ))}
        </div>
      </section>
    </PageOverlay>
  );
}
