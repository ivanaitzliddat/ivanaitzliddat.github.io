import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, ExternalLink, FlaskConical, Github, Linkedin, Mail, ScanLine, ShieldCheck, Workflow, X } from 'lucide-react'
import { experience, projects, supportingProjects, type Category, type Project } from './data'

type Filter = 'All' | Category
const filters: Filter[] = ['All', 'Security', 'AI', 'Engineering']
const focusCopy: Record<Filter, string> = {
  All: 'Three public implementations. Problems, decisions, and evidence you can inspect.',
  Security: 'Security-minded evaluation: inspect the data and test the assumptions.',
  AI: 'From model evaluation to local OCR and human-reviewed AI suggestions.',
  Engineering: 'Operational workflows, explicit access boundaries, and reviewable state changes.',
}

function readLocation() {
  const query = new URLSearchParams(window.location.search)
  return {
    filter: filters.find(item => item.toLowerCase() === query.get('focus')) ?? 'All',
    project: projects.find(item => item.id === query.get('project')) ?? null,
  }
}

function updateLocation(filter: Filter, project: Project | null) {
  const url = new URL(window.location.href)
  if (filter === 'All') url.searchParams.delete('focus')
  else url.searchParams.set('focus', filter.toLowerCase())
  if (project) url.searchParams.set('project', project.id)
  else url.searchParams.delete('project')
  window.history.replaceState(null, '', url)
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45 }}>{children}</motion.div>
}

function SystemMap() {
  return <div className="system-map" aria-label="Illustrative engineering approach: observe, evaluate, review, operate">
    <div className="map-topline"><span>ENGINEERING APPROACH</span><span>01 / 04</span></div>
    <div className="map-graph" aria-hidden="true">
      <svg className="map-links" viewBox="0 0 440 270" fill="none"><path d="M95 57H212V125H345M95 213H212V125"/><path d="M345 125V213H292" strokeDasharray="4 5"/><circle cx="212" cy="125" r="5"/></svg>
      <div className="map-node node-observe"><ScanLine size={19}/><span>01 / OBSERVE</span><strong>Find the signal</strong></div>
      <div className="map-node node-evaluate"><FlaskConical size={19}/><span>02 / EVALUATE</span><strong>Test assumptions</strong></div>
      <div className="map-node node-review"><ShieldCheck size={19}/><span>03 / REVIEW</span><strong>Keep it inspectable</strong></div>
      <div className="map-output"><Workflow size={17}/><span>04 / OPERATE</span></div>
    </div>
    <div className="map-code" aria-hidden="true"><span className="code-comment">// Useful systems need clear boundaries.</span><code><span>if</span> (evidence.is_reviewable) {'{'}<br/><i>ship_with_limits();</i><br/>{'}'}</code></div>
    <p className="map-caption">A design principle, not a production-system diagram.</p>
  </div>
}

