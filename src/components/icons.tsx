import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

const DEFAULT_LAYOUT = 'inline size-6'

interface IconProps extends PartialExcept<ImageProps, 'src'> {
  darkInvert?: boolean
  imageClassName?: string
}

export const Icon = ({ darkInvert = false, imageClassName, alt, className, ...props }: IconProps) => {
  return (
    <div className={cn(DEFAULT_LAYOUT, className, 'relative')}>
      <Image alt={alt ?? ''} className={cn(imageClassName, { 'dark:invert': darkInvert })} fill {...props} />
    </div>
  )
}

interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

export const SvgIcon = ({ children, className, ...props }: SvgIconProps) => {
  return (
    <svg className={cn(DEFAULT_LAYOUT, className)} {...props}>
      {children}
    </svg>
  )
}

type IconPresetProps = Omit<IconProps, 'src'>

export const Logo = (props: IconPresetProps) => <Icon src="/cloud.svg" darkInvert {...props} />

export const GameDevIcon = (props: IconPresetProps) => <Icon src="/game-card.svg" {...props} />

export const WebDevIcon = (props: IconPresetProps) => <Icon src="/coding-web.svg" {...props} />

export const DiagramIcon = (props: IconPresetProps) => <Icon src="/diagram.svg" {...props} />

export const AiIcon = (props: IconPresetProps) => <Icon src="/ai.svg" {...props} />

export const GeminiIcon = (props: IconPresetProps) => <Icon src="/gemini.svg" {...props} />

export const GoogleIcon = (props: SvgIconProps) => (
  <SvgIcon role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </SvgIcon>
)

export const GitHubIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 438.549 438.549" {...props}>
    <path
      fill="currentColor"
      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
    ></path>
  </SvgIcon>
)

export const OpenAiIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    fill="currentColor"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-4', className)}
    {...props}
  >
    <title>OpenAI icon</title>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </SvgIcon>
)

export const UserIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
  </SvgIcon>
)

export const ContentlayerIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    width="22"
    height="24"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-4', className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.43 0.92268C11.1426 0.398115 12.1177 0.407491 12.82 0.945665L19.9928 6.44198C21.0266 7.23419 21.0266 8.78771 19.9928 9.57992L17.2573 11.6761L20.0379 13.9037C21.0493 14.7139 21.022 16.2574 19.9826 17.0315L12.62 22.5153C11.8634 23.0788 10.8134 23.0332 10.1089 22.4063L4.34789 17.2802L3.54224 16.5903C-0.0530112 13.5114 0.390183 7.84094 4.41274 5.35212L10.43 0.92268ZM16.1955 10.8254L12.8515 8.14659C12.1375 7.57457 11.1235 7.56365 10.3972 8.12017L7.92298 10.0161C6.88913 10.8084 6.88913 12.3619 7.92298 13.1541L10.4154 15.064C11.129 15.6108 12.1224 15.6108 12.836 15.064L16.1773 12.5036L19.2086 14.932C19.5457 15.2021 19.5366 15.7166 19.1901 15.9747L11.8275 21.4585C11.5753 21.6463 11.2253 21.6311 10.9905 21.4221L5.2248 16.2918L4.40495 15.5895C1.48255 13.0869 1.84941 8.47338 5.13088 6.46078L5.15471 6.44617L11.2165 1.98398C11.454 1.80913 11.779 1.81225 12.0132 1.99164L19.1859 7.48796C19.5305 7.75203 19.5305 8.26987 19.1859 8.53394L16.1955 10.8254ZM15.1155 11.653L12.0291 14.018C11.7913 14.2003 11.4601 14.2003 11.2223 14.018L8.72984 12.1081C8.38523 11.844 8.38523 11.3262 8.72984 11.0621L11.2041 9.16615C11.4462 8.98065 11.7842 8.98429 12.0222 9.17496L15.1155 11.653Z"
      fill="#7C3AED"
      stroke="#7C3AED"
      strokeWidth="0.5"
    ></path>
  </SvgIcon>
)

export const SpinnerIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('animate-spin', className)}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </SvgIcon>
)

export const CopyIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
  </SvgIcon>
)

export const CheckIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
  </SvgIcon>
)

export const DownloadIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
  </SvgIcon>
)

export const StopIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z" />
  </SvgIcon>
)

export const ArrowElbowIcon = ({ className, ...props }: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={cn('size-4', className)}
    {...props}
  >
    <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
  </SvgIcon>
)
