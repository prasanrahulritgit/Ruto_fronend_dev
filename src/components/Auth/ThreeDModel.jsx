import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2.5} />;
};

const ThreeDModel = ({ url }) => {
  return (
    <div style={{ height: '390px', width: '500px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        {/* 🔁 Added autoRotate */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
