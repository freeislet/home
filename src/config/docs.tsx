import Image from 'next/image'

import { type NavItem } from '@/lib/nav'
import { AiIcon, GeminiIcon, DiagramIcon } from '@/components/icons'
import image1 from '~/public/spaceship1.jpeg'
import image2 from '~/public/spaceship2.jpeg'
import image3 from '~/public/spaceship3.jpeg'
import image4 from '~/public/spaceship4.jpeg'

const nav: NavItem[] = [
  {
    title: (
      <>
        <AiIcon />
        Generative AI
      </>
    ),
    href: '/generative-ai',
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
    href: '/visual-scripting',
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

interface CatalogItem {
  image: React.ReactNode
  title: string
}

const catalog: CatalogItem[] = [
  {
    image: <Image src={image1} alt="spaceship 1" fill />,
    title: '이미지 1',
  },
  {
    image: <Image src={image2} alt="spaceship 2" fill />,
    title: '이미지 2',
  },
  {
    image: <Image src={image3} alt="spaceship 3" fill />,
    title: '이미지 3',
  },
  {
    image: <Image src={image4} alt="spaceship 4" fill />,
    title: '이미지 4',
  },
]

export interface DocsConfig {
  nav: NavItem[]
  catalog: CatalogItem[]
}

export const docsConfig: DocsConfig = {
  nav,
  catalog,
}
