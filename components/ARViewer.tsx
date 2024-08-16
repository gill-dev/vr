'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { XR, useXR, useXREvent } from '@react-three/xr'
import { useState, useRef, useCallback } from 'react'
import { TextureLoader, Texture, Group } from 'three'
import { createXRStore } from '@react-three/xr'

interface ARImageProps {
  url: string;
}

function ARImage({ url }: ARImageProps) {
  const texture = useRef<Texture | null>(null)
  const [hovered, setHovered] = useState(false)
  const { isPresenting } = useXR()

  useFrame(() => {
    if (texture.current) {
      texture.current.needsUpdate = true
    }
  })

  const handleSelect = useCallback(() => console.log('Image selected'), [])
  useXREvent('select', handleSelect)

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial>
          <primitive attach="map" object={new TextureLoader().load(url)} ref={texture} />
        </meshBasicMaterial>
      </mesh>
    </group>
  )
}

function Scene() {
  const { camera } = useThree()
  
  useFrame(() => {
    // You can add any per-frame updates here
  })

  return (
    <>
      <ARImage url="/images/image.png" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

// Create an XR store (Place this outside of your component)
const xrStore = createXRStore()

export default function ARViewer() {
  const enterAR = useCallback(() => xrStore.enterAR(), [])

  return (
    <>
      <button onClick={enterAR}>Enter AR</button>
      <Canvas>
        <XR store={xrStore}>
          <Scene />
        </XR>
      </Canvas>
    </>
  )
}