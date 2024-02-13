import type { MDXComponents } from 'mdx/types'
import { Image } from '@/components/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image,
    ...components,
  }
}
