import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2.5} />;
};

const ThreeDModel = ({ url }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',  // Full viewport height for vertical centering
    }}>
      <div style={{ height: '500px', width: '500px' }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Model url={url} />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDModel;
