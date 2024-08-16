import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ARViewer = dynamic(() => import('../../components/ARViewer'), { 
  ssr: false,
  loading: () => <div>Loading AR Viewer...</div>
});

const ARGalleryPage: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ARViewer />
    </div>
  );
};

export default ARGalleryPage;