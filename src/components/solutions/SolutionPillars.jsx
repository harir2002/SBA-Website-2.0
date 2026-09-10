import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal, { ScrollStagger } from '../home/ScrollReveal'

function useIsNarrow(breakpoint = 1024) {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : true,
  )
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < breakpoint)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return narrow
}

function PillarPanel({ pillar, open, onToggle, panelId, buttonId, reduceMotion }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-[#0B0B0C] transition-[border-color,box-shadow,transform] duration-300 ${
        open
          ? 'border-[#E7000B] shadow-[0_12px_40px_rgba(231,0,11,0.14)]'
          : 'border-white/[0.08] hover:border-[rgba(231,0,11,0.35)] hover:shadow-[0_10px_32px_rgba(231,0,11,0.08)]'
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-11 w-full items-start gap-3 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: SOLUTION_ACCENT }}
        >
          <span className="min-w-0">
            {/* Main heading — red (primary accent) */}
            <span
              className="block font-heading text-xl font-extrabold leading-snug tracking-[-0.01em] sm:text-[1.35rem]"
              style={{ color: SOLUTION_ACCENT }}
            >
              {pillar.title}
            </span>
            {/* Main description — muted supporting line */}
            <span className="mt-2.5 block font-body text-sm leading-relaxed text-[rgba(255,255,255,0.6)] sm:text-[0.95rem]">
              {pillar.summary}
            </span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          transitionDuration: reduceMotion ? '0ms' : '300ms',
        }}
      >
        <div className="overflow-hidden">
          <ul className="space-y-5 border-t border-white/[0.1] px-5 pt-5 pb-6">
            {(pillar.capabilities || []).map((cap) => (
              <li key={cap.title}>
                {/* Sub-heading — white (colour contrast vs red main heading) */}
                <h4 className="m-0 font-heading text-xl font-extrabold leading-snug tracking-[-0.01em] text-white sm:text-[1.35rem]">
                  {cap.title}
                </h4>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)] sm:text-[0.95rem]">
                  {cap.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function SolutionPillars({ pillars }) {
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const isNarrow = useIsNarrow(1024)
  const [openIndex, setOpenIndex] = useState(0)
  const [desktopOpen, setDesktopOpen] = useState([true, true, true])

  if (!pillars) return null

  const items = pillars.items || []
  const sectionId = pillars.sectionId || 'pillars'
  const headingId = `${sectionId}-heading`

  const toggleDesktop = (i) => {
    setDesktopOpen((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const toggleMobile = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i))
  }

  return (
    <section
      id={sectionId}
      className="solution-section relative overflow-x-hidden border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby={headingId}
      style={{ scrollMarginTop: '140px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 10% 50%, rgba(231,0,11,0.06) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 90% 50%, rgba(255,255,255,0.03) 0%, transparent 55%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={32}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: SOLUTION_ACCENT }}
          >
            {pillars.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-[#FFFFFF] sm:text-4xl"
          >
            {pillars.headline}
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-12 grid grid-cols-1 gap-5 text-left lg:grid-cols-3" stagger={0.12} y={28}>
          {items.map((pillar, i) => {
            const open = isNarrow ? openIndex === i : desktopOpen[i]
            return (
              <PillarPanel
                key={pillar.title}
                pillar={pillar}
                open={open}
                onToggle={() => (isNarrow ? toggleMobile(i) : toggleDesktop(i))}
                panelId={`${baseId}-panel-${i}`}
                buttonId={`${baseId}-btn-${i}`}
                reduceMotion={reduceMotion}
              />
            )
          })}
        </ScrollStagger>
      </div>
    </section>
  )
}
