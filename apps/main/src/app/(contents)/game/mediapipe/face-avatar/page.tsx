'use client'

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  FilesetResolver,
  FaceLandmarker,
  type FaceLandmarkerOptions,
  type Classifications,
} from '@mediapipe/tasks-vision'
import Webcam from 'react-webcam'
import * as THREE from 'three'
import { type MeshProps } from '@react-three/fiber'
import { useAspect, useVideoTexture, useGLTF, Grid } from '@react-three/drei'

import { load } from '@/components/loading'
import { MediaPipeIcon } from '@/components/icons'
import { useVideoFrame } from '@/hooks/video'
import AvatarInstance from '@/components/mediapipe/avatar-instance'
import '@/style/canvas.css'

const ThreeCanvas = load(import('@/components/three-canvas'))

const videoWidth = 1280
const videoHeight = 720
const videoConstraints = {
  width: videoWidth,
  height: videoHeight,
  facingMode: 'user',
}

const camZ = 200
const matrixRetargetOption = { scale: 40, z: 200 }

export default function MediaPipeFaceAvatarPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker>()
  const { setVideoFrameSrc } = useVideoFrame(render, [faceLandmarker])
  const avatarRef = useRef<AvatarInstance>()

  async function setup() {
    if (!webcamRef.current.video) return

    const wasmFileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const faceLandmarkerOptions: FaceLandmarkerOptions = {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'GPU',
      },
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numFaces: 1,
    }
    const faceLandmarker = await FaceLandmarker.createFromOptions(wasmFileset, faceLandmarkerOptions)
    setFaceLandmarker(faceLandmarker)

    setVideoFrameSrc(webcamRef.current.video)
  }

  function render(time: number) {
    if (!faceLandmarker) return

    const video = webcamRef.current.video
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    const result = faceLandmarker.detectForVideo(video, time)

    const avatar = avatarRef.current
    if (avatar) {
      // Apply transformation
      const transformationMatrices = result.facialTransformationMatrixes
      if (transformationMatrices && transformationMatrices.length > 0) {
        let matrix = new THREE.Matrix4().fromArray(transformationMatrices[0].data)
        // Example of applying matrix directly to the avatar
        avatar.applyMatrix(matrix, matrixRetargetOption)
      }

      // Apply Blendshapes
      const blendshapes = result.faceBlendshapes
      if (blendshapes && blendshapes.length > 0) {
        const coefsMap = retarget(blendshapes)
        avatar.updateBlendshapes(coefsMap)
      }
    }
  }

  function retarget(blendshapes: Classifications[]) {
    const categories = blendshapes[0].categories
    const coefsMap = new Map<string, number>()

    for (let i = 0; i < categories.length; ++i) {
      const blendshape = categories[i]

      // Adjust certain blendshape values to be less prominent.
      switch (blendshape.categoryName) {
        case 'browOuterUpLeft':
        case 'browOuterUpRight':
          blendshape.score *= 1.2
          break

        case 'eyeBlinkLeft':
        case 'eyeBlinkRight':
          blendshape.score *= 1.2
          break

        // case 'eyeLookDownLeft':
        // case 'eyeLookDownRight':
        // case 'eyeLookInLeft':
        // case 'eyeLookInRight':
        // case 'eyeLookOutLeft':
        // case 'eyeLookOutRight':
        // case 'eyeLookUpLeft':
        // case 'eyeLookUpRight':
        //   blendshape.score *= 2
        //   break

        default:
      }
      coefsMap.set(categories[i].categoryName, categories[i].score)
    }

    return coefsMap
  }

  useEffect(() => {
    setup()
  }, [])

  return (
    <div className="my-grid-main grid-rows-[auto_auto_1fr]">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        Face Avatar 예제
      </div>
      <Webcam
        ref={webcamRef}
        className="hidden- size-0"
        videoConstraints={videoConstraints}
        mirrored
        onUserMedia={() => setStream(webcamRef.current.stream!)}
      />
      <div className="grid grid-cols-[1fr_auto]">
        <ThreeCanvas
          camera={{ fov: 60, position: [0, 0, camZ] }}
          className="inset-0 flip-canvas"
          // orbitControls
        >
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight intensity={Math.PI / 2} />
          {stream && <VideoPlane width={videoWidth} height={videoHeight} src={stream} />}
          {/* <Grid args={[100, 100]} /> */}
          <Avatar ref={avatarRef} />
        </ThreeCanvas>
        <div></div>
      </div>
    </div>
  )
}

interface VideoPlaneProps {
  width: number
  height: number
  src: string | MediaStream
}

function VideoPlane({ width, height, src }: VideoPlaneProps) {
  const size = useAspect(width, height)
  const texture = useVideoTexture(src)

  // video 좌우 반전
  // size[0] *= -1 // -> css로 canvas flip

  return (
    <mesh scale={size}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

const Avatar = forwardRef((props: MeshProps, ref) => {
  const gltf = useGLTF('/ar/meshes/raccoon_head.glb')
  const [instance, setInstance] = useState<AvatarInstance>()

  useEffect(() => {
    if (gltf) {
      const instance = new AvatarInstance()
      instance.setModel(gltf)
      setInstance(instance)
    }
  }, [gltf])

  useImperativeHandle(ref, () => instance, [instance])

  return (
    <mesh {...props}>
      <primitive object={gltf.scene} />
    </mesh>
  )
})
Avatar.displayName = 'Avatar'
