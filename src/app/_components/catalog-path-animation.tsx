'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

import { cn } from '@/lib/utils'
import PathScaler from '@/lib/path-scaler'

interface CatalogPathAnimationProps extends React.SVGAttributes<SVGElement> {
  containerWidth: number
  containerHeight: number
}

const path = 'M0,0 H97 S 100,0 100,3 V97 S 100,100 97,100 h-10'
const pathWidth = 100
const pathHeight = 100
const pathScaler = new PathScaler(path, pathWidth, pathHeight)

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
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['100px end', '1.05 end'] })

  const [offsetDistance, setOffsetDistance] = useState('0%')
  useLayoutEffect(
    () => scrollYProgress.on('change', (latestProgress) => setOffsetDistance(`${latestProgress * 100}%`)),
    [scrollYProgress]
  )

  return (
    <>
      <svg
        ref={scrollRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${pathWidth} ${pathHeight}`}
        preserveAspectRatio="none"
        className={cn('overflow-visible', className)}
        {...props}
      >
        <path
          d={path}
          fill="transparent"
          stroke="rgba(100, 100, 160, 0.3)"
          strokeWidth="7px"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <motion.img
        src="./spaceship.svg"
        className="absolute top-0 left-0 size-14"
        style={{
          offsetPath,
          offsetDistance,
          transform: 'rotate(90deg)',
        }}
      />
    </>
  )
}
