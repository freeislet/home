'use client'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { Separator } from '@/components/ui/separator'

export default function GeminiChatbotPage() {
  const id = nanoid()

  return (
    <div className="my-flex-col min-h-full">
      <div className="my-container my-flex-row justify-between py-4 h-16">
        <h5 className="">Gemini Chatbot API 테스트</h5>
      </div>
      <Separator />
      <div className="my-container sm:px-12 my-flex-col flex-1">
        <Chat id={id} />
      </div>
      {/* <div className="my-container grid items-stretch py-6 gap-6 grid-cols-[1fr_200px]">
        <div className="my-flex-col p-0 mt-0 space-y-4 border-0">
          <Textarea
            placeholder="Write a tagline for an ice cream shop"
            className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
          />
          <div className="flex items-center space-x-2">
            <Button>Submit</Button>
          </div>
        </div>
        <div className="my-flex-col space-y-4">
          <TemperatureSelector defaultValue={[0.56]} />
          <MaxLengthSelector defaultValue={[256]} />
          <TopPSelector defaultValue={[0.9]} />
        </div>
      </div> */}
    </div>
  )
}
