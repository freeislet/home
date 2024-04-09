'use client'

// import { useEffect } from 'react'
import { Unity, useUnityContext, type UnityConfig } from 'react-unity-webgl'

import { cn } from '@/lib/utils'

export default function Unity3dGameKitPage() {
  const buildUrl = '/unity/3DGameKit/Build'
  const unityConfig: UnityConfig = {
    loaderUrl: buildUrl + '/3DGameKit.loader.js',
    dataUrl: buildUrl + '/3DGameKit.data.unityweb',
    frameworkUrl: buildUrl + '/3DGameKit.framework.js.unityweb',
    codeUrl: buildUrl + '/3DGameKit.wasm.unityweb',
    // streamingAssetsUrl: 'StreamingAssets',
    // readonly memoryUrl?: string;
    // readonly symbolsUrl?: string;
    companyName: 'DefaultCompany',
    productName: '3DGameKit',
    productVersion: '1.0',
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
    <>
      {isLoaded === false && (
        <div className="m-auto">
          <p>Loading... {loadingPercentage}%</p>
        </div>
      )}
      <Unity unityProvider={unityProvider} className={cn('w-[960px] h-[600px] m-auto', { hidden: !isLoaded })} />
      <button className="mt-4 p-1 bg-destructive text-destructive-foreground" onClick={async () => await unload()}>
        Unload
      </button>
    </>
  )
}
