'use client'

import { useState, useEffect } from 'react'
import { type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

import { MediaPipeIcon } from '@/components/icons'
import { useFaceTrackingForVideo } from '@/components/mediapipe/vision/face-tracking'
import { FaceDrawer } from '@/components/mediapipe/vision/face-drawer'
import TrackingCam from '@/components/mediapipe/tracking-cam'

export default function MediaPipeFaceTrackingPage() {
  const [faceDrawer, setFaceDrawer] = useState<FaceDrawer>()
  const [setupFaceTracker, setFaceTrackingResultCallback, faceTrackingInitialized] = useFaceTrackingForVideo()

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d')!
    setFaceDrawer(new FaceDrawer(canvasContext))
  }

  function onInitializeWebcam(stream: MediaStream, video: HTMLVideoElement) {
    setupFaceTracker(video)
  }

  useEffect(() => {
    if (faceTrackingInitialized && faceDrawer) {
      setFaceTrackingResultCallback(() => (result: FaceLandmarkerResult) => {
        faceDrawer.drawLandmark(result)
      })
    }
  }, [faceTrackingInitialized, faceDrawer])

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        Face Tracking 예제
      </div>
      <div className="grid grid-cols-[1fr_auto] mx-auto">
        <TrackingCam onInitializeCanvas={onInitializeCanvas} onInitializeWebcam={onInitializeWebcam} />
        <div></div>
      </div>
    </div>
  )
}
