/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

const ComputersCanvas = (props) => {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const computerModelRef = useRef();

  useFrame(() => {
    if (computerModelRef.current) {
      computerModelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group {...props} ref={computerModelRef} >
      <group rotation={[-Math.PI / 2, -0.4, 0]}>
        <mesh
          geometry={nodes.ibm_3178_0.geometry}
          material={materials.ibm_3178}
        />
        <mesh
          geometry={nodes.ibm_3178_1.geometry}
          material={materials.ibm_3178_keyboard}
        />
        <mesh
          geometry={nodes.ibm_3178_2.geometry}
          material={materials.display}
        />
      </group>
    </group>
  );
};



export default ComputersCanvas;
