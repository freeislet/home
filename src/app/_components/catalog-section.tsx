'use client'

import Image from 'next/image'

import { docsConfig, type CatalogItem } from '@/config/docs'
import { cn } from '@/lib/utils'

interface CatalogSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CatalogSection({ className, ...props }: CatalogSectionProps) {
  const bgs = ['bg-[#F8E3E3]', 'bg-[#E3F1F8]', 'bg-[#E3F8EE]', 'bg-[#F4F8E3]', 'bg-[#E6E3F8]', 'bg-[#F8ECE3]']

  return (
    <div className={cn('p-6 md:p-12 pb-[100px] space-y-6 md:space-y-12 text-gray-500', className)} {...props}>
      {docsConfig.catalog.map((item, index) => (
        <CatalogItem key={index} item={item} className={bgs[index % bgs.length]} />
      ))}
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
        <h5 className="mb-4">{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </section>
  )
}
