'use client'

import dynamic from 'next/dynamic'

import { CubeIcon } from '@/components/icons'
import Loading from '@/app/(contents)/_components/loading'
import BasicBox from '@/components/react-three-fiber/basic-box-example'

const ThreeCanvas = dynamic(() => import('@/components/three-canvas'), { ssr: false, loading: () => <Loading /> })

export default function ReactThreeFiberBasicDemoPage() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="my-flex-row m-2">
        <CubeIcon className="mr-1" />
        <span className="ring-1 rounded-sm px-1 text-sm text-muted-foreground mr-2">React Three Fiber</span>
        Basic Demo
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
