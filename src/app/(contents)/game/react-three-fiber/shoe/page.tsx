'use client'

import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'

import { load } from '@/components/loading'
import { ThreeJsIcon } from '@/components/icons'
import Shoe, { Picker } from '@/components/react-three-fiber/examples/shoe'

const ThreeCanvas = load(import('@/components/three-canvas'))

export default function ReactThreeFiberBasicDemoPage() {
  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <ThreeJsIcon />
        <span className="badge mr-1">React Three Fiber</span>
        Shoe configurator
      </div>
      <div className="relative">
        <ThreeCanvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Shoe />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={true} />
        </ThreeCanvas>
        <Picker />
      </div>
    </div>
  )
}
