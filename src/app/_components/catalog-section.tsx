'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { docsConfig, type CatalogItem } from '@/config/docs'
import { cn } from '@/lib/utils'

interface CatalogSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CatalogSection({ className, ...props }: CatalogSectionProps) {
  const bgs = ['bg-[#F8E3E3]', 'bg-[#E3F1F8]', 'bg-[#E3F8EE]', 'bg-[#F4F8E3]', 'bg-[#E6E3F8]', 'bg-[#F8ECE3]']

  return (
    <div className={cn('relative p-8 pl-6 md:p-16 md:pl-12', className)} {...props}>
      <div className="space-y-6 md:space-y-12 text-gray-500">
        {docsConfig.catalog.map((item, index) => (
          <CatalogItem key={index} item={item} className={bgs[index % bgs.length]} />
        ))}
      </div>
      <div className="absolute inset-0 m-4 md:m-8">
        <ScrollPath />
      </div>
    </div>
  )
}

function CatalogItem({ item, className }: { item: CatalogItem; className?: string }) {
  return (
    <section className={cn('flex rounded-3xl overflow-hidden', className)}>
      <div className="flex-none max-w-[20vw] sm:max-w-[30vw] max-h-[80vh]">
        <Image src={item.imageSrc} alt="" sizes="40vw" className="w-auto h-auto max-h-full rounded-br-2xl" />
      </div>
      <div className="p-3 sm:p-6">
        <h5 className="mb-2 sm:mb-4">{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </section>
  )
}

function ScrollPath({ className, ...props }: React.SVGAttributes<SVGElement>) {
  // "M0,0 C 25,1 20,-1 30,0 C 40,1 40,-1 50,0 C 55,1 60,-2 70,0 C 80,1 90,-1 100,0"
  const d = 'M0,0 H97 S 100,0 100,3 V97 S 100,100 97,100 h-10'

  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn('overflow-visible', className)}
        {...props}
      >
        <path
          d={d}
          fill="transparent"
          stroke="rgba(100, 100, 160, 0.3)"
          strokeWidth="7px"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          id="scroll-path"
        />
      </svg>
      <motion.img
        src="./spaceship.svg"
        className="absolute top-0 left-0 size-14"
        style={{ offsetPath: `path("${d}")`, transform: 'rotate(90deg)' }}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{ duration: 10 }}
      />
    </>
  )
}
