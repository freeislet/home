'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Image, ImageProps } from '@/components/image'
import IconText from '@/components/icon-text'

export interface PortfolioListProps extends React.ComponentProps<'div'> {
  portfolio: PortfolioItem[]
}

export default function PortfolioList({ portfolio, className, ...props }: PortfolioListProps) {
  return (
    <div className={cn('text-4', className)} {...props}>
      <table>
        <tbody>{portfolio.map((item, index) => row(item, index))}</tbody>
      </table>
    </div>
  )
}

function row(item: PortfolioItem, index: number) {
  return (
    <tr key={index}>
      <td className="w-[20vw] max-w-72 min-w-28">
        <Link href={item.href}>{image(item.thumbnail, { className: 'w-full h-auto my-0 rounded-sm' })}</Link>
      </td>
      <td className="align-top">
        <Link href={item.href} className="text-lg no-underline">
          <IconText icon={item.icon} text={item.title} />
        </Link>
        <hr className="my-1"></hr>
        <span className="">{item.description}</span>
      </td>
    </tr>
  )
}

type ImageExtraProps = Omit<ImageProps, 'src'>

function image(pathOrNode: string | React.ReactNode, imageProps?: ImageExtraProps) {
  if (typeof pathOrNode === 'string') {
    const path = pathOrNode as string
    // eslint-disable-next-line
    return <Image src={path} {...imageProps} />
  } else {
    const node = pathOrNode as React.ReactNode
    return node
  }
}
