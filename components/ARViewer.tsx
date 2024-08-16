'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ARViewerProps {
  imageUrl: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the image and create a plane with the correct aspect ratio
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (texture) => {
      const aspect = texture.image.width / texture.image.height;
      const geometry = new THREE.PlaneGeometry(1, 1 / aspect);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const imagePlane = new THREE.Mesh(geometry, material);
      scene.add(imagePlane);

      // Position the plane in front of the camera
      imagePlane.position.z = -2;
      camera.position.z = 0;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // WebXR setup
    renderer.xr.enabled = true;
    
    const arButton = document.createElement('button');
    arButton.textContent = 'Start AR';
    arButton.style.position = 'absolute';
    arButton.style.bottom = '20px';
    arButton.style.left = '50%';
    arButton.style.transform = 'translateX(-50%)';
    arButton.style.padding = '12px 24px';
    arButton.style.backgroundColor = '#4CAF50';
    arButton.style.color = 'white';
    arButton.style.border = 'none';
    arButton.style.borderRadius = '4px';
    arButton.style.cursor = 'pointer';

    arButton.onclick = async () => {
      if (navigator.xr) {
        try {
          const session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test']
          });
          renderer.xr.setSession(session);
          renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
          });
          arButton.style.display = 'none';
        } catch (error) {
          console.error('Error starting AR session:', error);
          arButton.textContent = 'AR not available';
          arButton.disabled = true;
        }
      } else {
        console.warn('WebXR not supported');
        arButton.textContent = 'AR not supported';
        arButton.disabled = true;
      }
    };
    document.body.appendChild(arButton);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      document.body.removeChild(arButton);
      renderer.setAnimationLoop(null);
    };
  }, [imageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ARViewer;