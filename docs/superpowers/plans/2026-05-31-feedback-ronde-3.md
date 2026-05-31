# Feedback ronde 3 (31-05-2026) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Apply the third round of client feedback (`Feedback ronde 3/Website aanpassingen 31-05-2026.pdf`) to the portfolio, including productionising the PDF script-viewer and wiring it to the Literary Writing short stories.

**Architecture:** React 18 + Vite + TypeScript SPA. 3D cube (`src/scene/`) is the landing view; faces route to `PageOverlay`-wrapped pages (`src/pages/`). Face metadata in `src/scene/faces.ts`. The PoC `src/components/ScriptViewer.tsx` (react-pdf) already exists on branch `feat-script-viewer-poc` and is reused here, lazy-loaded.

**Tech Stack:** React, react-router-dom, framer-motion, @react-three/fiber + drei, three, Tailwind, **react-pdf** (pdf.js).

**Testing note:** No test framework; `npm run lint` has no config (pre-existing). Verification gate per task = `npm run build` (tsc typecheck + vite build) + manual visual check via `npm run dev`.

**Branch:** create `feedback-ronde-3` off `main`. The script-viewer PoC code (ScriptViewer.tsx, the `react-pdf` dependency, and `public/scripts/sample-script.pdf`) is carried over from `feat-script-viewer-poc` — see Task 9.

**New assets (source):** `Bart van de Steeg Website 2026 Content/Feedback ronde 3/Nieuwe assets/Nieuwe assets/`
- `Edited_Bart van de Steeg.png` (About Bart photo), `Edited_Bart van de Steeg 2.png` (About Burt photo)
- `The Chess of Esports.jpg`, `Elige was the problem.jpg`, `Find you team.jpg` (esports video thumbnails)
- 6× `*_Burlington.pdf` (short stories for the viewer)

