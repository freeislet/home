'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import heroImage from '~/public/spaceboy3.jpeg'

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeroSection({ className, ...props }: HeroSectionProps) {
  const groupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  }
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className={cn('relative min-h-96 max-h-main-height h-[50rem]', className)} {...props}>
      <Image
        alt="space boy"
        src={heroImage}
        placeholder="blur"
        quality={75}
        fill
        className="object-cover object-[50%_20%]"
      />
      <motion.div
        variants={groupVariants}
        initial="hidden"
        whileInView="visible"
        className="absolute p-16 space-y-2 sm:space-y-3 text-white"
      >
        <motion.h1 variants={variants} className="md:text-7xl">
          free islet&apos;s home
        </motion.h1>
        <motion.h2 variants={variants} className="font-medium">
          Portfolio, Blog
        </motion.h2>
        <motion.p variants={variants} className="sm:text-lg font-light">
          ...under construction
        </motion.p>
      </motion.div>
    </div>
  )
}
