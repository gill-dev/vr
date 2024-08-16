'use client'
import React, { useState, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, useXR, useXRHitTest, createXRStore } from '@react-three/xr';
import { TextureLoader, Mesh, Group, Matrix4 } from 'three';

const xrStore = createXRStore();

const ARContent: React.FC = () => {
  const [isPlaced, setIsPlaced] = useState(false);
  const { isPresenting } = useXR();
  const groupRef = useRef<Group>(null);

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

  return (
    <group ref={groupRef}>
      <mesh visible={isPresenting && isPlaced} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent>
          <primitive attach="map" object={new TextureLoader().load('/images/image.png')} />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};

const ARViewer: React.FC = () => {
  const enterAR = useCallback(() => xrStore.enterAR(), []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={enterAR}>Enter AR</button>
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