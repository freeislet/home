// https://codepen.io/mediapipe-preview/pen/oNPKmEy?editors=1010 참고

import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

interface MatrixRetargetOptions {
  decompose?: boolean
  scale?: number
  z?: number
}

class AvatarInstance {
  gltf?: GLTF
  root?: THREE.Bone
  morphTargetMeshes: THREE.Mesh[] = []

  constructor() {}

  setModel(gltf: GLTF) {
    this.gltf = gltf
    this.root = undefined
    this.morphTargetMeshes = []

    gltf.scene.traverse((object) => {
      if ((object as THREE.Bone).isBone) {
        //* Bone
        const bone = object as THREE.Bone

        // Register first bone found as the root
        if (!this.root) {
          this.root = bone
          console.log(bone)
        }
      } else if ((object as THREE.Mesh).isMesh) {
        //* Mesh
        const mesh = object as THREE.Mesh

        // Reduce clipping when model is close to camera.
        mesh.frustumCulled = false

        // Register morph targets
        if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
          this.morphTargetMeshes.push(mesh)
        }
      }
    })
  }

  updateBlendshapes(blendshapes: Map<string, number>) {
    for (const mesh of this.morphTargetMeshes) {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
        // console.warn(`Mesh ${mesh.name} does not have morphable targets`);
        continue
      }
      for (const [name, value] of blendshapes) {
        if (!Object.keys(mesh.morphTargetDictionary).includes(name)) {
          // console.warn(`Model morphable target ${name} not found`);
          continue
        }

        const idx = mesh.morphTargetDictionary[name]
        mesh.morphTargetInfluences[idx] = value
      }
    }
  }

  /**
   * Apply a position, rotation, scale matrix to current GLTF.scene
   * @param matrix
   * @param matrixRetargetOptions
   * @returns
   */
  applyMatrix(matrix: THREE.Matrix4, matrixRetargetOptions?: MatrixRetargetOptions) {
    if (!this.gltf) return

    const { decompose = false, scale = 1, z = 0 } = matrixRetargetOptions || {}
    matrix.scale(new THREE.Vector3(-scale, scale, scale))
    matrix.elements[14] += z

    // Three.js will update the object matrix when it render the page
    // according the object position, scale, rotation.
    // To manually set the object matrix, you have to set autoupdate to false.
    this.gltf.scene.matrixAutoUpdate = false
    // Set new position and rotation from matrix
    this.gltf.scene.matrix.copy(matrix)
  }

  /**
   * Takes the root object in the avatar and offsets its position for retargetting.
   * @param offset
   * @param rotation
   */
  offsetRoot(offset: THREE.Vector3, rotation?: THREE.Vector3): void {
    if (this.root) {
      this.root.position.copy(offset)
      if (rotation) {
        let offsetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z))
        this.root.quaternion.copy(offsetQuat)
      }
    }
  }
}

export default AvatarInstance
