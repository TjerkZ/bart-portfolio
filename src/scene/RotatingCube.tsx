import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { Face } from './Face';
import { FACES } from './faces';
import { DragContext } from './DragContext';

const DRAG_SENSITIVITY = 0.006;
const DRAG_THRESHOLD_PX = 5;
const CLICK_GUARD_MS = 80;

export function RotatingCube() {
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const onHome = location.pathname === '/';

  const [isDragging, setIsDragging] = useState(false);
  const wasDragRef = useRef(false);
  const dragMovedRef = useRef(0);

  // Reusable math objects to avoid per-frame allocations.
  const idleAxis = useMemo(
    () => new THREE.Vector3(0.3, 1, 0.05).normalize(),
    [],
  );
  const worldX = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const worldY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const identityQuat = useMemo(() => new THREE.Quaternion(), []);

  // Window-level listeners during drag so the rotation keeps working
  // even when the pointer leaves the cube's hit-volume.
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      if (!groupRef.current) return;
      groupRef.current.rotateOnWorldAxis(worldY, e.movementX * DRAG_SENSITIVITY);
      groupRef.current.rotateOnWorldAxis(worldX, e.movementY * DRAG_SENSITIVITY);
      dragMovedRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
      if (dragMovedRef.current > DRAG_THRESHOLD_PX) {
        wasDragRef.current = true;
      }
    };

    const onUp = () => {
      setIsDragging(false);
      // Hold the "was dragging" flag long enough for R3F to fire the
      // synthetic click that would otherwise navigate.
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
    },
    [onHome],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (onHome) {
      if (!isDragging) {
        // Spin around a tilted world axis so every face — including the
        // bottom — drifts into view over time.
        group.rotateOnWorldAxis(idleAxis, delta * 0.22);
      }
    } else {
      // Settle back to identity so the active face lines up with the camera.
      group.quaternion.slerp(identityQuat, Math.min(1, delta * 3));
    }
  });

  const dragValue = useMemo(
    () => ({ getWasDragging: () => wasDragRef.current }),
    [],
  );

  return (
    <DragContext.Provider value={dragValue}>
      <group ref={groupRef} onPointerDown={handlePointerDown}>
        {/* Solid backing so any seam between face planes reads as cube material, not sky */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.998, 1.998, 1.998]} />
          <meshStandardMaterial color="#f3e7cf" />
        </mesh>
        {FACES.map((face) => (
          <Face key={face.id} config={face} />
        ))}
      </group>
    </DragContext.Provider>
  );
}
