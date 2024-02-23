'use client'

import dynamic from 'next/dynamic'

import Loading from '../../_components/loading'
import ProseLayout from '@/components/prose-layout'
import ReactFlowMdx from './reactflow.mdx'

const ReactFlowView = dynamic(() => import('@/components/react-flow-view'), { ssr: false, loading: () => <Loading /> })

export default function ReactFlowPage() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-main-height">
        <div className="m-2">
          <span>▪️ React Flow 테스트</span>
        </div>
        <ReactFlowView />
      </div>
      <ProseLayout container>
        <ReactFlowMdx />
      </ProseLayout>
    </>
  )
}
