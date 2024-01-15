import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type IconProps = PartialOmit<ImageProps, 'src'> & {
  size?: number
  marginRight?: number
  darkInvert?: boolean
}

export const Icon = ({
  size,
  marginRight,
  darkInvert,
  ...imageProps
}: IconProps) => {
  size ??= 32
  marginRight ??= 1
  darkInvert ??= true

  imageProps.width ??= size
  imageProps.height ??= size
  imageProps.className = cn(
    imageProps.className,
    marginRight && `mr-${marginRight}`,
    { 'dark:invert': darkInvert }
  )
  imageProps.alt ??= ''

  return <Image {...(imageProps as ImageProps)} />
}

type IconsProps = Omit<IconProps, 'src'>

export const Logo = (props: IconsProps) => (
  <Icon src="/cloud.svg" size={24} {...props} />
)
