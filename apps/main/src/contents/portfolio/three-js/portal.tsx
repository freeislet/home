'use client'

import { Sparkles } from '@react-three/drei'

import ThreeCanvas from '@/components/three-canvas'
import Portal from '@/components/react-three-fiber/examples/portal'

export default function PortalShader() {
  const scale = Float32Array.from({ length: 50 }, () => 0.5 + Math.random() * 4)

  return (
    <ThreeCanvas camera={{ fov: 45, position: [-4, 2, -4] }} orbitControls className="bg-[#1d2142]">
      <Sparkles count={scale.length} size={scale} position={[0, 0.9, 0]} scale={[4, 1.5, 4]} speed={0.3} />
      <Portal />
    </ThreeCanvas>
  )
}
