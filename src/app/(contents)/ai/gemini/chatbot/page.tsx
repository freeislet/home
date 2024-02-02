'use client'

// import { useEffect } from 'react'
import { useChat } from 'ai/react'

// tRPC test
// import { trpc } from '@/trpc/client'

export default function GeminiChatbotPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  // tRPC test
  // const products = trpc.products.useQuery()
  // console.log(products)
  // const chatMutation = trpc.gemini.chat.useMutation()
  // useEffect(() => {
  //   const chat = chatMutation.mutate({ messages: [] })
  // }, [])

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input value={input} placeholder="Say something..." onChange={handleInputChange} />
      </form>
    </div>
  )
}

// import { Separator } from '@/components/ui/separator'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'

// export default function GeminiChatbotPage() {
//   return (
//     <div className="my-flex-col">
//       <div className="my-container my-flex-row justify-between py-4 h-16">
//         <h5 className="">Gemini Chatbot Playground</h5>
//       </div>
//       <Separator />
//       <div className="my-container grid items-stretch py-6 gap-6 grid-cols-[1fr_200px]">
//         <div className="my-flex-col p-0 mt-0 space-y-4 border-0">
//           <Textarea
//             placeholder="Write a tagline for an ice cream shop"
//             className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
//           />
//           <div className="flex items-center space-x-2">
//             <Button>Submit</Button>
//           </div>
//         </div>
//         <div className="my-flex-col space-y-4">
//           {/* <TemperatureSelector defaultValue={[0.56]} />
//               <MaxLengthSelector defaultValue={[256]} />
//               <TopPSelector defaultValue={[0.9]} /> */}
//           ====================
//         </div>
//       </div>
//     </div>
//   )
// }
