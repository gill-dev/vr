'use client'
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Type imports
import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { ARButton as ARButtonType } from 'three/examples/jsm/webxr/ARButton';

interface Item {
  name: string;
  height: number;
  model: THREE.Group;
}

const ARFurniturePlacement: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const itemsRef = useRef<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<THREE.Group | null>(null);
  const [showItemButtons, setShowItemButtons] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initialize = async () => {
      if (typeof window === 'undefined') return;

      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
      const { ARButton } = await import('three/examples/jsm/webxr/ARButton');

      const normalizeModel = (obj: THREE.Object3D, height: number): void => {
        const bbox = new THREE.Box3().setFromObject(obj);
        const size = bbox.getSize(new THREE.Vector3());
        obj.scale.multiplyScalar(height / size.y);

        const bbox2 = new THREE.Box3().setFromObject(obj);
        const center = bbox2.getCenter(new THREE.Vector3());
        obj.position.set(-center.x, -center.y, -center.z);
      };

      const setOpacity = (obj: THREE.Object3D, opacity: number): void => {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              child.material.transparent = true;
              child.material.opacity = opacity;
            }
          }
        });
      };

      const deepClone = (obj: THREE.Object3D): THREE.Object3D => {
        const clone = obj.clone(true);
        clone.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            if (o.material) {
              o.material = o.material.clone();
            }
          }
        });
        return clone;
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      sceneRef.current = scene;
      cameraRef.current = camera;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      rendererRef.current = renderer;

      const arButton = ARButton.createButton(renderer, {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
      });
      document.body.appendChild(renderer.domElement);
      document.body.appendChild(arButton);

      const itemConfigs = [
        { name: 'coffee-table', height: 0.5 },
        { name: 'chair', height: 0.7 },
        { name: 'cushion', height: 0.05 }
      ];

      const loader = new GLTFLoader();
      for (const config of itemConfigs) {
        const gltf = await loader.loadAsync(`/models/artwork_173307_1_full.gltf`);
        normalizeModel(gltf.scene, config.height);
        const item = new THREE.Group();
        item.add(gltf.scene);
        item.visible = false;
        setOpacity(item, 0.5);
        itemsRef.current.push({ ...config, model: item });
        scene.add(item);
      }

      // AR session setup
      renderer.xr.addEventListener('sessionstart', async () => {
        const session = renderer.xr.getSession();
        if (session) {
          const viewerReferenceSpace = await session.requestReferenceSpace('viewer');
          const hitTestSource = await session.requestHitTestSource?.({ space: viewerReferenceSpace });

          renderer.setAnimationLoop((timestamp: number, frame: any) => {
            if (!frame) return;
          
            const hitTestResults = hitTestSource ? frame.getHitTestResults(hitTestSource) : [];
            if (hitTestResults.length > 0 && selectedItem) {
              const hit = hitTestResults[0];
              const referenceSpace = renderer.xr.getReferenceSpace();
              if (referenceSpace) {
                const hitPose = hit.getPose(referenceSpace);
                if (hitPose) {
                  selectedItem.visible = true;
                  selectedItem.position.setFromMatrixPosition(new THREE.Matrix4().fromArray(hitPose.transform.matrix));
                }
              }
            }
          
            renderer.render(scene, camera);
          });
        }
      });

      cleanup = () => {
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    };

    initialize();

    return () => {
      if (cleanup) cleanup();
    };
  }, [selectedItem]);

  const handleSelect = (index: number) => {
    itemsRef.current.forEach((item, i) => {
      item.model.visible = i === index;
    });
    setSelectedItem(itemsRef.current[index].model);
    setShowItemButtons(false);
  };

  const handleCancel = () => {
    setShowItemButtons(true);
    if (selectedItem) {
      selectedItem.visible = false;
    }
    setSelectedItem(null);
  };

  const handlePlace = () => {
    if (selectedItem && sceneRef.current) {
      const spawnItem = selectedItem.clone(true);
      spawnItem.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material = child.material.clone();
          child.material.transparent = true;
          child.material.opacity = 1.0;
        }
      });
      sceneRef.current.add(spawnItem);
      handleCancel();
    }
  };

  return (
    <div>
      {showItemButtons && (
        <div id="item-buttons">
          {itemsRef.current.map((item, index) => (
            <button key={index} onClick={() => handleSelect(index)}>
              {item.name}
            </button>
          ))}
        </div>
      )}
      {!showItemButtons && (
        <div id="confirm-buttons">
          <button onClick={handlePlace}>Place</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ARFurniturePlacement;