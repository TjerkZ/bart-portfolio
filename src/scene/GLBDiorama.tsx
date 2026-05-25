import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Mesh, Vector3 } from 'three';

interface Props {
  url: string;
  /** Largest dimension fits inside this many face-units. Face is 2x2; default fills ~75%. */
  fit?: number;
  /** Pad around the model as a fraction of `fit`. 0 = touches face edges, default leaves a small margin. */
  margin?: number;
  /** Extra Y offset after auto-fit (positive = lift off the face). */
  yNudge?: number;
  /** Extra Y rotation (radians) — for when an export ends up facing the wrong way. */
  yawNudge?: number;
}

/**
 * Loads a .glb, normalizes it so its largest dimension == `fit` units, recenters it
 * on the X/Z axes, and rests its bottom on the face plane (Y=0).
 *
 * One-time tuning of `fit` controls how every diorama in the project sits on its
 * cube face — as long as you export your scenes at consistent scale.
 */
export function GLBDiorama({
  url,
  fit = 1.75,
  margin = 0,
  yNudge = 0,
  yawNudge = 0,
}: Props) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const { scale, position } = useMemo(() => {
    cloned.updateMatrixWorld(true);
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = (fit * (1 - margin)) / maxDim;
    return {
      scale: s,
      position: [
        -center.x * s,
        -box.min.y * s + yNudge,
        -center.z * s,
      ] as [number, number, number],
    };
  }, [cloned, fit, yNudge]);

  useEffect(() => {
    cloned.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <primitive
      object={cloned}
      scale={scale}
      position={position}
      rotation={[0, yawNudge, 0]}
    />
  );
}
