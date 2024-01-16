import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type IconProps = PartialExcept<ImageProps, 'src'> & {
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
  size ??= 24
  marginRight ??= 1
  darkInvert ??= false

  const marginRightClassName = marginRight && `mr-${marginRight}`

  imageProps.width ??= size
  imageProps.height ??= size
  imageProps.className = cn(
    imageProps.className,
    // marginRight && `mr-${marginRight}`, // 동적으로 이름 조합 불가 (purge 됨)
    { 'dark:invert': darkInvert }
  )
  if (marginRight) imageProps.style = { marginRight: `${marginRight / 4}rem` }
  imageProps.alt ??= ''

  return <Image {...(imageProps as ImageProps)} />
}

type IconsProps = Omit<IconProps, 'src'>

export const Logo = (props: IconsProps) => (
  <Icon src="/cloud.svg" darkInvert {...props} />
)

export const AiIcon = (props: IconsProps) => <Icon src="/ai.svg" {...props} />

export const GeminiIcon = (props: IconsProps) => (
  <Icon src="/gemini.svg" {...props} />
)

export const DiagramIcon = (props: IconsProps) => (
  <Icon src="/diagram.svg" {...props} />
)
