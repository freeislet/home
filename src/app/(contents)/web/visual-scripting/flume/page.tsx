'use client'

import FlumeEditor from '@/components/flume-editor'

export default function FlumePage() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="m-2">Flume 테스트</div>
      <FlumeEditor />
    </div>
  )
}
