import { useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { findFaceByPath } from './faces';

const IDLE_POS = new Vector3(4.5, 3.2, 5.5);
// Look slightly above the cube's centre on the landing view so the cube sits
// lower on screen (leaving room for the big name on top), without shifting the
// cube geometry — which would throw off the per-face zoom centring.
const IDLE_LOOK = new Vector3(0, 0.7, 0);
const FACE_DISTANCE = 4.5;
const FACE_TILT = 0.7;
/** Seconds for the camera to orbit from one viewpoint to the next. */
const DURATION = 0.95;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function computeTarget(pathname: string, outPos: Vector3, outLook: Vector3) {
  const face = findFaceByPath(pathname);
  if (face) {
    const [nx, ny, nz] = face.normal;
    // Tilt off the pure normal axis so top/bottom faces don't gimbal-lock.
    const tx = (1 - Math.abs(nx)) * FACE_TILT;
    const ty = (1 - Math.abs(ny)) * FACE_TILT;
    const tz = (1 - Math.abs(nz)) * FACE_TILT;
    outPos.set(
      nx * FACE_DISTANCE + tx,
      ny * FACE_DISTANCE + ty,
      nz * FACE_DISTANCE + tz,
    );
    outLook.set(nx * 0.4, ny * 0.4, nz * 0.4);
  } else {
    outPos.copy(IDLE_POS);
    outLook.copy(IDLE_LOOK);
  }
}

export function CameraController() {
  const { camera } = useThree();
  const location = useLocation();

  // Orbit endpoints captured at each route change.
  const startDir = useRef(new Vector3(1, 0, 0));
  const startRadius = useRef(IDLE_POS.length());
  const startLook = useRef(IDLE_LOOK.clone());
  const targetDir = useRef(new Vector3(1, 0, 0));
  const targetRadius = useRef(IDLE_POS.length());
  const targetLook = useRef(IDLE_LOOK.clone());

  const animStart = useRef(-1);
  const animating = useRef(false);

  // Scratch + persistent state.
  const tmpPos = useRef(new Vector3());
  const tmpAxis = useRef(new Vector3());
  const curDir = useRef(new Vector3());
  const curLook = useRef(IDLE_LOOK.clone());

  useEffect(() => {
    // Target for the new route.
    computeTarget(location.pathname, tmpPos.current, targetLook.current);
    targetRadius.current = tmpPos.current.length();
    targetDir.current.copy(tmpPos.current).normalize();

    // Start = wherever the camera is right now (handles interrupting mid-orbit).
    startRadius.current = camera.position.length();
    startDir.current.copy(camera.position).normalize();
    startLook.current.copy(curLook.current);

    animStart.current = -1; // stamp on the next frame
    animating.current = true;
  }, [location.pathname, camera]);

  useFrame((state) => {
    if (!animating.current) return;
    if (animStart.current < 0) animStart.current = state.clock.elapsedTime;

    const p = Math.min(1, (state.clock.elapsedTime - animStart.current) / DURATION);
    const e = easeInOutCubic(p);

    // Slerp the camera *direction* around the cube (arc, not chord).
    const start = startDir.current;
    const target = targetDir.current;
    const dot = Math.max(-1, Math.min(1, start.dot(target)));
    const angle = Math.acos(dot);
    if (angle < 1e-4) {
      curDir.current.copy(target);
    } else {
      tmpAxis.current.crossVectors(start, target);
      if (tmpAxis.current.lengthSq() < 1e-8) {
        tmpAxis.current.set(0, 1, 0); // antiparallel fallback
      } else {
        tmpAxis.current.normalize();
      }
      curDir.current.copy(start).applyAxisAngle(tmpAxis.current, angle * e);
    }

    const radius =
      startRadius.current + (targetRadius.current - startRadius.current) * e;
    camera.position.copy(curDir.current).multiplyScalar(radius);

    curLook.current.lerpVectors(startLook.current, targetLook.current, e);
    camera.lookAt(curLook.current);

    if (p >= 1) animating.current = false;
  });

  return null;
}
