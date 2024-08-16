'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { XR, useXR, useXRHitTest, createXRStore } from '@react-three/xr';
import * as THREE from 'three';

const xrStore = createXRStore();

const ARContent: React.FC = () => {
  const [artworkTexture, setArtworkTexture] = useState<THREE.Texture | null>(null);
  const [placement, setPlacement] = useState<THREE.Vector3 | null>(null);
  const [scale, setScale] = useState(1);
  const groupRef = useRef<THREE.Group>(null);
  const hitTestRef = useRef<THREE.Object3D>(null);
  const { scene, camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const { isPresenting, enterAR, exitAR } = useXR();

  useEffect(() => {
    new THREE.TextureLoader().load('/images/image.png', (texture) => {
      setArtworkTexture(texture);
    });
  }, []);

  useXRHitTest((hitTestResults) => {
    if (placement || hitTestResults.length === 0) return;
    
    const hitTestResult = hitTestResults[0];
    const hitMatrix = new THREE.Matrix4();
    hitMatrix.fromArray(hitTestResult.getPose(hitTestRef.current!.parent as THREE.XRReferenceSpace)!.transform.matrix);
    
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(hitMatrix);
    setPlacement(position);
  }, hitTestRef);

  const handlePlacement = useCallback(() => {
    if (placement && groupRef.current) {
      groupRef.current.position.copy(placement);
      groupRef.current.lookAt(camera.position);
    }
  }, [placement, camera]);

  const handleScale = useCallback((delta: number) => {
    setScale((prevScale) => Math.max(0.5, Math.min(prevScale + delta * 0.01, 2)));
  }, []);

  useFrame(({ gl }) => {
    if (!groupRef.current) return;

    // Check for touch events
    if (gl.domElement.onpointerdown) {
      gl.domElement.onpointerdown = (event: PointerEvent) => {
        raycaster.current.setFromCamera(
          new THREE.Vector2(
            (event.clientX / gl.domElement.clientWidth) * 2 - 1,
            -(event.clientY / gl.domElement.clientHeight) * 2 + 1
          ),
          camera
        );
        const intersects = raycaster.current.intersectObject(groupRef.current!, true);
        if (intersects.length > 0) {
          handlePlacement();
        }
      };
    }

    // You might want to implement custom gestures for scaling here
    // For simplicity, we'll use keyboard events for scaling in this example
    document.onkeydown = (event: KeyboardEvent) => {
      if (event.key === '+') handleScale(1);
      if (event.key === '-') handleScale(-1);
    };
  });

  if (!artworkTexture || !placement) return null;

  return (
    <>
      <button
        onClick={isPresenting ? exitAR : enterAR}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isPresenting ? 'Exit AR' : 'Enter AR'}
      </button>
      <object3D ref={hitTestRef} />
      <group ref={groupRef} position={placement}>
        <mesh rotation-x={-Math.PI / 2} scale={[scale, scale, 1]}>
          <planeGeometry args={[1, artworkTexture.image.height / artworkTexture.image.width]} />
          <meshBasicMaterial map={artworkTexture} transparent />
        </mesh>
      </group>
    </>
  );
};

const ARViewer: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
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