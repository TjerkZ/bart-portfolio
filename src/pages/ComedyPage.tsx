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
      title={'Live, Laugh, Laugh again.'}
      lede="Comedy has been a large part of my life, professionally, personally, artistically. Life mostly boils down to having a laugh, and I believe that in everything I do."
    >
      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <img
            src="/images/comedy/bad-writers-logo.png"
            alt="Bad Writers logo"
            className="w-16 h-16 rounded-xl object-cover border border-white/10"
          />
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
            Bad Writers
          </h2>
        </div>
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
      </section>

      <section className="mt-16 grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <img
          src="/images/comedy/sketch-ideas.png"
          alt="Sketch Ideas"
          className="w-full md:w-64 rounded-2xl object-cover border border-white/10"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
            Sketch Ideas
          </h2>
          <p className="mt-3 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            Of the sketches that I have made, many sketches never gotten through the idea stage.
          </p>
          <p className="mt-2 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            Therefore we created the series &ldquo;Sketch Ideas&rdquo; where we go through ideas that never came to fruition unfortunately (or fortunately in some cases).
          </p>
          <a
            href="https://youtu.be/zPyAX1o3Wak"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-4 font-semibold text-[#ffd86b] hover:underline"
          >
            Check out the series here <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
      <section className="mt-16 grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <img
          src="/images/comedy/ass-scratches-back.png"
          alt="Ass Scratches Back: The Movie title page"
          className="w-full md:w-56 rounded-2xl object-cover border border-white/10"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
            Write-along Series — Writing w/ Bad Writers
          </h2>
          <p className="mt-1 text-[#fff5d1]/70 font-semibold">(Ass Scratches Back: The Movie)</p>
          <p className="mt-3 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            Ever want to learn the joy of writing, especially with others? Watch the Write-along series on the Bad Writers!
          </p>
          <p className="mt-2 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            The premise of the series goes like this: In the movie &lsquo;Passion of the Chris&rsquo; (2023), the titular character &lsquo;Chris Shakespeare&rsquo; believes he has to &ldquo;save art&rdquo;, and the only way he can do that, is getting his film made, which is &ldquo;Ass Scratches Back: The Movie&rdquo;, a Noir Horror Thriller, written by Chris Shakespeare himself.
          </p>
          <p className="mt-2 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            Because Chris Shakespeare is a figment of our own imagination, we in turn write it as if we were Chris. And Chris is not a good writer...
          </p>
          <a
            href="https://youtube.com/playlist?list=PLF0zE5uSarfh8tSPCiTfwZ0y9G901oiRm"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-4 font-semibold text-[#ffd86b] hover:underline"
          >
            Join us on our quest to get Chris Shakespeare's voice heard! <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <img
          src="/images/comedy/bad-writers-watermark.jpg"
          alt="The Bad Writers Podcast"
          className="w-full md:w-56 rounded-2xl object-cover border border-white/10"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#ffd86b]">
            The Bad Writers Podcast
          </h2>
          <p className="mt-3 text-[#fff5d1]/85 leading-relaxed max-w-2xl">
            A podcast about writing, film and comedy. New episodes when we stop arguing about what to call them.
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
