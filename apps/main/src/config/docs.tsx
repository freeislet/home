import { type ImageProps } from 'next/image'

import { type NavItem } from '@/lib/nav'
import {
  GameDevIcon,
  CubeIcon,
  ThreeJsIcon,
  UnityIcon,
  WebDevIcon,
  DiagramIcon,
  AiIcon,
  GeminiIcon,
} from '@/components/icons'
import image1 from '~/public/spaceship1.jpeg'
import image2 from '~/public/spaceship2.jpeg'
import image3 from '~/public/spaceship3.jpeg'
import image4 from '~/public/spaceship4.jpeg'

const nav: NavItem[] = [
  {
    icon: <GameDevIcon />,
    title: 'Game/3D',
    href: '/game',
    children: [
      {
        title: 'Game Dev',
        href: '/game/game-dev',
        disabled: true,
      },
      {
        icon: <CubeIcon />,
        title: '3D',
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

export interface CatalogItem {
  imageSrc: ImageProps['src']
  title: React.ReactNode
  description: React.ReactNode
}

const catalog: CatalogItem[] = [
  {
    imageSrc: image1,
    title: '🪐 이미지 1',
    description: (
      <>
        우주는 행성들, 별들, 은하들 및 기타 모든 형태의 물질과 에너지를 포함하여 모든 공간과 시간 및 그 내용물이다.
        대폭발(빅뱅) 이론은 우주의 발달에 대한 지배적인 우주론적 기술이다. 이 이론에 따르면, 공간과 시간은 137.87 ±
        0.20억년 전에 함께 생겨났고, 또한 우주는 대폭발(빅뱅) 이후 계속 팽창해 왔다. 전체 우주의 공간적 크기는 알 수
        없지만, 관측 가능한 우주의 크기를 측정하는 것은 가능하며, 그것은 오늘날에는 직경이 대략 930억 광년이다.
      </>
    ),
  },
  {
    imageSrc: image2,
    title: '🚀 이미지 2',
    description: (
      <>
        우주의 초기 우주론적 모형들은 중 일부는 고대 그리스인과 인도 철학자들에 의해 개발되었으며 또한 지구를 중심에
        두는 지구중심적이었다. 수세기들에 걸쳐, 보다 정확한 천문 관측들은 니콜라우스 코페르니쿠스가 태양이 태양계의
        중심에 있는 태양중심적 모형을 개발하도록 이끌었다. 만유인력의 법칙을 개발하면서, 아이작 뉴턴은 코페르니쿠스의
        연구뿐만 아니라 요하네스 케플러의 행성의 운동법칙과 티코 브라헤의 관측들을 기반으로 했다.
      </>
    ),
  },
  {
    imageSrc: image3,
    title: '🛸 이미지 3',
    description: (
      <>
        추가적인 관측적 개선들로 인해 태양은 우리은하에 있는 수천억 개의 별들 중 하나이며, 그것은 관측가능한 우주에서
        수천억 개의 은하들 중 하나라는 사실이 밝혀졌다. 은하의 많은 별들은 행성들을 가지고 있다. 또한, 현재 관측된
        바로는 관측 가능한 우주의 대부분의 별들은 쌍성을 이루고 있으며, 이런 점에서 태양은 특별한 존재이다. 가장 큰
        규모에서는, 은하들은 균일하게 분포되어 있으며 또한 모든 방향으로도 같으며, 이는 우주가 가장자리도 중심도 없다는
        것을 의미한다. 더 작은 규모에서는, 은하단들과 공간에 거대한 필라멘트와 거시공동을 형성하는 초은하단들으로
        분포되어, 한 거대한 거품 같은 구조를 형성한다. 20세기 초의 발견들은 우주에 한 시작이 있었고 그 이후로 우주가
        증가하는 속도로 공간이 팽창해 왔음을 시사했다.
      </>
    ),
  },
  {
    imageSrc: image4,
    title: '👽 이미지 4',
    description: (
      <>
        대폭발 이론(빅뱅 이론)에 따르면, 처음에 존재하는 에너지와 물질은 우주가 팽창함에 따라 밀도가 낮아졌다. 약{' '}
        <span className="text-nowrap">
          10
          <sup>-32</sup>초
        </span>
        에 급팽창 시대라고 불리는 초기 가속 팽창, 그리고 알려진 네 가지 기본 힘의 분리 이후, 우주는 점차 냉각되고 계속
        팽창하여, 최초의 아원자 입자들과 단순한 원자들이 형성되었다. 암흑물질이 점차 모여서, 중력의 영향아래
        필라멘트들과 거시공동들의 한 거품-같은 구조를 형성했다. 수소와 헬륨으로 이루어진 거대한 구름들은 점차 암흑
        물질이 가장 고밀도인 장소들로 끌려가면서, 오늘날 볼 수 있는 최초의 은하들, 별들, 그리고 다른 모든 것들을
        형성했다.
      </>
    ),
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
