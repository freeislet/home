import { isValidElement, cloneElement } from 'react'

interface IconTextProps {
  icon?: React.ReactNode
  iconClassName?: string
  text: React.ReactNode
}
export default function IconText({ icon, iconClassName, text }: IconTextProps): React.ReactNode {
  if (iconClassName && isValidElement<HTMLElement | SVGElement>(icon)) {
    icon = cloneElement(icon, { className: iconClassName })
  }

  return icon ? (
    <div className="my-flex-row space-x-1 not-prose">
      {icon}
      <span>{text}</span>
    </div>
  ) : (
    text
  )
}
