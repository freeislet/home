'use client'

import { useRef } from 'react'

import { load } from '@/components/loading'
import { DiagramIcon } from '@/components/icons'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/app/(contents)/_components/scroll-ui'
import ProseLayout from '@/components/prose-layout'
import FlumeMdx from './flume.mdx'

const FlumeEditor = load(import('@/components/flume-editor'))

export default function FlumePage() {
  const docRef = useRef(null)

  return (
    <>
      <div className="my-grid-main">
        <div className="my-flex-row m-2">
          <DiagramIcon className="mr-1" />
          Flume 테스트
          <ScrollTrigger targetRef={docRef} className="ml-4">
            <DownToDocument />
          </ScrollTrigger>
        </div>
        <FlumeEditor />
      </div>
      <ScrollTarget ref={docRef} />
      <div className="my-container relative">
        <ScrollToTop text="Editor" />
        <ProseLayout>
          <FlumeMdx />
        </ProseLayout>
      </div>
    </>
  )
}
