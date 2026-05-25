import { PageOverlay } from '../components/PageOverlay';

const cringe: Array<[string, string]> = [
  ['C', 'Comedian'],
  ['R', 'Raconteur · podcaster'],
  ['I', 'Indie filmmaker'],
  ['N', 'Narrative writer & screenwriter'],
  ['G', 'Gag-writer'],
  ['E', 'Esports pundit'],
];

const studies: Array<[string, string]> = [
  ['SintLucas', 'Audiovisual Design & Animation'],
  ['South Gate', 'Creative Writing'],
  ['BIMM Berlin', 'Filmmaking'],
  ['IELTS', 'English Certificate'],
];

const internships: string[] = [
  'Vrijwerkers — content making',
  'Peelpioniers — content making',
];

export function AboutPage() {
  return (
    <PageOverlay
      vibe="about"
      kicker="World 02 · About"
      title={'Who is\nBart?'}
      lede="Good question. I don't know. What I do know is that I have been telling stories since I could speak — funny stories, epic stories, people's stories, and funny-epic-people's-stories."
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <article className="space-y-4 text-ink/85 leading-relaxed">
          <p>
            My name is <strong>Bart van de Steeg</strong>, but you might know me
            by my YouTube and stage name <em>Burt Burlington</em>. I was born in
            the Netherlands and realised early on that I wanted to tell stories
            — in every medium there is. Prose, screenplays, film, presenting,
            graphic design, stand-up, animation. All of it.
          </p>
          <p>
            Recently I have been telling stories on film through my short
            “My Joint with John” (2025), and onstage through stand-up I've been
            writing for nearly a decade and performing since 2024.
          </p>
          <p>
            Otherwise known as <strong>C.R.I.N.G.E.</strong> →
          </p>
        </article>

        <aside className="rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft p-6 md:p-8">
          <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b27a3e] mb-4">
            The acronym
          </p>
          <dl className="space-y-3">
            {cringe.map(([letter, role]) => (
              <div key={letter} className="flex items-baseline gap-4">
                <dt className="font-display font-black text-3xl md:text-4xl text-[#b27a3e] w-8">
                  {letter}
                </dt>
                <dd className="text-ink/85 text-lg">{role}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.24em] uppercase text-ink-soft mb-4">
            Studies
          </h3>
          <ul className="rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft overflow-hidden">
            {studies.map(([school, course]) => (
              <li
                key={school}
                className="flex justify-between gap-4 px-5 py-4 border-b border-ink/10 last:border-b-0"
              >
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
              <li
                key={s}
                className="px-5 py-4 border-b border-ink/10 last:border-b-0"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageOverlay>
  );
}
