import { useRef, useState, useEffect, useCallback, Dispatch } from 'react'
import { type ImageSource } from '@mediapipe/tasks-vision'
import { merge } from 'lodash'

import { useVideoFrame } from '@/hooks/video'

/**
 * ITracker interface
 */

export type CompleteHandler<T> = (tracker: T) => void

export interface ITracker<OptionsT, ResultT> {
  setup(optionOverrides?: OptionsT, onComplete?: CompleteHandler<ThisType<this>>): Promise<void>
  detectForVideo(video: ImageSource, timestamp: number): ResultT | undefined
}

/**
 * TrackerBase class
 */

export abstract class TrackerBase<LandmarkerT, OptionsT, ResultT> implements ITracker<OptionsT, ResultT> {
  landmarker?: LandmarkerT

  constructor() {}

  abstract getDefaultLandmarkerOptions(): OptionsT
  abstract createLandmarker(options: OptionsT): Promise<LandmarkerT>
  abstract detectForVideo(video: ImageSource, timestamp: number): ResultT | undefined

  async setup(optionOverrides?: OptionsT, onComplete?: CompleteHandler<ThisType<this>>) {
    const options = this.getDefaultLandmarkerOptions()
    merge(options, optionOverrides)

    this.landmarker = await this.createLandmarker(options)

    onComplete?.(this)
  }
}

/**
 * useTracking hook
 */

export type SetupFn<OptionsT> = (optionOverrides?: OptionsT) => void

export function useTracking<T extends ITracker<OptionsT, ResultT>, OptionsT, ResultT>(
  type: new () => T
): [SetupFn<OptionsT>, boolean, T] {
  const trackerRef = useRef<T>()
  const [initialized, setInitialized] = useState(false)

  function tracker() {
    if (!trackerRef.current) trackerRef.current = new type()
    return trackerRef.current
  }

  const setup = useCallback((optionOverrides?: OptionsT) => {
    tracker().setup(optionOverrides, () => {
      setInitialized(true)
    })
  }, [])

  return [setup, initialized, tracker()]
}

/**
 * useTrackingForVideo hook
 */

export type SetupForVideoFn<OptionsT> = (video: HTMLVideoElement, optionOverrides?: OptionsT) => void
export type ResultCallback<ResultT> = (result: ResultT) => void

export function useTrackingForVideo<T extends ITracker<OptionsT, ResultT>, OptionsT, ResultT>(
  type: new () => T
): [SetupForVideoFn<OptionsT>, Dispatch<ResultCallback<ResultT>>, boolean, T] {
  const [setup, initialized, tracker] = useTracking<T, OptionsT, ResultT>(type)
  const [resultCallback, setResultCallback] = useState<ResultCallback<ResultT>>()
  const videoRef = useRef<HTMLVideoElement>()
  const { setVideoFrameSrc } = useVideoFrame(frameLoop)

  const setupForVideo = useCallback((video: HTMLVideoElement, optionOverrides?: OptionsT) => {
    videoRef.current = video
    setup(optionOverrides)
  }, [])

  useEffect(() => {
    if (initialized && videoRef.current) {
      setVideoFrameSrc(videoRef.current!)
    }
  }, [initialized, videoRef])

  function frameLoop(time: number) {
    if (!initialized || !resultCallback) return

    const video = videoRef.current
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    const result = tracker.detectForVideo(video, time)
    if (result) {
      resultCallback(result)
    }
  }

  return [setupForVideo, setResultCallback, initialized, tracker]
}
