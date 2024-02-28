'use client'

import { useRef } from 'react'

import { load } from '@/components/loading'
import { DiagramIcon } from '@/components/icons'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/app/(contents)/_components/scroll-ui'
import ProseLayout from '@/components/prose-layout'
import ReactFlowMdx from './reactflow.mdx'

const ReactFlowView = load(import('@/components/react-flow-view'))

export default function ReactFlowPage() {
  const docRef = useRef(null)

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-main-height">
        <div className="m-2 my-flex-row">
          <DiagramIcon className="mr-1" />
          React Flow 테스트
          <ScrollTrigger targetRef={docRef} className="ml-4">
            <DownToDocument />
          </ScrollTrigger>
        </div>
        <ReactFlowView />
      </div>
      <ScrollTarget ref={docRef} />
      <div className="my-container relative">
        <ScrollToTop text="Editor" />
        <ProseLayout>
          <ReactFlowMdx />
        </ProseLayout>
      </div>
    </>
  )
}
