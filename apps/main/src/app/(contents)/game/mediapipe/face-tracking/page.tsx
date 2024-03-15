'use client'

import { MediaPipeIcon } from '@/components/icons'

export default function MediaPipeFaceTrackingPage() {
  // const vision = await FilesetResolver.forVisionTasks(
  //   // path/to/wasm/root
  //   'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  // )
  // const faceLandmarker = await faceLandmarker.createFromOptions(vision, {
  //   baseOptions: {
  //     modelAssetPath: 'path/to/model',
  //   },
  //   runningMode: runningMode,
  // })

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        Face Tracking 예제
      </div>
      <div></div>
      {/* <Unity unityProvider={unityProvider} className={cn('w-[960px] h-[600px] m-auto', { hidden: !isLoaded })} /> */}
    </div>
  )
}
