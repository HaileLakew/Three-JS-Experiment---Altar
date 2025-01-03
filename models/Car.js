

import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

import {useKeyState} from 'use-key-state'

export default function Car() {
    let ref = useRef();
    const query = useKeyState().keyStateQuery
    const Car = useGLTF('/models/car/scene.gltf')

    useFrame(({clock})=>{
        ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 3) * 0.1 + Math.PI

        if (query.pressed('a') && ref.current.position.x > -.1) {
          ref.current.position.x -= 0.003
        }

        if (query.pressed('d') && ref.current.position.x < .1) {
            ref.current.position.x += 0.003
        }

        if (query.pressed('w') && ref.current.position.z > .5) {
            ref.current.position.z -= 0.003
        }

        if (query.pressed('s')  && ref.current.position.z < .7) {
            ref.current.position.z += 0.003
        }
    })

    return (
        <>
            <primitive 
                ref={ref}
                object={Car.scene} 
                scale={.02}
                position={[0, 0, .6]}
                wireframe
                />
        </>
    )
}

useGLTF.preload('/models/car/scene.gltf')