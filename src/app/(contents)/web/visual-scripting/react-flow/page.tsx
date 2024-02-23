'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'

import ReactFlowMdx from './reactflow.mdx'
import ProseLayout from '@/components/prose-layout'
import { DiagramIcon } from '@/components/icons'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument } from '@/app/(contents)/_components/scroll-ui'
import Loading from '@/app/(contents)/_components/loading'

const ReactFlowView = dynamic(() => import('@/components/react-flow-view'), { ssr: false, loading: () => <Loading /> })

export default function ReactFlowPage() {
  const docRef = useRef(null)

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-main-height">
        <div className="m-2 my-flex-row">
          <DiagramIcon className="mr-1" />
          React Flow 테스트
          <ScrollTrigger targetRef={docRef} className="ml-5">
            <DownToDocument />
          </ScrollTrigger>
        </div>
        <ReactFlowView />
      </div>
      <ScrollTarget ref={docRef} />
      <ProseLayout container>
        <ReactFlowMdx />
      </ProseLayout>
    </>
  )
}
