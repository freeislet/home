import { Dispatch } from 'react'
import { type PoseLandmarkerOptions, type PoseLandmarkerResult } from '@mediapipe/tasks-vision'

import { useTracking, useTrackingForVideo, SetupFn, SetupForVideoFn, ResultCallback } from './base'
import { PoseTracker } from './pose-tracker'

export type SetupPoseTrackingFn = SetupFn<PoseLandmarkerOptions>

export function usePoseTracking(): [SetupPoseTrackingFn, boolean, PoseTracker] {
  const [setup, initialized, poseTracker] = useTracking<PoseTracker, PoseLandmarkerOptions, PoseLandmarkerResult>(
    PoseTracker
  )
  return [setup, initialized, poseTracker]
}

export type SetupPoseTrackingForVideoFn = SetupForVideoFn<PoseLandmarkerOptions>
export type PoseTrackingResultCallback = ResultCallback<PoseLandmarkerResult>

export function usePoseTrackingForVideo(): [
  SetupPoseTrackingForVideoFn,
  Dispatch<PoseTrackingResultCallback>,
  boolean,
  PoseTracker,
] {
  const [setup, setResultCallback, initialized, tracker] = useTrackingForVideo<
    PoseTracker,
    PoseLandmarkerOptions,
    PoseLandmarkerResult
  >(PoseTracker)
  return [setup, setResultCallback, initialized, tracker]
}
