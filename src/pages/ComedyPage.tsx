import { PageOverlay } from '../components/PageOverlay';

interface Sketch {
  title: string;
  year: string;
  href: string;
}

const sketches: Sketch[] = [
  {
    title: 'Post Malone — Rockstar (Parody)',
    year: '2023',
    href: 'https://youtu.be/UQEU5Gf4CN0',
  },
  {
    title: 'Brain & Brian: Fish and Chips',
    year: '2024',
    href: 'https://youtu.be/3j9oJylKFxA',
  },
  {
    title: 'Frank: The Killer',
    year: '2024',
    href: 'https://youtu.be/wo1ZMRglYZY',
  },
  {
    title: 'Office Drama',
    year: '2024',
    href: 'https://www.youtube.com/watch?v=HNMValuz3X8',
  },
];

export function ComedyPage() {
  return (
    <PageOverlay
      vibe="comedy"
      kicker="World 05 · Comedy"
      title={'Is this thing on?'}
      lede="Comedy has been a large part of my life — professionally, personally, artistically. Life mostly boils down to having a laugh, and I believe that in everything I do."
    >
      <section className="space-y-5">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
          Bad Writers
        </h2>
        <p className="text-[#fff5d1]/85 leading-relaxed max-w-3xl">
          A comedy and writing channel I started with Noa Mouritzen-Ward in
          2023. We upload sketches, podcasts, write-alongs (my favourite), and
          have been producing our own short films under the “Bad Writers
          Productions” name — including <em>My Joint with John</em> (2025),{' '}
          <em>Passion of the Chris</em> (2023), and{' '}
          <em>Saving Art: A Serious Documentary</em> (2024).
        </p>
        <a
          href="https://www.youtube.com/@BadWritersProductions/featured"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#ffd86b] hover:underline"
        >
          @BadWritersProductions <span aria-hidden>↗</span>
        </a>
      </section>

      <section className="mt-16 space-y-5">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
          Sketches
        </h2>
        <p className="text-[#fff5d1]/75 max-w-3xl">
          A selection of the more notable ones produced under the Bad Writers
          tag. The ones that didn't make it became their own series, “Sketch
          Ideas” — a tour through bits that never got past the page.
        </p>
        <ul className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden divide-y divide-white/10">
          {sketches.map((s) => (
            <li key={s.title}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 px-6 py-5 hover:bg-white/[0.05] transition"
              >
                <span className="font-display text-xl md:text-2xl font-bold">
                  {s.title}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#ffd86b]">
                  {s.year}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://youtu.be/zPyAX1o3Wak"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#ffd86b] hover:underline"
        >
          Watch the “Sketch Ideas” series <span aria-hidden>↗</span>
        </a>
      </section>

      <section className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-8">
          <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#ffd86b] mb-3">
            Write-along series
          </p>
          <h3 className="font-display text-2xl font-bold mb-3">
            Ass Scratches Back: The Movie
          </h3>
          <p className="text-[#fff5d1]/80 leading-relaxed">
            In <em>Passion of the Chris</em>, the titular Chris Shakespeare
            believes the only way to save art is by getting his Noir Horror
            Thriller made. Because Chris is a figment of our imagination, we
            write it <em>as if</em> we were Chris. And Chris is not a good
            writer.
          </p>
          <a
            href="https://youtube.com/playlist?list=PLF0zE5uSarfh8tSPCiTfwZ0y9G901oiRm"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-4 font-semibold text-[#ffd86b] hover:underline"
          >
            Join the quest <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-8">
          <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#ffd86b] mb-3">
            The Bad Writers Podcast
          </p>
          <h3 className="font-display text-2xl font-bold mb-3">w/ Burt & Noa</h3>
          <p className="text-[#fff5d1]/80 leading-relaxed">
            A podcast about writing, film and comedy. New episodes when we
            stop arguing about what to call them.
          </p>
          <a
            href="https://youtu.be/6FG7Y-NfelY"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-4 font-semibold text-[#ffd86b] hover:underline"
          >
            Listen now <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b] mb-4">
          Stand-Up
        </h2>
        <p className="text-[#fff5d1]/85 leading-relaxed max-w-3xl">
          My first love and the last thing I have ventured into. I started
          going onstage in 2024 but have been writing jokes for close to a
          decade. Honing the craft every week at comedy clubs toward a 15-minute
          set I'll show off here once it's tight. Watch this space.
        </p>
      </section>
    </PageOverlay>
  );
}
