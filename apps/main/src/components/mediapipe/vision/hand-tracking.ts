import { Dispatch } from 'react'
import { type HandLandmarkerOptions, type HandLandmarkerResult } from '@mediapipe/tasks-vision'

import { useTracking, useTrackingForVideo, SetupFn, SetupForVideoFn, ResultCallback } from './base'
import { HandTracker } from './hand-tracker'

export type SetupHandTrackingFn = SetupFn<HandLandmarkerOptions>

export function useHandTracking(): [SetupHandTrackingFn, boolean, HandTracker] {
  const [setup, initialized, handTracker] = useTracking<HandTracker, HandLandmarkerOptions, HandLandmarkerResult>(
    HandTracker
  )
  return [setup, initialized, handTracker]
}

export type SetupHandTrackingForVideoFn = SetupForVideoFn<HandLandmarkerOptions>
export type HandTrackingResultCallback = ResultCallback<HandLandmarkerResult>

export function useHandTrackingForVideo(): [
  SetupHandTrackingForVideoFn,
  Dispatch<HandTrackingResultCallback>,
  boolean,
  HandTracker,
] {
  const [setup, setResultCallback, initialized, tracker] = useTrackingForVideo<
    HandTracker,
    HandLandmarkerOptions,
    HandLandmarkerResult
  >(HandTracker)
  return [setup, setResultCallback, initialized, tracker]
}
