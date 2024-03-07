import { useRef, useState, useEffect } from 'react'
// import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { HexColorPicker } from 'react-colorful'
import { proxy, useSnapshot } from 'valtio'
import { GLTF } from 'three-stdlib'

import { meshMaterialName } from '../utils'

type GLTFResult = GLTF & {
  nodes: {
    shoe: THREE.Mesh
    shoe_1: THREE.Mesh
    shoe_2: THREE.Mesh
    shoe_3: THREE.Mesh
    shoe_4: THREE.Mesh
    shoe_5: THREE.Mesh
    shoe_6: THREE.Mesh
    shoe_7: THREE.Mesh
  }
  materials: {
    laces: THREE.MeshStandardMaterial
    mesh: THREE.MeshStandardMaterial
    caps: THREE.MeshStandardMaterial
    inner: THREE.MeshStandardMaterial
    sole: THREE.MeshStandardMaterial
    stripes: THREE.MeshStandardMaterial
    band: THREE.MeshStandardMaterial
    patch: THREE.MeshStandardMaterial
  }
}

type MaterialName = keyof GLTFResult['materials'] | null

const state = proxy({
  current: null as MaterialName,
  items: {
    laces: '#a7f',
    mesh: '#fff',
    caps: '#ccf',
    inner: '#eef',
    sole: '#777',
    stripes: '#fa7',
    band: '#aaf',
    patch: '#77f',
  },
})

export default function Shoe() {
  const ref = useRef<THREE.Group>(null!)
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/3d/shoe/shoe-draco.glb') as GLTFResult
  const [hovered, setHovered] = useState<MaterialName>(null)

  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
  //   ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  // })

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
        <g filter="url(#filter0_d)">
          <path fill="${hovered ? snap.items[hovered] : '#000'}" d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z"/>
        </g>
        <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
        <text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em">
          <tspan x="35" y="63">${hovered}</tspan>
        </text>
      </g>
      <defs>
        <clipPath id="clip0">
        <path fill="#fff" d="M0 0h64v64H0z"/>
        </clipPath>
        <filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="3"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`

    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => {
        document.body.style.cursor = 'auto' //`url('data:image/svg+xml;base64,${btoa(auto)}'), auto`
      }
    }

    return () => (document.body.style.cursor = 'auto')
  }, [hovered])

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(meshMaterialName(e.object) as MaterialName)
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) setHovered(null)
      }}
      onPointerMissed={() => {
        state.current = null
      }}
      onClick={(e) => {
        e.stopPropagation()
        state.current = meshMaterialName(e.object) as MaterialName
      }}
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={snap.items.laces}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={snap.items.mesh}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={snap.items.caps}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={snap.items.inner}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={snap.items.sole}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={snap.items.stripes}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={snap.items.band}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={snap.items.patch}
      />
    </group>
  )
}

export function Picker() {
  const snap = useSnapshot(state)

  return (
    <div style={{ display: snap.current ? 'block' : 'none' }} className="absolute top-2 left-2">
      <HexColorPicker
        // className="absolute t-[74px] l-[70px] w-24 h-24"
        color={snap.current ? snap.items[snap.current] : '#000'}
        onChange={(color) => {
          if (snap.current) state.items[snap.current] = color
        }}
      />
      <h1 className="absolute top-[20px] left-[210px]">{snap.current}</h1>
    </div>
  )
}
