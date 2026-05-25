import { useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { findFaceByPath } from './faces';

const IDLE_POS = new Vector3(4.5, 3.2, 5.5);
const IDLE_LOOK = new Vector3(0, 0, 0);

const FACE_DISTANCE = 4.5;
const FACE_TILT = 0.7;

export function CameraController() {
  const { camera } = useThree();
  const location = useLocation();
  const targetPos = useRef(IDLE_POS.clone());
  const targetLook = useRef(IDLE_LOOK.clone());
  const currentLook = useRef(IDLE_LOOK.clone());

  useEffect(() => {
    const face = findFaceByPath(location.pathname);
    if (face) {
      const [nx, ny, nz] = face.normal;
      // Tilt the camera away from the pure normal axis (avoids gimbal-lock
      // on top/bottom faces and gives a more dynamic 3/4 view).
      const tx = (1 - Math.abs(nx)) * FACE_TILT;
      const ty = (1 - Math.abs(ny)) * FACE_TILT;
      const tz = (1 - Math.abs(nz)) * FACE_TILT;
      targetPos.current.set(
        nx * FACE_DISTANCE + tx,
        ny * FACE_DISTANCE + ty,
        nz * FACE_DISTANCE + tz,
      );
      targetLook.current.set(nx * 0.4, ny * 0.4, nz * 0.4);
    } else {
      targetPos.current.copy(IDLE_POS);
      targetLook.current.copy(IDLE_LOOK);
    }
  }, [location.pathname]);

  useFrame((_, delta) => {
    const t = Math.min(1, delta * 2.5);
    camera.position.lerp(targetPos.current, t);
    currentLook.current.lerp(targetLook.current, t);
    camera.lookAt(currentLook.current);
  });

  return null;
}
