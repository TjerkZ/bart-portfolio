import { useState } from 'react';
import { PageOverlay } from '../components/PageOverlay';
import { ScriptViewerLazy } from '../components/ScriptViewerLazy';

interface FinishedScript {
  title: string;
  year: string;
  type: string;
  genre: string;
  logline: string;
}

const finishedScripts: FinishedScript[] = [
  { title: 'Locked up in Geezer Grove', year: '2025', type: 'Feature Film', genre: 'Drama, Comedy', logline: 'A depressed young man is placed under suicide watch but is held in the local nursery home for the elderly.' },
  { title: 'Cabin in the Snow', year: '2020', type: 'Short Film', genre: 'Drama, Crime', logline: "A man flees from society to an isolated cabin, where he meets society's worst." },
  { title: 'Carpe Diem, Bitch', year: '2019', type: 'Short Film', genre: 'Drama', logline: 'A bunch of youngsters feel like they are not getting enough out of life. But when they decide to go on an adventure this New Years Eve, they got more than they bargained for.' },
  { title: "Dulken's Delusion", year: '2021', type: 'Short Film', genre: 'Drama, Horror', logline: 'A doctor realizes that he and the man who is hospitalized with a flesh-eating disease share more in common than he originally thought.' },
  { title: 'Flat Earth Voyage', year: '2020', type: 'Feature Film', genre: 'Drama, Mockumentary', logline: "A somber boy decides to find his raison d'être by traveling to the edge of the world and video tape his entire journey to discover that the world, is indeed flat." },
  { title: 'Innergenerational Sacrifice', year: '2022', type: 'Short Film', genre: 'Tragedy, Fantasy', logline: 'A family drama that involves all past family members and future, culminates into a fierce battle in the name of justice.' },
  { title: 'Iron Rush', year: '2019', type: 'Short Film', genre: 'Drama, Romance, Historical', logline: 'A foreign army is marching towards the gates of the town, and to stand a chance, every man and child join the fight, while melting every piece of metal down to construct weapons in the fight.' },
  { title: 'Lonely Son', year: '2022', type: 'Short Film', genre: 'Drama', logline: "A father worries about his son who hasn't been the same ever since he lost his mother." },
  { title: 'Stavn Momman', year: '2022', type: 'Feature Film', genre: 'Horror, Thriller', logline: 'By maritime law, Captain Boomsma is prohibited from leaving the freight ship that is in the docks in Cairo. With all the crew back home to their families, Boomsma has to survive on the ship on rations and ingenuity. But something lurks beneath the waters that is aware that the Captain is now without a crew.' },
  { title: 'The Isle of Nytruss', year: '2020', type: 'Feature Film', genre: 'Fantasy, Adventure', logline: 'To help out the people of village, the children investigate the island of Nytruss to find the reason why the vegetation of the island has grown black and dead, and uncover a secret that none of them dared to imagine.' },
  { title: 'The Buyer and the Seller', year: '2025', type: 'Short Film', genre: 'Drama, Crime', logline: 'An arms dealer is skeptical of his buyer and gets into a conversation with him about life and death.' },
  { title: 'Neanderthal', year: '2022', type: 'Short Film', genre: 'Tragedy', logline: 'A boy with an abnormally large forehead is teased, and his family want to do nothing else than to support him.' },
  { title: 'Into the Wilderness', year: '2025', type: 'Short Film', genre: 'Action, Drama', logline: 'A man is cornered in his tent in the middle of the woods by a bear that wants nothing else than feast on his flesh.' },
];

interface ProseStory {
  title: string;
  year: string;
  genre: string;
  cover: string;
  text: string;
  pdf: string;
  link?: { label: string; href: string };
}

