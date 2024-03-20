import { useState, useRef, useEffect, DependencyList, RefCallback } from 'react'
import 'rvfc-polyfill'

export interface VideoFrameCallback {
  (time: number, timeDelta: number, metadata: VideoFrameCallbackMetadata): void | boolean
}

export type VideoFrameHook = {
  videoFrameSrc: HTMLVideoElement | null
  setVideoFrameSrc: RefCallback<HTMLVideoElement>
}

export function useVideoFrame(callback: VideoFrameCallback, deps?: DependencyList): VideoFrameHook {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<DOMHighResTimeStamp>()

  useEffect(() => {
    if (!video) return

    const animate = (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
      const time = now //metadata.mediaTime
      const timeDelta = previousTimeRef.current != undefined ? time - previousTimeRef.current : 0
      if (callback(time, timeDelta, metadata) === false) return

      previousTimeRef.current = now
      requestRef.current = video.requestVideoFrameCallback(animate)
    }

    requestRef.current = video.requestVideoFrameCallback(animate)
    return () => video.cancelVideoFrameCallback(requestRef.current!)
  }, [video, ...(deps ?? [])])

  return { videoFrameSrc: video, setVideoFrameSrc: setVideo } // TODO: start, stop callback 추가
}
