// Next.js AI Chatbot 예제 참고
// https://github.com/vercel/ai-chatbot/blob/main/components/chat-message.tsx
//
// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { CodeBlock } from '@/components/codeblock'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { OpenAiIcon, UserIcon } from '@/components/icons'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn('group relative mb-4 flex items-start md:-ml-12')} {...props}>
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user' ? 'bg-background' : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <UserIcon /> : <OpenAiIcon />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, className, children, ...props }) {
              // TODO: children string 처리
              // if (children.length) {
              //   if (children[0] == '▍') {
              //     return <span className="mt-1 cursor-default animate-pulse">▍</span>
              //   }

              //   children[0] = (children[0] as string).replace('`▍`', '▍')
              // }

              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
