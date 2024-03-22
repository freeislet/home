'use client'

import { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import { MediaPipeIcon } from '@/components/icons'
import { useFaceTrackerForVideo } from '@/components/mediapipe/vision/face-tracking'
import { FaceDrawer } from '@/components/mediapipe/vision/face-drawer'
import OverlayCanvas from '@/components/mediapipe/overlay-canvas'
import { FaceLandmarkerResult } from '@mediapipe/tasks-vision'

export default function MediaPipeFaceTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [faceTracker, setupFaceTracker] = useFaceTrackerForVideo(render)
  const [faceDrawer, setFaceDrawer] = useState<FaceDrawer>()

  useEffect(() => {
    const video = webcamRef.current.video
    if (video) {
      setupFaceTracker(video)
    }
  }, [stream])

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setFaceDrawer(new FaceDrawer(canvasContext))
  }

  function onInitializeWebcam(stream: MediaStream) {
    setStream(stream) // == webcamRef.current.stream!
  }

  function render(result: FaceLandmarkerResult) {
    if (faceDrawer) {
      faceDrawer.drawLandmark(result)
    }
  }

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
          {!stream && <div className="absolute left-1/2 top-1/3 -translate-x-1/2">Initializing Webcam...</div>}
        </div>
        <div></div>
      </div>
    </div>
  )
}
