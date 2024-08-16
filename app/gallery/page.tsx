import React from 'react';
import dynamic from 'next/dynamic';

const ARViewer = dynamic(() => import('../../components/ARViewer'), { ssr: false });

const ARGalleryPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <h1 style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, color: 'white' }}>AR Art Gallery</h1>
      <ARViewer imageUrl="/images/image.png" />
    </div>
  );
};

export default ARGalleryPage;