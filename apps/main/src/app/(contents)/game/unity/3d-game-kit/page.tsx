'use client'

import { Unity, useUnityContext, type UnityConfig } from 'react-unity-webgl'

import { UnityIcon } from '@/components/icons'
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
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext(unityConfig)
  const loadingPercentage = Math.round(loadingProgression * 100)

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <UnityIcon />
        <span className="badge mr-1 ml-0.5">Unity</span>
        3D Game Kit Lite 예제
      </div>
      {isLoaded === false && (
        <div className="m-auto">
          <p>Loading... {loadingPercentage}%</p>
        </div>
      )}
      <Unity unityProvider={unityProvider} className={cn('w-[960px] h-[600px] m-auto', { hidden: !isLoaded })} />
    </div>
  )
}
