import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, Message } from 'ai'

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

export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export const generateContentStream = async (messages: AiMessage[]) => {
  const contentRequest = buildGoogleGenAIPrompt(messages)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const geminiStream = await model.generateContentStream(contentRequest)

  // Convert the response into a friendly text-stream
  return GoogleGenerativeAIStream(geminiStream)
}
