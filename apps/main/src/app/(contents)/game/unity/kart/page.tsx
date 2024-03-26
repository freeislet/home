'use client'

import { useEffect } from 'react'
import { Unity, useUnityContext, type UnityConfig } from 'react-unity-webgl'

import { UnityIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

export default function UnityKartPage() {
  const buildUrl = '/unity/Kart/Build'
  const unityConfig: UnityConfig = {
    loaderUrl: buildUrl + '/Kart.loader.js',
    dataUrl: buildUrl + '/Kart.data.unityweb',
    frameworkUrl: buildUrl + '/Kart.framework.js.unityweb',
    codeUrl: buildUrl + '/Kart.wasm.unityweb',
    // streamingAssetsUrl: 'StreamingAssets',
    // readonly memoryUrl?: string;
    // readonly symbolsUrl?: string;
    companyName: 'DefaultCompany',
    productName: 'Kart',
    productVersion: '4.0.0',
    // readonly webglContextAttributes?: WebGLContextAttributes;
    // readonly cacheControl?: (url: string) => UnityCacheControlMode;
  }
  const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext(unityConfig)
  const loadingPercentage = Math.round(loadingProgression * 100)

  // useEffect(() => {
  //   return () => {
  //     unload()
  //   }
  // }, [])
  // unload 버그 존재 (https://react-unity-webgl.dev/docs/api/unload)

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <UnityIcon />
        <span className="badge mr-1 ml-0.5">Unity</span>
        Kart 예제
      </div>
      {isLoaded === false && (
        <div className="m-auto">
          <p>Loading... {loadingPercentage}%</p>
        </div>
      )}
      <Unity unityProvider={unityProvider} className={cn('w-[960px] h-[600px] m-auto', { hidden: !isLoaded })} />
      <button className="mt-4 p-1 bg-destructive text-destructive-foreground" onClick={async () => await unload()}>
        Unload
      </button>
    </div>
  )
}
