
import { MapControls, useProgress , Html} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import TheBlob from '../models/TheBlob'
import VaporWaveTrack from '../models/VaporWaveTrack'
import { EffectComposer, ChromaticAberration, Bloom, GodRays } from '@react-three/postprocessing'
import Car from '../models/Car'
import { Suspense } from 'react'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

export default function Home() {

  return (
    <div>
      <Head>
        <title>Haile Lakew | Altar Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Canvas
          style={{ width: '100vw', height: '100vh' }}
        >
            <Suspense fallback={<Loader />}>
              <MapControls/>
              <VaporWaveTrack/>
              <TheBlob/>
              <Car/>
              <EffectComposer>
                  <Bloom
                      luminanceThreshold={0.7}
                      luminanceSmoothing={0.9} 
                      radius={0.88}
                      intensity={5}
                      height={300} 
                  />
                  <ChromaticAberration offset={[0.0002, 0.002]}/>
              </EffectComposer>
            </Suspense>
        </Canvas>
        </main>

      <footer ></footer>
    </div>
  )
}
