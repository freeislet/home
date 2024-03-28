import { type NavItem, buildValidNav, getBaseNavItem as _getBaseNavItem } from '@/lib/nav'
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

const navConfig: NavItem[] = [
  {
    icon: <CubeIcon />,
    title: '3D/Game/XR',
    href: '/game',
    children: [
      {
        icon: <GameDevIcon />,
        title: 'Game Dev',
        href: '/game/game-dev',
        disabled: true,
      },
      {
        icon: <ThreeJsIcon />,
        title: 'React Three Fiber',
        href: '/game/react-three-fiber',
        children: [
          {
            title: 'Basic demo',
            href: '/game/react-three-fiber/basic-demo',
          },
          {
            title: 'HTML',
            href: '/game/react-three-fiber/html',
          },
          {
            title: 'Shoe configurator',
            href: '/game/react-three-fiber/shoe',
          },
          {
            title: 'Portal shader',
            href: '/game/react-three-fiber/portal',
          },
          {
            title: 'Particles & Effects',
            href: '/game/react-three-fiber/particles',
          },
        ],
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
      {
        icon: <MediaPipeIcon />,
        title: 'MediaPipe (AR)',
        href: '/game/mediapipe',
        children: [
          {
            title: 'Face Tracking',
            href: '/game/mediapipe/face-tracking',
          },
          {
            title: 'Face Avatar',
            href: '/game/mediapipe/face-avatar',
          },
          {
            title: 'Hand Tracking',
            href: '/game/mediapipe/hand-tracking',
          },
          {
            title: 'Pose Tracking',
            href: '/game/mediapipe/pose-tracking',
          },
        ],
      },
    ],
  },
  {
    icon: <WebDevIcon />,
    title: 'Web',
    href: '/web',
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
    title: 'AI',
    href: '/ai',
    children: [
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
