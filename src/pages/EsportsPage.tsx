import { PageOverlay } from '../components/PageOverlay';

const stats: Array<[string, string]> = [
  ['CHANNEL', 'Burt Burlington'],
  ['SUBSCRIBERS', '2 000+'],
  ['TOTAL VIEWS', '250 000+'],
  ['DISCORD', '100+ members'],
  ['GAME', 'Counter-Strike'],
  ['REGION', 'EU'],
];

const videos: Array<{ title: string; href: string; thumb: string }> = [
  { title: 'Counter Strike is the Chess of Esports', href: 'https://youtu.be/KldFpSdXNNs', thumb: '/images/esports/thumbs/chess-of-esports.jpg' },
  { title: 'Was Elige the PROBLEM in FaZe Clan?', href: 'https://www.youtube.com/watch?v=c6te8szuG7c', thumb: '/images/esports/thumbs/elige.jpg' },
  { title: 'Find your Counter Strike Team! 40+ Teams Explained', href: 'https://youtu.be/VRzvx9P2-js', thumb: '/images/esports/thumbs/find-your-team.jpg' },
];

export function EsportsPage() {
  return (
    <PageOverlay
      vibe="esports"
      title={'I love talking about Counter Strike, and if you do too, consider subscribing!'}
      titleClassName="text-3xl md:text-4xl lg:text-5xl"
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
          <img
            src="/images/esports/burt-profile.png"
            alt="Burt Burlington profile"
            className="w-20 h-20 rounded-full object-cover border border-[#41e1c7]/30 mb-4"
          />
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

        <article className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] overflow-hidden">
          <div className="aspect-video bg-black">
            <img
              src="/images/esports/counter-shots.png"
              alt="Counter-Shots podcast key art"
              loading="lazy"
              className="block w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
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
            href="https://www.youtube.com/watch?v=RQv0cvp1Uog&list=PLjwBRY4F-pUlNwAq6u7D-tthx4qK_VNfJ&index=4"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-5 font-semibold text-[#41e1c7] hover:underline"
          >
            Watch it now <span aria-hidden>↗</span>
          </a>
          </div>
        </article>
      </section>

      <section className="mt-12 md:mt-16">
        <h2 className="font-display font-black text-3xl md:text-4xl text-[#d8e7ff] mb-4">Watch Now</h2>
        <ul className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] overflow-hidden divide-y divide-white/10">
          {videos.map((v) => (
            <li key={v.href}>
              <a href={v.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-4 py-4 hover:bg-white/[0.05] transition">
                <img src={v.thumb} alt="" className="w-28 md:w-40 aspect-video object-cover rounded-md shrink-0" />
                <span className="font-display font-bold text-lg md:text-xl text-[#d8e7ff] flex-1">{v.title}</span>
                <span className="font-semibold text-[#41e1c7] shrink-0">watch ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 md:mt-16">
        <article className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] p-6 md:p-8">
          <h2 className="font-display font-black text-2xl md:text-3xl text-[#d8e7ff]">
            Join the Burlington's Big Shots Discord Server!
          </h2>
          <p className="mt-4 text-[#d8e7ff]/80 leading-relaxed">
            A community of like-minded individuals that discuss, play, and watch Counter Strike all the time.
          </p>
          <p className="mt-2 text-[#d8e7ff]/80 leading-relaxed">
            We discuss the latest news, do watch parties and play Fantasy League where you can win prizes!
          </p>
          <a
            href="https://discord.gg/jmqDDDBUQx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-5 font-semibold text-[#41e1c7] hover:underline"
          >
            Join here <span aria-hidden>↗</span>
          </a>
        </article>
      </section>
    </PageOverlay>
  );
}
