'use client'

import { useState, useCallback } from 'react'
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
  AssetUnlockedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
} from '@readyplayerme/react-avatar-creator'
import { Avatar } from '@readyplayerme/visage'
import * as THREE from 'three'
import { Sparkles } from '@react-three/drei'

import LoadingSpinner from '@/components/loading-spinner'
import { Button } from '@/components/ui/button'

export default function MyAvatarCreator() {
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  const handleRecreate = useCallback(() => {
    setAvatarUrl(undefined)
    setIsLoading(true)
  }, [])

  // TODO: Avatar Creator, Viewer 컴포넌트 분리
  if (!avatarUrl) {
    const config: AvatarCreatorConfig = {
      clearCache: true,
      bodyType: 'fullbody',
      quickStart: false,
      language: 'kr',
    }

    const handleUserAuthorized = (event: UserAuthorizedEvent) => {
      console.log(`User is:`, event.data)
    }

    const handleOnUserSet = (event: UserSetEvent) => {
      console.log(`User ID is: ${event.data.id}`)
    }

    const handleAssetUnlocked = (event: AssetUnlockedEvent) => {
      console.log(`Asset unlocked is: ${event.data.assetId}`)
    }

    const handleOnAvatarExported = (event: AvatarExportedEvent) => {
      console.log(`Avatar URL is: ${event.data.url}`)
      setAvatarUrl(event.data.url)
    }

    return (
      <AvatarCreator
        subdomain="freeislet"
        config={config}
        className="size-full border-none"
        onUserAuthorized={handleUserAuthorized}
        onUserSet={handleOnUserSet}
        onAssetUnlock={handleAssetUnlocked}
        onAvatarExported={handleOnAvatarExported}
      />
    )
  } else {
    const backLightPosition = new THREE.Vector3(0.5, 1.6, -1)
    const fillLightPosition = new THREE.Vector3(-0.5, 1.6, -0.5)
    const lightTarget = new THREE.Vector3(0, 1.7, 0)

    const onLoaded = () => {
      setIsLoading(false)
    }

    return (
      <div className="my-flex-col">
        <div className="my-flex-row m-2 space-x-2">
          <Button onClick={handleRecreate} size="sm" variant="destructive">
            다시 만들기
          </Button>
        </div>
        <div className="flex-1 relative">
          <Avatar
            onLoaded={onLoaded}
            modelSrc={avatarUrl}
            // animationSrc="/3d-animation/ready-player-me/F_Standing_Idle_001.fbx"
            animationSrc="/3d-animation/ready-player-me/F_Dances_001.fbx"
            backLightColor="#FFB878"
            backLightIntensity={6 * Math.PI}
            backLightPosition={backLightPosition}
            background={{
              color: '#282038',
            }}
            bloom={{
              intensity: 1 * Math.PI,
              kernelSize: 1,
              luminanceSmoothing: 1,
              luminanceThreshold: 1,
              materialIntensity: 1 * Math.PI,
              mipmapBlur: true,
            }}
            cameraInitialDistance={3.2}
            cameraTarget={1.55}
            dpr={2}
            effects={{
              ambientOcclusion: false,
              bloom: {
                intensity: 1 * Math.PI,
                kernelSize: 1,
                luminanceSmoothing: 1,
                luminanceThreshold: 1,
                materialIntensity: 1,
                mipmapBlur: true,
              },
            }}
            emotion={{
              cheekSquintLeft: 0.3,
              eyeLookInRight: 0.6,
              eyeLookOutLeft: 0.6,
              jawOpen: 0.1,
              mouthDimpleLeft: 0.3,
              mouthPressLeft: 0.1,
              mouthSmileLeft: 0.2,
              mouthSmileRight: 0.1,
            }}
            environment="soft"
            fillLightColor="#6794FF"
            fillLightIntensity={3 * Math.PI}
            fillLightPosition={fillLightPosition}
            keyLightColor="#FFFFFF"
            keyLightIntensity={0.8 * Math.PI}
            lightTarget={lightTarget}
            scale={1}
          >
            <Sparkles color="white" count={50} opacity={0.9} scale={5} size={0.5} speed={0.35} />
          </Avatar>
          {isLoading && <LoadingSpinner className="text-sky-400" />}
        </div>
      </div>
    )
  }
}
