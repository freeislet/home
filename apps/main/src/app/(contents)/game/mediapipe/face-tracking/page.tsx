'use client'

import { useRef, useState, useEffect } from 'react'
import {
  FilesetResolver,
  FaceLandmarker,
  type FaceLandmarkerOptions,
  type FaceLandmarkerResult,
  DrawingUtils,
} from '@mediapipe/tasks-vision'
import Webcam from 'react-webcam'
import useResizeObserver from '@react-hook/resize-observer'

import { MediaPipeIcon } from '@/components/icons'
import { useAnimationFrame } from '@/hooks/animation'

export default function MediaPipeFaceTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()
  const [drawingUtils, setDrawingUtils] = useState<DrawingUtils>()
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker>()
  const [lastVideoTime, setLastVideoTime] = useState(-1)

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
      // outputFaceBlendshapes: true,
      runningMode: 'VIDEO', // "IMAGE" | "VIDEO"
      numFaces: 3,
    }
    const faceLandmarker = await FaceLandmarker.createFromOptions(wasmFileset, faceLandmarkerOptions)
    setFaceLandmarker(faceLandmarker)

    const canvasCtx = canvasRef.current.getContext('2d')!
    setCanvasContext(canvasCtx)
    setDrawingUtils(new DrawingUtils(canvasCtx))
  }

  function resizeCanvas() {
    const stream = webcamRef.current.stream
    if (!stream) return

    const settings = stream.getVideoTracks()[0].getSettings()
    const aspectRatio = settings.aspectRatio ?? settings.width! / settings.height!

    const canvas = canvasRef.current
    const canvasRect = canvas.getBoundingClientRect()
    const [width, height] = calcContainSize(canvasRect.width, canvasRect.height, aspectRatio)

    const dpr = 1 //window.devicePixelRatio
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
  }

  function render(time: number) {
    if (!faceLandmarker || !drawingUtils || !canvasContext) return

    const video = webcamRef.current.video
    if (!video) return

    if (video.videoWidth && video.videoHeight && video.currentTime !== lastVideoTime) {
      const result = faceLandmarker.detectForVideo(video, time)
      clearCanvas(canvasContext)
      drawFaceLandmark(result, drawingUtils)

      setLastVideoTime(video.currentTime)
    }
  }

  useEffect(() => {
    setup()
  }, [])
  useResizeObserver(canvasRef, resizeCanvas)
  useAnimationFrame(render, [faceLandmarker, drawingUtils, canvasContext])

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        Face Tracking 예제
      </div>
      <div className="grid grid-cols-[1fr_auto] mx-auto">
        <div className="relative">
          <Webcam ref={webcamRef} className="h-full" mirrored onUserMedia={resizeCanvas} />
          <canvas ref={canvasRef} className="absolute left-0 top-0 size-full object-contain scale-x-[-1]" />
        </div>
        <div></div>
      </div>
    </div>
  )
}

function calcContainSize(width: number, height: number, ratio: number): [number, number] {
  const fitWidth = height * ratio
  if (fitWidth <= width) return [fitWidth, height]
  else return [width, width / ratio]
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawFaceLandmark(result: FaceLandmarkerResult, drawingUtils: DrawingUtils) {
  if (result.faceLandmarks) {
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
