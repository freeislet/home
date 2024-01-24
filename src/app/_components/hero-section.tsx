'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeroSection({ className, ...props }: HeroSectionProps) {
  return (
    <div className={cn('', className)} {...props}>
      <Text className="text-6xl font-extrabold leading-normal">free islet's home</Text>
      <Text className="text-3xl font-mediuem leading-normal" delay={0.2}>
        Portfolio, Blog
      </Text>
      <Text className="text-lg font-light leading-loose" delay={0.6}>
        ...under construction
      </Text>
    </div>
  )
}

interface TextProps {
  children: React.ReactNode
  className: string
  duration?: number
  delay?: number
}

function Text({ children, className, duration = 0.5, delay = 0 }: TextProps) {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  }

  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="visible">
      {children}
    </motion.div>
  )
}
