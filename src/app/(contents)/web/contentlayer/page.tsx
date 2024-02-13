import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'

import { allExamplePosts, type ExamplePost } from 'contentlayer/generated'
import { MdxContent } from '@/components/mdx-content'

function PostCard(post: ExamplePost) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={`/web/contentlayer/posts/${post.slug}`}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0">
        <MdxContent mdx={post.body} />
      </div>
    </div>
  )
}

export default function ContentlayerPage() {
  const posts = allExamplePosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Contentlayer Example</h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
