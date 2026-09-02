import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

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
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-[#0A0A0A] transition-[border-color,box-shadow,transform] duration-300 ${
        open
          ? 'border-[rgba(231,0,11,0.45)] shadow-[0_12px_40px_rgba(231,0,11,0.12)]'
          : 'border-white/[0.08] hover:border-[rgba(231,0,11,0.28)] hover:shadow-[0_10px_32px_rgba(231,0,11,0.08)]'
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-11 w-full items-start justify-between gap-3 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: SOLUTION_ACCENT }}
        >
          <span>
            <span className="block font-heading text-lg font-bold text-[#FFFFFF] sm:text-xl">
              {pillar.title}
            </span>
            <span className="mt-2 block font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
              {pillar.summary}
            </span>
          </span>
          <span
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 font-heading text-lg font-bold text-[#FFFFFF]"
            aria-hidden="true"
            style={{
              backgroundColor: open ? SOLUTION_ACCENT : 'transparent',
              borderColor: open ? SOLUTION_ACCENT : 'rgba(255,255,255,0.15)',
            }}
          >
            {open ? '−' : '+'}
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
          <ul className="space-y-4 border-t border-white/[0.08] px-5 pt-4 pb-6">
            {(pillar.capabilities || []).map((cap) => (
              <li key={cap.title}>
                <p className="font-heading text-sm font-bold text-[#FFFFFF]">{cap.title}</p>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">{cap.body}</p>
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
      id="pillars"
      className="solution-section border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-pillars-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <p
          className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
          style={{ color: SOLUTION_ACCENT }}
        >
          {pillars.eyebrow}
        </p>
        <h2
          id="solution-pillars-heading"
          className="mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-[#FFFFFF] sm:text-4xl"
        >
          {pillars.headline}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
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
        </div>
      </div>
    </section>
  )
}