function ProjectVisual({ theme }: { theme: Project['theme'] }) {
  if (theme === 'signal') return <div className="project-visual visual-signal" aria-hidden="true">
    <div className="visual-topline"><FlaskConical size={16}/><span>EVALUATION DESIGN</span></div>
    <div className="dataset"><span className="dataset-label">HOST-GROUPED DATA</span><div className="dataset-cells">{Array.from({ length: 30 }, (_, i) => <i key={i} className={i < 18 ? 'train' : i < 24 ? 'validate' : 'test'}/>)}</div></div>
    <div className="split-labels"><span><i/> Train</span><span><i/> Validate</span><span><i/> Test</span></div>
    <div className="visual-divider"><ArrowDownRight size={18}/><span>NO HOST OVERLAP</span></div>
    <div className="evaluation-flow"><span>Compare models</span><ArrowRight size={14}/><span>Select threshold</span><ArrowRight size={14}/><strong>Holdout</strong></div>
    <p>Split carefully. Select on validation.<br/>Report what does not generalize.</p>
  </div>
  if (theme === 'vision') return <div className="project-visual visual-vision" aria-hidden="true">
    <div className="visual-topline"><ScanLine size={16}/><span>ILLUSTRATIVE OCR WORKFLOW</span></div>
    <div className="ocr-frame"><div className="ocr-row"><span>STATUS</span><span className="ocr-match">REVIEW NEEDED</span></div><div className="ocr-row"><span>SOURCE</span><span>DEMO FEED</span></div><div className="scan-rule"/><span className="ocr-corner one"/><span className="ocr-corner two"/></div>
    <div className="capture-flow"><span>Capture</span><ArrowRight size={14}/><span>Match</span><ArrowRight size={14}/><span>Acknowledge</span></div>
    <p>Local processing. Bounded retention.<br/>Evidence an operator can inspect.</p>
  </div>
  return <div className="project-visual visual-review" aria-hidden="true">
    <div className="visual-topline"><Workflow size={16}/><span>ILLUSTRATIVE REVIEW FLOW</span></div>
    <div className="review-stages"><div><Code2 size={17}/><span>Structured suggestion</span><small>AI-assisted research</small></div><ArrowDownRight size={18}/><div><ShieldCheck size={17}/><span>Human approval</span><small>Authorization + transaction</small></div></div>
    <p>The model proposes.<br/>A verified reviewer decides.</p>
  </div>
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project, trigger: HTMLButtonElement) => void }) {
  return <article className={`project-card ${project.theme === 'signal' ? 'project-featured' : ''}`}>
    <ProjectVisual theme={project.theme}/>
    <div className="project-copy">
      <div className="project-topline"><span>{project.number} / {project.label}</span><span className="status-pill">{project.status}</span></div>
      <h3>{project.title}</h3><p className="project-question">{project.question}</p><p className="project-summary">{project.summary}</p>
      <div className="project-tags">{project.technologies.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-actions"><button type="button" onClick={event => onOpen(project, event.currentTarget)}>Explore the case study <ArrowUpRight size={17} aria-hidden="true"/></button><a href={project.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`}><Github size={17} aria-hidden="true"/> Source</a></div>
    </div>
  </article>
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) { dialog.scrollTop = 0; dialog.showModal() }
    else if (!project && dialog.open) dialog.close()
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [project])
  return <dialog ref={ref} className="project-dialog" aria-labelledby="case-title" aria-describedby="case-question" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose() } }}>
    {project && <>
      <div className="dialog-head"><span>{project.number} / PROJECT NOTES</span><button type="button" onClick={onClose} aria-label="Close case study" autoFocus><X size={20}/></button></div>
      <div className="dialog-body"><p className="eyebrow">{project.label}</p><h2 id="case-title">{project.title}</h2><p id="case-question" className="dialog-question">{project.question}</p><p className="dialog-summary">{project.summary}</p>
        <section className="case-section"><h3>My implementation</h3><p>{project.contribution}</p></section>
        <section className="case-section"><h3>Technical decisions</h3><ol>{project.decisions.map(item => <li key={item}>{item}</li>)}</ol></section>
        <section className="case-section"><h3>What you can inspect</h3><p>{project.evidence}</p><a className="inline-link" href={project.evidenceSource} target="_blank" rel="noopener noreferrer">Inspect implementation evidence <ArrowUpRight size={15} aria-hidden="true"/></a></section>
        <section className="case-section case-limits"><h3>Boundaries, not fine print</h3><p>{project.limitation}</p><div><span>NEXT VALIDATION</span><p>{project.next}</p></div></section>
        <div className="dialog-actions"><a className="button button-primary" href={project.source} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true"/> View repository</a><a className="inline-link" href={`?project=${project.id}`}>Case-study permalink <ExternalLink size={14} aria-hidden="true"/></a></div>
      </div>
    </>}
  </dialog>
}

