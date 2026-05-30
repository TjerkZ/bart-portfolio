# Bart website aanpassingen (28-05-2026) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the full set of client-requested changes from `Bart website aanpassingen.pdf` across the 3D cube view and all six section pages of the portfolio.

**Architecture:** React 18 + Vite + TypeScript SPA. A `react-three-fiber` cube (`src/scene/`) is the landing view at `/`; each face links to a route whose content is a `PageOverlay`-wrapped page (`src/pages/`). Face metadata (label, color, texture, tooltip, diorama) is centralised in `src/scene/faces.ts`. Page chrome (vibe colors, hero, back-pill) lives in `src/components/PageOverlay.tsx`.

**Tech Stack:** React, react-router-dom, framer-motion, @react-three/fiber + drei, three, Tailwind CSS.

**Testing note:** This project has **no test framework** (no vitest/jest/testing-library in `package.json`) and the work is almost entirely content + visual/3D changes. Introducing a unit-test harness for static copy and Three.js materials would be YAGNI. Verification for every task is therefore: `npm run lint` (must pass, `--max-warnings 0`), `npm run build` (tsc + vite build must succeed), and a manual visual check via `npm run dev`. Where a task changes interactive behaviour (About toggle, Film carousel) the manual check is spelled out explicitly.

**Branch:** `website-aanpassingen-2026-05` (already created).

**Open points:** The new About & Contact cube-face texture was not delivered with the asset folder — tracked in [OPEN-POINTS.md](../../../OPEN-POINTS.md). All other assets are in `Bart van de Steeg Website 2026 Content/Aanpassingen fotos/Aanpassingen fotos/`.

---

## File Structure

**New files:**
- `public/images/films/answering-machine/answering-machine.png` — Answering Machine still
- `public/images/prose/*-bart.png` — 6 replacement prose covers
- `public/images/esports/burt-profile.png` — channel profile picture
- `public/images/comedy/bad-writers-logo.png` — Bad Writers logo
- `public/images/comedy/sketch-ideas.png` — Sketch Ideas cartoon sign
- `public/images/comedy/ass-scratches-back.png` — Write-along title page
- `public/images/comedy/bad-writers-watermark.jpg` — podcast watermark
- `public/images/social/{youtube,x,instagram,letterboxd}.svg` — simple-icons brand SVGs
- `src/components/Carousel.tsx` — reusable arrow/swipe image carousel

**Modified files:**
- `src/scene/faces.ts` — labels, tooltips, dock colors, HUD taglines
- `src/components/Dock.tsx` — use dedicated dock swatch color
- `src/components/FaceTitleHUD.tsx` — per-face tagline + label instead of "World NN"
- `src/pages/HomeHint.tsx` — centered name + section title both top
- `src/components/PageOverlay.tsx` — make `lede` optional
- `src/pages/HomePage.tsx` — intro block, title, headings, links
- `src/pages/AboutPage.tsx` — About Bart/Burt toggle, contact section, internships
- `src/pages/FilmPage.tsx` — title, intro, carousel, Answering Machine, video links
- `src/pages/ScreenwritingPage.tsx` — title, intro, Filmed Screenplays restyle, Finished Scripts list, Literary Writing rework
- `src/pages/EsportsPage.tsx` — title, profile pic, video list, Counter-Shots link, Discord block, remove guests block
- `src/pages/ComedyPage.tsx` — title, em-dash removal, logos, expanded Sketch Ideas / Write-along / Podcast blocks

---

## Phase 1 — Assets

### Task 1: Copy and rename all new image assets into `public/`

**Files:**
- Create: the new image files listed under File Structure.

Source folder (note the doubled nesting):
`Bart van de Steeg Website 2026 Content/Aanpassingen fotos/Aanpassingen fotos/`

- [ ] **Step 1: Create destination folders and copy files**

Run (PowerShell, from repo root). Quote every path — they contain spaces.

```powershell
$src = "Bart van de Steeg Website 2026 Content/Aanpassingen fotos/Aanpassingen fotos"
New-Item -ItemType Directory -Force "public/images/films/answering-machine" | Out-Null
New-Item -ItemType Directory -Force "public/images/comedy" | Out-Null
New-Item -ItemType Directory -Force "public/images/social" | Out-Null

Copy-Item "$src/The Answering Machine.png"                            "public/images/films/answering-machine/answering-machine.png"
Copy-Item "$src/Exiiogist Expedition bart.png"                        "public/images/prose/exiiogist-expedition-bart.png"
Copy-Item "$src/Bluffing in Derado bart.png"                          "public/images/prose/bluffing-in-derado-bart.png"
Copy-Item "$src/Home For Christmas bart.png"                          "public/images/prose/home-for-christmas-bart.png"
Copy-Item "$src/Red Pastures bart.png"                                "public/images/prose/red-pastures-bart.png"
Copy-Item "$src/Space Race 2 bart.png"                                "public/images/prose/space-race-2-bart.png"
Copy-Item "$src/Window to the Star bart.png"                          "public/images/prose/window-to-the-stars-bart.png"
Copy-Item "$src/Burt Burlington YT profile picture.png"              "public/images/esports/burt-profile.png"
Copy-Item "$src/Logo Paper letters background profile picture.png"   "public/images/comedy/bad-writers-logo.png"
Copy-Item "$src/burlingtonapps_Cartoon_simple_picture_of_a_flat_sign_perpindicu_b10a566b-7c42-41ea-b237-92f7e5a41b99.png" "public/images/comedy/sketch-ideas.png"
Copy-Item "$src/Ass Scratches Back The Movie Title Page.png"         "public/images/comedy/ass-scratches-back.png"
Copy-Item "$src/Bad Writers Watermark.jpg"                            "public/images/comedy/bad-writers-watermark.jpg"
```

