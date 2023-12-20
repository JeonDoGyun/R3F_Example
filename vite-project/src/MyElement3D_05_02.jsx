import { useEffect, useRef } from "react";
import { Box, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const MyElement3D = () => {
  const meshRef = useRef();
  const wireMeshRef = useRef();

  const {
    topRadius,
    bottomRadius,
    height,
    radialSegments,
    heightSegments,
    bOpen,
    thetaStart,
    thetaLength,
  } = useControls({
    topRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    bottomRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    height: { value: 1, min: 0.1, max: 5, step: 0.01 },
    radialSegments: { value: 32, min: 3, max: 256, step: 1 },
    heightSegments: { value: 1, min: 1, max: 256, step: 1 },
    bOpen: { value: false },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
  });

  useEffect(() => {
    wireMeshRef.current.geometry = meshRef.current.geometry;
  }, [
    topRadius,
    bottomRadius,
    height,
    radialSegments,
    heightSegments,
    bOpen,
    thetaStart,
    thetaLength,
  ]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={meshRef}>
        <cylinderGeometry
          args={[
            topRadius,
            bottomRadius,
            height,
            radialSegments,
            heightSegments,
            bOpen,
            thetaStart,
            thetaLength,
          ]}
        />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>

      <mesh ref={wireMeshRef}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>

      <axesHelper scale={10} />
    </>
  );
};

export default MyElement3D;
