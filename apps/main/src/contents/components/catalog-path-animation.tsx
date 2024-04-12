'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

import { cn } from '@/lib/utils'
import PathScaler from '@/lib/path-scaler'

interface CatalogPathAnimationProps extends React.SVGAttributes<SVGElement> {
  containerWidth: number
  containerHeight: number
}

const path = 'M50,0 H97 S 100,0 100,3 V97 S 100,100 97,100 h-20'
const pathWidth = 100
const pathHeight = 100
const pathScaler = new PathScaler(path, pathWidth, pathHeight)

const spriteAnimation = { rotate: [0, -6, 6, -4, 4, 0, 0] }
const spriteTransition = { repeat: Infinity, duration: 1.2 }

export function CatalogPathAnimation({
  containerWidth,
  containerHeight,
  className,
  ...props
}: CatalogPathAnimationProps) {
  const offsetPath = useMemo(() => {
    const scaledPath = pathScaler.getScaledPath(containerWidth, containerHeight)
    return `path("${scaledPath}")`
  }, [containerWidth, containerHeight])

  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 80%', `${containerHeight + 200}px end`],
  })
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [loading, setLoading] = useState(true)
  const offsetDistance = useMotionValue('0%')
  useEffect(() => {
    setLoading(false)
    return pathProgress.on('change', (latest) => offsetDistance.set(`${latest * 100}%`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <svg
        ref={scrollRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${pathWidth} ${pathHeight}`}
        preserveAspectRatio="none"
        className={cn('overflow-visible', className)}
        style={{ filter: 'drop-shadow(2px 3px #5556)' }}
        {...props}
      >
        <path
          d={path}
          fill="transparent"
          stroke="rgb(200, 200, 240)"
          strokeWidth="5px"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className={cn('absolute top-0 left-0 size-12 md:size-20', { hidden: loading })}
        style={{ filter: 'drop-shadow(0.125rem 0.25rem 2px #0005)' }}
      >
        <motion.div style={{ offsetPath, offsetDistance }} animate={spriteAnimation} transition={spriteTransition}>
          <motion.img src="./image/landing/rocket.svg" style={{ transform: 'rotate(45deg)' }} />
        </motion.div>
      </div>
    </>
  )
}
