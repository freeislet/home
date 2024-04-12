'use client'

import { useState, useEffect, useCallback } from 'react'
import { type HandLandmarkerResult } from '@mediapipe/tasks-vision'

import { useHandTrackingForVideo } from '@/components/mediapipe/vision/hand-tracking'
import { HandDrawer } from '@/components/mediapipe/vision/hand-drawer'
import TrackingCam from '@/components/mediapipe/tracking-cam'

export default function HandTracking() {
  const [handDrawer, setHandDrawer] = useState<HandDrawer>()
  const [setupHandTracker, setHandTrackingResultCallback, handTrackingInitialized] = useHandTrackingForVideo()

  const onInitializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const canvasContext = canvas.getContext('2d')!
    setHandDrawer(new HandDrawer(canvasContext))
  }, [])

  const onInitializeWebcam = useCallback(
    (stream: MediaStream, video: HTMLVideoElement) => {
      setupHandTracker(video)
    },
    [setupHandTracker]
  )

  useEffect(() => {
    if (handTrackingInitialized && handDrawer) {
      setHandTrackingResultCallback(() => (result: HandLandmarkerResult) => {
        handDrawer.drawLandmark(result)
      })
    }
  }, [handTrackingInitialized, handDrawer, setHandTrackingResultCallback])

  return (
    <div className="grid grid-cols-[1fr_auto] mx-auto">
      <TrackingCam onInitializeCanvas={onInitializeCanvas} onInitializeWebcam={onInitializeWebcam} />
      <div></div>
    </div>
  )
}
