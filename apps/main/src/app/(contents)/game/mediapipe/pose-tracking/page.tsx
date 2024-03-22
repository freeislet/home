'use client'

import { useRef, useState, useEffect } from 'react'
import { type PoseLandmarkerResult } from '@mediapipe/tasks-vision'
import Webcam from 'react-webcam'

import { MediaPipeIcon } from '@/components/icons'
import { usePoseTrackingForVideo } from '@/components/mediapipe/vision/pose-tracking'
import { PoseDrawer } from '@/components/mediapipe/vision/pose-drawer'
import OverlayCanvas from '@/components/mediapipe/overlay-canvas'

export default function MediaPipePoseTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const [poseDrawer, setPoseDrawer] = useState<PoseDrawer>()
  const [setupPoseTracker, setPoseTrackingResultCallback, poseTrackingInitialized] = usePoseTrackingForVideo()

  useEffect(() => {
    const video = webcamRef.current.video
    if (video) {
      setupPoseTracker(video)
    }
  }, [stream])

  useEffect(() => {
    if (poseTrackingInitialized && poseDrawer) {
      setPoseTrackingResultCallback(() => (result: PoseLandmarkerResult) => {
        poseDrawer.drawLandmark(result)
      })
    }
  }, [poseTrackingInitialized, poseDrawer])

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setPoseDrawer(new PoseDrawer(canvasContext))
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
        Pose Tracking 예제
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
