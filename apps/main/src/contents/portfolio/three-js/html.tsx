'use client'

import ThreeCanvas from '@/components/three-canvas'
import HtmlBox from '@/components/react-three-fiber/examples/html-box'

export default function Html() {
  return (
    <ThreeCanvas camera={{ position: [2, 1, 5], fov: 25 }} orbitControls>
      <ambientLight intensity={Math.PI / 2} />
      <pointLight position={[10, 10, 5]} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <HtmlBox />
    </ThreeCanvas>
  )
}
