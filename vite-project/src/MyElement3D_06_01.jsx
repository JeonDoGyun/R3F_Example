import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MyElement3D = () => {
  const mesh1Ref = useRef();
  const mesh2Ref = useRef();

  const texture = useTexture("./images/matTone.jpg");
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  useEffect(() => {
    mesh2Ref.current.material = mesh1Ref.current.material;
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh ref={mesh1Ref} position={[0.7, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
        <meshToonMaterial gradientMap={texture} color="cyan" />
      </mesh>

      <mesh ref={mesh2Ref} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default MyElement3D;
