import { Dispatch } from 'react'
import { type FaceLandmarkerOptions, type FaceLandmarkerResult } from '@mediapipe/tasks-vision'

import { useTracking, useTrackingForVideo, SetupFn, SetupForVideoFn, ResultCallback } from './base'
import { FaceTracker } from './face-tracker'

export type SetupFaceTrackingFn = SetupFn<FaceLandmarkerOptions>

export function useFaceTracking(): [SetupFaceTrackingFn, boolean, FaceTracker] {
  const [setup, initialized, faceTracker] = useTracking<FaceTracker, FaceLandmarkerOptions, FaceLandmarkerResult>(
    FaceTracker
  )
  return [setup, initialized, faceTracker]
}

export type SetupFaceTrackingForVideoFn = SetupForVideoFn<FaceLandmarkerOptions>
export type FaceTrackingResultCallback = ResultCallback<FaceLandmarkerResult>

export function useFaceTrackingForVideo(): [
  SetupFaceTrackingForVideoFn,
  Dispatch<FaceTrackingResultCallback>,
  boolean,
  FaceTracker,
] {
  const [setup, setResultCallback, initialized, tracker] = useTrackingForVideo<
    FaceTracker,
    FaceLandmarkerOptions,
    FaceLandmarkerResult
  >(FaceTracker)
  return [setup, setResultCallback, initialized, tracker]
}
