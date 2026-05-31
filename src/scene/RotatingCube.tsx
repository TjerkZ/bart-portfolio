import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { Face } from './Face';
import { FACES, CUBE_SIZE, CUBE_RADIUS } from './faces';
import type { FaceId } from './faces';
import { DragContext } from './DragContext';
import { setFrontFace } from './frontFaceStore';

const DRAG_SENSITIVITY = 0.006;
const DRAG_THRESHOLD_PX = 5;
const CLICK_GUARD_MS = 80;

// Spin momentum after release
const FRICTION = 0.95; // velocity retained per 60fps-frame (~1.5–2s coast)
const MIN_VELOCITY = 0.0008; // below this, momentum is zeroed
const IDLE_TAKEOVER_SPEED = 0.01; // momentum speed above which idle drift is suppressed
const IDLE_SPEED = 0.22;

export function RotatingCube() {
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const { camera } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const wasDragRef = useRef(false);
  const dragMovedRef = useRef(0);
  const lastFrontId = useRef<FaceId | null>(null);
  // Angular velocity (radians per 60fps-frame) around world X / Y, used for coast.
  const velocity = useRef({ x: 0, y: 0 });
  // Last pointer position — we derive deltas from this instead of e.movementX/Y,
  // which is 0 on most touch devices.
  const lastPointer = useRef({ x: 0, y: 0 });

  const idleAxis = useMemo(
    () => new THREE.Vector3(0.3, 1, 0.05).normalize(),
    [],
  );
  const worldX = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const worldY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const identityQuat = useMemo(() => new THREE.Quaternion(), []);
  const tmpNormal = useMemo(() => new THREE.Vector3(), []);
  const cameraDir = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      if (!groupRef.current) return;
      // Derive movement from absolute position (works on touch, unlike movementX/Y).
      const mx = e.clientX - lastPointer.current.x;
      const my = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      const dx = mx * DRAG_SENSITIVITY;
      const dy = my * DRAG_SENSITIVITY;
      groupRef.current.rotateOnWorldAxis(worldY, dx);
      groupRef.current.rotateOnWorldAxis(worldX, dy);
      // Track recent speed (lightly smoothed) so a release becomes a flick.
      velocity.current.y = velocity.current.y * 0.5 + dx * 0.5;
      velocity.current.x = velocity.current.x * 0.5 + dy * 0.5;
      dragMovedRef.current += Math.abs(mx) + Math.abs(my);
      if (dragMovedRef.current > DRAG_THRESHOLD_PX) {
        wasDragRef.current = true;
      }
    };

    const onUp = () => {
      setIsDragging(false);
      window.setTimeout(() => {
        wasDragRef.current = false;
      }, CLICK_GUARD_MS);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [isDragging, worldX, worldY]);

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!onHome) return;
      e.stopPropagation();
      setIsDragging(true);
      dragMovedRef.current = 0;
      lastPointer.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
      // Grabbing the cube cancels any leftover coast.
      velocity.current.x = 0;
      velocity.current.y = 0;
    },
    [onHome],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (onHome) {
      if (!isDragging) {
        const v = velocity.current;
        const speed = Math.hypot(v.x, v.y);
        const k = delta * 60; // frame-rate-independent factor

        // Coast in the flick direction, decaying via friction.
        if (speed > MIN_VELOCITY) {
          group.rotateOnWorldAxis(worldY, v.y * k);
          group.rotateOnWorldAxis(worldX, v.x * k);
          const decay = Math.pow(FRICTION, k);
          v.x *= decay;
          v.y *= decay;
        } else {
          v.x = 0;
          v.y = 0;
        }

        // Idle drift, suppressed while momentum is strong, ramps back as it fades.
        const idleBlend = Math.max(0, 1 - speed / IDLE_TAKEOVER_SPEED);
        group.rotateOnWorldAxis(idleAxis, delta * IDLE_SPEED * idleBlend);
      }
    } else {
      group.quaternion.slerp(identityQuat, Math.min(1, delta * 3));
    }

    // Compute which face's outward normal is most anti-parallel to camera look.
    camera.getWorldDirection(cameraDir);
    let bestId: FaceId | null = null;
    let bestDot = Infinity;
    for (const face of FACES) {
      tmpNormal
        .set(face.normal[0], face.normal[1], face.normal[2])
        .applyQuaternion(group.quaternion);
      const dot = tmpNormal.dot(cameraDir);
      if (dot < bestDot) {
        bestDot = dot;
        bestId = face.id;
      }
    }
    if (bestId !== lastFrontId.current) {
      lastFrontId.current = bestId;
      setFrontFace(bestId);
    }
  });

  const dragValue = useMemo(
    () => ({ getWasDragging: () => wasDragRef.current }),
    [],
  );

  return (
    <DragContext.Provider value={dragValue}>
      <group ref={groupRef} onPointerDown={handlePointerDown}>
        <RoundedBox
          args={[CUBE_SIZE - 0.01, CUBE_SIZE - 0.01, CUBE_SIZE - 0.01]}
          radius={CUBE_RADIUS}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#acacac" />
        </RoundedBox>
        {FACES.map((face) => (
          <Face key={face.id} config={face} />
        ))}
      </group>
    </DragContext.Provider>
  );
}
