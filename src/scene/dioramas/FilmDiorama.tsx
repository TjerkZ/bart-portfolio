import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/film.glb');

export function FilmDiorama() {
  return <GLBDiorama url="/models/film.glb" />;
}
