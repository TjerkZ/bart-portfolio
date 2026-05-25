import type { ComponentType } from 'react';
import { HomeDiorama } from './dioramas/HomeDiorama';
import { AboutDiorama } from './dioramas/AboutDiorama';
import { ScreenwritingDiorama } from './dioramas/ScreenwritingDiorama';
import { FilmDiorama } from './dioramas/FilmDiorama';
import { ComedyDiorama } from './dioramas/ComedyDiorama';
import { EsportsDiorama } from './dioramas/EsportsDiorama';

export const CUBE_SIZE = 2;
export const FACE_OFFSET = CUBE_SIZE / 2;

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
  /** Optional URL to a tileable image (PNG/JPG/WEBP). When set, the face plane
   *  uses this texture instead of a solid color. The Dock chip still uses `color`. */
  texture?: string;
  /** How many times the texture tiles across the 2x2 face. 1 = once, 4 = 4×4 grid. */
  textureRepeat?: number;
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
    texture: '/textures/grass.png',
    textureRepeat: 4,
    Diorama: HomeDiorama,
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    normal: [1, 0, 0],
    rotation: [0, 0, -Math.PI / 2],
    color: '#f7d8a3',
    Diorama: AboutDiorama,
  },
  {
    id: 'screenwriting',
    label: 'Screenwriting',
    path: '/screenwriting',
    normal: [-1, 0, 0],
    rotation: [0, 0, Math.PI / 2],
    color: '#ffffff',
    texture: '/textures/carpet.png',
    textureRepeat: 1,
    Diorama: ScreenwritingDiorama,
  },
  {
    id: 'film',
    label: 'Film',
    path: '/film',
    normal: [0, 1, 0],
    rotation: [0, 0, 0],
    color: '#a988b8',
    Diorama: FilmDiorama,
  },
  {
    id: 'comedy',
    label: 'Comedy',
    path: '/comedy',
    normal: [0, 0, -1],
    rotation: [-Math.PI / 2, 0, 0],
    color: '#d4707b',
    Diorama: ComedyDiorama,
  },
  {
    id: 'esports',
    label: 'Esports',
    path: '/esports',
    normal: [0, -1, 0],
    rotation: [Math.PI, 0, 0],
    color: '#ffffff',
    texture: '/textures/gamergunk.png',
    textureRepeat: 4,
    Diorama: EsportsDiorama,
  },
];

export function findFaceByPath(path: string): FaceConfig | undefined {
  return FACES.find((f) => f.path === path);
}
