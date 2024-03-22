import { HandLandmarker, type HandLandmarkerResult, DrawingUtils } from '@mediapipe/tasks-vision'

import { clearCanvasContext } from '@/lib/canvas'

export class HandDrawer {
  canvasContext: CanvasRenderingContext2D
  drawingUtils: DrawingUtils

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext
    this.drawingUtils = new DrawingUtils(canvasContext)
  }

  drawLandmark(result: HandLandmarkerResult) {
    if (!result.landmarks) return

    clearCanvasContext(this.canvasContext)

    const drawingUtils = this.drawingUtils

    for (const landmarks of result.landmarks) {
      drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5,
      })
      drawingUtils.drawLandmarks(landmarks, { color: '#FF0000', lineWidth: 2 })
    }
  }
}
