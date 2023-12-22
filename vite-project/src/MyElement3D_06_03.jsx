/* eslint-disable react/no-unknown-property */
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// 함수를 jsx에서 사용하기 위한 방식

const MyElement3D = () => {
  const textures = useTexture({
    map: "./images/glass/Glass_Window_002_basecolor.jpg",
    roughnessMap: "./images/glass/Glass_Window_002_roughness.jpg",
    metalnessMap: "./images/glass/Glass_Window_002_metallic.jpg",
    normalMap: "./images/glass/Glass_Window_002_normal.jpg",
    displacementMap: "./images/glass/Glass_Window_002_height.png",
    aoMap: "./images/glass/Glass_Window_002_ambientOcclusion.jpg",
    alphaMap: "./images/glass/Glass_Window_002_opacity.jpg",
  });

  const meshRef = useRef();

  // uv2 속성 설정
  useEffect(() => {
    // 수평방향에 대한 반복수를 예시 이미지와 맞춤
    textures.map.repeat.x =
      textures.displacementMap.repeat.x =
      textures.aoMap.repeat.x =
      textures.roughnessMap.repeat.x =
      textures.metalnessMap.repeat.x =
      textures.normalMap.repeat.x =
      textures.alphaMap.repeat.x =
        4;

    // 수평방향에 대해 반복이 다시 시작되는 시점에서 어떻게 할 것인지 설정
    // 수직방향 설정 : wrapT
    textures.map.wrapS =
      textures.displacementMap.wrapS =
      textures.aoMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.metalnessMap.wrapS =
      textures.normalMap.wrapS =
      textures.alphaMap.wrapS =
        THREE.MirroredRepeatWrapping;

    // 텍스처 설정에 대한 적용을 위해 업데이트 하기
    textures.map.needsUpdate =
      textures.displacementMap.needsUpdate =
      textures.aoMap.needsUpdate =
      textures.roughnessMap.needsUpdate =
      textures.metalnessMap.needsUpdate =
      textures.normalMap.needsUpdate =
      textures.alphaMap.needsUpdate =
        true;

    meshRef.current.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(meshRef.current.geometry.attributes.uv.array, 2)
    );
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, -8]} intensity={0.4} />
      <directionalLight position={[1, 2, 8]} intensity={0.4} />

      <mesh ref={meshRef}>
        <cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={textures.map}
          // roughness 적용하기 위해 colorSpace 사용
          roughnessMap={textures.roughnessMap}
          roughnessMap-colorSpace={THREE.NoColorSpace}
          // 기본값이 0이기 때문에 값을 지정해줘야 함
          metalnessMap={textures.metalnessMap}
          metalness={0.5}
          metalnessMap-colorSpace={THREE.NoColorSpace}
          // normal : 법선벡터를 이용한 눈속임 입체감 조절
          normalMap={textures.normalMap}
          normalMap-colorSpace={THREE.NoColorSpace}
          // normal 효과 조절 - 입체감 조절(눈속임)
          normalScale={1}
          // 실제 입체감을 조절
          displacementMap={textures.displacementMap}
          displacementMap-colorSpace={THREE.NoColorSpace}
          // displacement로 인해 커진 크기를 조절(scale의 값을 지정하고, 그만큼 빼준다는 느낌)
          displacementScale={0.2}
          displacementBias={-0.2}
          // shading effect를 추가
          // 조건 : 광원으로 ambient light 설정, geometry의 uv2 속성 값 필요
          aoMap={textures.aoMap}
          // 투명도 조절
          alphaMap={textures.alphaMap}
          transparent
          alphaToCoverage
        />
      </mesh>
    </>
  );
};

export default MyElement3D;
