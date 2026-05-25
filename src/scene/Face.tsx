import { useNavigate } from 'react-router-dom';
import { Html, useTexture } from '@react-three/drei';
import { useState } from 'react';
import { RepeatWrapping, SRGBColorSpace } from 'three';
import type { FaceConfig } from './faces';
import { FACE_OFFSET, FACE_PLANE_SIZE } from './faces';
import { useDrag } from './DragContext';

interface FaceProps {
  config: FaceConfig;
}

function TexturedFaceMaterial({
  url,
  repeat,
  tint,
  hovered,
}: {
  url: string;
  repeat: number;
  tint: string;
  hovered: boolean;
}) {
  const texture = useTexture(url);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.anisotropy = 8;
  texture.colorSpace = SRGBColorSpace;
  return (
    <meshStandardMaterial
      map={texture}
      color={tint}
      emissive={hovered ? tint : '#000000'}
      emissiveIntensity={hovered ? 0.2 : 0}
    />
  );
}

export function Face({ config }: FaceProps) {
  const navigate = useNavigate();
  const { getWasDragging } = useDrag();
  const [hovered, setHovered] = useState(false);
  const [nx, ny, nz] = config.normal;
  const { Diorama, texture, textureRepeat = 1 } = config;

  return (
    <group
      position={[nx * FACE_OFFSET, ny * FACE_OFFSET, nz * FACE_OFFSET]}
      rotation={config.rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (getWasDragging()) return;
        navigate(config.path);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[FACE_PLANE_SIZE, FACE_PLANE_SIZE]} />
        {texture ? (
          <TexturedFaceMaterial
            url={texture}
            repeat={textureRepeat}
            tint={config.color}
            hovered={hovered}
          />
        ) : (
          <meshStandardMaterial
            color={config.color}
            emissive={hovered ? config.color : '#000000'}
            emissiveIntensity={hovered ? 0.25 : 0}
          />
        )}
      </mesh>

      <group position={[0, 0.001, 0]}>
        <Diorama />
      </group>

      {hovered && (
        <Html
          position={[0, 1.7, 0]}
          center
          distanceFactor={5}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="message-bubble">{config.tooltip}</div>
        </Html>
      )}
    </group>
  );
}
