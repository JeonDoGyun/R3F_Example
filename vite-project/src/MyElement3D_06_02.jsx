import {
  MeshDiscardMaterial,
  OrbitControls,
  shaderMaterial,
} from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const SimpleMaterial = new shaderMaterial(
  {
    uColor: new THREE.Color(1, 0, 0),
  },
  `shader code(position)`,
  `shader code(fragment)`
);

// 함수를 jsx에서 사용하기 위한 방식
extend({ SimpleMaterial });

const MyElement3D = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <simpleMaterial uColor="green" />
      </mesh>
    </>
  );
};

export default MyElement3D;
