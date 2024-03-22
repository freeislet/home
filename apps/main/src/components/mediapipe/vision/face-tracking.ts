import { useRef, useState, useEffect, useCallback } from 'react'
import { type FaceLandmarkerOptions, type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

import { FaceTracker } from './face-tracker'
import { useVideoFrame } from '@/hooks/video'

export type SetupFaceTracker = (optionOverrides?: FaceLandmarkerOptions) => void

export function useFaceTracker(): [FaceTracker, SetupFaceTracker, boolean] {
  const faceTrackerRef = useRef(new FaceTracker())
  const [initialized, setInitialized] = useState(false)

  const setup = useCallback((optionOverrides?: FaceLandmarkerOptions) => {
    faceTrackerRef.current.setup(optionOverrides, () => {
      setInitialized(true)
    })
  }, [])

  return [faceTrackerRef.current, setup, initialized]
}

export type SetupFaceTrackerForVideo = (video: HTMLVideoElement, optionOverrides?: FaceLandmarkerOptions) => void
export type DetectHandler = (result: FaceLandmarkerResult) => void

export function useFaceTrackerForVideo(onDetect?: DetectHandler): [FaceTracker, SetupFaceTrackerForVideo, boolean] {
  const [faceTracker, setup, initialized] = useFaceTracker()
  const videoRef = useRef<HTMLVideoElement>()
  const { setVideoFrameSrc } = useVideoFrame(frameLoop)

  const setupForVideo = useCallback((video: HTMLVideoElement, optionOverrides?: FaceLandmarkerOptions) => {
    videoRef.current = video
    setup(optionOverrides)
  }, [])

  useEffect(() => {
    if (initialized && videoRef.current) {
      setVideoFrameSrc(videoRef.current!)
    }
  }, [initialized, videoRef])

  function frameLoop(time: number) {
    // if (!faceTracker.drawer) return // TODO: needRender 콜백 분리

    const video = videoRef.current
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    const result = faceTracker.detectForVideo(video, time)
    if (result) {
      onDetect?.(result)
    }
  }

  return [faceTracker, setupForVideo, initialized]
}