function App() {
  const [filter, setFilter] = useState<Filter>(() => readLocation().filter)
  const [selected, setSelected] = useState<Project | null>(() => readLocation().project)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const openProject = (project: Project, button: HTMLButtonElement) => { trigger.current = button; setSelected(project); updateLocation(filter, project) }
  const closeProject = useCallback(() => {
    setSelected(null); updateLocation(filter, null)
    window.setTimeout(() => (trigger.current ?? document.querySelector<HTMLButtonElement>('.filter-button.active'))?.focus(), 0)
  }, [filter])
  useEffect(() => {
    const onPopState = () => { const state = readLocation(); setFilter(state.filter); setSelected(state.project) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const visible = projects.filter(project => filter === 'All' || project.category.includes(filter))

  return <MotionConfig reducedMotion="user"><div className="site-wrap" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="shell header-inner"><a className="brand" href="#top" aria-label="Ivan Tan, back to top"><span className="brand-mark">it<span>_</span></span><span>Ivan Tan</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#background">Background</a><a href="#contact">Contact</a></nav><a className="header-github" href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer" aria-label="Ivan Tan on GitHub"><Github size={19}/><ArrowUpRight size={13}/></a></div></header>
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title"><div className="hero-copy"><Reveal><p className="eyebrow"><span className="location-dot"/> SINGAPORE / CYBERSECURITY + APPLIED AI</p><h1 id="hero-title">Understand the threat.<br/><em>Build the system.</em><br/>Test the assumptions.</h1><p className="hero-lede">I'm Ivan Tan. A Network Lead and cybersecurity engineer moving into AI engineering. I build around observable behavior, explicit trust boundaries, and evidence people can inspect.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <ArrowDownRight size={18} aria-hidden="true"/></a><a className="inline-link" href="https://www.linkedin.com/in/tan-ivan/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true"/></a></div><div className="hero-credentials"><span><ShieldCheck size={15} aria-hidden="true"/> OSCP</span><span>NUS Information Security</span><span>2024 Valedictorian</span></div></Reveal></div><Reveal className="hero-system"><SystemMap/></Reveal></section>
      <div className="positioning-strip"><div className="shell"><p><span>NOW</span> Network Lead + Cybersecurity Engineer</p><p><span>NEXT</span> AI Engineer <small>/ Jan 2027</small></p></div></div>

      <section className="work-section shell" id="work" aria-labelledby="work-title"><Reveal className="section-heading"><div><p className="eyebrow">01 / PUBLIC IMPLEMENTATIONS</p><h2 id="work-title">The work.<br/><em>And the reasoning behind it.</em></h2></div><p>Security and AI are useful together when the evaluation is as thoughtful as the implementation.</p></Reveal><div className="filter-row" role="group" aria-label="Filter selected projects">{filters.map(item => <button key={item} type="button" className={`filter-button ${filter === item ? 'active' : ''}`} aria-pressed={filter === item} onClick={() => { setFilter(item); updateLocation(item, selected) }}>{item === 'All' ? 'All work' : item}<span>{projects.filter(project => item === 'All' || project.category.includes(item)).length.toString().padStart(2, '0')}</span></button>)}</div><p className="focus-copy" aria-live="polite">{focusCopy[filter]}</p><div className="project-grid">{visible.map(project => <ProjectCard key={project.id} project={project} onOpen={openProject}/>)}</div><p className="evidence-note"><Check size={15} aria-hidden="true"/> Public source is linked. Project notes distinguish implementation, verification, and next validation.</p>
        <div className="supporting-work"><div className="supporting-heading"><h3>Beyond the selected work</h3><span>SUPPORTING ENGINEERING</span></div>{supportingProjects.map(project => <a key={project.title} href={project.source} target="_blank" rel="noopener noreferrer"><div><strong>{project.title}</strong><p>{project.description}</p></div><span className="supporting-tags">{project.tags}</span><span className="supporting-status">{project.status}</span><ArrowUpRight size={17} aria-hidden="true"/></a>)}</div>
      </section>

      <section className="research-section" aria-labelledby="research-title"><div className="shell research-layout"><Reveal><p className="eyebrow">02 / RESEARCH FOUNDATION</p><h2 id="research-title">Security knowledge.<br/><em>A sharper lens for AI.</em></h2><p className="research-intro">My NUS final-year research examined ChatGPT for cyber threat-intelligence question-answering, alongside study of adversarial techniques across IT and OT.</p></Reveal><Reveal className="research-note"><div className="note-topline"><FlaskConical size={18} aria-hidden="true"/><span>RESEARCH OVERVIEW / 2024</span></div><h3>LLMs for Cyber Threat Intelligence</h3><p>Exploring how well a language model answers questions about threat-intelligence reports, informed by MITRE ATT&CK and security-domain research.</p><div className="research-boundary"><span>SCOPE OF THIS OVERVIEW</span><p>Career and research background from my resume. The original report and evaluation artifacts are not published here; no benchmark result or deployed-system claim is implied.</p></div><a className="inline-link" href="https://www.linkedin.com/in/tan-ivan/" target="_blank" rel="noopener noreferrer">View professional background <ArrowUpRight size={15} aria-hidden="true"/></a></Reveal></div></section>

      <section className="background-section shell" id="background" aria-labelledby="background-title"><Reveal className="section-heading"><div><p className="eyebrow">03 / BACKGROUND</p><h2 id="background-title">Built from security.<br/><em>Grounded in operations.</em></h2></div><p>Experience investigating systems and operating networks shapes how I approach engineering.</p></Reveal><div className="background-layout"><div className="experience-list">{experience.map(role => <Reveal key={role.title} className={`experience-row ${role.upcoming ? 'upcoming-role' : ''}`}><div className="experience-meta"><span>{role.period}</span><span>{role.organization}</span></div><h3>{role.title}{role.upcoming && <small>UPCOMING</small>}</h3><p>{role.description}</p></Reveal>)}</div><aside className="foundation"><p className="eyebrow">FOUNDATION</p><div className="foundation-credential"><ShieldCheck size={24} aria-hidden="true"/><div><strong>OSCP</strong><span>Offensive Security Certified Professional</span></div></div><div className="foundation-academic"><h3>National University<br/>of Singapore</h3><p>Bachelor of Computing<br/>Information Security<br/>First Class Honours</p><dl><div><dt>GPA</dt><dd>4.87 / 5.0</dd></div><div><dt>Class of 2024</dt><dd>Valedictorian</dd></div><div><dt>Recognition</dt><dd>Four Dean's Lists<br/>CSA Book Prize</dd></div></dl></div><div className="community-note"><span>COMMUNITY</span><p>Cybersecurity writing through N0H4TS. I value making technical work understandable, not just executable.</p></div></aside></div></section>

      <section className="direction-section shell" aria-labelledby="direction-title"><div><p className="eyebrow">04 / NEXT DIRECTION</p><h2 id="direction-title">More evidence.<br/>Not more buzzwords.</h2></div><div><p>I'm interested in security-focused AI evaluation and tools that make operational decisions easier to inspect.</p><p className="direction-detail">Potential next work: synthetic CTF scenarios paired with defensive fixes and regression tests. This is a planned direction, not an implemented challenge collection.</p></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="shell contact-inner"><div><p className="eyebrow">05 / LET'S CONNECT</p><h2 id="contact-title">Building where<br/><em>security meets AI?</em></h2><p>Let's discuss the systems, the tradeoffs, and what your team needs next.</p></div><div className="contact-links"><a href="https://www.linkedin.com/in/tan-ivan/" target="_blank" rel="noopener noreferrer"><Linkedin size={19} aria-hidden="true"/><span>Connect on LinkedIn</span><ArrowUpRight size={18} aria-hidden="true"/></a><a href="mailto:ivanaitzliddat@gmail.com"><Mail size={19} aria-hidden="true"/><span>Email Ivan</span><ArrowUpRight size={18} aria-hidden="true"/></a><a href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer"><Github size={19} aria-hidden="true"/><span>Explore GitHub</span><ArrowUpRight size={18} aria-hidden="true"/></a></div></div></section>
    </main><footer className="shell footer-inner"><span>Ivan Tan / Singapore</span><span>Security foundations. Applied AI. Clear evidence.</span><a href="#top">Back to top <ArrowUpRight size={13} aria-hidden="true"/></a></footer><ProjectDialog project={selected} onClose={closeProject}/>
  </div></MotionConfig>
}

export default App

