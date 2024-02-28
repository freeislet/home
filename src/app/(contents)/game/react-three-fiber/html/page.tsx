'use client'

import { load } from '@/components/loading'
import { ThreeJsIcon } from '@/components/icons'
import HtmlBox from '@/components/react-three-fiber/html-box-example'

const ThreeCanvas = load(import('@/components/three-canvas'))

export default function ReactThreeFiberHtmlPage() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="my-flex-row m-2">
        <ThreeJsIcon className="mr-1" />
        <span className="ring-1 rounded-sm px-1 text-sm text-muted-foreground mr-2">React Three Fiber</span>
        HTML 테스트
      </div>
      <ThreeCanvas camera={{ position: [2, 1, 5], fov: 25 }} orbitControls>
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[10, 10, 5]} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <HtmlBox />
      </ThreeCanvas>
    </div>
  )
}
