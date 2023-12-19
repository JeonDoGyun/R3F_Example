import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const MyElement3D = () => {
  const refMesh = useRef();

  useFrame((state, delta) => {
    refMesh.current.rotation.z += delta;
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      {/* 월드 좌표계 */}
      <axesHelper scale={10} />
      <OrbitControls />

      <mesh
        ref={refMesh}
        position-y={2}
        rotation-z={THREE.MathUtils.degToRad(45)}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" opacity={0} />

        {/* mesh의 로컬 좌표계 */}
        <axesHelper />
        <mesh scale={[0.1, 0.1, 0.1]} position-y={2}>
          <sphereGeometry />
          <meshStandardMaterial color="red" />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
};

export default MyElement3D;
