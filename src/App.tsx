import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, MoveUpRight, ScanLine, ShieldCheck, Sparkles, X } from 'lucide-react'
import { projects, type Category, type Project } from './data'

type Filter = 'All' | Category
const filters: Filter[] = ['All', 'Security', 'AI', 'Product']

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

function ProjectArt({ project }: { project: Project }) {
  return (
    <div className={`project-art art-${project.theme}`} aria-hidden="true">
      <span className="art-index">{project.number} / SELECTED WORK</span>
      {project.theme === 'vision' && <div className="vision-target"><span className="vision-corner tl"/><span className="vision-corner tr"/><span className="vision-corner bl"/><span className="vision-corner br"/><div className="vision-line"/><ScanLine size={34}/><span className="vision-detection">OCR DETECTED</span></div>}
      {project.theme === 'signal' && <div className="signal-stack"><span>URL ANALYSIS</span><div className="signal-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><strong>0.92</strong><small>RISK SIGNAL</small></div>}
      {project.theme === 'miles' && <div className="miles-art"><div className="miles-orbit one"/><div className="miles-orbit two"/><strong>✦</strong><span>POINTS → POSSIBILITIES</span></div>}
      {project.theme === 'quiz' && <div className="quiz-art"><span className="quiz-ring ring-a"/><span className="quiz-ring ring-b"/><span className="quiz-ring ring-c"/><strong>YOUR<br/>PERSPECTIVE</strong></div>}
      {project.theme === 'games' && <div className="games-art"><span className="playing-card back">A</span><span className="playing-card front">♠<small>RIDE THE BUS</small></span></div>}
      {project.theme === 'travel' && <div className="travel-art"><span className="travel-route"/><span className="travel-dot start"/><span className="travel-dot end"/><strong>TOGETHER,<br/>BETTER.</strong></div>}
      <span className="art-bottom">{project.kicker.toUpperCase()}</span>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project, trigger: HTMLButtonElement) => void }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      layout={!reduce}
      className="project-card"
      initial={reduce ? false : { opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
    >
      <ProjectArt project={project} />
      <div className="project-info">
        <div className="project-topline"><span>{project.kicker}</span><span>{project.number}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-tags">{project.technologies.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-foot">
          <button className="detail-button" type="button" onClick={(event) => onOpen(project, event.currentTarget)}>Explore project <ArrowUpRight size={17} aria-hidden="true" /></button>
          <span className="project-status">{project.status ?? 'Public source'}</span>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div className="dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <motion.section
        ref={dialogRef}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
      >
        <button className="dialog-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close project details"><X size={22}/></button>
        <ProjectArt project={project} />
        <div className="dialog-copy">
          <p className="eyebrow">PROJECT {project.number} / {project.kicker}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <p id="dialog-description" className="dialog-lead">{project.detail}</p>
          <div className="dialog-section"><span>FOCUS</span><p>{project.contribution}</p></div>
          <div className="dialog-section"><span>BUILT WITH</span><div className="dialog-tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          <div className="dialog-actions">
            <a className="button button-accent" href={project.source} target="_blank" rel="noopener noreferrer">View source <Github size={17} aria-hidden="true" /></a>
            {project.demo && <a className="button button-outline" href={project.demo} target="_blank" rel="noopener noreferrer">Open demo <ArrowUpRight size={17} aria-hidden="true" /></a>}
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

function App() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -90])
  const visibleProjects = projects.filter(project => filter === 'All' || project.category.includes(filter))
  const openProject = (project: Project, trigger: HTMLButtonElement) => { triggerRef.current = trigger; setSelected(project) }
  const closeProject = () => { setSelected(null); window.setTimeout(() => triggerRef.current?.focus(), 0) }

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-wrap" id="top">
        <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="shell header-inner">
            <a className="brand" href="#top" aria-label="Ivan Tan, back to top"><span className="brand-symbol">i<span>.</span></span><span>Ivan Tan</span></a>
            <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#approach">Approach</a><a href="#about">About</a></nav>
            <a className="header-link" href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </header>

        <main id="main">
          <section className="hero shell" aria-labelledby="hero-title">
            <div className="hero-copy">
              <Reveal><p className="eyebrow hero-eyebrow"><span className="pulse-dot"/> SECURITY × AI × SOFTWARE</p></Reveal>
              <Reveal delay={0.08}><h1 id="hero-title">Systems that <em>see</em> clearly.<br/>Ideas that <em>hold up.</em></h1></Reveal>
              <Reveal delay={0.16}><p className="hero-lede">I’m Ivan, an OSCP-certified cybersecurity graduate moving into AI engineering. I build software that makes complex signals useful, reviewable, and human.</p></Reveal>
              <Reveal className="hero-actions" delay={0.24}>
                <a className="button button-accent" href="#work">Explore the work <ArrowDownRight size={18} aria-hidden="true" /></a>
                <a className="text-link" href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer">Browse GitHub <MoveUpRight size={17} aria-hidden="true" /></a>
              </Reveal>
              <Reveal className="hero-micro" delay={0.32}><span>01 — OBSERVE</span><span>02 — REASON</span><span>03 — BUILD</span></Reveal>
            </div>
            <motion.div className="hero-visual" style={{ y: reduce ? undefined : heroY }} aria-hidden="true">
              <div className="hero-grid"/>
              <motion.div className="orbit orbit-one" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 42, ease: 'linear', repeat: Infinity }}/>
              <motion.div className="orbit orbit-two" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 56, ease: 'linear', repeat: Infinity }}/>
              <div className="hero-core"><div className="core-mark"><ScanLine size={39} strokeWidth={1.45}/></div><span>SIGNAL → INSIGHT</span></div>
              <motion.div className="visual-chip chip-a" animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><ShieldCheck size={17}/> SECURE BY DESIGN</motion.div>
              <motion.div className="visual-chip chip-b" animate={reduce ? undefined : { y: [0, 9, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}><Sparkles size={17}/> HUMAN IN THE LOOP</motion.div>
              <span className="visual-cross cross-a">+</span><span className="visual-cross cross-b">+</span>
            </motion.div>
          </section>

          <div className="hero-bottom shell"><span>SELECTED PROJECTS ↓</span><span>BUILT WITH CURIOSITY, TESTED WITH CARE</span></div>

          <section className="work-section shell" id="work" aria-labelledby="work-title">
            <Reveal className="section-heading"><div><p className="eyebrow">01 / THE WORK</p><h2 id="work-title">Built to be explored.</h2></div><p>Public source projects across security, applied AI, and product engineering. Every link leads to a repository I’ve reviewed for this portfolio.</p></Reveal>
            <div className="filter-row" role="group" aria-label="Filter projects">
              {filters.map(item => <button key={item} className={`filter-button ${filter === item ? 'active' : ''}`} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'All' ? 'All work' : item}<span>{item === 'All' ? projects.length.toString().padStart(2, '0') : projects.filter(p => p.category.includes(item)).length.toString().padStart(2, '0')}</span></button>)}
            </div>
            <motion.div className="project-grid" layout={!reduce}>
              <AnimatePresence mode="popLayout">{visibleProjects.map(project => <ProjectCard key={project.id} project={project} onOpen={openProject}/>)}</AnimatePresence>
            </motion.div>
            <p className="work-note">Projects under private review stay off this page until their public versions are ready.</p>
          </section>

          <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="shell approach-inner">
            <Reveal><p className="eyebrow">02 / HOW I WORK</p><h2 id="approach-title">Curious about the edge cases.<br/><em>Clear about the evidence.</em></h2></Reveal>
            <div className="approach-grid">
              <Reveal className="approach-item" delay={0.05}><span className="approach-num">01</span><ShieldCheck size={28} strokeWidth={1.6}/><h3>Security thinking</h3><p>My OSCP background keeps trust boundaries, failure modes, and verification close to the design.</p></Reveal>
              <Reveal className="approach-item" delay={0.12}><span className="approach-num">02</span><Sparkles size={28} strokeWidth={1.6}/><h3>AI with review</h3><p>I care about evaluation, source quality, and giving people a way to inspect the system’s suggestions.</p></Reveal>
              <Reveal className="approach-item" delay={0.19}><span className="approach-num">03</span><ArrowRight size={28} strokeWidth={1.6}/><h3>Useful interfaces</h3><p>The best implementation makes the next action obvious, especially when the underlying workflow is complex.</p></Reveal>
            </div>
          </div></section>

          <section className="about-section shell" id="about" aria-labelledby="about-title"><Reveal className="about-grid"><div><p className="eyebrow">03 / ABOUT</p><h2 id="about-title">Where security meets building.</h2></div><div><p>I work across cybersecurity and software engineering, with a growing focus on AI systems. My portfolio includes visual monitoring, security ML, human-reviewed agents, and full-stack prototypes.</p><p>Each repository explains what is implemented and where the limits are. I value that distinction because useful software earns trust through evidence.</p><a className="text-link about-link" href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer">Follow the work on GitHub <ArrowUpRight size={17}/></a></div></Reveal></section>

          <section className="contact-section"><div className="shell contact-inner"><Reveal><p className="eyebrow">04 / CONNECT</p><h2>Let’s make complex things<br/><em>clearer.</em></h2><p>Explore the code, follow the projects, or get in touch through GitHub.</p><a className="button button-dark" href="https://github.com/ivanaitzliddat" target="_blank" rel="noopener noreferrer">Visit GitHub <Github size={18}/></a></Reveal><span className="contact-glyph" aria-hidden="true">↗</span></div></section>
        </main>

        <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Ivan Tan</span><span>Security · AI · Software</span><a href="#top">Back to top ↑</a></div></footer>
        <AnimatePresence>{selected && <ProjectDialog key={selected.id} project={selected} onClose={closeProject}/>}</AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export default App
