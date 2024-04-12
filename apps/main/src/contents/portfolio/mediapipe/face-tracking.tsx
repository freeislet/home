'use client'

import { useState, useEffect, useCallback } from 'react'
import { type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

import { useFaceTrackingForVideo } from '@/components/mediapipe/vision/face-tracking'
import { FaceDrawer } from '@/components/mediapipe/vision/face-drawer'
import TrackingCam from '@/components/mediapipe/tracking-cam'

export default function FaceTracking() {
  const [faceDrawer, setFaceDrawer] = useState<FaceDrawer>()
  const [setupFaceTracker, setFaceTrackingResultCallback, faceTrackingInitialized] = useFaceTrackingForVideo()

  const onInitializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const canvasContext = canvas.getContext('2d')!
    setFaceDrawer(new FaceDrawer(canvasContext))
  }, [])

  const onInitializeWebcam = useCallback(
    (stream: MediaStream, video: HTMLVideoElement) => {
      setupFaceTracker(video)
    },
    [setupFaceTracker]
  )

  useEffect(() => {
    if (faceTrackingInitialized && faceDrawer) {
      setFaceTrackingResultCallback(() => (result: FaceLandmarkerResult) => {
        faceDrawer.drawLandmark(result)
      })
    }
  }, [faceTrackingInitialized, faceDrawer, setFaceTrackingResultCallback])

  return (
    <div className="grid grid-cols-[1fr_auto] mx-auto">
      <TrackingCam onInitializeCanvas={onInitializeCanvas} onInitializeWebcam={onInitializeWebcam} />
      <div></div>
    </div>
  )
}
