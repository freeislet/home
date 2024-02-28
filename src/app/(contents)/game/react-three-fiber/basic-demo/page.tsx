'use client'

import { load } from '@/components/loading'
import { ThreeJsIcon } from '@/components/icons'
import BasicBox from '@/components/react-three-fiber/basic-box-example'

const ThreeCanvas = load(import('@/components/three-canvas'))

export default function ReactThreeFiberBasicDemoPage() {
  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <ThreeJsIcon />
        <span className="badge mr-1">React Three Fiber</span>
        Basic demo
      </div>
      <ThreeCanvas orbitControls>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <BasicBox position={[-1.2, 0, 0]} />
        <BasicBox position={[1.2, 0, 0]} />
      </ThreeCanvas>
    </div>
  )
}
