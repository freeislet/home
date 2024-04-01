'use client'

import ThreeCanvas from '@/components/three-canvas'
import { Swarm, Postpro } from '@/components/react-three-fiber/examples/particles'

export default function Particles() {
  return (
    <ThreeCanvas
      linear
      flat
      legacy
      dpr={1}
      camera={{ fov: 100, position: [0, 0, 30] }}
      className="cursor-[url('/3d/particles/cursor.png')_39_39,_auto]"
    >
      <ambientLight intensity={0.01 * Math.PI} />
      <pointLight distance={60} intensity={4 * Math.PI} decay={0} color="lightblue" />
      <spotLight intensity={1.5 * Math.PI} decay={0} position={[0, 0, 2000]} penumbra={1} color="red" />
      <mesh>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#00ffff" roughness={0.5} depthTest={false} />
      </mesh>
      <Swarm count={20000} />
      <Postpro />
    </ThreeCanvas>
  )
}
