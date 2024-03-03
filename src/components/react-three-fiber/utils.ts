import * as THREE from 'three'
import { shaderMaterial as dreiShaderMaterial } from '@react-three/drei'

type UniformType = {
  [name: string]:
    | THREE.CubeTexture
    | THREE.Texture
    | Int32Array
    | Float32Array
    | THREE.Matrix4
    | THREE.Matrix3
    | THREE.Quaternion
    | THREE.Vector4
    | THREE.Vector3
    | THREE.Vector2
    | THREE.Color
    | number
    | boolean
    | Array<any>
    | null
}

type ShaderMaterialType<T> = typeof THREE.ShaderMaterial & { key: string } & T

export function shaderMaterial<T extends UniformType>(
  uniforms: T,
  vertexShader: string,
  fragmentShader: string,
  onInit?: (material?: THREE.ShaderMaterial) => void
): ShaderMaterialType<T> {
  const material = dreiShaderMaterial(uniforms, vertexShader, fragmentShader, onInit)
  return material as ShaderMaterialType<T>
}
