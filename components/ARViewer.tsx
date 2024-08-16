'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { XR, useXR, useXRHitTest, createXRStore } from '@react-three/xr';
import { TextureLoader, Mesh, Group, Matrix4 } from 'three';
import { Interactive, RoundedBox, Text } from '@react-three/drei';
import { useEnvironment } from '@react-three/drei';

const xrStore = createXRStore();

const ARContent: React.FC = () => {
  const [isPlaced, setIsPlaced] = useState(false);
  const { isPresenting } = useXR();
  const groupRef = useRef<Group>(null);
  const [count, setCount] = useState(0);

  useXRHitTest((hitTestResults, getWorldMatrix) => {
    if (isPlaced || !groupRef.current) return;
    
    const hit = hitTestResults[0];
    if (hit) {
      const matrix = new Matrix4();
      if (getWorldMatrix(matrix, hit)) {
        groupRef.current.matrix.copy(matrix);
        groupRef.current.matrix.decompose(
          groupRef.current.position,
          groupRef.current.quaternion,
          groupRef.current.scale
        );
        setIsPlaced(true);
      }
    }
  }, groupRef);

  // Load environment map for better lighting
  useEnvironment({ preset: 'sunset' });

  return (
    <group ref={groupRef}>
      <mesh visible={isPresenting && isPlaced} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent>
          <primitive attach="map" object={new TextureLoader().load('/images/image.png')} />
        </meshBasicMaterial>
      </mesh>
      
      {/* 3D UI Elements */}
      <Interactive onSelect={() => setCount(c => c + 1)}>
        <RoundedBox args={[0.4, 0.1, 0.1]} radius={0.05} smoothness={4} position={[0, 0.3, -0.5]}>
          <meshStandardMaterial color="blue" />
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="white">
            Click me: {count}
          </Text>
        </RoundedBox>
      </Interactive>
    </group>
  );
};

const ARViewer: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          const isSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
          setIsARSupported(isSupported);
        } catch (e) {
          setIsARSupported(false);
          setError('Error checking AR support');
        }
      } else {
        setIsARSupported(false);
        setError('WebXR not supported in this browser');
      }
    };

    checkARSupport();
  }, []);

  const enterAR = useCallback(async () => {
    try {
      await xrStore.enterAR();
    } catch (e) {
      setError('Failed to enter AR mode.');
    }
  }, []);

  if (isARSupported === null) {
    return <div>Checking AR support...</div>;
  }

  if (!isARSupported) {
    return <div>AR is not supported on this device or browser.</div>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={enterAR} disabled={!!error}>Enter AR</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Canvas>
        <XR store={xrStore}>
          <ARContent />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </XR>
      </Canvas>
    </div>
  );
};

export default ARViewer;