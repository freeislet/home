'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame, type MeshProps } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Shiba(props: MeshProps) {
  const mesh = useRef<Mesh>(null!)
  const gltf = useGLTF('/3d/shiba/scene.gltf')

  useFrame(() => {
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh} {...props}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
