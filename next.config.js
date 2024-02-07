const { withContentlayer } = require('next-contentlayer')

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
}

module.exports = withContentlayer(nextConfig)
