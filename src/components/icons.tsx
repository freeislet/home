import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

type IconProps = PartialExcept<ImageProps, 'src'> & {
  size?: number
  marginRight?: number
  darkInvert?: boolean
}

export const Icon = ({
  size = 24,
  marginRight = 1,
  darkInvert = false,
  ...imageProps
}: IconProps) => {
  const marginRightClassName = marginRight && `mr-${marginRight}`

  imageProps.width ??= size
  imageProps.height ??= size
  imageProps.className = cn(
    imageProps.className,
    // marginRight && `mr-${marginRight}`, // 동적으로 이름 조합 불가 (purge 됨)
    { 'dark:invert': darkInvert }
  )
  imageProps.alt ??= ''

  const style = marginRight
    ? { marginRight: `${marginRight / 4}rem` }
    : undefined

  return <Image style={style} {...(imageProps as ImageProps)} />
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
