import LiteGraphCanvas from '@/components/lite-graph-canvas'

export default function LiteGraphPage() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div>litegraph.js 테스트</div>
      <LiteGraphCanvas />
    </div>
  )
}
