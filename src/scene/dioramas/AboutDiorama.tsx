import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/contact.glb');

export function AboutDiorama() {
  return <GLBDiorama url="/models/contact.glb" />;
}
