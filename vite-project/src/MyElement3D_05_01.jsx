import { useEffect, useRef } from "react";
import { Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const MyBox = (props) => {
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
};

const MyElement3D = () => {
  const meshRef = useRef();
  const wireMeshRef = useRef();

  const { xSize, ySize, zSize, xSegments, ySegments, zSegments } = useControls({
    xSize: { value: 1, min: 0.1, max: 5, step: 0.1 },
    ySize: { value: 1, min: 0.1, max: 5, step: 0.1 },
    zSize: { value: 1, min: 0.1, max: 5, step: 0.1 },
    // Segments : 정수값
    xSegments: { value: 1, min: 1, max: 10, step: 1 },
    ySegments: { value: 1, min: 1, max: 10, step: 1 },
    zSegments: { value: 1, min: 1, max: 10, step: 1 },
  });

  useEffect(() => {
    wireMeshRef.current.geometry = meshRef.current.geometry;
  }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={meshRef}>
        <boxGeometry
          args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]}
        />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>

      <mesh ref={wireMeshRef}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  );
};

export default MyElement3D;
