import NextImage, { ImageProps as NextImageProps } from 'next/image'

import { cn } from '@/lib/utils'

export interface ImageProps extends PartialExcept<NextImageProps, 'src'> {}

export function Image({ alt, className, width, height, sizes, ...props }: ImageProps) {
  return (
    <NextImage
      alt={alt ?? ''}
      className={cn('h-96 w-auto', className)}
      width={width ?? 0}
      height={height ?? 0}
      sizes={sizes ?? '100vw'}
      {...props}
    />
  )
}
