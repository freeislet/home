import { useRef, useState, useEffect, useCallback, Dispatch } from 'react'
import { type FaceLandmarkerOptions, type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

import { FaceTracker } from './face-tracker'
import { useVideoFrame } from '@/hooks/video'

export type SetupFn = (optionOverrides?: FaceLandmarkerOptions) => void

export function useFaceTracking(): [SetupFn, FaceTracker | null] {
  const [faceTracker, setFaceTracker] = useState<FaceTracker | null>(null)

  const setup = useCallback((optionOverrides?: FaceLandmarkerOptions) => {
    const faceTracker = new FaceTracker()
    faceTracker.setup(optionOverrides, () => {
      setFaceTracker(faceTracker)
    })
  }, [])

  return [setup, faceTracker]
}

export type SetupForVideoFn = (video: HTMLVideoElement, optionOverrides?: FaceLandmarkerOptions) => void
export type ResultCallback = (result: FaceLandmarkerResult) => void

export function useFaceTrackingForVideo(): [SetupForVideoFn, Dispatch<ResultCallback>, FaceTracker | null] {
  const [setup, faceTracker] = useFaceTracking()
  const [resultCallback, setResultCallback] = useState<ResultCallback>()
  const videoRef = useRef<HTMLVideoElement>()
  const { setVideoFrameSrc } = useVideoFrame(frameLoop)

  const setupForVideo = useCallback((video: HTMLVideoElement, optionOverrides?: FaceLandmarkerOptions) => {
    videoRef.current = video
    setup(optionOverrides)
  }, [])

  useEffect(() => {
    if (faceTracker && videoRef.current) {
      setVideoFrameSrc(videoRef.current!)
    }
  }, [faceTracker, videoRef])

  function frameLoop(time: number) {
    if (!faceTracker || !resultCallback) return

    const video = videoRef.current
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    const result = faceTracker.detectForVideo(video, time)
    if (result) {
      resultCallback(result)
    }
  }

  return [setupForVideo, setResultCallback, faceTracker]
}
