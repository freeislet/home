import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { type Options as AutolinkOptions } from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { s } from 'hastscript'

export const MdxPage = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (page) => page._raw.flattenedPath.replace('pages/', ''),
    },
  },
}))

export const ExamplePost = defineDocumentType(() => ({
  name: 'ExamplePost',
  filePathPattern: `example-posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('example-posts/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'mdx',
  documentTypes: [MdxPage, ExamplePost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      /**
       * Adds ids to headings
       */
      rehypeSlug,
      /**
       * Adds auto-linking button after h1, h2, h3 headings
       */
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3'],
          properties: { class: 'heading-link' },
          content: s(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              width: '24',
              height: '24',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'aria-label': 'Anchor link',
            },
            [
              s('line', { x1: '4', y1: '9', x2: '20', y2: '9' }),
              s('line', { x1: '4', y1: '15', x2: '20', y2: '15' }),
              s('line', { x1: '10', y1: '3', x2: '8', y2: '21' }),
              s('line', { x1: '16', y1: '3', x2: '14', y2: '21' }),
            ]
          ),
        } satisfies Partial<AutolinkOptions>,
      ],
      /**
       * Enhances code blocks with syntax highlighting, line numbers,
       * titles, and allows highlighting specific lines and words
       */
      [
        rehypePrettyCode as any,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark-dimmed',
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
})
