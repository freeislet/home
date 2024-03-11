'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="sticky origin-left left-0 right-0 bottom-0 h-px bg-pink-300"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
