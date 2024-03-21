import { useRef, useState, useEffect, useCallback } from 'react'
import {
  FilesetResolver,
  FaceLandmarker,
  type FaceLandmarkerOptions,
  type FaceLandmarkerResult,
  DrawingUtils,
  type ImageSource,
} from '@mediapipe/tasks-vision'
import { merge } from 'lodash'

import { clearCanvasContext } from '@/components/mediapipe/overlay-canvas'

export type CreateFaceTracker = (optionOverrides?: FaceLandmarkerOptions) => FaceTracker

export function useFaceTracker(): [CreateFaceTracker, boolean] {
  const [initialized, setInitialized] = useState(false)

  const create = useCallback((optionOverrides?: FaceLandmarkerOptions): FaceTracker => {
    const faceTracker = new FaceTracker()
    faceTracker.setup(optionOverrides, (faceTracker) => {
      setInitialized(true)
    })
    return faceTracker
  }, [])

  return [create, initialized]
}

export type CompleteHandler = (faceTracker: FaceTracker) => void

export class FaceTracker {
  faceLandmarker?: FaceLandmarker
  drawer?: IFaceTrackingDrawer

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

  setDrawer(drawer: IFaceTrackingDrawer) {
    this.drawer = drawer
  }

  detectForVideo(video: ImageSource, timestamp: number): FaceLandmarkerResult | undefined {
    if (!this.faceLandmarker) return

    const result = this.faceLandmarker.detectForVideo(video, timestamp)
    this.drawer?.draw(result)
    return result
  }
}

interface IFaceTrackingDrawer {
  draw(result: FaceLandmarkerResult): void
}

export class FaceLandmarkDrawer implements IFaceTrackingDrawer {
  canvasContext: CanvasRenderingContext2D
  drawingUtils: DrawingUtils

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext
    this.drawingUtils = new DrawingUtils(canvasContext)
  }

  draw(result: FaceLandmarkerResult) {
    if (result.faceLandmarks) {
      clearCanvasContext(this.canvasContext)

      const drawingUtils = this.drawingUtils

      for (const landmarks of result.faceLandmarks) {
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
          color: '#C0C0C070',
          lineWidth: 1,
        })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: '#FF3030' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: '#FF3030' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: '#30FF30' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: '#30FF30' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: '#E0E0E0' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: '#E0E0E0' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: '#FF3030' })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: '#30FF30' })
      }
    }
  }
}
