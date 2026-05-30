import type { ComponentType } from 'react';
import { HomeDiorama } from './dioramas/HomeDiorama';
import { AboutDiorama } from './dioramas/AboutDiorama';
import { ScreenwritingDiorama } from './dioramas/ScreenwritingDiorama';
import { FilmDiorama } from './dioramas/FilmDiorama';
import { ComedyDiorama } from './dioramas/ComedyDiorama';
import { EsportsDiorama } from './dioramas/EsportsDiorama';

export const CUBE_SIZE = 2;
export const CUBE_RADIUS = 0.15;
export const FACE_OFFSET = CUBE_SIZE / 2;
/** Size of the colored/textured "sticker" sitting on each face — sized to fit
 *  the flat region of the rounded box, leaving rounded corners visible. */
export const FACE_PLANE_SIZE = CUBE_SIZE - CUBE_RADIUS * 2;

export type FaceId =
  | 'home'
  | 'about'
  | 'screenwriting'
  | 'film'
  | 'comedy'
  | 'esports';

export interface FaceConfig {
  id: FaceId;
  label: string;
  path: string;
  /** Unit vector pointing outward from cube center through this face. */
  normal: [number, number, number];
  /** Euler rotation applied to the face group so its local +Y aligns with `normal`. */
  rotation: [number, number, number];
  /** Surface color of the face plane. Also used by the Dock chip swatch, and as
   *  a tint multiplied over `texture` when both are set. */
  color: string;
  /** Solid color shown in the Dock chip swatch for this face (independent of
   *  the face texture tint in `color`). */
  dockColor: string;
  /** Tagline shown above the big section label in the cube HUD. */
  hudTagline: string;
  /** Optional URL to a tileable image (PNG/JPG/WEBP). When set, the face plane
   *  uses this texture instead of a solid color. The Dock chip still uses `color`. */
  texture?: string;
  /** How many times the texture tiles across the 2x2 face. 1 = once, 4 = 4×4 grid. */
  textureRepeat?: number;
  /** Short text-message-style tooltip shown on hover (5–10 words). */
  tooltip: string;
  /** Diorama component that sits on the face. Swap with a useGLTF loader later. */
  Diorama: ComponentType;
}

export const FACES: FaceConfig[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    normal: [0, 0, 1],
    rotation: [Math.PI / 2, 0, 0],
    color: '#ffffff',
    dockColor: '#3aa655',
    hudTagline: 'News & Quick introduction',
    texture: '/textures/grass.png',
    textureRepeat: 4,
    tooltip: 'Welcome!',
    Diorama: HomeDiorama,
  },
  {
    id: 'about',
    label: 'About & Contact',
    path: '/about',
    normal: [1, 0, 0],
    rotation: [0, 0, -Math.PI / 2],
    color: '#ffffff',
    dockColor: '#e8c14a',
    hudTagline: 'Get to know me or shoot me a message!',
    texture: '/textures/About_me_contact.png',
    textureRepeat: 1,
    tooltip: "Don't be shy!",
    Diorama: AboutDiorama,
  },
  {
    id: 'screenwriting',
    label: 'Writing',
    path: '/screenwriting',
    normal: [-1, 0, 0],
    rotation: [0, 0, Math.PI / 2],
    color: '#ffffff',
    dockColor: '#27406b',
    hudTagline: 'Where I hone my storytelling',
    texture: '/textures/carpet.png',
    textureRepeat: 1,
    tooltip: 'Read a script or short story while you are here!',
    Diorama: ScreenwritingDiorama,
  },
  {
    id: 'film',
    label: 'Film',
    path: '/film',
    normal: [0, 1, 0],
    rotation: [0, 0, 0],
    color: '#a988b8',
    dockColor: '#8a5cb8',
    hudTagline: 'Films, Sketches, and Commercial videos',
    tooltip: "Welcome to the 'Bart Cinematic Universe' (BCU)",
    Diorama: FilmDiorama,
  },
  {
    id: 'comedy',
    label: 'Comedy',
    path: '/comedy',
    normal: [0, 0, -1],
    rotation: [-Math.PI / 2, 0, 0],
    color: '#d4707b',
    dockColor: '#d4404a',
    hudTagline: 'Bad Writers, Jokes, Sketches & Stand-Up',
    tooltip: 'Please Laugh...',
    Diorama: ComedyDiorama,
  },
  {
    id: 'esports',
    label: 'Esports',
    path: '/esports',
    normal: [0, -1, 0],
    rotation: [Math.PI, 0, 0],
    color: '#ffffff',
    dockColor: '#8a5cb8',
    hudTagline: 'My foray into',
    texture: '/textures/gamergunk.png',
    textureRepeat: 4,
    tooltip: "My alternate persona lives here...",
    Diorama: EsportsDiorama,
  },
];

export function findFaceByPath(path: string): FaceConfig | undefined {
  return FACES.find((f) => f.path === path);
}

export function findFaceById(id: FaceId): FaceConfig | undefined {
  return FACES.find((f) => f.id === id);
}
