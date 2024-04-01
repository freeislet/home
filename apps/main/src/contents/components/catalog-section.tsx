'use client'

import Image from 'next/image'

import { catalog, type CatalogItem } from '@/contents/catalog'
import { cn } from '@/lib/utils'
import { useElementSize } from '@/hooks/element'
import { CatalogPathAnimation } from './catalog-path-animation'

interface CatalogSectionProps extends React.ComponentProps<'div'> {}

const bgs = ['bg-[#E6E3F8]', 'bg-[#E3F1F8]', 'bg-[#E3F8EE]', 'bg-[#F4F8E3]', 'bg-[#F8E3E3]', 'bg-[#F8ECE3]']

export function CatalogSection({ className, ...props }: CatalogSectionProps) {
  const [pathContainerRef, pathContainerSize] = useElementSize()

  return (
    <div className={cn('relative p-12 pl-6 md:p-20 md:pl-12', className)} {...props}>
      <div className="space-y-6 md:space-y-12 text-gray-500">
        {catalog.map((item, index) => (
          <CatalogItem key={index} item={item} className={bgs[index % bgs.length]} />
        ))}
      </div>
      <div ref={pathContainerRef} className="absolute inset-0 m-6 md:m-10">
        <CatalogPathAnimation containerWidth={pathContainerSize.width} containerHeight={pathContainerSize.height} />
      </div>
    </div>
  )
}

function CatalogItem({ item, className }: { item: CatalogItem; className?: string }) {
  const transparent = false //!item.image && !item.title
  return (
    <section
      className={cn('flex', !transparent && 'rounded-3xl overflow-hidden', className, transparent && 'bg-transparent')}
    >
      {item.image && (
        <div className="flex-none max-w-[20vw] sm:max-w-[25vw] max-h-[80vh]">
          <Image src={item.image} alt="" sizes="40vw" className="w-auto h-auto max-h-full rounded-br-2xl" />
        </div>
      )}
      {item.title ? (
        <div className="p-3 sm:p-6 w-full">
          <h5 className="mb-2 sm:mb-4 text-2xl">{item.title}</h5>
          <hr />
          <p>{item.content}</p>
        </div>
      ) : (
        <>{item.content}</>
      )}
    </section>
  )
}
