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
    <div className={cn('relative min-h-96 max-h-[calc(100vh-3.5rem)] h-[50rem]', className)} {...props}>
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
        <motion.h1 variants={variants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold">
          free islet&apos;s home
        </motion.h1>
        <motion.h3 variants={variants} className="text-2xl sm:text-3xl font-mediuem">
          Portfolio, Blog
        </motion.h3>
        <motion.h6 variants={variants} className="text-base sm:text-lg font-light">
          ...under construction
        </motion.h6>
      </motion.div>
    </div>
  )
}
