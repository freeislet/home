'use client'

import { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import { cn } from '@/lib/utils'
import OverlayCanvas from './overlay-canvas'

export interface TrackingCamProps extends React.ComponentProps<'div'> {
  onInitializeCanvas?: (canvas: HTMLCanvasElement) => void
  onInitializeWebcam?: (stream: MediaStream, video: HTMLVideoElement, webcam: Webcam) => void
  webcamConstraints?: MediaTrackConstraints
  webcamLoadingScreen?: React.ReactNode
  children?: React.ReactNode
}

const defaultWebcamConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
}

export default function TrackingCam({
  onInitializeCanvas,
  onInitializeWebcam,
  webcamConstraints,
  webcamLoadingScreen,
  children,
  className,
  ...props
}: TrackingCamProps) {
  const webcamRef = useRef<Webcam>(null!)
  const [stream, setStream] = useState<MediaStream>()

  return (
    <div className={cn('relative', className)} {...props}>
      <Webcam
        ref={webcamRef}
        className="h-full"
        videoConstraints={webcamConstraints ?? defaultWebcamConstraints}
        mirrored
        onUserMedia={(stream) => {
          setStream(stream)
          onInitializeWebcam?.(stream, webcamRef.current.video!, webcamRef.current)
        }}
      />
      <OverlayCanvas stream={stream} onInitialize={onInitializeCanvas} mirrored />
      {!stream &&
        (webcamLoadingScreen ?? (
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2">Initializing Webcam...</div>
        ))}
      {children}
    </div>
  )
}