**Open questions (surface to client; don't block):**
1. **"Make it so that"** — the About & Contact section of the doc contains a truncated sentence "Make it so that" with no completion. Cannot implement; flag and skip until clarified.
2. **About & Contact face texture "About me contact.png"** — the about face already references `/textures/About_me_contact.png` (28 KB, wired in `faces.ts`). No new file with that name was found in the round-3 assets. Either the existing texture already satisfies this, or a higher-res file is still to be delivered. See Task 5 — keep existing wiring; record in OPEN-POINTS.md.

---

## Phase A — Assets

### Task 1: Copy round-3 image + PDF assets into `public/`

**Files:** create the assets below.

- [ ] **Step 1: Copy (PowerShell, from repo root)**

```powershell
$src = "Bart van de Steeg Website 2026 Content/Feedback ronde 3/Nieuwe assets/Nieuwe assets"
New-Item -ItemType Directory -Force "public/images/about" | Out-Null
New-Item -ItemType Directory -Force "public/images/esports/thumbs" | Out-Null
New-Item -ItemType Directory -Force "public/scripts" | Out-Null

Copy-Item "$src/Edited_Bart van de Steeg.png"          "public/images/about/bart.png"
Copy-Item "$src/Edited_Bart van de Steeg 2.png"        "public/images/about/burt.png"
Copy-Item "$src/The Chess of Esports.jpg"              "public/images/esports/thumbs/chess-of-esports.jpg"
Copy-Item "$src/Elige was the problem.jpg"             "public/images/esports/thumbs/elige.jpg"
Copy-Item "$src/Find you team.jpg"                     "public/images/esports/thumbs/find-your-team.jpg"

Copy-Item "$src/Exiiogist Expedition_Burlington.pdf"       "public/scripts/exiiogist-expedition.pdf"
Copy-Item "$src/Bluffing in Derado_Burlington.pdf"         "public/scripts/bluffing-in-derado.pdf"
Copy-Item "$src/Home for Christmas_Burlington.pdf"         "public/scripts/home-for-christmas.pdf"
Copy-Item "$src/Red Pastures_Burlington.pdf"               "public/scripts/red-pastures.pdf"
Copy-Item "$src/Space Race 2 USA vs. China_Burlington.pdf" "public/scripts/space-race-2.pdf"
Copy-Item "$src/Window to the Stars_Burlington.pdf"        "public/scripts/window-to-the-stars.pdf"
```

If a source filename differs, `Get-ChildItem "$src"` and adjust the source side; keep destination names exactly.

- [ ] **Step 2: Verify**

```powershell
Get-ChildItem public/images/about, public/images/esports/thumbs, public/scripts/*.pdf | Select Name, Length
```
Expected: 2 about photos + 3 thumbs + 6 PDFs, all non-zero. (The PoC `sample-script.pdf` will also be here once Task 9 carries it over — fine.)

- [ ] **Step 3: Commit**

```bash
git add public/images/about public/images/esports/thumbs public/scripts
git commit -m "assets: round-3 about photos, esports thumbnails, short-story PDFs"
```

---

## Phase B — Cube & scene

### Task 2: Ridge colour, name 50% bigger, remove "6 worlds", lower titles

**Files:** `src/scene/RotatingCube.tsx`, `src/pages/HomeHint.tsx`, `src/components/FaceTitleHUD.tsx`

- [ ] **Step 1: Ridge colour → `#acacac`**

In `src/scene/RotatingCube.tsx`, change the RoundedBox body material:
```tsx
          <meshStandardMaterial color="#acacac" />
```
(was `#111111`.)

- [ ] **Step 2: Name 50% bigger + remove the "6 worlds" pill** — `src/pages/HomeHint.tsx`

Bump the centered name from `text-3xl md:text-5xl` to `text-5xl md:text-7xl`:
```tsx
        <h1 className="font-display font-black text-5xl md:text-7xl text-ink leading-none text-center drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
          Bart van de Steeg
          <span className="text-[#ff5470]">.</span>
        </h1>
```
Remove the entire top-right status pill block (the `<div className="absolute top-5 right-5 ...">` containing the ping dot and "6 worlds").

- [ ] **Step 3: Lower the section titles** — `src/components/FaceTitleHUD.tsx`

The bigger name needs more headroom. Change the container offset from `top-32 md:top-40` to `top-44 md:top-52`.

- [ ] **Step 4: Build + visual**

`npm run build`; then `npm run dev`, view `/`. Expected: grey (`#acacac`) ridges; larger centered name; no "6 worlds" pill; tagline/section name sits lower, clear of the name.

- [ ] **Step 5: Commit**

```bash
git add src/scene/RotatingCube.tsx src/pages/HomeHint.tsx src/components/FaceTitleHUD.tsx
git commit -m "feat(cube): grey ridges, larger name, drop 6-worlds pill, lower titles"
```

### Task 3: Lower the whole cube on screen

**Files:** `src/scene/SceneCanvas.tsx`

The cube is centred at the origin and the camera looks at `(0,0,0)`. To drop it lower in the viewport on the landing view, offset the cube (and its contact shadow) downward with a parent group. Face-view framing is irrelevant (the page overlay covers the canvas).

- [ ] **Step 1: Wrap the cube in an offset group + lower the shadow**

In `src/scene/SceneCanvas.tsx`, replace `<RotatingCube />` with:
```tsx
      <group position={[0, -0.7, 0]}>
        <RotatingCube />
      </group>
```
and change the `ContactShadows` `position` from `[0, -1.3, 0]` to `[0, -2.0, 0]`.

- [ ] **Step 2: Visual tune**

`npm run dev`, view `/`. The cube should sit visibly lower, leaving room for the enlarged name on top. If it clips the dock or feels off, adjust the `-0.7` (try `-0.5`…`-0.9`) and keep the shadow ~1.3 below the cube.

- [ ] **Step 3: Commit**

```bash
git add src/scene/SceneCanvas.tsx
git commit -m "feat(cube): lower the cube on the landing view"
```

### Task 4: Page kicker = cube subtitle (remove "World 0X")

**Files:** `src/components/PageOverlay.tsx`, all six pages.

Every page still shows a kicker like "World 01 · Home". Replace it with that face's cube subtitle (`hudTagline`). Derive it automatically from `faces.ts` so the two never drift, and make the `kicker` prop optional/overridable.

- [ ] **Step 1: Default the kicker from the face's `hudTagline`** — `src/components/PageOverlay.tsx`

Add import:
```tsx
import { findFaceById } from '../scene/faces';
```
In `PageOverlay`, before rendering, resolve a default kicker:
```tsx
  const kickerText = kicker ?? findFaceById(vibe)?.hudTagline ?? '';
```
Make `kicker?: string` optional in `PageOverlayProps`, and pass `kicker={kickerText}` into `PageHero`. (`PageHeroProps.kicker` stays `string`.)

- [ ] **Step 2: Remove the `kicker="World 0X · ..."` prop from all six pages**

In `HomePage.tsx`, `AboutPage.tsx`, `ScreenwritingPage.tsx`, `FilmPage.tsx`, `ComedyPage.tsx`, `EsportsPage.tsx`, delete the `kicker={...}` line from each `<PageOverlay>` so the default (the face tagline) is used.

- [ ] **Step 3: Build + visual**

`npm run build`; visit each route. Expected kickers: Home "News & Quick introduction", About "Get to know me or shoot me a message!", Writing "Where I hone my storytelling", Film "Films, Sketches, and Commercial videos", Comedy "Bad Writers, Jokes, Sketches & Stand-Up", Esports "My foray into". No more "World 0X".

- [ ] **Step 4: Commit**

```bash
git add src/components/PageOverlay.tsx src/pages
git commit -m "feat(pages): kicker shows the cube subtitle instead of World 0X"
```

### Task 5: About & Contact face background (verify/record)

**Files:** `src/scene/faces.ts` (likely no change), `OPEN-POINTS.md`

- [ ] **Step 1: Confirm wiring + record**

The `about` face already uses `texture: '/textures/About_me_contact.png'` and `public/textures/About_me_contact.png` exists. No new "About me contact.png" was delivered in round 3. Leave the wiring as-is. Update `OPEN-POINTS.md`: mark the round-1 deferred texture as "wired to existing About_me_contact.png; awaiting a higher-res replacement if the client wants one." If a new file is later provided, drop it into `public/textures/` (same name) — no code change needed.

- [ ] **Step 2: Commit**

```bash
git add OPEN-POINTS.md
git commit -m "docs: clarify About & Contact texture status"
```

---

## Phase C — Homepage

### Task 6: C.R.I.N.G.E diagram + 19-07-2021 link

**Files:** `src/pages/HomePage.tsx`

- [ ] **Step 1: Replace the plain bullet list with the acronym diagram**

In the intro `<section>`, replace the `<ul>` of "· Comedian / · Raconteur Podcaster / …" and keep the "I would say I am:" line above it. Add a module-level data array near the top of the file:
```tsx
const cringe: Array<[string, string]> = [
  ['C', 'Comedian'],
  ['R', 'Raconteur Podcaster'],
  ['I', 'Indie Filmmaker'],
  ['N', 'Narrative Writer & Screenwriter'],
  ['G', 'Gag-writer'],
  ['E', 'Esports Pundit'],
];
```
Replace the `<ul>…</ul>` with the styled diagram (home accent `#d4732d`):
```tsx
        <dl className="mt-3 rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm shadow-soft p-6 md:p-8 space-y-3 max-w-md">
          {cringe.map(([letter, role]) => (
            <div key={letter} className="flex items-baseline gap-4">
              <dt className="font-display font-black text-3xl md:text-4xl text-[#d4732d] w-8">{letter}</dt>
              <dd className="text-ink/85 text-lg">{role}</dd>
            </div>
          ))}
        </dl>
```

- [ ] **Step 2: Add the 19-07-2021 link**

In the `updates` array, the `19-07-2021` entry (Burlington Apps software company launched) currently has no `link`. Add:
```tsx
    link: { label: 'burlingtonapps.nl', href: 'https://www.burlingtonapps.nl' },
```

- [ ] **Step 3: Build + visual**

`npm run build`; view `/home`. Expected: C.R.I.N.G.E. shown as the big-letter acronym card (not a plain bullet list); 19-07-2021 update now has a burlingtonapps.nl link.

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat(home): C.R.I.N.G.E acronym diagram + 19-07-2021 link"
```

---

## Phase D — About & Contact

### Task 7: About Bart/Burt photos + remove em-dashes

**Files:** `src/pages/AboutPage.tsx`

- [ ] **Step 1: Add a persona photo above each bio**

The bios render in a `{persona === 'bart' ? (...) : (...)}`. Add an image at the top of each bio block. For Bart, prepend inside its `<div className="mt-5 space-y-4 ...">`:
```tsx
            <img
              src="/images/about/bart.png"
              alt="Bart van de Steeg"
              className="float-right ml-5 mb-3 w-36 md:w-44 rounded-xl object-cover border border-ink/10 shadow-soft"
            />
```
For Burt, the same with `src="/images/about/burt.png"` and `alt="Burt Burlington"`. (Float keeps the long text wrapping nicely; if it looks cramped on mobile the implementer may switch to a top-of-block block image instead — use judgment, keep it clean.)

- [ ] **Step 2: Remove em-dashes from the bio texts**

In both bios, replace the `—` em-dashes with commas (or split sentences) so no `—` remains in the About copy. Specifically the Bart bio lines "tell stories — my stories…", "behind the scenes — all with the goal…", and the Burt bio "what's happening — and get hyped…". Rephrase to read naturally with commas. Do a final check that no `—` remains in `AboutPage.tsx`.

- [ ] **Step 3: Build + visual**

`npm run build`; view `/about`, toggle Bart/Burt. Expected: each persona shows its photo; bios contain no em-dashes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AboutPage.tsx
git commit -m "feat(about): persona photos for Bart/Burt; remove em-dashes"
```

---

## Phase E — Comedy

### Task 8: Bad Writers Podcast copy

**Files:** `src/pages/ComedyPage.tsx`

- [ ] **Step 1: Replace the podcast paragraph**

In "The Bad Writers Podcast" block, replace the paragraph text with:
```tsx
            A podcast about writing, film and comedy. We discuss story structure, character development, and going to film school.
```

- [ ] **Step 2: Build + commit**

`npm run build`. Then:
```bash
git add src/pages/ComedyPage.tsx
git commit -m "feat(comedy): update Bad Writers Podcast description"
```

---

## Phase F — Writing page + script viewer

### Task 9: Productionise the script viewer (carry over from PoC, lazy-load)

**Files:** add `react-pdf` dep, `src/components/ScriptViewer.tsx`, `public/scripts/sample-script.pdf` (from PoC); new `src/components/ScriptViewerLazy.tsx` wrapper.

- [ ] **Step 1: Install dependency + bring over PoC files**

Run `npm install react-pdf`. Copy `src/components/ScriptViewer.tsx` and `public/scripts/sample-script.pdf` from branch `feat-script-viewer-poc` (e.g. `git checkout feat-script-viewer-poc -- src/components/ScriptViewer.tsx public/scripts/sample-script.pdf`). The component already sets the pdf.js worker via `new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url)` and imports the AnnotationLayer/TextLayer CSS.

- [ ] **Step 2: Lazy-load so pdf.js isn't in the main bundle**

Create `src/components/ScriptViewerLazy.tsx`:
```tsx
import { lazy, Suspense } from 'react';

const ScriptViewer = lazy(() =>
  import('./ScriptViewer').then((m) => ({ default: m.ScriptViewer })),
);

interface Props {
  url: string;
  title: string;
  onClose: () => void;
}

export function ScriptViewerLazy(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 text-white/80">
          Loading viewer…
        </div>
      }
    >
      <ScriptViewer {...props} />
    </Suspense>
  );
}
```

- [ ] **Step 3: Build to confirm code-splitting**

`npm run build`. Expected: PASS, and the output shows a **separate** chunk for the viewer/pdf.js (not folded into `index-*.js`). The main `index-*.js` should be back near its pre-pdf size.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/components/ScriptViewer.tsx src/components/ScriptViewerLazy.tsx public/scripts/sample-script.pdf
git commit -m "feat(viewer): productionise script viewer (react-pdf, lazy-loaded)"
```

### Task 10: Remove "Filmed Screenplays"; wire Literary Writing covers to PDFs

**Files:** `src/pages/ScreenwritingPage.tsx`

- [ ] **Step 1: Remove the Filmed Screenplays section entirely**

Delete: the `Project` interface, the `screenplays` array, the `ProjectBlock` component, and the entire `<section>` that renders `Filmed Screenplays`. Keep the page intro, the "Finished Scripts" section, and "Literary Writing".

- [ ] **Step 2: Add a PDF to each prose story + open it in the viewer**

Add `pdf: string;` to the `ProseStory` interface and set each entry's `pdf` (mapping from the doc):
```tsx
// in each prose entry, add the matching pdf:
//  Exiiogist Expedition   -> '/scripts/exiiogist-expedition.pdf'
//  Bluffing in Derado     -> '/scripts/bluffing-in-derado.pdf'
//  Home for Christmas     -> '/scripts/home-for-christmas.pdf'
//  Red Pastures           -> '/scripts/red-pastures.pdf'
//  Space Race 2: USA vs China -> '/scripts/space-race-2.pdf'
//  Window to the Stars    -> '/scripts/window-to-the-stars.pdf'
```

Convert the page to manage viewer state (the file may already import `useState` from Task in round-1; if not, add it). Add:
```tsx
import { useState } from 'react';
import { ScriptViewerLazy } from '../components/ScriptViewerLazy';
...
  const [activeStory, setActiveStory] = useState<ProseStory | null>(null);
```

Make each prose cover clickable (button wrapping the image) and add a "Read story" link, both opening the viewer:
```tsx
              <button
                type="button"
                onClick={() => setActiveStory(p)}
                className="block w-32 md:w-36 shrink-0 rounded-md overflow-hidden shadow-soft border border-[#1a1a1a]/12 bg-white hover:ring-2 hover:ring-[#a04040] transition"
                aria-label={`Read ${p.title}`}
              >
                <img src={p.cover} alt={p.title} loading="lazy" className="block w-full aspect-[2/3] object-cover" />
              </button>
```
and in the text column, add under the genre/text:
```tsx
                <button
                  type="button"
                  onClick={() => setActiveStory(p)}
                  className="inline-flex items-center gap-1.5 mt-3 font-semibold text-[#a04040] hover:underline"
                >
                  Read the story <span aria-hidden>↗</span>
                </button>
```
Keep the existing Exiiogist audiobook `link` as well (it can sit beside "Read the story").

Render the viewer once at the end of the page, before `</PageOverlay>`:
```tsx
      {activeStory && (
        <ScriptViewerLazy
          url={activeStory.pdf}
          title={activeStory.title}
          onClose={() => setActiveStory(null)}
        />
      )}
```

- [ ] **Step 3: Build + interactive check**

`npm run build`; `npm run dev`, view `/screenwriting`. Expected: no "Filmed Screenplays" section; "Finished Scripts" text grid intact; each Literary Writing cover (and a "Read the story" link) opens the matching real PDF in the modal viewer with page navigation + download + Esc to close.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ScreenwritingPage.tsx
git commit -m "feat(writing): drop Filmed Screenplays; open short stories in the viewer"
```

---

## Phase G — Esports

### Task 11: Smaller title, bigger "Watch Now" heading, video thumbnails

**Files:** `src/components/PageOverlay.tsx`, `src/pages/EsportsPage.tsx`

- [ ] **Step 1: Allow a per-page title size override** — `src/components/PageOverlay.tsx`

Add `titleClassName?: string` to both `PageHeroProps` and `PageOverlayProps`. In `PageHero`, apply it to the `<h1>` (append/override the size classes), defaulting to the current `text-5xl md:text-7xl lg:text-[8.5rem]` when not provided. Thread it from `PageOverlay` into `PageHero`.

- [ ] **Step 2: Esports title ~50% smaller** — `src/pages/EsportsPage.tsx`

Pass a smaller size on the esports overlay:
```tsx
      titleClassName="text-3xl md:text-4xl lg:text-5xl"
```
(The long sentence "I love talking about Counter Strike…" should now read at roughly half the default scale.)

- [ ] **Step 3: Bigger "Watch now" heading**

In the watch-list section, change the small mono label:
```tsx
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#41e1c7] mb-4">Watch now</p>
```
to a proper heading:
```tsx
        <h2 className="font-display font-black text-3xl md:text-4xl text-[#d8e7ff] mb-4">Watch Now</h2>
```

- [ ] **Step 4: Add thumbnails to the 3 videos**

Extend the `videos` array entries with a `thumb`:
```tsx
const videos: Array<{ title: string; href: string; thumb: string }> = [
  { title: 'Counter Strike is the Chess of Esports', href: 'https://youtu.be/KldFpSdXNNs', thumb: '/images/esports/thumbs/chess-of-esports.jpg' },
  { title: 'Was Elige the PROBLEM in FaZe Clan?', href: 'https://www.youtube.com/watch?v=c6te8szuG7c', thumb: '/images/esports/thumbs/elige.jpg' },
  { title: 'Find your Counter Strike Team! 40+ Teams Explained', href: 'https://youtu.be/VRzvx9P2-js', thumb: '/images/esports/thumbs/find-your-team.jpg' },
];
```
In each `<li>` anchor, add a thumbnail before the title:
```tsx
              <a href={v.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-4 py-4 hover:bg-white/[0.05] transition">
                <img src={v.thumb} alt="" className="w-28 md:w-40 aspect-video object-cover rounded-md shrink-0" />
                <span className="font-display font-bold text-lg md:text-xl text-[#d8e7ff] flex-1">{v.title}</span>
                <span className="font-semibold text-[#41e1c7] shrink-0">watch ↗</span>
              </a>
```

- [ ] **Step 5: Build + visual**

`npm run build`; view `/esports`. Expected: title noticeably smaller; "Watch Now" is a big heading; each video row shows its thumbnail.

- [ ] **Step 6: Commit**

```bash
git add src/components/PageOverlay.tsx src/pages/EsportsPage.tsx
git commit -m "feat(esports): smaller title, bigger Watch Now heading, video thumbnails"
```

---

## Phase H — Film

### Task 12: Show JUMBO vertical photos in full

**Files:** `src/components/Carousel.tsx`, `src/pages/FilmPage.tsx`

The carousel uses `object-cover`, which crops the portrait JUMBO photos. Add a contain option and use it for JUMBO.

- [ ] **Step 1: Add a `fit` option to Carousel** — `src/components/Carousel.tsx`

Add `fit?: 'cover' | 'contain'` (default `'cover'`) to `CarouselProps`. Apply to the `<img>` className: use `object-cover` or `object-contain` based on `fit`. When `contain`, keep the black frame (letterboxing looks intentional).

- [ ] **Step 2: Use contain for the JUMBO promo** — `src/pages/FilmPage.tsx`

The promo blocks render `<Carousel images={p.images} alt={...} />`. The JUMBO entry has portrait images. Either add a `fit?: 'contain'` field to the `PromoSpot` data for JUMBO and pass it through, or detect by client name. Cleanest: add an optional `fit` to the promo data and pass `fit={p.fit}`. Set JUMBO's `fit: 'contain'`. A taller aspect helps verticals — pass `aspect="aspect-[3/4]"` for contain promos, or keep `aspect-video` with contain (letterboxed). Use judgment; the requirement is that the full vertical image is visible (not cropped).

- [ ] **Step 3: Build + visual**

`npm run build`; view `/film`, open the JUMBO carousel. Expected: the vertical JUMBO photos are shown in full (letterboxed), not cropped.

- [ ] **Step 4: Commit**

```bash
git add src/components/Carousel.tsx src/pages/FilmPage.tsx
git commit -m "feat(film): show JUMBO vertical photos in full (contain fit)"
```

---

## Phase I — Final verification

### Task 13: Full build + spec & code-quality review

- [ ] **Step 1:** `npm run build` — must pass clean; confirm the viewer/pdf.js is a separate chunk (Task 9).
- [ ] **Step 2:** `npm run dev` — click through `/`, `/home`, `/about`, `/screenwriting`, `/film`, `/comedy`, `/esports` and verify every item below.
- [ ] **Step 3:** Spec & code-quality review across the branch (e7b35d8-equivalent base = `main` tip before this branch).
- [ ] **Step 4:** Final commit if cleanup needed.

---

## Self-Review — spec coverage (round 3)

Cube: name 50% bigger (T2) · titles lower (T2) · cube lower (T3) · ridges #acacac (T2) · replace "World 0X" with cube subtitle (T4) · remove "6 worlds" graphic (T2) · About & Contact background (T5 / OPEN-POINTS). Homepage: rebuild C.R.I.N.G.E diagram (T6) · 19-07-2021 burlingtonapps.nl link (T6). About: About Bart photo (T7) · About Burt photo (T7) · remove "--" from texts (T7) · "Make it so that" → OPEN (truncated in source). Comedy: Bad Writers Podcast new text (T8). Esports: title ~50% smaller (T11) · bigger "Watch Now" (T11) · 3 video thumbnails (T11). Screenwriting: remove "Filmed Screenplays" entirely (T10) · link short stories to PDFs in Literary Writing (T9 viewer + T10 wiring). Film: JUMBO vertical photos shown in full (T12).

All actionable items map to a task. Deferred/open: the "Make it so that" truncated instruction, and a possible higher-res About texture (both flagged to the client).
