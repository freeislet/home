import {
  FilesetResolver,
  PoseLandmarker,
  type PoseLandmarkerOptions,
  type PoseLandmarkerResult,
  type ImageSource,
} from '@mediapipe/tasks-vision'

import { TrackerBase } from './base'

export type CompleteHandler = (poseTracker: PoseTracker) => void

export class PoseTracker extends TrackerBase<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult> {
  constructor() {
    super()
  }

  getDefaultLandmarkerOptions(): PoseLandmarkerOptions {
    return {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numPoses: 2,
    }
  }

  async createLandmarker(options: PoseLandmarkerOptions): Promise<PoseLandmarker> {
    const wasmFileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const poseLandmarker = await PoseLandmarker.createFromOptions(wasmFileset, options)
    return poseLandmarker
  }

  detectForVideo(video: ImageSource, timestamp: number): PoseLandmarkerResult | undefined {
    if (!this.landmarker) return

    const result = this.landmarker.detectForVideo(video, timestamp)
    return result
  }
}
