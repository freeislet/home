'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

import { docsConfig } from '@/config/docs'
import { useParallax } from '@/components/motion'

interface CatalogSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CatalogSection(props: CatalogSectionProps) {
  return (
    <div {...props}>
      {docsConfig.catalog.map(({ image, title }, index) => (
        <ParallaxImage key={index} text={title} image={image} />
      ))}
    </div>
  )
}

function ParallaxImage({ text, image }: { text: string; image: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="relative flex justify-center">
      <div ref={ref} className="relative max-h-[90vh] h-96 w-48 m-5">
        {image}
      </div>
      <motion.h2 style={{ y }}>{text}</motion.h2>
    </section>
  )
}
