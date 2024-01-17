/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/generative-ai',
        destination: '/generative-ai/gemini/chatbot',
        permanent: false,
      },
      {
        source: '/visual-scripting',
        destination: '/visual-scripting/blockly',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
