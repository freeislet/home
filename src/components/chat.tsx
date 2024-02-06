'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ChatList } from './chat-list'
import { ChatPanel } from './chat-panel'
import { ScrollAnchor } from './scroll-anchor'
import { OpenAiIcon } from './icons'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const { messages, append, stop, isLoading, input, setInput } = useChat({
    api: '/api/gemini/chat',
    id,
    initialMessages,
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
    },
  })

  return (
    <>
      <div className={cn('flex-1 py-4', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ScrollAnchor trackVisibility={isLoading} rootMargin="-56px 0px -175px 0px" />
          </>
        ) : (
          <div className="my-flex-row space-x-1 text-muted-foreground">
            <OpenAiIcon />
            <span>아래 입력란에 프롬프트를 입력하세요.</span>
          </div>
        )}
      </div>
      <ChatPanel id={id} isLoading={isLoading} stop={stop} append={append} input={input} setInput={setInput} />
    </>
  )
}
