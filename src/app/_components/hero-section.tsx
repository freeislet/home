'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeroSection({ className, ...props }: HeroSectionProps) {
  const groupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <div className={cn('p-20', className)} {...props}>
      <motion.div variants={groupVariants} initial="hidden" whileInView="visible">
        <motion.h1 className="text-6xl font-extrabold leading-normal" variants={variants}>
          free islet's home
        </motion.h1>
        <motion.h3 className="text-3xl font-mediuem leading-normal" variants={variants}>
          Portfolio, Blog
        </motion.h3>
        <motion.h6 className="text-lg font-light leading-loose" variants={variants}>
          ...under construction
        </motion.h6>
      </motion.div>
    </div>
  )
}
