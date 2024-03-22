import {
  FilesetResolver,
  FaceLandmarker,
  type FaceLandmarkerOptions,
  type FaceLandmarkerResult,
  type ImageSource,
} from '@mediapipe/tasks-vision'

import { TrackerBase } from './base'

export type CompleteHandler = (faceTracker: FaceTracker) => void

export class FaceTracker extends TrackerBase<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult> {
  constructor() {
    super()
  }

  getDefaultLandmarkerOptions(): FaceLandmarkerOptions {
    return {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'GPU',
      },
      // outputFaceBlendshapes: true,
      // outputFacialTransformationMatrixes: true,
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numFaces: 1,
    }
  }

  async createLandmarker(options: FaceLandmarkerOptions): Promise<FaceLandmarker> {
    const wasmFileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const faceLandmarker = await FaceLandmarker.createFromOptions(wasmFileset, options)
    return faceLandmarker
  }

  detectForVideo(video: ImageSource, timestamp: number): FaceLandmarkerResult | undefined {
    if (!this.landmarker) return

    const result = this.landmarker.detectForVideo(video, timestamp)
    return result
  }
}
