'use client'

import { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import { MediaPipeIcon } from '@/components/icons'
import { useFaceTracker, FaceTracker, FaceLandmarkDrawer } from '@/components/mediapipe/face-tracker'
import OverlayCanvas from '@/components/mediapipe/overlay-canvas'
import { useVideoFrame } from '@/hooks/video'

export default function MediaPipeFaceTrackingPage() {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()
  const faceTrackerRef = useRef<FaceTracker>()
  const [createFaceTracker, faceTrackerInitialized] = useFaceTracker()
  const { setVideoFrameSrc } = useVideoFrame(render)

  useEffect(() => {
    if (!faceTrackerRef.current) {
      faceTrackerRef.current = createFaceTracker()
    }
  }, [])
  useEffect(() => {
    if (faceTrackerInitialized && stream) {
      setVideoFrameSrc(webcamRef.current.video)
    }
  }, [faceTrackerInitialized, stream])

  function onInitializeCanvas(canvas: HTMLCanvasElement) {
    const faceTracker = faceTrackerRef.current!
    if (faceTracker && !faceTracker.drawer) {
      const canvasContext = canvas.getContext('2d')!
      const drawer = new FaceLandmarkDrawer(canvasContext)
      faceTracker.setDrawer(drawer)
    }
  }

  function onInitializeWebcam(stream: MediaStream) {
    setStream(stream) // == webcamRef.current.stream!
  }

  function render(time: number) {
    const faceTracker = faceTrackerRef.current!
    if (!faceTrackerInitialized || !faceTracker.drawer) return

    const video = webcamRef.current.video
    const videoReady = video && video.videoWidth && video.videoHeight
    if (!videoReady) return

    faceTracker.detectForVideo(video, time)
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
        Face Tracking 예제
      </div>
      <div className="grid grid-cols-[1fr_auto] mx-auto">
        <div className="relative">
          {!stream && <div className="m-4">Initializing Webcam...</div>}
          <Webcam
            ref={webcamRef}
            className="h-full"
            videoConstraints={videoConstraints}
            mirrored
            onUserMedia={onInitializeWebcam}
          />
          <OverlayCanvas stream={stream} onInitialize={onInitializeCanvas} mirrored />
        </div>
        <div></div>
      </div>
    </div>
  )
}
