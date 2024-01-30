'use client'

import Image from 'next/image'

import { docsConfig, type CatalogItem } from '@/config/docs'
import { cn } from '@/lib/utils'
import { useElementSize } from '@/components/element'
import { CatalogPathAnimation } from './catalog-path-animation'

interface CatalogSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const bgs = ['bg-[#F8E3E3]', 'bg-[#E3F1F8]', 'bg-[#E3F8EE]', 'bg-[#F4F8E3]', 'bg-[#E6E3F8]', 'bg-[#F8ECE3]']

export function CatalogSection({ className, ...props }: CatalogSectionProps) {
  const [pathContainerRef, pathContainerSize] = useElementSize()

  return (
    <div className={cn('relative p-8 pl-6 md:p-16 md:pl-12', className)} {...props}>
      <div className="space-y-6 md:space-y-12 text-gray-500">
        {docsConfig.catalog.map((item, index) => (
          <CatalogItem key={index} item={item} className={bgs[index % bgs.length]} />
        ))}
      </div>
      <div ref={pathContainerRef} className="absolute inset-0 m-4 md:m-8">
        <CatalogPathAnimation containerWidth={pathContainerSize.width} containerHeight={pathContainerSize.height} />
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
