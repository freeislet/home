'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'

import ReteMdx from './rete.mdx'
import ProseLayout from '@/components/prose-layout'
import { DiagramIcon } from '@/components/icons'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/app/(contents)/_components/scroll-ui'
import Loading from '@/app/(contents)/_components/loading'

const ReteEditor = dynamic(() => import('@/components/rete-editor'), { ssr: false, loading: () => <Loading /> })

export default function RetePage() {
  const docRef = useRef(null)

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-main-height">
        <div className="m-2 my-flex-row">
          <DiagramIcon className="mr-1" />
          Rete.js 테스트
          <ScrollTrigger targetRef={docRef} className="ml-4">
            <DownToDocument />
          </ScrollTrigger>
        </div>
        <ReteEditor className="border-y" />
      </div>
      <ScrollTarget ref={docRef} />
      <div className="my-container relative">
        <ScrollToTop text="Editor" />
        <ProseLayout>
          <ReteMdx />
        </ProseLayout>
      </div>
    </>
  )
}
