import {
  FilesetResolver,
  HandLandmarker,
  type HandLandmarkerOptions,
  type HandLandmarkerResult,
  type ImageSource,
} from '@mediapipe/tasks-vision'

import { TrackerBase } from './base'

export type CompleteHandler = (handTracker: HandTracker) => void

export class HandTracker extends TrackerBase<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult> {
  constructor() {
    super()
  }

  getDefaultLandmarkerOptions(): HandLandmarkerOptions {
    return {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numHands: 2,
    }
  }

  async createLandmarker(options: HandLandmarkerOptions): Promise<HandLandmarker> {
    const wasmFileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const handLandmarker = await HandLandmarker.createFromOptions(wasmFileset, options)
    return handLandmarker
  }

  detectForVideo(video: ImageSource, timestamp: number): HandLandmarkerResult | undefined {
    if (!this.landmarker) return

    const result = this.landmarker.detectForVideo(video, timestamp)
    return result
  }
}
