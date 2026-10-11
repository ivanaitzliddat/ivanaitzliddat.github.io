export type Category = 'Security' | 'AI' | 'Product'

export type Project = {
  id: string
  number: string
  title: string
  kicker: string
  category: Category[]
  summary: string
  detail: string
  contribution: string
  technologies: string[]
  source: string
  demo?: string
  theme: 'vision' | 'signal' | 'miles' | 'quiz' | 'games' | 'travel'
  status?: string
}

export const projects: Project[] = [
  {
    id: 'framevigil', number: '01', title: 'FrameVigil', kicker: 'Visual intelligence',
    category: ['Security', 'AI'],
    summary: 'A local monitor that watches camera and capture-card feeds for configured text and colour signals.',
    detail: 'FrameVigil turns video inputs into reviewable alerts. Device discovery, feed configuration, OCR and colour detection, screenshot evidence, and acknowledgement rules are presented through a browser interface. Hardware validation remains a next step.',
    contribution: 'Independent implementation of a configurable visual-alert workflow.',
    technologies: ['Python', 'OCR', 'Computer vision', 'Web UI'],
    source: 'https://github.com/ivanaitzliddat/framevigil', theme: 'vision', status: 'Hardware test pending',
  },
  {
    id: 'phish-signal-lab', number: '02', title: 'Phish Signal Lab', kicker: 'Security ML',
    category: ['Security', 'AI'],
    summary: 'A reproducible phishing-URL evaluation project built around dataset checks and honest model comparison.',
    detail: 'The project audits collection artifacts, extracts hostname features, compares two models, and evaluates once on a held-out test set. Its README explains why strong benchmark scores can still be misleading when the data collection process leaks a shortcut.',
    contribution: 'Independent public project focused on model evaluation and reproducibility.',
    technologies: ['Python', 'Machine learning', 'Dataset audit', 'Evaluation'],
    source: 'https://github.com/ivanaitzliddat/phish-signal-lab', theme: 'signal',
  },
  {
    id: 'miles', number: '03', title: 'Miles Tracker', kicker: 'AI-assisted product',
    category: ['AI', 'Product'],
    summary: 'A Telegram Mini App prototype for tracking card miles, spending caps, and researched rate changes.',
    detail: 'A React frontend, Express API, Prisma data model, calculation engine, Telegram bot, and Claude-assisted research flow form the prototype. Suggested rate changes enter an administrator review queue. Seed card terms are historical, and the current cap estimates are conservative; both require verification before use.',
    contribution: 'Full-stack application with reviewable AI suggestions and tested calculation logic.',
    technologies: ['React', 'TypeScript', 'Prisma', 'Telegram', 'Claude API'],
    source: 'https://github.com/ivanaitzliddat/miles', theme: 'miles', status: 'Prototype · no live service',
  },
  {
    id: 'real-assets-personality-quiz', number: '04', title: 'Real Assets Quiz', kicker: 'Interactive experience',
    category: ['Product'],
    summary: 'A responsive educational quiz with configurable content, weighted scoring, and four result experiences.',
    detail: 'The quiz separates editorial content from scoring logic and includes accessibility, deterministic tie handling, tests, and a static Pages deployment. Its financial-services copy is provisional; it is not a suitability or investment assessment.',
    contribution: 'Configurable React experience with isolated and tested scoring rules.',
    technologies: ['React', 'TypeScript', 'Vite', 'Testing'],
    source: 'https://github.com/ivanaitzliddat/real-assets-personality-quiz',
    demo: 'https://ivanaitzliddat.github.io/real-assets-personality-quiz/', theme: 'quiz', status: 'Provisional content',
  },
  {
    id: 'apex-games', number: '05', title: 'APEX Games', kicker: 'Real-time multiplayer',
    category: ['Product'],
    summary: 'A Telegram-connected multiplayer card-game prototype with rooms, WebSockets, and a browser interface.',
    detail: 'The application pairs a FastAPI service and game-state engine with a web interface and Telegram bot. The implemented Ride the Bus game uses a four-phase guessing flow. It is a software prototype, not a hosted game service.',
    contribution: 'Multiplayer application design across the browser, API, and bot.',
    technologies: ['Python', 'FastAPI', 'WebSockets', 'Telegram'],
    source: 'https://github.com/ivanaitzliddat/APEX-Games', theme: 'games', status: 'Prototype',
  },
  {
    id: 'frienzen', number: '06', title: 'FrienZen', kicker: 'Group planning',
    category: ['Product'],
    summary: 'A Telegram Mini App prototype for planning group activities and splitting shared expenses.',
    detail: 'The Next.js project combines Telegram context, activity planning, expenses, itinerary items, and settlement data in a Prisma-backed application. It is presented as an in-progress prototype rather than a live service.',
    contribution: 'Full-stack group-planning interface and data model.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Telegram'],
    source: 'https://github.com/ivanaitzliddat/frienzen', theme: 'travel', status: 'In progress',
  },
]
