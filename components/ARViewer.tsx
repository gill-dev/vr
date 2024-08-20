import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface ModelViewerProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  'ios-src'?: string;
  poster?: string;
  ar?: boolean;
  'ar-scale'?: 'fixed' | 'auto';
  'camera-controls'?: boolean;
  'touch-action'?: string;
  alt?: string;
  'shadow-intensity'?: string | number;
  'skybox-height'?: string;
  'max-camera-orbit'?: string;
  'xr-environment'?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const ModelViewer = React.forwardRef<HTMLElement, ModelViewerProps>((props, ref) => {
  return <model-viewer {...props} ref={ref as React.RefObject<any>} />;
});

ModelViewer.displayName = 'ModelViewer';

interface Item {
  name: string;
  src: string;
  iosSrc: string;
}

const ARFurniturePlacement: React.FC = () => {
  const [items] = useState<Item[]>([
    { 
      name: 'Painting', 
      src: '/models/artwork_173307_1_full.gltf', 
      iosSrc: '/models/artwork_173307_1_fullusdz' 
    }
  ]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (selectedItem && modelViewerRef.current) {
      (modelViewerRef.current as any).src = selectedItem.src;
      (modelViewerRef.current as any).iosSrc = selectedItem.iosSrc;
    }
  }, [selectedItem]);

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Script 
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" 
        type="module"
      />
      <div>
        <div id="item-buttons">
          {items.map((item, index) => (
            <button key={index} onClick={() => handleSelect(item)}>
              {item.name}
            </button>
          ))}
        </div>
        {selectedItem && (
          <ModelViewer
            ref={modelViewerRef}
            src={selectedItem.src}
            ios-src={selectedItem.iosSrc}
            ar
            ar-scale="fixed"
            camera-controls
            touch-action="pan-y"
            alt={`A 3D model of ${selectedItem.name}`}
            shadow-intensity="2"
            skybox-height="2m"
            max-camera-orbit="auto 90deg auto"
            xr-environment
          >
            <button slot="ar-button" style={{backgroundColor: 'white', borderRadius: '4px', border: 'none', position: 'absolute', top: '16px', right: '16px', height: '40px', width: '40px'}}>
              👋 Activate AR
            </button>
          </ModelViewer>
        )}
      </div>
    </>
  );
};

export default ARFurniturePlacement;