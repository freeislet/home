import { MDX } from 'contentlayer/core'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // Add a custom component.
  // MyComponent: () => <div>Hello World!</div>,

  // Basic UI components
  Button,

  // Custom components
  Image: ({ ...props }) => (
    <div className="relative h-[300px]">
      <Image {...props} fill style={{ objectFit: 'contain' }} />
    </div>
  ),
}

export const MdxContent = ({ mdx }: { mdx: MDX }) => {
  const MdxComponent = useMDXComponent(mdx.code)

  return <MdxComponent components={mdxComponents} />
}
