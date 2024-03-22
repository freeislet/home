import { FaceLandmarker, type FaceLandmarkerResult, DrawingUtils } from '@mediapipe/tasks-vision'

import { clearCanvasContext } from '@/lib/canvas'

export class FaceDrawer {
  canvasContext: CanvasRenderingContext2D
  drawingUtils: DrawingUtils

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext
    this.drawingUtils = new DrawingUtils(canvasContext)
  }

  drawLandmark(result: FaceLandmarkerResult) {
    if (!result.faceLandmarks) return

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
