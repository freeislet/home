'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

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
    <div
      className={cn('relative max-h-[calc(100vh-5.5rem)] h-[50rem] bg-gradient-space text-white', className)}
      {...props}
    >
      <Image
        className="absolute h-full"
        src="/spaceboy3.jpeg"
        alt="hero image"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 20%"
      ></Image>
      <motion.div variants={groupVariants} initial="hidden" whileInView="visible" className="absolute p-16 space-y-3">
        <motion.h1 variants={variants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold">
          free islet&apos;s home
        </motion.h1>
        <motion.h3 variants={variants} className="text-2xl sm:text-3xl font-mediuem">
          Portfolio, Blog
        </motion.h3>
        <motion.h6 variants={variants} className="text-lg font-light">
          ...under construction
        </motion.h6>
      </motion.div>
    </div>
  )
}
