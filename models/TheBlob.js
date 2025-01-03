
import { useFrame, extend } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import {  useRef } from 'react'
import { LayerMaterial } from "lamina";

import BlobShader from './BlobShaderMaterial/BlobShader';
import { Cloud, Stars } from '@react-three/drei';

extend({ BlobShader })

export default function TheBlob() {
  
    const mesh = useRef();
    const blobLight = useRef();
    const hover = useRef(false);

    let lookAtPos = new Vector3()
    useFrame(({clock, camera}) => {
      mesh.current.time = 0.4 * clock.getElapsedTime();
  
      mesh.current.intensity = MathUtils.lerp(
        mesh.current.intensity,
        hover.current ? 1 : 0.1,
        0.02
      );

      blobLight.current.intensity =  MathUtils.lerp(
        blobLight.current.intensity,
        hover.current ? 1500 : 100,
        0.05
      );

      camera.fov = MathUtils.lerp(camera.fov, hover.current ? 65 : 75, 0.5)

    
      lookAtPos.x = Math.sin(clock.getElapsedTime() *  2) * 0.025


      camera.lookAt(lookAtPos)
      camera.updateProjectionMatrix()
    });
  
    return (
      <>

        <pointLight 
          ref={blobLight}
          args={["cyan", 20, 25, Math.PI * 0.1, 0.25]} 
          position={[0.5, 0.75, 2.2]} 
          target={mesh.current}
          intensity={100}
          />
        <mesh
          position={[0, 0.15, .25]}
          scale={0.05}
          onPointerOver={() => (hover.current = true)}
          onPointerOut={() => (hover.current = false)}
        >
          <icosahedronGeometry args={[2, 20]}/>
          <LayerMaterial>
              <blobShader
                ref={mesh}
                intensity={0.2}
                time={0.0}
              />
          </LayerMaterial>
        </mesh>
        <Cloud opacity={0.15} width={30}/>
        <Stars/>
      </>

    );
}