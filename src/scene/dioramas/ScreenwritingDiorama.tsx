import { useGLTF } from '@react-three/drei';
import { GLBDiorama } from '../GLBDiorama';

useGLTF.preload('/models/office.glb');

export function ScreenwritingDiorama() {
  return <GLBDiorama url="/models/office.glb" />;
}
