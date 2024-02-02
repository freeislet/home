import { StreamingTextResponse } from 'ai'

import { generateContentStream } from '@/lib/gemini'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()
  const stream = await generateContentStream(messages)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
