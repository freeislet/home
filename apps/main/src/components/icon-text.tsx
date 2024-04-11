interface IconTextProps {
  icon: React.ReactNode
  text: React.ReactNode
}
export default function IconText({ icon, text }: IconTextProps): React.ReactNode {
  // const icon = isValidElement<HTMLElement>(navItem.icon)
  //   ? cloneElement(navItem.icon, { className: 'size-8 align-bottom' })
  //   : navItem.icon
  return icon ? (
    <div className="my-flex-row space-x-1 not-prose">
      {icon}
      <span>{text}</span>
    </div>
  ) : (
    text
  )
}
