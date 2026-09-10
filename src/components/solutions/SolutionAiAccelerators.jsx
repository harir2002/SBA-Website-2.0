import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal, { ScrollStagger } from '../home/ScrollReveal'

const AUTO_MS = 5000

/**
 * Interactive AI Accelerator Showcase — 6 selectable cards + detail panel.
 */
export default function SolutionAiAccelerators({ accelerators, accent = SOLUTION_ACCENT }) {
  const reduceMotion = useReducedMotion()
  const items = accelerators?.items || []
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!items.length || paused || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [items.length, paused, reduceMotion])

  if (!accelerators || !items.length) return null

  const active = items[activeIndex] || items[0]

  const select = (index) => {
    setActiveIndex(index)
    setPaused(true)
    window.setTimeout(() => setPaused(false), AUTO_MS)
  }

  return (
    <section
      id="ai-accelerators"
      className="solution-section relative overflow-x-hidden border-t border-white/[0.06] bg-black"
      aria-labelledby="ai-accelerators-heading"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={32}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            {accelerators.eyebrow}
          </p>
          <h2
            id="ai-accelerators-heading"
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-white sm:text-4xl"
          >
            {accelerators.headline}
          </h2>
        </ScrollReveal>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ScrollStagger
            className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
            y={24}
          >
            {items.map((item, i) => {
              const selected = activeIndex === i
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                  className={`min-h-11 rounded-xl border p-5 text-left transition-[border-color,box-shadow,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    selected
                      ? 'border-[#E7000B] bg-[rgba(231,0,11,0.1)] shadow-[0_12px_40px_rgba(231,0,11,0.14)]'
                      : 'border-white/[0.08] bg-[#0B0B0C] hover:border-[rgba(231,0,11,0.35)]'
                  }`}
                  style={{
                    outlineColor: accent,
                    transitionDuration: reduceMotion ? '0ms' : '200ms',
                  }}
                >
                  <p
                    className="font-heading text-[0.65rem] font-bold tracking-[0.16em] uppercase"
                    style={{ color: selected ? accent : 'rgba(255,255,255,0.45)' }}
                  >
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-extrabold text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
                    {item.description}
                  </p>
                </button>
              )
            })}
          </ScrollStagger>

          <div
            className="mt-6 rounded-xl border border-white/[0.08] bg-[#0B0B0C] p-6 text-left sm:p-7"
            aria-live="polite"
          >
            <p
              className="font-heading text-[0.65rem] font-bold tracking-[0.18em] uppercase"
              style={{ color: accent }}
            >
              {active.category}
            </p>
            <h3 className="mt-2 font-heading text-xl font-extrabold text-white">{active.title}</h3>
            <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-[rgba(255,255,255,0.65)] sm:text-[0.95rem]">
              {active.description}
            </p>
            <p className="mt-4 font-heading text-[0.65rem] font-bold tracking-[0.16em] text-white/45 uppercase">
              Target workflows
            </p>
            <p className="mt-1.5 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.6)]">
              {active.workflows}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
