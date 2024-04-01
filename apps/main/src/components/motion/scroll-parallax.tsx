/*
  넣으려다 관둠. 필요할 때 컴포넌트 구현
*/

'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'

import { catalog, type CatalogItem } from '@/contents/catalog'
import { cn } from '@/lib/utils'
import { useParallax } from '@/components/motion'

interface CatalogSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CatalogSection({ className, ...props }: CatalogSectionProps) {
  return (
    <div className={cn('pb-[100px]', className)} {...props}>
      {catalog.map((item, index) => (
        <ParallaxImage key={index} item={item} />
      ))}
    </div>
  )
}

function ParallaxImage({ item }: { item: CatalogItem }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="my-flex-row p-12 gap-12 snap-center">
      <div ref={ref} className="flex-none max-h-[90vh] h-96">
        <Image src={item.imageSrc} alt="" className="w-auto h-full" />
      </div>
      <motion.div style={{ y }}>
        <h3>{item.title}</h3>
        <span>{item.description}</span>
      </motion.div>
    </section>
  )
}
