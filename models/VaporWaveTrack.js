import {Sky, useTexture } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react"

export default function VaporWaveTrack() {
    let { camera  } = useThree();


    camera.position.set(0, 0.06, .8);
    camera.fov = 75;
    camera.near = 0.001;
    camera.far = 10000;



    return(
        <>
            <Sky elevation={0} mieCoefficient={0.2} sunPosition={[-1, -1, 1]}/>
            <Track position={[0, 0, .15]} displament={0}/>
            <Track position={[0, 0, -2]} displament={1}/>
            <Track position={[0, 0, -3]} displament={2}/>
        </>
    )
}

function Track(props) {
    let mesh = useRef({});

    useFrame(({clock}) => {
        mesh.current.position.z = (clock.elapsedTime * 0.15) % 2 - props.displament;
    });

    return (
        <>
            <pointLight args={["cyan", 20, 25, Math.PI * 0.1, 0.25]} position={[0.5, 0.75, 2.2]} target={mesh.current}/>
            <pointLight args={["cyan", 20, 25, Math.PI * 0.1, 0.25]} position={[-0.5, 0.75, 2.2]} target={mesh.current}/>
            <mesh 
                ref={mesh}
                rotation={[-Math.PI * 0.5, 0, 0]}
                {...props}
            >
                <planeGeometry args={[1, 2, 24, 24]}/>
                <meshStandardMaterial
                    color={'cyan'}
                    {...useTexture({
                        map: "./textures/vaporwave/grid.png",
                        displacementMap: "./textures/vaporwave/displacement.png",
                        metalnessMap: "./textures/vaporwave/metalness.png"
                    })}
                    displacementScale={0.4}
                    metalness= {0.96}
                    roughness={0.15}
                />
            </mesh>
        </>

    )
}