import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import * as THREE from 'three'

const photos = Array.from({ length: 12 }, (_, i) => `/images/img${i + 1}.jpeg`)
function Photo({ url, position, rotY, index }) {
  const ref = useRef()
  const baseY = position[1]

  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.y =
        baseY + Math.sin(clock.elapsedTime * 0.5 + index * 0.68) * 0.12
  })

  return (
    <Image
      ref={ref}
      url={url}
      scale={[2.5, 4]}   // 👈 taller (IMPORTANT FIX)
      zoom={0.85}        // 👈 shows full image
      position={[position[0], baseY, position[2]]}
      rotation={[0, rotY, 0]}
      transparent
    />
  )
}

function Stars() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(280 * 3)
    for (let i = 0; i < 280 * 3; i += 3) {
      pos[i]   = (Math.random() - 0.5) * 65
      pos[i+1] = (Math.random() - 0.5) * 32
      pos[i+2] = (Math.random() - 0.5) * 45 - 6
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.055} color="#ffffff" transparent opacity={0.42} />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime
    camera.position.x = Math.sin(t * 0.13) * 2.6
    camera.position.y = 1.5 + Math.sin(t * 0.09) * 0.38
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function FloatingGallery() {
  const total = photos.length

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000008', position: 'relative' }}>
      <div className="gallery-title">Our Memories 💕</div>

      <Canvas camera={{ position: [0, 1.5, 9], fov: 70 }}>
        <color attach="background" args={['#000008']} />
        <ambientLight intensity={0.55} />
        <pointLight position={[0,  7, 4]} intensity={2.2} color="#ff9ff3" />
        <pointLight position={[-7,-2, 3]} intensity={0.9} color="#a29bfe" />
        <fog attach="fog" args={['#000008', 14, 38]} />

        <Stars />
        <CameraRig />

        {photos.map((url, i) => {
          const angle  = ((i / (total - 1)) - 0.5) * Math.PI * 1.18
          const radius = 12
          const x = Math.sin(angle) * radius
          const z = -Math.cos(angle) * radius + 3
          return (
            <Photo key={i} url={url} position={[x, 0, z]} rotY={-angle} index={i} />
          )
        })}
      </Canvas>
    </div>
  )
}