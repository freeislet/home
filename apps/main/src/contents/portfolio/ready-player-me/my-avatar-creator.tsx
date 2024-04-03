'use client'

import { useState } from 'react'
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
  AssetUnlockedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
} from '@readyplayerme/react-avatar-creator'
import { Avatar } from '@readyplayerme/visage'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// TODO: Avatar Creator, Viewer 컴포넌트 분리

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'kr',
}

export default function MyAvatarCreator() {
  const [avatarUrl, setAvatarUrl] = useState('')

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

  const backLightPosition = new THREE.Vector3(0.5, 1.6, -1)
  const fillLightPosition = new THREE.Vector3(-0.5, 1.6, -0.5)
  const lightTarget = new THREE.Vector3(0, 1.7, 0)

  return (
    <>
      {!avatarUrl ? (
        <AvatarCreator
          subdomain="freeislet"
          config={config}
          className="size-full border-none"
          onUserAuthorized={handleUserAuthorized}
          onUserSet={handleOnUserSet}
          onAssetUnlock={handleAssetUnlocked}
          onAvatarExported={handleOnAvatarExported}
        />
      ) : (
        <Avatar
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
      )}
    </>
  )
}
