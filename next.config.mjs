import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/game',
        destination: '/game/game-dev',
        permanent: false,
      },
      {
        source: '/web',
        destination: '/web/visual-scripting/blockly',
        permanent: false,
      },
      {
        source: '/ai',
        destination: '/ai/gemini/chatbot',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: true,
  theme: 'one-dark-pro',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
  },
})

export default withMDX(nextConfig)