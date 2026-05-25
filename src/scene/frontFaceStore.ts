import { useEffect, useState } from 'react';
import type { FaceId } from './faces';

/**
 * Tiny global store for "which face is currently facing the camera".
 * Updated by RotatingCube from inside useFrame (cheap to compute, but only
 * fires setState when the value actually changes — so re-renders are rare).
 */

type Listener = (id: FaceId | null) => void;

const listeners = new Set<Listener>();
let currentId: FaceId | null = null;

export function setFrontFace(id: FaceId | null): void {
  if (id === currentId) return;
  currentId = id;
  listeners.forEach((l) => l(id));
}

export function useFrontFace(): FaceId | null {
  const [id, setId] = useState<FaceId | null>(currentId);
  useEffect(() => {
    listeners.add(setId);
    return () => {
      listeners.delete(setId);
    };
  }, []);
  return id;
}
