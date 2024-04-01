'use client'

import ThreeCanvas from '@/components/three-canvas'
import BasicBox from '@/components/react-three-fiber/examples/basic-box'
import Shiba from '@/components/react-three-fiber/examples/shiba'

export default function BasicDemo() {
  return (
    <ThreeCanvas orbitControls>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <BasicBox position={[-2, 0, 0]} />
      <BasicBox position={[2, 0, 0]} />
      <Shiba position={[0, 0.5, 0]} />
    </ThreeCanvas>
  )
}
