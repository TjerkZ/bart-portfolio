import { PageOverlay } from '../components/PageOverlay';

const stats: Array<[string, string]> = [
  ['CHANNEL', 'Burt Burlington'],
  ['SUBSCRIBERS', '2 000+'],
  ['TOTAL VIEWS', '250 000+'],
  ['DISCORD', '100+ members'],
  ['GAME', 'Counter-Strike'],
  ['REGION', 'EU'],
];

interface CounterShot {
  guest: string;
  role: string;
  href?: string;
}

const counterShots: CounterShot[] = [
  {
    guest: 'Episode 01',
    role: 'The launch episode — Counter-Strike, esports, and the scene over a drink.',
    href: 'https://youtu.be/RQv0cvp1Uog',
  },
  {
    guest: 'Heads of esports',
    role: 'Operators talking shop',
  },
  {
    guest: 'Professional commentators',
    role: 'Voices of the scene',
  },
  {
    guest: 'Journalists',
    role: 'The people writing the record',
  },
  {
    guest: 'The best fantasy player in the world',
    role: 'Self-explanatory',
  },
];

export function EsportsPage() {
  return (
    <PageOverlay
      vibe="esports"
      kicker="World 06 · Esports"
      title={'Counter-strike,\nall day.'}
      lede="A lifetime Counter-Strike obsession turned into a YouTube channel, a podcast, and a discord. Below: the live numbers and what's playing."
    >
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {stats.map(([label, val]) => (
          <div
            key={label}
            className="rounded-xl border border-[#41e1c7]/25 bg-white/[0.04] p-4 md:p-5"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7]">
              {label}
            </p>
            <p className="font-display font-bold text-xl md:text-2xl text-[#d8e7ff] mt-1 leading-tight">
              {val}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-8">
        <article className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7] mb-3">
            The channel
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#d8e7ff]">
            Burt Burlington
          </h2>
          <p className="mt-4 text-[#d8e7ff]/80 leading-relaxed">
            After a lifetime obsession I decided to dip my toes into Counter-Strike
            content — religious watcher, effortless analyst, ten years deep. The
            channel exists to express that love and drum it up in old and new
            fans alike.
          </p>
          <a
            href="https://www.youtube.com/@BurtBurlington"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-5 font-semibold text-[#41e1c7] hover:underline"
          >
            @BurtBurlington <span aria-hidden>↗</span>
          </a>
        </article>

        <article className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7] mb-3">
            The podcast
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#d8e7ff]">
            Counter-Shots
          </h2>
          <p className="mt-4 text-[#d8e7ff]/80 leading-relaxed">
            An informal chat-with-a-drink series where I talk with the people
            shaping esports — heads of esports, pro commentators, journalists,
            and the best fantasy player in the world. Drink optional.
          </p>
          <a
            href="https://discord.gg/ZCDAPBJcJz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-5 font-semibold text-[#41e1c7] hover:underline"
          >
            Join the discord <span aria-hidden>↗</span>
          </a>
        </article>
      </section>

      <section className="mt-12 md:mt-16">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7] mb-4">
          Counter-Shots — guests so far
        </p>
        <ul className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] overflow-hidden divide-y divide-white/10">
          {counterShots.map((c) => (
            <li key={c.guest} className="px-5 py-5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="font-display font-bold text-lg text-[#d8e7ff] min-w-[12rem]">
                {c.guest}
              </span>
              <span className="text-[#d8e7ff]/65 flex-1 min-w-[12rem]">
                {c.role}
              </span>
              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#41e1c7] hover:underline"
                >
                  watch ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </PageOverlay>
  );
}
