import { PoseLandmarker, type PoseLandmarkerResult, DrawingUtils } from '@mediapipe/tasks-vision'

import { clearCanvasContext } from '@/lib/canvas'

export class PoseDrawer {
  canvasContext: CanvasRenderingContext2D
  drawingUtils: DrawingUtils

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext
    this.drawingUtils = new DrawingUtils(canvasContext)
  }

  drawLandmark(result: PoseLandmarkerResult) {
    if (!result.landmarks) return

    clearCanvasContext(this.canvasContext)

    const drawingUtils = this.drawingUtils

    for (const landmarks of result.landmarks) {
      drawingUtils.drawLandmarks(landmarks, {
        radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
      })
      drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS)
    }
  }
}
