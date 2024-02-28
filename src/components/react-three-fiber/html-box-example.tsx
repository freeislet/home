import { useState } from 'react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Slider } from 'antd'

export default function HtmlBox() {
  const [size, set] = useState(0.5)
  const controls = useThree((state) => state.controls) as OrbitControls

  return (
    <mesh scale={size * 2}>
      <boxGeometry />
      <meshStandardMaterial />
      <Html occlude distanceFactor={1.5} position={[0, 0, 0.51]} transform>
        <span>Size</span>
        <Slider
          style={{ width: 100 }}
          min={0.5}
          max={1}
          step={0.01}
          value={size}
          onChange={(value) => ((controls.enabled = false), set(value))}
          onChangeComplete={() => (controls.enabled = true)}
        />
      </Html>
    </mesh>
  )
}
