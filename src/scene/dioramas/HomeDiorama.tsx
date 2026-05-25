import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/house.glb');

export function HomeDiorama() {
  return <GLBDiorama url="/models/house.glb" />;
}
