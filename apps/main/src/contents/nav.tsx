import {
  buildNav,
  getBaseNavItem as _getBaseNavItem,
  getRedirectUrl as _getRedirectUrl,
  findNavItemWithAncestors as _findNavItemWithAncestors,
} from '@/lib/nav'
import * as Icons from '@/components/icons'
import { portfolios } from './portfolio'

const navConfig: NavItem[] = [
  {
    icon: <Icons.CubeIcon />,
    title: 'Game/3D',
    href: '/game',
    nonlink: true,
    children: [
      {
        icon: <Icons.GameDevIcon />,
        title: 'Game Dev',
        href: '/game/game-dev',
        disabled: true,
      },
      {
        icon: <Icons.ThreeJsIcon />,
        title: 'Three.js',
        href: '/game/three-js',
        portfolio: portfolios['three-js'],
      },
      {
        icon: <Icons.UnityIcon />,
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
      {
        icon: <Icons.AvatarIcon />,
        title: 'Avatar',
        href: '/game/avatar',
        nonlink: true,
        children: [
          {
            icon: <Icons.ReadyPlayerMeIcon />,
            title: 'Ready Player Me',
            href: '/game/avatar/ready-player-me',
            portfolio: portfolios['ready-player-me'],
          },
        ],
      },
    ],
  },
  {
    icon: <Icons.WebDevIcon />,
    title: 'Web',
    href: '/web',
    nonlink: true,
    children: [
      {
        icon: <Icons.DiagramIcon />,
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
    icon: <Icons.AiIcon />,
    title: 'AI/ML',
    href: '/ai',
    nonlink: true,
    children: [
      {
        icon: <Icons.MediaPipeIcon />,
        title: 'MediaPipe',
        href: '/ai/mediapipe',
        portfolio: portfolios.mediapipe,
      },
      {
        icon: <Icons.GeminiIcon />,
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

export const nav = buildNav(navConfig)

export function getBaseNavItem(pathname: string): NavItem | undefined {
  return _getBaseNavItem(nav, pathname)
}

/** @deprecated 실시간으로 redirect url 계산하지 않고, buildNav 시 nonlinkRedirectUrl 설정하도록 변경 */
export function getRedirectUrl(href: string): string | undefined {
  return _getRedirectUrl(nav, href)
}

export function findNavItemWithAncestors(href: string): NavItem[] {
  return _findNavItemWithAncestors(nav, href)
}
