'use client'

import { useRef, useState, useEffect } from 'react'
import { type HandLandmarkerResult } from '@mediapipe/tasks-vision'
import Webcam from 'react-webcam'

import { MediaPipeIcon } from '@/components/icons'
import { useHandTrackingForVideo } from '@/components/mediapipe/vision/hand-tracking'
import { HandDrawer } from '@/components/mediapipe/vision/hand-drawer'
import OverlayCanvas from '@/components/mediapipe/overlay-canvas'

export default function MediaPipeHandTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [handDrawer, setHandDrawer] = useState<HandDrawer>()
  const [setupHandTracker, setHandTrackingResultCallback, handTrackingInitialized] = useHandTrackingForVideo()

  useEffect(() => {
    const video = webcamRef.current.video
    if (video) {
      setupHandTracker(video)
    }
  }, [stream])

  useEffect(() => {
    if (handTrackingInitialized && handDrawer) {
      setHandTrackingResultCallback(() => (result: HandLandmarkerResult) => {
        handDrawer.drawLandmark(result)
      })
    }
  }, [handTrackingInitialized, handDrawer])

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setHandDrawer(new HandDrawer(canvasContext))
  }

  function onInitializeWebcam(stream: MediaStream) {
    setStream(stream) // == webcamRef.current.stream!
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
        Hand Tracking 예제
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