- [ ] **Step 2: Download social brand SVGs from simple-icons**

The user asked not to hand-build vector icons. simple-icons ships official brand SVGs (CC0). Fetch the four needed (use WebFetch or download to disk):

```powershell
$icons = @{ youtube="youtube"; x="x"; instagram="instagram"; letterboxd="letterboxd" }
foreach ($k in $icons.Keys) {
  Invoke-WebRequest "https://cdn.simpleicons.org/$($icons[$k])" -OutFile "public/images/social/$k.svg"
}
```

If `cdn.simpleicons.org` is unreachable in this environment, instead copy the raw SVG markup for each slug from https://github.com/simple-icons/simple-icons/tree/master/icons (files `youtube.svg`, `x.svg`, `instagram.svg`, `letterboxd.svg`) into the corresponding `public/images/social/*.svg`.

- [ ] **Step 3: Verify all files exist**

Run:
```powershell
Get-ChildItem public/images/films/answering-machine, public/images/prose/*-bart.png, public/images/esports/burt-profile.png, public/images/comedy, public/images/social | Select-Object Name, Length
```
Expected: all 16 files present, non-zero `Length`.

- [ ] **Step 4: Commit**

```bash
git add public/images
git commit -m "assets: add new content images and social icons"
```

---

## Phase 2 — Cube view (faces, dock, HUD, name)

### Task 2: Update face metadata in `faces.ts`

**Files:**
- Modify: `src/scene/faces.ts`

The `FaceConfig.color` field is reused as a texture tint and hover-emissive, so it must NOT be repurposed for the dock swatch. Add a dedicated `dockColor` field instead, plus a `hudTagline` for the new title format. Update labels and tooltips.

- [ ] **Step 1: Extend the `FaceConfig` interface**

Add two fields to the interface (`src/scene/faces.ts`, inside `interface FaceConfig`):

```typescript
  /** Solid color shown in the Dock chip swatch for this face (independent of
   *  the face texture tint in `color`). */
  dockColor: string;
  /** Tagline shown above the big section label in the cube HUD. */
  hudTagline: string;
```

- [ ] **Step 2: Update each face entry**

Apply per-face changes. Keep `id`/`path`/`normal`/`rotation`/`color`/`texture`/`textureRepeat`/`Diorama` as-is unless listed.

```typescript
// home
label: 'Home',
dockColor: '#3aa655',            // Groen
hudTagline: 'News & Quick introduction',
tooltip: 'Welcome!',

// about
label: 'About & Contact',
dockColor: '#e8c14a',            // Geel
hudTagline: 'Get to know me or shoot me a message!',
tooltip: "Don't be shy!",

// screenwriting  (label/tooltip rename to Writing; id+path stay 'screenwriting')
label: 'Writing',
dockColor: '#27406b',            // Donker blauw
hudTagline: 'Where I hone my storytelling',
tooltip: 'Read a script or short story while you are here!',

// film
label: 'Film',
dockColor: '#8a5cb8',            // Paars
hudTagline: 'Films, Sketches, and Commercial videos',
tooltip: "Welcome to the 'Bart Cinematic Universe' (BCU)",

// comedy
label: 'Comedy',
dockColor: '#d4404a',            // Rood
hudTagline: 'Bad Writers, Jokes, Sketches & Stand-Up',
tooltip: 'Please Laugh...',

// esports
label: 'Esports',
dockColor: '#8a5cb8',            // Paars
hudTagline: 'My foray into',
tooltip: 'My alternate persona lives here...',
```

- [ ] **Step 3: Lint + build**

Run: `npm run build`
Expected: PASS. (TypeScript will now require `dockColor`/`hudTagline` on every face — confirm all six have them.)

- [ ] **Step 4: Commit**

```bash
git add src/scene/faces.ts
git commit -m "feat(cube): new face labels, tooltips, dock colors, HUD taglines"
```

### Task 3: Black cube ridges

**Files:**
- Modify: `src/scene/RotatingCube.tsx:167`

- [ ] **Step 1: Change the RoundedBox body material color**

Replace:
```tsx
          <meshStandardMaterial color="#f3e7cf" />
```
with:
```tsx
          <meshStandardMaterial color="#111111" />
```

- [ ] **Step 2: Visual check**

Run: `npm run dev`, open `/`. Expected: the rounded edges/ridges between the colored face stickers read as black, making each face color pop.

- [ ] **Step 3: Commit**

```bash
git add src/scene/RotatingCube.tsx
git commit -m "feat(cube): black ridges so face colors pop"
```

### Task 4: Dock uses dock swatch color

**Files:**
- Modify: `src/components/Dock.tsx:29`

- [ ] **Step 1: Use `f.dockColor` for the swatch**

Replace:
```tsx
                style={{ backgroundColor: f.color }}
```
with:
```tsx
                style={{ backgroundColor: f.dockColor }}
```

- [ ] **Step 2: Visual check**

