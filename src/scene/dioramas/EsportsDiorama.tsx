import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/Esports.glb');

export function EsportsDiorama() {
  return <GLBDiorama url="/models/Esports.glb" />;
}
