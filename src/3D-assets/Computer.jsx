/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect ,useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const ComputersCanvas = (props) => {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const computerModelRef = useRef();
  const [clientX, setClientX] = React.useState(0);
  const [clientY, setClientY] = React.useState(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const windowCenterX = window.innerWidth / 1;
    const windowCenterY = window.innerHeight / 2;

    // Calculate relative position to the center
    const relativeX = clientX - windowCenterX;
    const relativeY = clientY - windowCenterY;

    // Scale to the range of -1000 to +1000
    const scaledX = (relativeX / windowCenterX) * 1000;
    const scaledY = (relativeY / windowCenterY) * 1000;

    setClientX(scaledX);
    setClientY(scaledY);
  };
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Initial check on component mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Add event listener to window
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if(isSmallScreen){
      computerModelRef.current.rotation.y +=  0.01;
      computerModelRef.current.rotation.x = 0.1;
    }

    else if (computerModelRef.current) {
      computerModelRef.current.rotation.y =  clientX / 1000;
      computerModelRef.current.rotation.x = clientY / 1000;
    }
  });

  return (
    <group {...props} ref={computerModelRef}>
      <group rotation={[-Math.PI / 2 , -0.03, 0]}>
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
