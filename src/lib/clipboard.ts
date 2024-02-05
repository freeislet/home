// Next.js AI Chatbot 예제 참고
// https://github.com/vercel/ai-chatbot/blob/main/lib/hooks/use-copy-to-clipboard.tsx

'use client'

import * as React from 'react'

export interface useCopyToClipboardProps {
  timeout?: number
}

export function useCopyToClipboard({ timeout = 2000 }: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
