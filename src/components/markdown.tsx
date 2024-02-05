// Next.js AI Chatbot 예제 참고
// https://github.com/vercel/ai-chatbot/blob/main/components/markdown.tsx

import { FC, memo } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className
)
