import { type NavItem } from '@/lib/nav'
import { AiIcon, GeminiIcon, DiagramIcon } from '@/components/icons'

const nav: NavItem[] = [
  {
    title: (
      <>
        <AiIcon />
        Generative AI
      </>
    ),
    href: '/generative-ai/gemini/chatbot',
    children: [
      {
        title: (
          <>
            <GeminiIcon />
            Gemini
          </>
        ),
        children: [
          {
            title: 'Chatbot',
            href: '/generative-ai/gemini/chatbot',
          },
          {
            title: 'Multimodal',
            href: '/generative-ai/gemini/multimodal',
          },
        ],
      },
    ],
  },
  {
    title: (
      <>
        <DiagramIcon />
        Visual Scripting
      </>
    ),
    href: '/visual-scripting/blockly',
    children: [
      {
        title: 'Blockly',
        href: '/visual-scripting/blockly',
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
  },
]

export interface DocsConfig {
  nav: NavItem[]
}

export const docsConfig: DocsConfig = {
  nav,
}
