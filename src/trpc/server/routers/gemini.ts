// TODO: 제거

import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai'
import { z } from 'zod'

import { procedure, router } from '../trpc'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

type AiMessage = PartialPick<Message, 'id'>

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: AiMessage[]) => ({
  contents: messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
})

export const geminiRouter = router({
  chat: procedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(['system', 'user', 'assistant', 'function', 'data', 'tool']),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const contentRequest = buildGoogleGenAIPrompt(input.messages)
      const geminiStream = await model.generateContentStream(contentRequest)

      // Convert the response into a friendly text-stream
      const stream = GoogleGenerativeAIStream(geminiStream)

      // Respond with the stream
      return new StreamingTextResponse(stream)
    }),
})
