import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/comedy.glb');

export function ComedyDiorama() {
  return <GLBDiorama url="/models/comedy.glb" />;
}
