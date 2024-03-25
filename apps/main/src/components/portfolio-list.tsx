import Link from 'next/link'

import { PortfolioItem, filterValidPortfolio } from '@/lib/portfolio'
import { cn } from '@/lib/utils'
import { Image, ImageProps } from '@/components/image'

export interface PortfolioListProps extends React.ComponentProps<'div'> {
  portfolio: PortfolioItem[]
}

export default function PortfolioList({ portfolio, className, ...props }: PortfolioListProps) {
  const validPortfolio = filterValidPortfolio(portfolio)

  return (
    <div className={cn('text-4', className)} {...props}>
      <table>
        <tbody>{validPortfolio.map((item, index) => row(item, index))}</tbody>
      </table>
    </div>
  )
}

function row(item: PortfolioItem, index: number) {
  return (
    <tr key={index}>
      <td className="w-72">
        <Link href={item.href}>{image(item.thumbnail, { className: 'w-full h-auto my-0' })}</Link>
      </td>
      <td className="align-top">
        <Link href={item.href} className="text-lg no-underline">
          {item.title}
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
    return <Image src={path} {...imageProps} />
  } else {
    const node = pathOrNode as React.ReactNode
    return node
  }
}
