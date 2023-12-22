/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import * as THREE from "three";

RectAreaLightUniformsLib.init();

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#9b59b6",
  roughness: 0.5,
  metalness: 0.9,
});

const MyElement3D = () => {
  const light = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot");
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

    // 카메라의 위치를 smallSpherePivot 위치로
    const target = new THREE.Vector3();
    smallSpherePivot.children[0].getWorldPosition(target);
    state.camera.position.copy(target);

    const ghostSpherePivot = state.scene.getObjectByName("ghostSpherePivot");
    ghostSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
    ghostSpherePivot.children[0].getWorldPosition(target);
    state.camera.lookAt(target);
  });

  return (
    <>
      <rectAreaLight
        ref={light}
        color="#fff"
        intensity={20}
        position={[0, 5, 0]}
        width={1}
        height={3}
        rotation-x={THREE.MathUtils.degToRad(-90)}
      />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color="#fff" roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(8).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name="smallSpherePivot">
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#e74c3c"
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>
      {/* smallSpherePivot의 다음 위치를 가져오기 위한 가상의 물체 생성 */}
      <group name="ghostSpherePivot">
        {/* smallSpherePivot의 위치와 동일하게 */}
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
};

export default MyElement3D;
