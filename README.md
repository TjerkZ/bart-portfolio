# Bart van de Steeg — Portfolio

Interactive portfolio for [Bart van de Steeg](https://www.bartvandesteeg.com) (aka Burt Burlington). The landing page is a draggable voxel cube; each face is a tiny world that opens into a fullscreen section.

## Stack

- **Vite 5 + React 18 + TypeScript** — SPA, static build
- **Three.js** via **@react-three/fiber** + **@react-three/drei** — 3D scene & GLB loading
- **react-router v6** — `/home`, `/about`, `/screenwriting`, `/film`, `/comedy`, `/esports`
- **framer-motion** — page overlay + HUD transitions
- **Tailwind CSS** — UI styling (Fraunces / Inter / JetBrains Mono)
- **Docker** (node-alpine build → nginx-alpine serve) — production container
- **GitHub Actions → GHCR → Portainer** — auto-publish pipeline

## Local development

```bash
npm install
npm run dev      # → http://localhost:5173
```

Hot-reload. Type-check + production build:

```bash
npm run build    # outputs to ./dist
npm run preview  # serves ./dist locally on :4173
```

## Running the production container locally

```bash
docker build -t bart-portfolio .
docker run --rm -p 8080:80 bart-portfolio
# → http://localhost:8080
```

## Deploy pipeline

```
git push → Actions (.github/workflows/publish.yml) → ghcr.io/tjerkz/bart-portfolio
                                                                ↓
                                  Watchtower polls every 5 min ←┘
                                                                ↓
                                  Portainer restarts container
                                                                ↓
                                  Traefik (HTTPS) → bartvandesteeg.com
```

### One-time setup

1. **Push to GitHub.** Create a public repo at `github.com/TjerkZ/bart-portfolio` (or whatever name — just update `image:` in `docker-compose.yml` to match):

   ```bash
   git remote add origin git@github.com:TjerkZ/bart-portfolio.git
   git branch -m master main
   git push -u origin main
   ```

2. **First Actions run** kicks off automatically. It logs into GHCR with the built-in `GITHUB_TOKEN` and pushes the image. Watch progress under the repo's **Actions** tab.

3. **Make the GHCR package public.** By default GHCR packages are private. After the first push:
   - Go to `https://github.com/users/TjerkZ/packages/container/bart-portfolio/settings`
   - Change visibility to **Public**
   - This means Portainer can pull without credentials.

4. **Hetzner — assumptions about your Traefik setup:**
   - There's an external Docker network named `traefik` that Traefik joins
   - Traefik has an entrypoint named `websecure` (HTTPS, :443)
   - Traefik has a cert resolver named `letsencrypt`
   - If your names differ, edit the labels in [docker-compose.yml](docker-compose.yml).

5. **Create the Portainer stack.** Portainer → **Stacks → Add stack** → **Web editor** → paste the contents of [docker-compose.yml](docker-compose.yml) → **Deploy the stack**.

6. **DNS.** Point `bartvandesteeg.com` (A record) at the Hetzner host's public IP. Traefik will request a Let's Encrypt cert automatically on first hit.

### Subsequent deploys

Just `git push` to `main`. Actions builds, GHCR stores, Watchtower pulls within ~5 minutes and restarts the container. Zero clicks.

To force-deploy immediately, in Portainer → **Stacks → bart-portfolio → Update the stack → Re-pull image**.

## Project layout

```
src/
  App.tsx                   routes + persistent canvas + Dock mount
  main.tsx                  React + Router root
  index.css                 Tailwind directives, sky bg, message bubble
  scene/
    SceneCanvas.tsx         <Canvas>, lights, fog (transparent over sky)
    RotatingCube.tsx        cube group, drag-rotate, tilted idle spin,
                             settle-on-route, front-face tracking
    Face.tsx                one face: plane + diorama + hover tooltip
    CameraController.tsx    lerps camera to the active face
    GLBDiorama.tsx          auto-fits any .glb to fit the face
    DragContext.ts          shared drag flag (suppresses click-to-nav)
    frontFaceStore.ts       which face is facing the camera (for HUD)
    faces.ts                6-face config (label, path, normal, color,
                             texture, tooltip, diorama)
    dioramas/               one component per face that renders the GLB
  components/
    PageOverlay.tsx         fullscreen overlay with per-vibe theming
    Dock.tsx                bottom-center menu, always visible
    FaceTitleHUD.tsx        top-center live title of the front face
  pages/                    one file per route (+ HomeHint for "/")
public/
  models/                   *.glb voxel dioramas (one per face)
  textures/                 tileable face textures (grass, carpet, gunk)
  images/                   real photo content for the page overlays
  favicon.svg
.github/workflows/
  publish.yml               build + push image to GHCR on push to main
Dockerfile                  node-alpine build → nginx-alpine serve
docker-compose.yml          Portainer stack (image from GHCR, Traefik,
                             Watchtower)
nginx.conf                  SPA fallback + cache headers + gzip
```

## Swapping content

| You want to… | Edit |
|---|---|
| Add an update to the Home timeline | `src/pages/HomePage.tsx` (`updates` array) |
| Rename a section / change cube colors | `src/scene/faces.ts` |
| Tweak how a .glb sits on its face | `fit` / `yNudge` / `yawNudge` props in the relevant `src/scene/dioramas/*Diorama.tsx` |
| Replace a face texture | drop a tileable image at `public/textures/<name>.{png,jpg}`, point `texture:` at it in `faces.ts` |
| Add a film | `src/pages/FilmPage.tsx` (`films` / `promos` arrays) |
| Add a script thumbnail | drop into `public/images/scripts/thumbnails/` and add an entry in `ScreenwritingPage.tsx` |
| Change the per-page theme | colors / decorations live in `VIBE_STYLES` in `src/components/PageOverlay.tsx` |

## Known gaps

- **No tests yet.** Add Vitest when there's logic worth testing.
- **No video content shipped.** The Behance source folder contains `.mp4`s (DAF, DOE040, Answering Machine, Audiobook) — they'll need a `<video>` UI to add.
- **No PDFs shipped.** The script vault shows thumbnails only — make scripts downloadable by dropping the PDFs in `public/scripts/` and linking them.
- **No SEO meta per route.** Single static `<title>` for now.
- **No analytics.** Add Plausible / Umami when you want it.
- **Images uncompressed.** ~50 MB total in `public/images/` — run through `squoosh.app` or `imagemin` before launch.

## Asset attribution

Voxel models and other CC-BY assets are credited in [`notes.md`](notes.md).
