import { useNavigate } from 'react-router-dom';
import { Text, useTexture } from '@react-three/drei';
import { useState } from 'react';
import { RepeatWrapping, SRGBColorSpace } from 'three';
import type { FaceConfig } from './faces';
import { CUBE_SIZE, FACE_OFFSET } from './faces';
import { useDrag } from './DragContext';

interface FaceProps {
  config: FaceConfig;
}

/**
 * Material that tiles a texture across the face. Multiplies `tint` over the
 * texture; pass white to see the texture untinted.
 */
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
        <planeGeometry args={[CUBE_SIZE, CUBE_SIZE]} />
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

      <Text
        position={[0, 0.02, -0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.22}
        color="#1a1a2e"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#ffffff"
      >
        {config.label}
      </Text>
    </group>
  );
}
