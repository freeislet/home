const withMDX = require('@next/mdx')()

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

module.exports = withMDX(nextConfig)
