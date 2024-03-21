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

import { MediaPipeIcon } from '@/components/icons'
import OverlayCanvas, { clearCanvasContext } from '@/components/mediapipe/overlay-canvas'
import { useVideoFrame } from '@/hooks/video'

export default function MediaPipeFaceTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()
  const [drawingUtils, setDrawingUtils] = useState<DrawingUtils>()
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker>()
  const { setVideoFrameSrc } = useVideoFrame(render, [faceLandmarker, drawingUtils, canvasContext])

  async function setup() {
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
  }

  function onInitializeWebcam(stream: MediaStream) {
    setVideoFrameSrc(webcamRef.current.video)
    setStream(stream) // == webcamRef.current.stream!
  }

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setCanvasContext(canvasContext)
    setDrawingUtils(new DrawingUtils(canvasContext))
  }

  function render(time: number) {
    if (!faceLandmarker || !drawingUtils || !canvasContext) return

    const video = webcamRef.current.video
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    const result = faceLandmarker.detectForVideo(video, time)
    clearCanvasContext(canvasContext)
    drawFaceLandmark(result, drawingUtils)
  }

  useEffect(() => {
    setup()
  }, [])

  const videoConstraints = {
    width: 1280 / 2,
    height: 720 / 2, // NOTE: 가로로 길어질 때 video 크기가 720 이하로 안 줄어드는 문제로 인해 /2 적용
    facingMode: 'user',
  }

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        Face Tracking 예제
      </div>
      <div className="grid grid-cols-[1fr_auto] mx-auto">
        <div className="relative">
          <Webcam
            ref={webcamRef}
            className="h-full"
            videoConstraints={videoConstraints}
            mirrored
            onUserMedia={onInitializeWebcam}
          />
          <OverlayCanvas stream={stream} onInitialize={onInitializeCanvas} mirrored />
        </div>
        <div></div>
      </div>
    </div>
  )
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
