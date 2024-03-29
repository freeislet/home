'use client'

import { load } from '@/components/loading'
import { ThreeJsIcon } from '@/components/icons'
import HtmlBox from '@/components/react-three-fiber/examples/html-box'

const ThreeCanvas = load(() => import('@/components/three-canvas'))

export default function ReactThreeFiberHtmlPage() {
  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <ThreeJsIcon />
        <span className="badge mr-1">React Three Fiber</span>
        HTML 예제
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
