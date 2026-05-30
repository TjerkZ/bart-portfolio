# Open points — Bart website aanpassingen (28-05-2026)

Tracking items from the change document that can't be completed yet because an
asset or decision is still missing. Resolve these and tick them off.

## Missing assets

- [ ] **About & Contact cube-face background texture** — The change doc says the
  new background was "doorgestuurd via Discord", but the file is **not** in
  `Bart van de Steeg Website 2026 Content/Aanpassingen fotos/`. Until it is
  delivered, the About face keeps its current texture
  (`public/textures/About_me_contact.png`, referenced in
  [src/scene/faces.ts](src/scene/faces.ts)).
  **To resolve:** drop the file into `public/textures/`, then update the
  `texture:` field of the `about` face in `src/scene/faces.ts`.

## Notes

- Social icons on the About & Contact contact section are sourced from
  [simple-icons](https://simpleicons.org) (brand SVGs), not hand-built, and live
  under `public/images/social/`.
