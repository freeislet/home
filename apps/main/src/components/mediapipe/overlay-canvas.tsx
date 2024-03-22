import { forwardRef, useRef, useImperativeHandle, useLayoutEffect } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

import { cn } from '@/lib/utils'
import type { Size } from '@/hooks/element'

interface OverlayCanvasProps extends React.ComponentProps<'canvas'> {
  width?: number
  height?: number
  stream?: MediaStream
  mirrored?: boolean
  onInitialize?: (el: HTMLCanvasElement) => void
  onResizeCanvas?: (el: HTMLCanvasElement) => void
}

const OverlayCanvas = forwardRef<HTMLCanvasElement, OverlayCanvasProps>(
  ({ width, height, stream, mirrored, onInitialize, onResizeCanvas, className, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)

    useImperativeHandle(ref, () => canvasRef.current, [])
    useLayoutEffect(() => {
      onInitialize?.(canvasRef.current)
    }, [])
    useLayoutEffect(() => {
      resizeCanvas()
    }, [width, height, stream])
    useResizeObserver(canvasRef, resizeCanvas)

    function resizeCanvas() {
      let aspectRatio

      if (stream) {
        const settings = stream.getVideoTracks()[0].getSettings()
        aspectRatio = settings.aspectRatio ?? settings.width! / settings.height!
      } else if (width && height) {
        aspectRatio = width / height
      } else return

      const canvas = canvasRef.current
      const canvasRect = canvas.getBoundingClientRect()
      const containedSize = calcContainedSize(canvasRect.width, canvasRect.height, aspectRatio)

      const dpr = window.devicePixelRatio
      canvas.width = Math.round(containedSize.width * dpr)
      canvas.height = Math.round(containedSize.height * dpr)

      onResizeCanvas?.(canvas)
    }

    return (
      <canvas
        ref={canvasRef}
        className={cn('absolute left-0 top-0 size-full object-contain', { 'scale-x-[-1]': mirrored }, className)}
        {...props}
      />
    )
  }
)
OverlayCanvas.displayName = 'OverlayCanvas'

export default OverlayCanvas

function calcContainedSize(width: number, height: number, ratio: number): Size {
  const fitWidth = height * ratio
  if (fitWidth <= width) return { width: fitWidth, height }
  else return { width, height: width / ratio }
}
