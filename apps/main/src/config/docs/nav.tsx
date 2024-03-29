import {
  type NavItem,
  buildValidNav,
  getBaseNavItem as _getBaseNavItem,
  getRedirectUrl as _getRedirectUrl,
} from '@/lib/nav'
import {
  CubeIcon,
  ThreeJsIcon,
  UnityIcon,
  MediaPipeIcon,
  GameDevIcon,
  WebDevIcon,
  DiagramIcon,
  AiIcon,
  GeminiIcon,
} from '@/components/icons'
import { portfolios } from './portfolio'

const navConfig: NavItem[] = [
  {
    icon: <CubeIcon />,
    title: '3D/Game',
    href: '/game',
    nonlink: true,
    children: [
      {
        icon: <GameDevIcon />,
        title: 'Game Dev',
        href: '/game/game-dev',
        disabled: true,
      },
      {
        icon: <ThreeJsIcon />,
        title: 'Three.js',
        href: '/game/three-js',
        portfolio: portfolios['three-js'],
      },
      {
        icon: <UnityIcon />,
        title: 'Unity',
        href: '/game/unity',
        children: [
          {
            title: 'Kart',
            href: '/game/unity/kart',
          },
          {
            title: '3D Game Kit',
            href: '/game/unity/3d-game-kit',
          },
        ],
      },
    ],
  },
  {
    icon: <WebDevIcon />,
    title: 'Web',
    href: '/web',
    nonlink: true,
    children: [
      {
        icon: <DiagramIcon />,
        title: 'Visual Scripting',
        href: '/web/visual-scripting',
        nonlink: true,
        children: [
          {
            title: 'React Flow',
            href: '/web/visual-scripting/react-flow',
          },
          {
            title: 'Rete',
            href: '/web/visual-scripting/rete',
          },
          {
            title: 'Flume',
            href: '/web/visual-scripting/flume',
          },
          {
            title: 'Blockly',
            href: '/web/visual-scripting/blockly',
          },
        ],
      },
    ],
  },
  {
    icon: <AiIcon />,
    title: 'AI/ML',
    href: '/ai',
    nonlink: true,
    children: [
      {
        icon: <MediaPipeIcon />,
        title: 'MediaPipe',
        href: '/ai/mediapipe',
        portfolio: portfolios.mediapipe,
      },
      {
        icon: <GeminiIcon />,
        title: 'Gemini',
        href: '/ai/gemini',
        nonlink: true,
        children: [
          {
            title: 'Chatbot',
            href: '/ai/gemini/chatbot',
          },
          {
            title: 'Multimodal',
            href: '/ai/gemini/multimodal',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
  },
]

export const nav = buildValidNav(navConfig)

export function getBaseNavItem(pathname: string): NavItem | undefined {
  return _getBaseNavItem(nav, pathname)
}

export function getRedirectUrl(href: string): string | undefined {
  return _getRedirectUrl(nav, href)
}
