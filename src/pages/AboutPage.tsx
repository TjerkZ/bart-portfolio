import { useState } from 'react';
import { PageOverlay } from '../components/PageOverlay';

const studies: Array<[string, string]> = [
  ['SintLucas', 'Audiovisual Design & Animation'],
  ['South Gate', 'Creative Writing'],
  ['BIMM Berlin', 'Filmmaking'],
  ['IELTS', 'English Certificate'],
];

const internships: string[] = [
  'Vrijwerkers — Content Making',
  'BLD Media — Content Making',
  'Peelpioniers — Media Manager',
];

const socials: Array<{ label: string; href: string; icon: string }> = [
  { label: 'YouTube', href: 'https://www.youtube.com/@BurtBurlington', icon: '/images/social/youtube.svg' },
  { label: 'X', href: 'https://x.com/BurtBurlington', icon: '/images/social/x.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/burt_burlington/', icon: '/images/social/instagram.svg' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/Burt_Burlington/', icon: '/images/social/letterboxd.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bart-van-de-steeg-0a65aa373/', icon: '/images/social/linkedin.svg' },
];

export function AboutPage() {
  const [persona, setPersona] = useState<'bart' | 'burt'>('bart');

  return (
    <PageOverlay
      vibe="about"
      title={'Who is\nBart?'}
    >
      <section className="max-w-3xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display font-black text-3xl md:text-4xl">
            {persona === 'bart' ? 'About Bart' : 'About Burt'}
          </h2>
          <div className="inline-flex rounded-full border border-ink/15 bg-white/70 p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setPersona('bart')}
              aria-pressed={persona === 'bart'}
              className={`px-4 py-1.5 rounded-full transition ${persona === 'bart' ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`}
            >
              About Bart
            </button>
            <button
              type="button"
              onClick={() => setPersona('burt')}
              aria-pressed={persona === 'burt'}
              className={`px-4 py-1.5 rounded-full transition ${persona === 'burt' ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`}
            >
              About Burt
            </button>
          </div>
        </div>

        {persona === 'bart' ? (
          <div className="mt-5 space-y-4 text-ink/85 leading-relaxed">
            <figure className="float-right ml-5 mb-3 w-36 md:w-44">
              <img
                src="/images/about/bart.jpg"
                alt="Bart van de Steeg"
                className="w-full rounded-xl object-cover border border-ink/10 shadow-soft"
              />
              <figcaption className="mt-2 text-center font-display font-bold text-sm text-ink">
                Bart van de Steeg
              </figcaption>
            </figure>
            <p>My name is Bart van de Steeg, though many people know me by my YouTube and stage name: &ldquo;Burt Burlington.&rdquo;</p>
            <p>Born in the Netherlands, I realized early on that I wanted to tell stories: my stories, funny stories, epic stories, people&rsquo;s stories, and occasionally funny-epic-people stories.</p>
            <p>And I tell them through every medium I can get my hands on: prose writing, screenwriting, filmmaking, presenting, graphic design, stand-up comedy, animation, and more. If there&rsquo;s a way to communicate an idea, I want to experiment with it.</p>
            <p>I studied audiovisual design and animation, alongside creative writing and filmmaking at university, building a foundation that blends visual storytelling with performance and narrative craft.</p>
            <p>Most recently, I&rsquo;ve been telling stories through film with my short film <em>My Joint with John</em> (2025), which I wrote, produced, and directed.</p>
            <p>I&rsquo;ve also started telling the stories in esports: the organizations, the players, the unseen moments behind the scenes, all with the goal of informing, entertaining, and building hype for both new and longtime Counter-Strike audiences.</p>
            <p>When people ask me, &ldquo;What makes you different?&rdquo; my first instinct is usually to mumble a passive-aggressive question about what makes <em>them</em> so different...</p>
            <p>But after cooling down, I&rsquo;d say this:</p>
            <p>Ever since I was young, I was, for better or worse, a little bit different. I struggled to fit in because I never seemed to instinctively understand what people were supposed to like, say, or be like.</p>
            <p>That disconnect became my perspective. And that perspective became the reason I tell stories.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-4 text-ink/85 leading-relaxed">
            <figure className="float-right ml-5 mb-3 w-36 md:w-44">
              <img
                src="/images/about/burt.jpg"
                alt="Burt Burlington"
                className="w-full rounded-xl object-cover border border-ink/10 shadow-soft"
              />
              <figcaption className="mt-2 text-center font-display font-bold text-sm text-ink">
                Burt Burlington
              </figcaption>
            </figure>
            <p>I look a lot like the other guy, but trust me, we&rsquo;re completely different.</p>
            <p>Where Bart is a screenwriter and filmmaker with an interest in comedy and esports, I&rsquo;m a comedy writer and esports pundit with interests in screenwriting and filmmaking. A subtle but important distinction.</p>
            <p>I&rsquo;m one half of the comedy duo <em>Bad Writers</em>, where I wrote, acted, filmed, and edited our sketches.</p>
            <p>And I&rsquo;m 100% of <em>Burt Burlington</em>: creating Counter-Strike and esports content designed to build excitement around tournaments, teams, players, rivalries, storylines, matches, and the beautiful chaos surrounding them.</p>
            <p>The goal has always been simple: make sure both longtime fans and brand-new viewers know what&rsquo;s happening, and get hyped about it.</p>
            <p>Stand-up comedy has been a passion of mine for over a decade, even though it was the last discipline I seriously stepped into.</p>
            <p>And honestly, it makes sense. Stand-up is the one art form where everything I love collides: writing, comedy, storytelling, performance, timing, and presenting.</p>
            <p>Which is convenient, because I apparently built my entire life preparing for it by accident.</p>
          </div>
        )}
      </section>

      <section className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.24em] uppercase text-ink-soft mb-4">
            Studies
          </h3>
          <ul className="rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft overflow-hidden">
            {studies.map(([school, course]) => (
              <li key={school} className="flex justify-between gap-4 px-5 py-4 border-b border-ink/10 last:border-b-0">
                <span className="font-semibold">{school}</span>
                <span className="text-ink/65 text-right">{course}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.24em] uppercase text-ink-soft mb-4">
            Internships
          </h3>
          <ul className="rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft overflow-hidden">
            {internships.map((s) => (
              <li key={s} className="px-5 py-4 border-b border-ink/10 last:border-b-0">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 md:mt-16 max-w-3xl">
        <h2 className="font-display font-black text-3xl md:text-4xl">Want to reach out?</h2>
        <p className="mt-3 text-ink/80 leading-relaxed">Exciting!</p>
        <p className="mt-1 text-ink/80 leading-relaxed">
          Let me know any questions you have. Or if you would like to read or watch any of my work, feel free to reach out to me at:
        </p>
        <p className="mt-4 text-ink/85">
          Email:{' '}
          <a href="mailto:bartvdsteeg@hotmail.nl" className="font-semibold text-[#b27a3e] hover:underline">
            bartvdsteeg@hotmail.nl
          </a>
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 font-semibold text-ink hover:bg-white transition"
            >
              <img src={s.icon} alt="" className="w-5 h-5" />
              {s.label}
            </a>
          ))}
        </div>
      </section>
    </PageOverlay>
  );
}
