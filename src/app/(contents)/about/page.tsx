import aboutMdx from 'contentlayer/generated/Page/pages__about.mdx.json' assert { type: 'json' }
import { MdxContent } from '@/components/mdx-content'

export default function AboutPage() {
  return (
    <div className="my-container">
      <MdxContent mdx={aboutMdx.body} />
    </div>
  )
}
