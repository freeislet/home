import {
  FilesetResolver,
  FaceLandmarker,
  type FaceLandmarkerOptions,
  type FaceLandmarkerResult,
  type ImageSource,
} from '@mediapipe/tasks-vision'
import { merge } from 'lodash'

export type CompleteHandler = (faceTracker: FaceTracker) => void

export class FaceTracker {
  faceLandmarker?: FaceLandmarker

  constructor() {}

  async setup(optionOverrides?: FaceLandmarkerOptions, onComplete?: CompleteHandler) {
    const wasmFileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const options: FaceLandmarkerOptions = {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'GPU',
      },
      // outputFaceBlendshapes: true,
      // outputFacialTransformationMatrixes: true,
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numFaces: 1,
    }
    merge(options, optionOverrides)

    this.faceLandmarker = await FaceLandmarker.createFromOptions(wasmFileset, options)

    onComplete?.(this)
  }

  detectForVideo(video: ImageSource, timestamp: number): FaceLandmarkerResult | undefined {
    if (!this.faceLandmarker) return

    const result = this.faceLandmarker.detectForVideo(video, timestamp)
    return result
  }
}
