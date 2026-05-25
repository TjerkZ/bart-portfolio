# Bart's Portfolio

Interactive portfolio site. The landing page is a rotating voxel cube — each face is a little diorama linked to a section.

## Stack

- **Vite + React 18 + TypeScript** — SPA, static build
- **Three.js** via **@react-three/fiber** + **@react-three/drei** — 3D scene
- **react-router v6** — `/about`, `/projects`, etc.
- **framer-motion** — page overlay fade/slide
- **Tailwind CSS** — UI styling
- **Docker** (multi-stage → nginx) — production container

## Local development

```bash
npm install
npm run dev      # → http://localhost:5173
```

Hot-reload, opens the cube on `/`.

## Production build

```bash
npm run build    # outputs to ./dist
npm run preview  # serves ./dist locally on port 4173
```

## Running in Docker

```bash
docker build -t bart-portfolio .
docker run --rm -p 8080:80 bart-portfolio
# → http://localhost:8080
```

## Deploying to Portainer (Hetzner)

1. Push this repo somewhere Portainer can reach (GitHub / Gitea / etc).
2. In Portainer → **Stacks → Add stack**.
3. Choose **Repository**, point it at your repo, set the compose file to `docker-compose.yml`.
4. Deploy. Portainer will build the image and run it on port `8080` of the host.
5. Point your reverse proxy (Traefik / nginx / Caddy) at that port.

Alternative: build locally, push the image to a registry (GHCR / Docker Hub), then set `image:` in `docker-compose.yml` and use that instead of `build:`.

## Project layout

```
src/
  App.tsx                  routes + persistent canvas
  main.tsx                 React + Router root
  index.css                Tailwind directives + globals
  scene/
    SceneCanvas.tsx        <Canvas>, lights, fog
    RotatingCube.tsx       cube group, idle spin, settle-on-route
    Face.tsx               one face: plane + diorama + word label
    CameraController.tsx   lerps camera to the active face
    faces.ts               6-face config (label, path, normal, color, diorama)
    dioramas/              placeholder voxel scenes (1 file per face)
  components/
    PageOverlay.tsx        framer-motion card that hosts page content
  pages/                   one file per route + HomeHint for "/"
public/
  favicon.svg
Dockerfile                 node-alpine build → nginx-alpine serve
docker-compose.yml         Portainer-ready stack
nginx.conf                 SPA fallback + cache headers + gzip
```

## Renaming the 6 sections

Edit a single file: `src/scene/faces.ts`. Each entry has `id`, `label`, `path`, and a `Diorama` component. To rename "Blog" to "Notes":

1. Change `label: 'Blog'` → `'Notes'` and `path: '/blog'` → `'/notes'`.
2. Add a matching `<Route path="/notes" …>` in `src/App.tsx`.
3. (Optional) Rename the `BlogPage` and `BlogDiorama` files.

## Swapping the placeholder voxel scenes for real models

Each diorama is currently hand-coded with `<boxGeometry>` primitives in `src/scene/dioramas/*.tsx`. To replace one with a MagicaVoxel export:

1. Model the scene in MagicaVoxel.
2. Export as `.glb` (File → Export → glTF Binary).
3. Drop it into `public/models/about.glb` (etc).
4. Replace the diorama component body with:

   ```tsx
   import { useGLTF } from '@react-three/drei';
   useGLTF.preload('/models/about.glb');

   export function AboutDiorama() {
     const { scene } = useGLTF('/models/about.glb');
     return <primitive object={scene.clone()} scale={0.05} />;
   }
   ```

   Tweak `scale` and add a `position={[…]}` so the model sits nicely on the face.

## What's intentionally not here yet

- No tests (add Vitest when there's logic worth testing).
- No CMS for blog posts — `src/pages/BlogPage.tsx` holds an inline array.
- No SEO meta per route (single static `<title>` for now).
- No analytics. Add Plausible / Umami if you want it.
