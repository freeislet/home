import { Canvas, type CanvasProps } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export interface ThreeCanvasProps extends CanvasProps {
  orbitControls?: boolean
}

export default function ThreeCanvas({ orbitControls, children, ...props }: ThreeCanvasProps) {
  return (
    <Canvas {...props}>
      {children}
      {orbitControls && <OrbitControls makeDefault />}
    </Canvas>
  )
}
