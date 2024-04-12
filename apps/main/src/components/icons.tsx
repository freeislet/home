import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

const DEFAULT_LAYOUT = 'inline size-6'

interface IconProps extends PartialExcept<ImageProps, 'src'> {
  darkInvert?: boolean
  imageClassName?: string
}

export const Icon = ({ darkInvert = false, imageClassName, alt, className, sizes, ...props }: IconProps) => {
  return (
    <div className={cn(DEFAULT_LAYOUT, className, 'relative')}>
      <Image
        alt={alt ?? ''}
        className={cn(imageClassName, { 'dark:invert': darkInvert })}
        sizes={sizes ?? '24px'}
        fill
        {...props}
      />
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

export const Logo = (props: IconPresetProps) => <Icon src="/icon/cloud.svg" darkInvert {...props} />
export const GameDevIcon = (props: IconPresetProps) => <Icon src="/icon/game-card.svg" {...props} />
export const CubeIcon = (props: IconPresetProps) => <Icon src="/icon/cube.svg" {...props} />
export const AvatarIcon = (props: IconPresetProps) => <Icon src="/icon/avatar.svg" {...props} />
export const MediaPipeIcon = (props: IconPresetProps) => <Icon src="/icon/mediapipe.png" {...props} />
export const WebDevIcon = (props: IconPresetProps) => <Icon src="/icon/coding-web.svg" {...props} />
export const CodeMirrorIcon = (props: IconPresetProps) => <Icon src="/icon/codemirror.svg" {...props} />
export const MonacoEditorIcon = (props: IconPresetProps) => <Icon src="/icon/monaco-editor.svg" {...props} />
export const DiagramIcon = (props: IconPresetProps) => <Icon src="/icon/diagram.svg" {...props} />
export const AiIcon = (props: IconPresetProps) => <Icon src="/icon/ai.svg" {...props} />
export const GeminiIcon = (props: IconPresetProps) => <Icon src="/icon/gemini.svg" {...props} />

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

export const ThreeJsIcon = (props: SvgIconProps) => (
  <SvgIcon
    fill="none"
    strokeLinecap="square"
    strokeMiterlimit="10"
    version="1.1"
    viewBox="0 0 226.77 226.77"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      transform="translate(8.964 4.2527)"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <path d="m63.02 200.61-43.213-174.94 173.23 49.874z" />
      <path d="m106.39 50.612 21.591 87.496-86.567-24.945z" />
      <path d="m84.91 125.03-10.724-43.465 43.008 12.346z" />
      <path d="m63.458 38.153 10.724 43.465-43.008-12.346z" />
      <path d="m149.47 62.93 10.724 43.465-43.008-12.346z" />
      <path d="m84.915 125.06 10.724 43.465-43.008-12.346z" />
    </g>
  </SvgIcon>
)

export const UnityIcon = (props: SvgIconProps) => (
  <SvgIcon
    fill="currentColor"
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M26.531 25.599l-5.728-9.599 5.728-9.599 2.803 9.599zM13.864 24.667l-7.197-7.068h11.469l5.728 9.599zM13.864 7.197l10-2.531-5.728 9.599h-11.605c0 0.136 7.333-7.068 7.333-7.068zM28.531 0l-13.061 3.333-2 3.333h-3.871l-9.599 9.333 9.599 9.333h3.871l1.864 3.333 13.068 3.333 3.463-12.667-1.864-3.333 2-3.333z" />
  </SvgIcon>
)

export const ReadyPlayerMeIcon = (props: SvgIconProps) => (
  <SvgIcon xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 48" fill="none" {...props}>
    <g clipPath="url(#clip0_212_39988)">
      <path
        d="M41.1433 3.15429L41.4176 5.02857H45.2119L44.1147 0H39.0405L35.9319 5.02857H40.0919L41.1433 3.15429Z"
        fill="currentColor"
      />
      <path
        d="M45.2565 13.1201L43.8394 6.40015H40.0451L40.3194 8.27443H37.6222L38.7194 6.40015H34.5594L30.4451 13.1201H34.9251L35.8851 11.383H40.8222L41.0965 13.1201H45.2565Z"
        fill="currentColor"
      />
      <path
        d="M57.0508 12.2973C58.3765 11.7487 59.3822 10.9259 60.0679 9.92015C60.7536 8.91443 61.1194 7.77158 61.1194 6.40015H56.7765C56.7765 6.53729 56.8222 6.62872 56.8222 6.76586C56.8222 7.72586 56.5022 8.45729 55.8165 9.00586C55.1308 9.55443 54.2622 9.82872 53.1651 9.82872H51.5194L52.2051 6.40015H47.9994L46.6279 13.1201H52.3879C54.1708 13.1201 55.7251 12.8459 57.0508 12.2973Z"
        fill="currentColor"
      />
      <path
        d="M53.9435 3.29149H55.6349C56.5035 3.29149 57.1435 3.47435 57.5549 3.79435C57.8749 4.06863 58.1035 4.48006 58.1492 5.02863H62.4921C62.4921 5.02863 62.4921 5.02863 62.4921 4.98292C62.4921 3.3372 61.9435 2.10292 60.8921 1.23435C59.8406 0.411489 58.2864 -0.0456543 56.1835 -0.0456543H50.4235L49.3721 5.02863H53.5321L53.9435 3.29149Z"
        fill="currentColor"
      />
      <path
        d="M68.7996 8.91443L70.9024 6.40015H63.5881L64.5938 8.73158L63.6796 13.1201H67.931L68.7996 8.91443Z"
        fill="currentColor"
      />
      <path
        d="M72.2746 5.02857L76.5717 0H72.0003L68.6631 4.16L67.0631 0H62.6746L64.9603 5.02857H72.2746Z"
        fill="currentColor"
      />
      <path
        d="M11.8857 2.92571H13.7143C14.3086 2.92571 14.7657 3.01714 14.9943 3.15429C15.2686 3.29143 15.36 3.56571 15.36 3.93143C15.36 4.48 15.0857 4.84571 14.5371 5.02857H19.1543C19.2914 4.61714 19.3829 4.16 19.3829 3.65714C19.3829 2.51429 18.9714 1.6 18.1029 0.96C17.2343 0.32 16.0914 0 14.6286 0H8.41142L7.81714 2.92571H11.8857Z"
        fill="currentColor"
      />
      <path d="M32.9603 0H22.3546L21.7146 2.97143H32.366L32.9603 0Z" fill="currentColor" />
      <path
        d="M27.0176 5.4857L27.1548 4.8457H21.4405L21.3033 5.4857L20.8462 7.77142H26.5605L27.0176 5.4857Z"
        fill="currentColor"
      />
      <path d="M29.9424 10.1487H19.1539L18.5596 13.1201H29.3481L29.9424 10.1487Z" fill="currentColor" />
      <path
        d="M24.1827 26.7429H18.2399L18.9256 23.4058H14.6742L13.3027 30.1258H23.497L24.1827 26.7429Z"
        fill="currentColor"
      />
      <path d="M16.0454 22.0344H20.2968L21.3026 17.0059H17.0968L16.0454 22.0344Z" fill="currentColor" />
      <path
        d="M30.3084 28.3886H35.1998L35.5198 30.1258H39.6798L38.217 23.4058H34.4684L34.7427 25.28H32.0456L33.097 23.4058H28.9827L24.8684 30.1258H29.3484L30.3084 28.3886Z"
        fill="currentColor"
      />
      <path
        d="M33.4626 17.0059L30.354 22.0344H34.4683L35.5197 20.1601L35.8397 22.0344H39.5883L38.5369 17.0059H33.4626Z"
        fill="currentColor"
      />
      <path
        d="M42.9262 25.7372L42.0119 30.1258H46.2633L47.1319 25.92L49.2348 23.4058H41.8748L42.9262 25.7372Z"
        fill="currentColor"
      />
      <path
        d="M50.3321 17.0059L46.9949 21.1659L45.3949 17.0059H41.0063L43.2463 22.0344H50.6063L54.9035 17.0059H50.3321Z"
        fill="currentColor"
      />
      <path
        d="M8.82348 19.7486C9.41777 19.7486 9.87491 19.8401 10.1035 19.9772C10.3778 20.1144 10.4692 20.3429 10.4692 20.7086C10.4692 21.5772 9.82919 21.9886 8.50348 22.0344H14.2635C14.4921 21.5315 14.5835 20.9372 14.5835 20.2972C14.5835 19.1086 14.1721 18.1944 13.3949 17.6001C12.5721 17.0058 11.3835 16.6858 9.78348 16.6858H3.88634L3.24634 19.7486H7.31491H8.82348Z"
        fill="currentColor"
      />
      <path
        d="M12.9371 23.4058H7.17714C7.13143 23.4058 7.04 23.4058 6.99429 23.4058H5.98857H5.53143H1.41714L0 30.1258H4.06857L4.84571 26.5143H6.62857C8.68571 26.5143 10.2857 26.1029 11.4743 25.2343C12.16 24.7315 12.6171 24.1372 12.9371 23.4058Z"
        fill="currentColor"
      />
      <path
        d="M9.32509 9.27996H11.3365L12.8908 13.1657H17.3708L15.2679 8.63996C16.1365 8.27425 16.8222 7.77139 17.2794 7.13139C17.4622 6.90282 17.5994 6.62853 17.6908 6.35425H12.3422C12.2051 6.35425 12.0222 6.35425 11.8851 6.35425H10.5137H9.91937H5.94223L4.5708 13.12H8.50223L9.32509 9.27996Z"
        fill="currentColor"
      />
      <path d="M67.0167 17.0515H56.3653L55.771 20.0229H66.3767L67.0167 17.0515Z" fill="currentColor" />
      <path d="M54.8574 25.0058H60.5717L61.1203 22.0801H55.406L54.8574 25.0058Z" fill="currentColor" />
      <path d="M52.6172 30.1714H63.4058L64 27.2H53.2115L52.6172 30.1714Z" fill="currentColor" />
      <path
        d="M79.3604 17.9659C78.4919 17.3259 77.349 17.0059 75.8861 17.0059H69.669L69.0747 19.9316H73.1433H74.9718C75.5661 19.9316 76.0233 20.023 76.2519 20.1601C76.5261 20.2973 76.6176 20.5716 76.6176 20.9373C76.6176 21.4859 76.3433 21.8516 75.7947 22.0344H80.4118C80.549 21.623 80.6404 21.1659 80.6404 20.663C80.6404 19.5201 80.1833 18.6059 79.3604 17.9659Z"
        fill="currentColor"
      />
      <path
        d="M78.5372 24.0916C78.72 23.863 78.8572 23.5887 78.9486 23.3145H73.6C73.4629 23.3145 73.28 23.3145 73.1429 23.3145H71.7715H71.1772H67.2L65.8286 30.1259H69.76L70.5829 26.2402H72.5943L74.1486 30.1259H78.6286L76.5258 25.6002C77.3943 25.2345 78.08 24.7316 78.5372 24.0916Z"
        fill="currentColor"
      />
      <path d="M29.0281 37.8973H39.6338L40.2738 34.8801H29.6224L29.0281 37.8973Z" fill="currentColor" />
      <path d="M34.3772 39.9087H28.6629L28.0686 42.8344H33.7829L34.3772 39.9087Z" fill="currentColor" />
      <path d="M25.8743 48H36.6171L37.2571 45.0286H26.4686L25.8743 48Z" fill="currentColor" />
      <path d="M11.291 39.9087H18.1024L16.9139 34.8801H12.3424L11.291 39.9087Z" fill="currentColor" />
      <path d="M27.8854 34.8801H23.0397L19.7939 39.9087H26.8797L27.8854 34.8801Z" fill="currentColor" />
      <path
        d="M17.1881 43.2457L16.731 41.28H9.91952L8.5481 48H12.3424L13.531 42.3315L14.7652 48H17.8281L21.4395 42.1943L20.251 48H24.1367L25.5081 41.28H18.4224L17.1881 43.2457Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_212_39988">
        <rect width="80.64" height="48" fill="white" />
      </clipPath>
    </defs>
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