const prose: ProseStory[] = [
  { title: 'Exiiogist Expedition', year: '2022', genre: 'Sci-Fi, Horror, Thriller', cover: '/images/prose/exiiogist-expedition-bart.png', pdf: '/scripts/exiiogist-expedition.pdf', text: 'A stranded exiiologist on a frozen alien world is being hunted by a relentless presence. As isolation and exhaustion blur reality, his fight for survival leads him toward a fragile hope of rescue. But on a planet where the past refuses to stay dead, the thing chasing him may be far more familiar than he dares to believe.', link: { label: 'Check out the Audiobook', href: 'https://youtu.be/HvNr29Bi7iE' } },
  { title: 'Bluffing in Derado', year: '2023', genre: 'Sci-Fi, Drama, Crime', cover: '/images/prose/bluffing-in-derado-bart.png', pdf: '/scripts/bluffing-in-derado.pdf', text: 'A washed-up poker legend with a galaxy-wide reputation wakes up buried in debt, hunted by dangerous creditors, and drifting through a neon gambling world where lives are wagered as easily as money. But as the pressure closes in, he realizes losing everything might not be the thing he fears most.' },
  { title: 'Home for Christmas', year: '2023', genre: 'Sci-Fi, Action, Thriller', cover: '/images/prose/home-for-christmas-bart.png', pdf: '/scripts/home-for-christmas.pdf', text: "On Christmas Eve, a hardened bounty hunter is sent to capture a brilliant fugitive hiding on a remote prison planet, but in turn uncovers a truth that shatters everything he believes about himself. As the hunt spirals into a deadly game of identity and survival, he's forced to question whether escaping the prison was ever the real crime." },
  { title: 'Red Pastures', year: '2023', genre: 'Sci-Fi, Drama, Horror', cover: '/images/prose/red-pastures-bart.png', pdf: '/scripts/red-pastures.pdf', text: '"Me and my family love living off the land, But I never expected the land living off us." A young girl experiences farm life on an extraterrestrial planet and learns the beauty, and the horror of futuristic agriculture.' },
  { title: 'Space Race 2: USA vs China', year: '2023', genre: 'Soft Sci-Fi, Comedy', cover: '/images/prose/space-race-2-bart.png', pdf: '/scripts/space-race-2.pdf', text: "The U.S. have found themselves back into a space race, but this time it's with China, and they go above and beyond to beat them..." },
  { title: 'Window to the Stars', year: '2023', genre: 'Sci-Fi, Fantasy, Drama', cover: '/images/prose/window-to-the-stars-bart.png', pdf: '/scripts/window-to-the-stars.pdf', text: 'A woman wakes up in her childhood home, but when she looks through her window, all she can see is the vastness of space above, around, and below.' },
];

export function ScreenwritingPage() {
  const [activeStory, setActiveStory] = useState<ProseStory | null>(null);

  return (
    <PageOverlay
      vibe="screenwriting"
      title={'Life is a story,\nand storytelling\nis life.'}
    >
      <div className="max-w-3xl space-y-4 text-[#1a1a1a]/80 leading-relaxed mb-12">
        <p>Screenwriting was my first love, and it's remained the driving force behind my creative life ever since. Over the years, I've written more than 100+ scripts spanning short films, sketches, animation, commercials, and feature films.</p>
        <p>While drama and comedy are where I feel most at home, I've recently been exploring the darker corners of storytelling through horror.</p>
        <p>I'm an intensely visual storyteller, and what excites me most about writing is the act of creating something entirely from nothing, to building worlds, characters, and moments that never existed before and bringing them to life on the page.</p>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Finished Scripts</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {finishedScripts.map((s) => (
            <article key={s.title} className="rounded-2xl border border-[#1a1a1a]/12 bg-white/70 backdrop-blur-sm shadow-soft p-5 md:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">{s.title}</h3>
                <span className="font-mono text-xs text-[#1a1a1a]/55 shrink-0">{s.year}</span>
              </div>
              <p className="font-mono text-[11px] tracking-wider text-[#a04040] uppercase mt-1">
                {s.type} · {s.genre}
              </p>
              <p className="mt-3 text-[#1a1a1a]/80 leading-relaxed">{s.logline}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Literary Writing</h2>
        <div className="max-w-3xl space-y-2 text-[#1a1a1a]/75 mb-8">
          <p>I've always had a deep love for books, especially Sci-Fi.</p>
          <p>Its limitless, otherworldly nature inspired me to create universes of my own, worlds and ideas I brought to life through short stories.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {prose.map((p) => (
            <article key={p.title} className="grid grid-cols-[auto_1fr] gap-5 items-start">
              <button
                type="button"
                onClick={() => setActiveStory(p)}
                className="block w-32 md:w-36 shrink-0 rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/12 bg-white hover:ring-2 hover:ring-[#a04040] transition"
                aria-label={`Read ${p.title}`}
              >
                <img src={p.cover} alt={p.title} loading="lazy" className="block w-full aspect-[2/3] object-cover" />
              </button>
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">{p.title}</h3>
                <p className="font-mono text-[11px] tracking-wider text-[#a04040] uppercase mt-1">{p.year} · {p.genre}</p>
                <p className="mt-2 text-[#1a1a1a]/80 leading-relaxed text-sm">{p.text}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveStory(p)}
                    className="inline-flex items-center gap-1.5 mt-3 font-semibold text-[#a04040] hover:underline"
                  >
                    Read the story <span aria-hidden>↗</span>
                  </button>
                  {p.link && (
                    <a href={p.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 font-semibold text-[#a04040] hover:underline">
                      {p.link.label} <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeStory && (
        <ScriptViewerLazy
          url={activeStory.pdf}
          title={activeStory.title}
          onClose={() => setActiveStory(null)}
        />
      )}
    </PageOverlay>
  );
}
