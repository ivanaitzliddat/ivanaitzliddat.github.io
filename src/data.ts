export type Category = 'Security' | 'AI' | 'Engineering'

export type Project = {
  id: string
  number: string
  title: string
  label: string
  category: Category[]
  question: string
  summary: string
  contribution: string
  decisions: string[]
  evidence: string
  limitation: string
  technologies: string[]
  source: string
  evidenceSource: string
  theme: 'signal' | 'vision' | 'review'
  status: string
  next: string
}

export const projects: Project[] = [
  {
    id: 'phish-signal-lab', number: '01', title: 'Phish Signal Lab', label: 'Security + machine learning',
    category: ['Security', 'AI'], theme: 'signal', status: 'Evaluation study',
    question: 'A strong phishing benchmark. But what is it actually learning?',
    summary: 'A URL-classification experiment that treats dataset shortcuts, split design, and alert thresholds as part of the engineering problem.',
    contribution: 'Built a public evaluation pipeline with dataset checks, hostname features, model comparison, and validation-selected alert thresholds.',
    decisions: [
      'Remove duplicate URLs and conflicting labels; split by exact hostname so the same host cannot appear in different partitions.',
      'Restrict the main experiment to HTTPS site roots and hostname-only features to reduce an obvious collection shortcut.',
      'Select the model and alert threshold using validation data, then evaluate the held-out test set.',
    ],
    evidence: 'The repository contains the evaluation pipeline, dataset checks, and tests for splitting and threshold selection. Its README reports a matched-cohort average precision of 0.935 versus a 0.171 prior baseline (seed 42). Those saved claims have not been independently reproduced for this portfolio.',
    limitation: 'The validation precision target did not hold on the test set. There is no temporal holdout, and related domains or different deployment prevalence may affect performance. This is a dataset study, not a live phishing-detection service.',
    next: 'Preserve and reproduce the full evaluation artifacts; add multi-seed and temporal validation.',
    technologies: ['Python', 'scikit-learn', 'Grouped evaluation', 'Dataset audit'],
    source: 'https://github.com/ivanaitzliddat/phish-signal-lab',
    evidenceSource: 'https://github.com/ivanaitzliddat/phish-signal-lab/blob/main/src/phish_signal_lab/evaluate.py',
  },
  {
    id: 'framevigil', number: '02', title: 'FrameVigil', label: 'Computer vision + operations',
    category: ['AI', 'Engineering'], theme: 'vision', status: 'Local prototype',
    question: 'What if the signal is visible on a screen, but there is no API?',
    summary: 'Local OCR monitoring that turns a camera or capture-card feed into evidence an operator can inspect and acknowledge.',
    contribution: 'Built a public visual-monitoring reimplementation with capture workers, OCR conditions, reviewable evidence, and source-specific acknowledgement.',
    decisions: [
      'Run OCR locally and retain captured frames in bounded memory instead of writing monitoring images or OCR text to disk.',
      'Make matches inspectable through word locations, and scope acknowledgements to a source with an expiry.',
      'Default to loopback access; require a bearer token for a non-loopback listener and validate browser origins.',
    ],
    evidence: 'The public repository includes a synthetic status-board source, server and capture tests, and documented camera/capture-card setup. The synthetic source demonstrates the workflow, not real-world OCR performance.',
    limitation: 'Device compatibility, permissions, OCR accuracy, and alert latency depend on the deployment. There are no published hardware benchmarks or production-availability measurements.',
    next: 'Measure device-specific OCR accuracy and end-to-end latency; add repeatable CI.',
    technologies: ['Python', 'Tesseract OCR', 'FFmpeg', 'Browser UI'],
    source: 'https://github.com/ivanaitzliddat/framevigil',
    evidenceSource: 'https://github.com/ivanaitzliddat/framevigil/tree/main/tests',
  },
  {
    id: 'miles', number: '03', title: 'Miles Tracker', label: 'AI-assisted workflow + full stack',
    category: ['AI', 'Engineering'], theme: 'review', status: 'Application prototype',
    question: 'AI can propose a change. Who should be allowed to approve it?',
    summary: 'An AI-assisted card-research workflow where structured suggestions enter a human review queue, not the live catalog.',
    contribution: 'Built a full-stack Telegram Mini App prototype with research drafts, administrator review, ownership checks, and deterministic calculation logic.',
    decisions: [
      'Keep AI-proposed rate changes pending for administrator approval; claim the pending change and write the update and history transactionally.',
      'Verify Telegram initData signatures in production and enforce per-user ownership on API access.',
      'Separate deterministic spending calculations from AI research so core rules can be tested independently.',
    ],
    evidence: 'The public source includes calculation, authorization, and review-flow tests. The research agent uses structured output validation, and catalog updates have an explicit review path.',
    limitation: 'This prototype still needs calculation-correctness work: a best-rate fallback can return an excluded or ineligible rate, and spending is counted against every cap rather than eligible cap buckets. AI extraction accuracy is not measured; live integrations, historical seed terms, and unfinished activation flows also need validation.',
    next: 'Prioritize regression tests and fixes for rate eligibility and spending-cap allocation, then evaluate AI extraction and complete live review flows.',
    technologies: ['TypeScript', 'React', 'Express', 'Prisma', 'Claude API'],
    source: 'https://github.com/ivanaitzliddat/miles',
    evidenceSource: 'https://github.com/ivanaitzliddat/miles/blob/main/packages/backend/src/services/cardResearchAgent.ts',
  },
]

export const supportingProjects = [
  { title: 'FrienZen', description: 'Signed Telegram sessions, group planning, and shared-expense workflows.', source: 'https://github.com/ivanaitzliddat/frienzen', status: 'In progress', tags: 'Full-stack / access control' },
  { title: 'Real Assets Quiz', description: 'Configurable scoring rules, accessible interfaces, and exhaustive answer-combination tests.', source: 'https://github.com/ivanaitzliddat/real-assets-personality-quiz', status: 'Web prototype', tags: 'Testing / interface design' },
  { title: 'APEX Games', description: 'Multiplayer game state across browser, API, and bot using WebSockets.', source: 'https://github.com/ivanaitzliddat/APEX-Games', status: 'Prototype', tags: 'Real-time / state management' },
]

export const experience = [
  { period: 'Next chapter', title: 'AI Engineer', organization: 'AI Centre · planned transition', upcoming: true, description: 'Moving into AI engineering, building on a foundation in cybersecurity, network operations, and applied software development.' },
  { period: 'Jun 2024 – present', title: 'Network Lead', organization: 'MINDEF / RSAF', upcoming: false, description: 'Leading in a Network Operations Centre. Appointed as a Senior Air Operations & Systems Expert, with a focus on network operations and practical engineering.' },
  { period: 'Jan – May 2024', title: 'Cybersecurity Engineer Intern', organization: 'GovTech Singapore', upcoming: false, description: 'IoT security testing, network traffic analysis, firmware reverse engineering, and a remote device-testing harness integrating hardware and software.' },
  { period: 'May – Oct 2022', title: 'Information Security Intern', organization: 'Singapore Airlines / Scoot', upcoming: false, description: 'Security dashboards, phishing awareness, endpoint and email security, Splunk rules, and incident-response procedures.' },
]
