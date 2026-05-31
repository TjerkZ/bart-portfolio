import { PageOverlay } from '../components/PageOverlay';

const cringe: Array<[string, string]> = [
  ['C', 'Comedian'],
  ['R', 'Raconteur Podcaster'],
  ['I', 'Indie Filmmaker'],
  ['N', 'Narrative Writer & Screenwriter'],
  ['G', 'Gag-writer'],
  ['E', 'Esports Pundit'],
];

interface Update {
  date: string;
  image: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const updates: Update[] = [
  {
    date: '15-06-2026',
    image: '/images/updates/15-06-2026.png',
    title: 'Finished “My Joint with John” short film!',
    body:
      'A film I co-wrote, produced, directed and edited is finally done — and it is my proudest achievement thus far. I got to work with so many great people and professionals that I look forward to working with again. I sadly can\'t show you the movie yet because it will be on a festival run for the foreseeable future, but for now, check out the teaser.',
    link: { label: 'Watch the teaser', href: '#' },
  },
  {
    date: '20-05-2026',
    image: '/images/updates/20-05-2026.png',
    title: 'Fazmagoo pre-production crowdfund',
    body:
      'Excited to share that production has started on “Oh, Flinkies! It\'s Fazmagoo!” — the story about Fazmagoo, a cosmic wizard cursed to endlessly cure people\'s misery, who crashes into the life of Gregory, a man consumed by insecurity over his girlfriend\'s well-endowed ex.',
    link: { label: 'fazmagoo.com', href: 'https://www.fazmagoo.com' },
  },
  {
    date: '20-12-2025',
    image: '/images/updates/20-12-2025.png',
    title: 'Burt Burlington hit 2000+ subscribers',
    body:
      'My Counter-Strike esports channel crossed 2 000 subscribers and 250 000+ total views. To celebrate I launched a Discord that now has 100+ members and ran multiple community giveaways.',
    link: { label: '@BurtBurlington', href: 'https://www.youtube.com/@BurtBurlington' },
  },
  {
    date: '24-10-2025',
    image: '/images/updates/24-10-2025.png',
    title: 'Launched the “Counter-Shots” podcast',
    body:
      'The official launch of Counter-Shots — a podcast where I talk with people in the industry about Counter-Strike, esports and the scene, over an informal drink. So far I\'ve interviewed heads of esports, professional commentators, journalists, and the best fantasy player in the world.',
    link: { label: 'Watch episode 1', href: 'https://youtu.be/RQv0cvp1Uog' },
  },
  {
    date: '16-11-2024',
    image: '/images/updates/16-11-2024.png',
    title: 'Launched the “Burt Burlington” YouTube channel',
    body:
      'After a lifetime obsession I decided to dip my toes into one of my true loves — Counter-Strike. I watch it religiously and have been breathing it for the last decade. With this channel I want to express my sincere love for the game while drumming it up for old and new fans alike.',
    link: { label: '@BurtBurlington', href: 'https://www.youtube.com/@BurtBurlington' },
  },
  {
    date: '08-08-2023',
    image: '/images/updates/08-08-2023.png',
    title: 'Work commenced on DreamCatcher',
    body:
      'After the success of Trump Quotes, Burlington Apps is back with another release — DreamCatcher. An app to organise, analyse and most importantly save your dreams while you still remember them.',
    link: { label: 'burlingtonapps.nl', href: 'https://www.burlingtonapps.nl' },
  },
  {
    date: '08-07-2023',
    image: '/images/updates/08-07-2023.png',
    title: 'Passion of the Chris premieres',
    body:
      'My first short film “Passion of the Chris” — which I wrote, produced, edited and starred in as the titular role — is out. A comedy about a self-professed “Saviour of Art” trying to get his film made despite pesky producers who don\'t understand art.',
    link: { label: 'Watch on YouTube', href: 'https://www.youtube.com/watch?v=KS_vc3duufE' },
  },
  {
    date: '06-04-2022',
    image: '/images/updates/06-04-2022.png',
    title: 'Trump Quotes app launches',
    body:
      'Burlington Apps is proud to announce the launch of our first app — Trump Quotes! Get hit with one of the hilarious things Trump has said, then challenge your friends in arcade mode on how well they know the 45th and 47th president of the US.',
    link: { label: 'burlingtonapps.nl', href: 'https://www.burlingtonapps.nl' },
  },
  {
    date: '19-07-2021',
    image: '/images/updates/19-07-2021.png',
    title: 'Burlington Apps software company launched',
    body:
      'Bart van de Steeg and Tjerk Zeilstra started a software development company with one goal: making life more fun and easier for our users. Burlington Apps is built of young and hungry professionals across diverse fields who want to embrace the future by way of apps.',
    link: { label: 'burlingtonapps.nl', href: 'https://www.burlingtonapps.nl' },
  },
];

export function HomePage() {
  return (
    <PageOverlay
      vibe="home"
      title={'Welcome!'}
    >
      <section className="max-w-3xl">
        <h2 className="font-display font-black text-3xl md:text-4xl">
          Who is Bart van de Steeg?
        </h2>
        <p className="mt-3 text-ink/80 leading-relaxed">
          Good question. I don't know.
        </p>
        <p className="mt-3 text-ink/80 leading-relaxed">I would say I am:</p>
        <dl className="mt-3 rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft p-6 md:p-8 space-y-3 max-w-md">
          {cringe.map(([letter, role]) => (
            <div key={letter} className="flex items-baseline gap-4">
              <dt className="font-display font-black text-3xl md:text-4xl text-[#d4732d] w-8">{letter}</dt>
              <dd className="text-ink/85 text-lg">{role}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-ink/80 leading-relaxed">
          Otherwise known as <strong>&lsquo;C.R.I.N.G.E.&rsquo;</strong>
        </p>
        <p className="mt-2 text-ink/80 leading-relaxed">
          To fully understand what C.R.I.N.G.E is, check out the{' '}
          <a href="/about" className="font-semibold text-[#d4732d] hover:underline">
            &lsquo;About Bart&rsquo;
          </a>{' '}
          section.
        </p>
      </section>

      <h2 className="font-display font-black text-3xl md:text-4xl mt-14 mb-6">
        What have I been up to?
      </h2>

      <ul className="space-y-6">
        {updates.map((u) => (
          <li
            key={u.date}
            className="rounded-2xl border border-ink/10 bg-white/75 backdrop-blur-sm shadow-soft overflow-hidden"
          >
            <img
              src={u.image}
              alt={u.title}
              loading="lazy"
              className="block w-full aspect-[16/9] object-cover"
            />
            <div className="p-6 md:p-7">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-ink-soft">
                {u.date}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-1 leading-snug">
                {u.title}
              </h2>
              <p className="mt-3 text-ink/75 leading-relaxed">{u.body}</p>
              {u.link && (
                <a
                  href={u.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 mt-3 font-semibold text-[#d4732d] hover:underline"
                >
                  {u.link.label} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PageOverlay>
  );
}
