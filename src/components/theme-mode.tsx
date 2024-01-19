'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export function ThemeMode() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="m-px size-6 invisible" />

  return (
    <button className="border rounded-md p-1" onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
      {resolvedTheme === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  )
}
