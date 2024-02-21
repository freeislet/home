import ReactFlowView from '@/components/react-flow-view'

export default function ReactFlowPage() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="m-2">
        React Flow 테스트{' '}
        <span>
          (<a href="https://reactflow.dev/showcase">Showcase</a>)
        </span>
      </div>
      <ReactFlowView />
    </div>
  )
}