Run: `npm run dev`. Expected dock swatches left→right per `FACES` order: Home green, About & Contact yellow, Writing dark blue, Film purple, Comedy red, Esports purple.

- [ ] **Step 3: Commit**

```bash
git add src/components/Dock.tsx
git commit -m "feat(dock): per-section swatch colors"
```

### Task 5: Per-face HUD title (tagline + label)

**Files:**
- Modify: `src/components/FaceTitleHUD.tsx`

Replace the "World NN" kicker with the face's `hudTagline`; keep the big label below it. This yields e.g. tagline "News & Quick introduction" over label "Home" — matching the doc's "News & Quick introduction - Home".

- [ ] **Step 1: Replace the kicker line and drop the now-unused index**

Replace the component body's `<p>` kicker and the `index` computation. New `FaceTitleHUD.tsx` body:

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { findFaceById } from '../scene/faces';
import { useFrontFace } from '../scene/frontFaceStore';

export function FaceTitleHUD() {
  const id = useFrontFace();
  const face = id ? findFaceById(id) : null;

  return (
    <div className="fixed inset-x-0 top-24 md:top-28 z-10 flex justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {face && (
          <motion.div
            key={face.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-4"
          >
            <p className="font-display text-[11px] md:text-xs font-bold tracking-[0.28em] uppercase text-ink-soft/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
              {face.hudTagline}
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl text-ink leading-none mt-1 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
              {face.label}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`. Expected: PASS (no unused `FACES`/`index`).

- [ ] **Step 3: Commit**

```bash
git add src/components/FaceTitleHUD.tsx
git commit -m "feat(cube): tagline + section name in face HUD"
```

### Task 6: Centered name on the cube landing

**Files:**
- Modify: `src/pages/HomeHint.tsx`

Decision (from user): the name and the section title may both sit at the top. Stack the big centered "Bart van de Steeg" name above the existing `FaceTitleHUD` tagline/label, and drop the top-left brand badge and the "aka Burt Burlington" line. Size the name to match the section label (`text-3xl md:text-5xl`), not larger.

- [ ] **Step 1: Replace the top-left brand block with a centered name; move HUD down**

In `HomeHint.tsx`, remove the entire top-left brand `<div>` (the one containing "Bart van de Steeg" + "aka Burt Burlington"). Add a centered name banner at the top, and nudge the `FaceTitleHUD` so the two don't overlap.

Replace the JSX returned (keep the outer `motion.div` wrapper, the top-right status pill, and the bottom hint) so the top region reads:

```tsx
      {/* Centered brand name — sized to match the section label */}
      <div className="fixed inset-x-0 top-6 md:top-8 z-10 flex justify-center pointer-events-none px-4">
        <h1 className="font-display font-black text-3xl md:text-5xl text-ink leading-none text-center drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
          Bart van de Steeg
          <span className="text-[#ff5470]">.</span>
        </h1>
      </div>

      <FaceTitleHUD />
```

And update `FaceTitleHUD`'s container top offset so the tagline/label clears the name. In `src/components/FaceTitleHUD.tsx` change `top-24 md:top-28` to `top-32 md:top-40`.

(Keep the existing top-right "6 worlds" status pill and the bottom "Drag to spin" hint exactly as they are.)

- [ ] **Step 2: Visual check**

Run: `npm run dev`, open `/`. Expected: "Bart van de Steeg." centered at the very top; below it the rotating face's tagline + section name; no top-left badge; no "aka Burt Burlington". Confirm name and HUD don't overlap on mobile width (~375px) and desktop.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomeHint.tsx src/components/FaceTitleHUD.tsx
git commit -m "feat(cube): centered Bart van de Steeg name; drop brand badge"
```

---

## Phase 3 — Shared overlay

### Task 7: Make `lede` optional in PageOverlay

**Files:**
- Modify: `src/components/PageOverlay.tsx`

The home page intro becomes a rich block (not a one-line lede), so `lede` must be optional.

- [ ] **Step 1: Make `lede` optional in both prop interfaces and guard rendering**

In `PageHeroProps` and `PageOverlayProps` change `lede: string;` to `lede?: string;`. In `PageHero`, guard the lede paragraph:

```tsx
      {lede && (
        <p className="text-lg md:text-xl leading-relaxed opacity-85 max-w-2xl">
          {lede}
        </p>
      )}
```

- [ ] **Step 2: Build**

Run: `npm run build`. Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/PageOverlay.tsx
git commit -m "refactor(overlay): make lede optional"
```

---

## Phase 4 — Homepage

### Task 8: Homepage title, intro block, headings, links

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Fix the two update links**

In the `updates` array:
- `08-08-2023` (DreamCatcher): change link `href` from `https://www.burlingtonapps.com` to `https://www.burlingtonapps.nl` and label to `burlingtonapps.nl`.
- `06-04-2022` (Trump Quotes): same — `href` → `https://www.burlingtonapps.nl`, label → `burlingtonapps.nl`.
- `16-11-2024` (Burt Burlington launch): add `link: { label: '@BurtBurlington', href: 'https://www.youtube.com/@BurtBurlington' },`.

- [ ] **Step 2: Replace title/lede and add the intro + "What have I been up to?" heading**

Change the `PageOverlay` props and prepend an intro block before the updates list. Replace:

```tsx
    <PageOverlay
      vibe="home"
      kicker="World 01 · Home"
      title={'Welcome\nhome.'}
      lede="A cozy corner of the internet — where I keep what I make, what I'm working on, and what I love. Latest from the workshop:"
    >
      <ul className="space-y-6">
```

with:

```tsx
    <PageOverlay
      vibe="home"
      kicker="World 01 · Home"
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
        <ul className="mt-2 space-y-1 text-ink/85">
          <li>· Comedian</li>
          <li>· Raconteur Podcaster</li>
          <li>· Indie Filmmaker</li>
          <li>· Narrative Writer &amp; Screenwriter</li>
          <li>· Gag-writer</li>
          <li>· Esports Pundit</li>
        </ul>
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
```

(The closing `</ul>` and `</PageOverlay>` stay as they are.)

- [ ] **Step 3: Lint + build + visual**

Run: `npm run build` then `npm run dev`, open `/home`. Expected: hero title "Welcome!", no cozy-corner lede, intro block with C.R.I.N.G.E list, "What have I been up to?" above the news cards, the three corrected links present.

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat(home): intro block, Welcome! title, heading, link fixes"
```

---

## Phase 5 — About & Contact

### Task 9: Add the About Bart / About Burt toggle + contact section

**Files:**
- Modify: `src/pages/AboutPage.tsx`

This is the largest page rewrite. The C.R.I.N.G.E acronym moves to Home (Task 8) so it is removed here. Studies + Internships stay (with edits). Add a stateful Bart/Burt toggle and a contact section.

- [ ] **Step 1: Convert to a client component with toggle state and new data**

Replace the top of the file (imports + the `cringe`/`studies`/`internships` consts) with:

```tsx
import { useState } from 'react';
import { PageOverlay } from '../components/PageOverlay';

const studies: Array<[string, string]> = [
  ['SintLucas', 'Audiovisual Design & Animation'],
  ['South Gate', 'Creative Writing'],
  ['BIMM Berlin', 'Filmmaking'],
  ['IELTS', 'English Certificate'],
];

const internships: string[] = [
  'Vrijwerkers — content making',
  'BLD Media — content making',
  'Peelpioniers — Media Manager',
];

const socials: Array<{ label: string; href: string; icon: string }> = [
  { label: 'YouTube', href: 'https://www.youtube.com/@BurtBurlington', icon: '/images/social/youtube.svg' },
  { label: 'X', href: 'https://x.com/BurtBurlington', icon: '/images/social/x.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/burt_burlington/', icon: '/images/social/instagram.svg' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/Burt_Burlington/', icon: '/images/social/letterboxd.svg' },
];
```

- [ ] **Step 2: Rewrite the component body**

Replace the entire `export function AboutPage()` with:

```tsx
export function AboutPage() {
  const [persona, setPersona] = useState<'bart' | 'burt'>('bart');

  return (
    <PageOverlay
      vibe="about"
      kicker="World 02 · About & Contact"
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
              className={`px-4 py-1.5 rounded-full transition ${persona === 'bart' ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`}
            >
              About Bart
            </button>
            <button
              type="button"
              onClick={() => setPersona('burt')}
              className={`px-4 py-1.5 rounded-full transition ${persona === 'burt' ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`}
            >
              About Burt
            </button>
          </div>
        </div>

        {persona === 'bart' ? (
          <div className="mt-5 space-y-4 text-ink/85 leading-relaxed">
            <p>My name is Bart van de Steeg, though many people know me by my YouTube and stage name: &ldquo;Burt Burlington.&rdquo;</p>
            <p>Born in the Netherlands, I realized early on that I wanted to tell stories — my stories, funny stories, epic stories, people&rsquo;s stories, and occasionally funny-epic-people stories.</p>
            <p>And I tell them through every medium I can get my hands on: prose writing, screenwriting, filmmaking, presenting, graphic design, stand-up comedy, animation, and more. If there&rsquo;s a way to communicate an idea, I want to experiment with it.</p>
            <p>I studied audiovisual design and animation, alongside creative writing and filmmaking at university, building a foundation that blends visual storytelling with performance and narrative craft.</p>
            <p>Most recently, I&rsquo;ve been telling stories through film with my short film <em>My Joint with John</em> (2025), which I wrote, produced, and directed.</p>
            <p>I&rsquo;ve also started telling the stories in esports: the organizations, the players, the unseen moments behind the scenes — all with the goal of informing, entertaining, and building hype for both new and longtime Counter-Strike audiences.</p>
            <p>When people ask me, &ldquo;What makes you different?&rdquo; my first instinct is usually to mumble a passive-aggressive question about what makes <em>them</em> so different...</p>
            <p>But after cooling down, I&rsquo;d say this:</p>
            <p>Ever since I was young, I was, for better or worse, a little bit different. I struggled to fit in because I never seemed to instinctively understand what people were supposed to like, say, or be like.</p>
            <p>That disconnect became my perspective. And that perspective became the reason I tell stories.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-4 text-ink/85 leading-relaxed">
            <p>I look a lot like the other guy, but trust me, we&rsquo;re completely different.</p>
            <p>Where Bart is a screenwriter and filmmaker with an interest in comedy and esports, I&rsquo;m a comedy writer and esports pundit with interests in screenwriting and filmmaking. A subtle but important distinction.</p>
            <p>I&rsquo;m one half of the comedy duo <em>Bad Writers</em>, where I wrote, acted, filmed, and edited our sketches.</p>
            <p>And I&rsquo;m 100% of <em>Burt Burlington</em>: creating Counter-Strike and esports content designed to build excitement around tournaments, teams, players, rivalries, storylines, matches, and the beautiful chaos surrounding them.</p>
            <p>The goal has always been simple: make sure both longtime fans and brand-new viewers know what&rsquo;s happening — and get hyped about it.</p>
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
```

- [ ] **Step 3: Lint + build + interactive check**

Run: `npm run build` then `npm run dev`, open `/about`. Expected: heading "About Bart" with a Bart/Burt pill toggle to its right (both options visible); clicking "About Burt" swaps the paragraph and heading; Studies intact; Internships now Vrijwerkers / BLD Media / Peelpioniers (Media Manager); contact section with email + four social chips showing icons.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AboutPage.tsx
git commit -m "feat(about): Bart/Burt toggle, rewritten bios, contact section, internships"
```

---

## Phase 6 — Film page + Carousel

### Task 10: Build the reusable Carousel component

**Files:**
- Create: `src/components/Carousel.tsx`

- [ ] **Step 1: Write the Carousel**

```tsx
import { useState } from 'react';

interface CarouselProps {
  images: string[];
  /** Tailwind aspect class for the frame. */
  aspect?: string;
  className?: string;
}

export function Carousel({ images, aspect = 'aspect-video', className = '' }: CarouselProps) {
  const [i, setI] = useState(0);
  if (images.length === 0) return null;

  const go = (delta: number) =>
    setI((prev) => (prev + delta + images.length) % images.length);

  return (
    <div className={`relative ${aspect} w-full rounded-xl overflow-hidden bg-black ${className}`}>
      <img
        src={images[i]}
        alt=""
        loading="lazy"
        className="block w-full h-full object-cover select-none"
        draggable={false}
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white text-lg grid place-items-center backdrop-blur"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white text-lg grid place-items-center backdrop-blur"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`w-2 h-2 rounded-full transition ${idx === i ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

(Arrow + dot navigation covers the "pijltjes / carrousel" request. Touch users can tap arrows/dots; full swipe-gesture support is optional and not required by the doc.)

- [ ] **Step 2: Build**

Run: `npm run build`. Expected: PASS (component compiles even if not yet imported — if the linter flags it as unused at this point, proceed to Task 11 in the same commit).

- [ ] **Step 3: Commit (with Task 11)** — commit together so no unused-file lint failure.

### Task 11: Film page — title, intro, carousel, Answering Machine, video links

**Files:**
- Modify: `src/pages/FilmPage.tsx`

- [ ] **Step 1: Import Carousel and add the Answering Machine film**

Add at top: `import { Carousel } from '../components/Carousel';`

In the `films` array, insert a new entry **between** `My Joint with John` and `Passion of the Chris` (display order is reverse-chronological; the doc's "between Passion of the Chris and My Joint With John" is this slot):

```tsx
  {
    title: 'The Answering Machine',
    year: '2024',
    status: 'Released',
    logline: 'A loss in the family tears apart a modern family.',
    role: 'Writer · Director · Production Design · Sound',
    watch: { label: 'Watch it here', href: 'https://youtu.be/p2vFvi7msWE' },
    cover: '/images/films/answering-machine/answering-machine.png',
    images: ['/images/films/answering-machine/answering-machine.png'],
  },
```

- [ ] **Step 2: Fix promo video links**

In `promos`: DAF Trucks `watch.href` → `https://youtu.be/nwbNu4qtC1k`; DOE040 `watch.href` → `https://youtu.be/92H1Pq6oJ8A`.

- [ ] **Step 3: Use the Carousel in `FilmEntry`**

Replace the cover `<div className="aspect-video ...">…</div>` and the trailing `{f.images.length > 1 && (…grid…)}` block with a single carousel. The new `FilmEntry` becomes:

```tsx
function FilmEntry({ f }: { f: Film }) {
  const gallery = f.images.length > 0 ? f.images : [f.cover];
  return (
    <article className="space-y-4">
      <Carousel images={gallery} />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display font-black text-3xl md:text-4xl">{f.title}</h3>
        <p className="font-mono text-xs text-[#e8b94a] uppercase tracking-[0.18em]">
          {f.year} · {f.status}
        </p>
      </div>
      <p className="text-[#f6f1e6]/80 leading-relaxed max-w-3xl">{f.logline}</p>
      <p className="font-mono text-xs text-[#f6f1e6]/55 uppercase tracking-wider">{f.role}</p>
      {f.watch && (
        <a href={f.watch.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#e8b94a] hover:underline">
          {f.watch.label} <span aria-hidden>↗</span>
        </a>
      )}
    </article>
  );
}
```

- [ ] **Step 4: Use the Carousel in the promo blocks**

In the promos `.map`, replace the `<div className="grid grid-cols-2 md:grid-cols-4 gap-2">…</div>` image grid with:

```tsx
              <Carousel images={p.images} />
```

- [ ] **Step 5: Title + intro**

Change the `PageOverlay` for Film:

```tsx
    <PageOverlay
      vibe="film"
      kicker="World 04 · Film"
      title={'Film.'}
      lede="Explore a curated collection of short films and commercial projects I've brought to life over the years, where I took on a wide range of creative and production roles throughout the process."
    >
```

Then add a second intro paragraph as the first child inside the overlay (before the `<section className="space-y-16">`):

```tsx
      <p className="text-[#f6f1e6]/80 leading-relaxed max-w-3xl -mt-6 mb-12">
        From scriptwriting and pre-production to location scouting, cinematography, directing, acting, sound design, and editing, each project reflects a hands-on approach to storytelling from concept to final cut.
      </p>
```

- [ ] **Step 6: Lint + build + interactive check**

Run: `npm run build` then `npm run dev`, open `/film`. Expected: title "Film."; two intro paragraphs; each multi-image project shows a carousel with working ‹/› arrows + dots; The Answering Machine appears between My Joint with John and Passion of the Chris with its watch link; DAF and DOE040 promo links point to the new YouTube URLs.

- [ ] **Step 7: Commit**

```bash
git add src/components/Carousel.tsx src/pages/FilmPage.tsx
git commit -m "feat(film): carousel, Film title + intro, Answering Machine, video links"
```

---

## Phase 7 — Writing page (formerly Screenwriting)

### Task 12: Title, intro, Filmed Screenplays restyle + Answering Machine

**Files:**
- Modify: `src/pages/ScreenwritingPage.tsx`

- [ ] **Step 1: Add the Answering Machine logline and remove slugs from featured list**

In `screenplays`, set The Answering Machine's `logline` to:
`'A tragic story of a family being torn apart by loss in the family.'`
The `slug` field is being dropped from the rendering (Step 3), so it may stay in the data unused or be removed; remove it from all four entries to keep the type clean. Remove the `slug` property from the `Project` interface too.

- [ ] **Step 2: Restyle `ProjectBlock` (no timeline line/dots, bigger title, no slug)**

Replace `ProjectBlock` with:

```tsx
function ProjectBlock({ p }: { p: Project }) {
  return (
    <article className="grid md:grid-cols-[1fr_auto] gap-6 items-start py-5 border-b border-[#1a1a1a]/10 last:border-b-0">
      <div>
        <h3 className="font-display font-black text-3xl md:text-4xl leading-tight">
          {p.title}
        </h3>
        <p className="font-mono text-xs text-[#1a1a1a]/55 mt-1">
          {p.year && <span>{p.year} · </span>}
          {p.status}
        </p>
        <p className="mt-3 text-[#1a1a1a]/80 leading-relaxed max-w-2xl">{p.logline}</p>
      </div>
      {p.thumbnail && (
        <div className="w-32 md:w-36 shrink-0 rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/15">
          <img src={p.thumbnail} alt={p.title} loading="lazy" className="block w-full aspect-[2/3] object-cover" />
        </div>
      )}
    </article>
  );
}
```

- [ ] **Step 3: Title, intro, and heading rename**

Change the `PageOverlay`:

```tsx
    <PageOverlay
      vibe="screenwriting"
      kicker="World 03 · Writing"
      title={'Life is a story,\nand storytelling\nis life.'}
    >
```

Add the new three-paragraph intro as the first children (before the first `<section>`):

```tsx
      <div className="max-w-3xl space-y-4 text-[#1a1a1a]/80 leading-relaxed mb-12">
        <p>Screenwriting was my first love, and it's remained the driving force behind my creative life ever since. Over the years, I've written more than 100+ scripts spanning short films, sketches, animation, commercials, and feature films.</p>
        <p>While drama and comedy are where I feel most at home, I've recently been exploring the darker corners of storytelling through horror.</p>
        <p>I'm an intensely visual storyteller, and what excites me most about writing is the act of creating something entirely from nothing, to building worlds, characters, and moments that never existed before and bringing them to life on the page.</p>
      </div>
```

Rename the featured-section heading from `Featured screenplays` to `Filmed Screenplays`, and bump its size to match (it is already `text-2xl md:text-3xl`; bump to `text-3xl md:text-4xl`). Also remove the now-unused `space-y-1` tightening if desired; the bordered blocks handle separation.

- [ ] **Step 4: Build + visual**

Run: `npm run build` then `npm run dev`, open `/screenwriting`. Expected: hero "Life is a story, and storytelling is life."; three intro paragraphs; "Filmed Screenplays" heading; project rows with no vertical line/dots/slugs and large titles; Answering Machine shows its logline.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ScreenwritingPage.tsx
git commit -m "feat(writing): new title/intro, Filmed Screenplays restyle"
```

### Task 13: Finished Scripts list (text, two columns) + Literary Writing rework

**Files:**
- Modify: `src/pages/ScreenwritingPage.tsx`

- [ ] **Step 1: Replace the `scriptVault` data + `prose` data with full structured data**

Remove the `VaultItem`/`scriptVault`/`prose` definitions and the `CoverTile` component. Add:

```tsx
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
  link?: { label: string; href: string };
}

const prose: ProseStory[] = [
  { title: 'Exiiogist Expedition', year: '2022', genre: 'Sci-Fi, Horror, Thriller', cover: '/images/prose/exiiogist-expedition-bart.png', text: 'A stranded exiiologist on a frozen alien world is being hunted by a relentless presence. As isolation and exhaustion blur reality, his fight for survival leads him toward a fragile hope of rescue. But on a planet where the past refuses to stay dead, the thing chasing him may be far more familiar than he dares to believe.', link: { label: 'Check out the Audiobook', href: 'https://youtu.be/HvNr29Bi7iE' } },
  { title: 'Bluffing in Derado', year: '2023', genre: 'Sci-Fi, Drama, Crime', cover: '/images/prose/bluffing-in-derado-bart.png', text: 'A washed-up poker legend with a galaxy-wide reputation wakes up buried in debt, hunted by dangerous creditors, and drifting through a neon gambling world where lives are wagered as easily as money. But as the pressure closes in, he realizes losing everything might not be the thing he fears most.' },
  { title: 'Home for Christmas', year: '2023', genre: 'Sci-Fi, Action, Thriller', cover: '/images/prose/home-for-christmas-bart.png', text: "On Christmas Eve, a hardened bounty hunter is sent to capture a brilliant fugitive hiding on a remote prison planet, but in turn uncovers a truth that shatters everything he believes about himself. As the hunt spirals into a deadly game of identity and survival, he's forced to question whether escaping the prison was ever the real crime." },
  { title: 'Red Pastures', year: '2023', genre: 'Sci-Fi, Drama, Horror', cover: '/images/prose/red-pastures-bart.png', text: '"Me and my family love living off the land, But I never expected the land living off us." A young girl experiences farm life on an extraterrestrial planet and learns the beauty, and the horror of futuristic agriculture.' },
  { title: 'Space Race 2: USA vs China', year: '2023', genre: 'Soft Sci-Fi, Comedy', cover: '/images/prose/space-race-2-bart.png', text: "The U.S. have found themselves back into a space race, but this time it's with China, and they go above and beyond to beat them..." },
  { title: 'Window to the Stars', year: '2023', genre: 'Sci-Fi, Fantasy, Drama', cover: '/images/prose/window-to-the-stars-bart.png', text: 'A woman wakes up in her childhood home, but when she looks through her window, all she can see is the vastness of space above, around, and below.' },
];
```

- [ ] **Step 2: Replace the "script vault" and "Literary writing" sections in the JSX**

Replace the two `<section>`s that rendered `scriptVault` (CoverTile grid) and `prose` (CoverTile grid) with:

```tsx
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
              <div className="w-32 md:w-36 shrink-0 rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/12 bg-white">
                <img src={p.cover} alt={p.title} loading="lazy" className="block w-full aspect-[2/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">{p.title}</h3>
                <p className="font-mono text-[11px] tracking-wider text-[#a04040] uppercase mt-1">{p.year} · {p.genre}</p>
                <p className="mt-2 text-[#1a1a1a]/80 leading-relaxed text-sm">{p.text}</p>
                {p.link && (
                  <a href={p.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 font-semibold text-[#a04040] hover:underline">
                    {p.link.label} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
```

- [ ] **Step 3: Lint + build + visual**

Run: `npm run build` then `npm run dev`, open `/screenwriting`. Expected: "Finished Scripts" as a 2-column grid of text cards (title, year, type · genre, logline) and NO thumbnails; "Literary Writing" with the new bart.png covers (name already printed on cover), genre, description, and the Exiiogist audiobook link. Confirm no leftover references to `scriptVault`/`CoverTile`/`VaultItem` (build would fail otherwise).

- [ ] **Step 4: Commit**

```bash
git add src/pages/ScreenwritingPage.tsx
git commit -m "feat(writing): Finished Scripts text grid + Literary Writing rework"
```

---

## Phase 8 — Esports

### Task 14: Esports — title, profile pic, video list, links, Discord block, remove guests

**Files:**
- Modify: `src/pages/EsportsPage.tsx`

- [ ] **Step 1: Replace the `counterShots` guests data with a watch-list**

Remove the `CounterShot` interface and `counterShots` array. Add:

```tsx
const videos: Array<{ title: string; href: string }> = [
  { title: 'Counter Strike is the Chess of Esports', href: 'https://youtu.be/KldFpSdXNNs' },
  { title: 'Was Elige the PROBLEM in FaZe Clan?', href: 'https://www.youtube.com/watch?v=c6te8szuG7c' },
  { title: 'Find your Counter Strike Team! 40+ Teams Explained', href: 'https://youtu.be/VRzvx9P2-js' },
];
```

- [ ] **Step 2: Title**

Change the `PageOverlay` title:

```tsx
      title={'I love talking about Counter Strike, and if you do too, consider subscribing!'}
```

(Leave `kicker` and `lede` as-is.)

- [ ] **Step 3: Add the profile picture to "The channel" block**

Inside the channel `<article>`, immediately after the opening tag and before the "The channel" `<p>`, add:

```tsx
          <img
            src="/images/esports/burt-profile.png"
            alt="Burt Burlington profile"
            className="w-20 h-20 rounded-full object-cover border border-[#41e1c7]/30 mb-4"
          />
```

- [ ] **Step 4: Update the Counter-Shots link to "Watch it now"**

In the podcast `<article>`, change the link from the Discord href/label to:

```tsx
          <a
            href="https://www.youtube.com/watch?v=RQv0cvp1Uog&list=PLjwBRY4F-pUlNwAq6u7D-tthx4qK_VNfJ&index=4"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-5 font-semibold text-[#41e1c7] hover:underline"
          >
            Watch it now <span aria-hidden>↗</span>
          </a>
```

- [ ] **Step 5: Replace the "guests so far" section with the video watch-list + Discord block**

Replace the entire final `<section>` (the `counterShots` list) with two sections:

```tsx
      <section className="mt-12 md:mt-16">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7] mb-4">
          Watch now
        </p>
        <ul className="rounded-2xl border border-[#41e1c7]/25 bg-white/[0.04] overflow-hidden divide-y divide-white/10">
          {videos.map((v) => (
            <li key={v.href}>
              <a
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 px-5 py-5 hover:bg-white/[0.05] transition"
              >
                <span className="font-display font-bold text-lg md:text-xl text-[#d8e7ff]">{v.title}</span>
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
```

- [ ] **Step 6: Lint + build + visual**

Run: `npm run build` then `npm run dev`, open `/esports`. Expected: new long title; profile picture in The Channel block; "Watch it now" link on Counter-Shots pointing to the playlist URL; a 3-video watch-list; a Discord block; the old "guests so far" list is gone. Confirm no leftover `CounterShot` references.

- [ ] **Step 7: Commit**

```bash
git add src/pages/EsportsPage.tsx
git commit -m "feat(esports): new title, profile pic, video list, Discord block, link fixes"
```

---

## Phase 9 — Comedy

### Task 15: Comedy — title, em-dashes, logos, expanded blocks

**Files:**
- Modify: `src/pages/ComedyPage.tsx`

- [ ] **Step 1: Title + de-dashed lede**

Change the `PageOverlay`:

```tsx
      title={'Live, Laugh, Laugh again.'}
      lede="Comedy has been a large part of my life, professionally, personally, artistically. Life mostly boils down to having a laugh, and I believe that in everything I do."
```

(The em-dash "—" in the original lede is replaced with a comma — this is the "haal de '--' uit de paragraaf" request.)

- [ ] **Step 2: Add the Bad Writers logo to the Bad Writers section**

In the first `<section>`, before the `<h2>Bad Writers</h2>`, add a logo + heading row. Replace the `<h2 ...>Bad Writers</h2>` line with:

```tsx
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
```

- [ ] **Step 3: Promote "Sketch Ideas" to its own larger block with image**

Currently "Sketch Ideas" is only the trailing link of the Sketches section. Remove that trailing `<a>…Watch the "Sketch Ideas" series…</a>` from the Sketches section, and add a dedicated section after it:

```tsx
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
```

- [ ] **Step 4: Expand the Write-along + Podcast blocks with images and full text**

Replace the `mt-16 grid md:grid-cols-2 gap-8` section (the two small cards) with two larger full-width blocks:

```tsx
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
```

- [ ] **Step 5: Lint + build + visual**

Run: `npm run build` then `npm run dev`, open `/comedy`. Expected: title "Live, Laugh, Laugh again."; lede has no em-dash; Bad Writers logo beside the heading; a large "Sketch Ideas" block with cartoon-sign image and "Check out the series here" link; large Write-along block with title-page image and full premise text; large Podcast block with watermark image. Stand-Up section remains at the bottom.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ComedyPage.tsx
git commit -m "feat(comedy): new title, logos, expanded Sketch Ideas/Write-along/Podcast"
```

---

## Phase 10 — Final verification

### Task 16: Full build, lint, and end-to-end visual pass

- [ ] **Step 1: Clean lint + build**

Run: `npm run lint` then `npm run build`. Expected: both PASS with no errors/warnings.

- [ ] **Step 2: Click through every route**

Run: `npm run dev`. Walk `/`, `/home`, `/about`, `/screenwriting`, `/film`, `/comedy`, `/esports`. Confirm against this plan's expected outcomes, and that the cube view shows black ridges, centered name, per-face taglines, and correct dock colors.

- [ ] **Step 3: Confirm open points recorded**

Verify `OPEN-POINTS.md` still lists the missing About & Contact texture.

- [ ] **Step 4: Final commit (if any cleanup) and summary**

```bash
git add -A
git commit -m "chore: final lint/build pass for website aanpassingen"
```

---

## Self-Review — spec coverage

Cube page: ridges black (T3) · center name, drop "aka Burt Burlington" (T6) · Screenwriting→Writing (T2) · About→About & Contact (T2) · About texture (OPEN-POINTS) · dock colors (T2+T4) · per-face HUD titles (T2+T5) · per-face hover blips (T2). Homepage: intro/CRINGE block (T8) · Welcome! (T8) · remove cozy-corner lede (T8) · "What have I been up to?" (T8) · 16-11-2024 YouTube link (T8) · DreamCatcher + Trump Quotes → burlingtonapps.nl (T8). About: About Bart heading + bio (T9) · Bart/Burt toggle (T9) · About Burt bio (T9) · contact section + socials (T9, icons T1) · BLD Media internship (T9) · Peelpioniers → Media Manager (T9). Film: The Frame→Film (T11) · intro paragraphs (T11) · carousel (T10+T11) · DAF/DOE040 links (T11) · Answering Machine (T11). Writing: title (T12) · intro (T12) · Featured→Filmed Screenplays (T12) · restyle list, no slug/line/dots, bigger title (T12) · Answering Machine logline (T12) · Finished Scripts text grid (T13) · Literary Writing rework + new covers (T13). Esports: title (T14) · profile pic (T14) · 3-video list (T14) · Counter-Shots → Watch it now (T14) · Discord block (T14) · remove guests block (T14). Comedy: title (T15) · de-dash lede (T15) · Bad Writers logo (T15) · bigger Sketch Ideas + image (T15) · bigger Write-along + image (T15) · bigger Podcast + image (T15).

All document items map to a task; the only deferred item is the About & Contact face texture (asset not delivered — tracked in OPEN-POINTS.md).
