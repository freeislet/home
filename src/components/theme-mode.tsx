'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export function ThemeMode() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const btnClass = 'border rounded-md p-1'

  if (!mounted) {
    // layout shift 방지용 placeholder
    return (
      <button className={`invisible ${btnClass}`}>
        <BsFillSunFill />
      </button>
    )
  }

  return (
    <button
      className={btnClass}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  )
}
