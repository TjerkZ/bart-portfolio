# Open points — Bart website aanpassingen (28-05-2026)

Tracking items from the change document that can't be completed yet because an
asset or decision is still missing. Resolve these and tick them off.

## Missing assets

- [ ] **About & Contact cube-face background texture** — The change doc says the
  new background was "doorgestuurd via Discord", but no new file was delivered.
  The `about` face is currently wired to the existing
  `public/textures/About_me_contact.png` (referenced in
  [src/scene/faces.ts](src/scene/faces.ts)), so the face renders fine as-is.
  **To resolve:** if the client delivers a higher-res "About me contact.png", it
  should replace `public/textures/About_me_contact.png` directly (same filename,
  no code change needed).

## Notes

- Social icons on the About & Contact contact section are sourced from
  [simple-icons](https://simpleicons.org) (brand SVGs), not hand-built, and live
  under `public/images/social/`.
