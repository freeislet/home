import { type UseChatHelpers } from 'ai/react'

import { ChatPrompt } from './chat-prompt'
import { StopIcon } from './icons'
import { Button } from './ui/button'

export interface ChatPanelProps extends Pick<UseChatHelpers, 'append' | 'isLoading' | 'stop' | 'input' | 'setInput'> {
  id?: string
}

export function ChatPanel({ id, isLoading, stop, append, input, setInput }: ChatPanelProps) {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <Button variant="outline" onClick={() => stop()} className="bg-background">
              <StopIcon className="mr-2" />
              Stop generating
            </Button>
          ) : null}
        </div>
        <div className="px-4 py-2 md:py-4 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border">
          <ChatPrompt
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: 'user',
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
