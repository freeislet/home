'use client'

import { useState, useEffect, useCallback } from 'react'
import { type PoseLandmarkerResult } from '@mediapipe/tasks-vision'

import { usePoseTrackingForVideo } from '@/components/mediapipe/vision/pose-tracking'
import { PoseDrawer } from '@/components/mediapipe/vision/pose-drawer'
import TrackingCam from '@/components/mediapipe/tracking-cam'

export default function PoseTracking() {
  const [poseDrawer, setPoseDrawer] = useState<PoseDrawer>()
  const [setupPoseTracker, setPoseTrackingResultCallback, poseTrackingInitialized] = usePoseTrackingForVideo()

  const onInitializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const canvasContext = canvas.getContext('2d')!
    setPoseDrawer(new PoseDrawer(canvasContext))
  }, [])

  const onInitializeWebcam = useCallback((stream: MediaStream, video: HTMLVideoElement) => {
    setupPoseTracker(video)
  }, [])

  useEffect(() => {
    if (poseTrackingInitialized && poseDrawer) {
      setPoseTrackingResultCallback(() => (result: PoseLandmarkerResult) => {
        poseDrawer.drawLandmark(result)
      })
    }
  }, [poseTrackingInitialized, poseDrawer])

  return (
    <div className="grid grid-cols-[1fr_auto] mx-auto">
      <TrackingCam onInitializeCanvas={onInitializeCanvas} onInitializeWebcam={onInitializeWebcam} />
      <div></div>
    </div>
  )
}
