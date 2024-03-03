'use client'

import { load } from '@/components/loading'
import { ThreeJsIcon } from '@/components/icons'
import { Sparkles } from '@react-three/drei'
import Portal from '@/components/react-three-fiber/examples/portal'

const ThreeCanvas = load(import('@/components/three-canvas'))

export default function ReactThreeFiberPortalPage() {
  const scale = Float32Array.from({ length: 50 }, () => 0.5 + Math.random() * 4)

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <ThreeJsIcon />
        <span className="badge mr-1">React Three Fiber</span>
        Portal shader 예제
      </div>
      <ThreeCanvas camera={{ fov: 45, position: [-4, 2, -4] }} orbitControls className="bg-[#1d2142]">
        <Sparkles count={scale.length} size={scale} position={[0, 0.9, 0]} scale={[4, 1.5, 4]} speed={0.3} />
        <Portal />
      </ThreeCanvas>
    </div>
  )
}
