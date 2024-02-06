'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ChatList } from './chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ScrollAnchor } from './scroll-anchor'

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
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <div>Chatbot 테스트</div>
        )}
      </div>
      <ChatPanel id={id} isLoading={isLoading} stop={stop} append={append} input={input} setInput={setInput} />
    </>
  )
}
