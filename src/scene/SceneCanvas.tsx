import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { RotatingCube } from './RotatingCube';
import { CameraController } from './CameraController';

export function SceneCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [4.5, 3.2, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="!fixed inset-0"
      style={{ background: 'transparent' }}
    >
      {/* Light sky-tinted fog so distant geometry blends into the gradient */}
      <fog attach="fog" args={['#cfe8ff', 9, 22]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-5, -3, -5]} intensity={0.35} color="#cfe8ff" />
      <RotatingCube />
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.45}
        scale={6}
        blur={2.8}
        far={3}
      />
      <CameraController />
    </Canvas>
  );
}
