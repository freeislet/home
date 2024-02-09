import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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
})
