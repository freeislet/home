'use client'

import { useRef, useState, useEffect } from 'react'
import { type FaceLandmarkerResult } from '@mediapipe/tasks-vision'
import Webcam from 'react-webcam'

import { MediaPipeIcon } from '@/components/icons'
import { useFaceTrackingForVideo } from '@/components/mediapipe/vision/face-tracking'
import { FaceDrawer } from '@/components/mediapipe/vision/face-drawer'
import OverlayCanvas from '@/components/mediapipe/overlay-canvas'

export default function MediaPipeFaceTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [faceDrawer, setFaceDrawer] = useState<FaceDrawer>()
  const [setupFaceTracker, setFaceTrackingResultCallback, faceTrackingInitialized] = useFaceTrackingForVideo()

  useEffect(() => {
    const video = webcamRef.current.video
    if (video) {
      setupFaceTracker(video)
    }
  }, [stream])

  useEffect(() => {
    if (faceTrackingInitialized && faceDrawer) {
      setFaceTrackingResultCallback(() => (result: FaceLandmarkerResult) => {
        faceDrawer.drawLandmark(result)
      })
    }
  }, [faceTrackingInitialized, faceDrawer])

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setFaceDrawer(new FaceDrawer(canvasContext))
  }

  function onInitializeWebcam(stream: MediaStream) {
    setStream(stream) // == webcamRef.current.stream!
  }

  const videoConstraints = {
    width: 640,
    height: 480,
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
          {!stream && <div className="absolute left-1/2 top-1/3 -translate-x-1/2">Initializing Webcam...</div>}
        </div>
        <div></div>
      </div>
    </div>
  )
}
