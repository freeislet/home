'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

import { cn } from '@/lib/utils'

export function ThemeMode() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const invisible = !mounted // layout shift 방지를 위해 mount 전에도 invisible 렌더

  return (
    <button
      className={cn('border rounded-md p-1', { invisible })}
      onClick={() =>
        resolvedTheme && setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }
    >
      {resolvedTheme === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  )
}
