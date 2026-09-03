import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal from '../home/ScrollReveal'

const STEP_MS = 4500
const EASE = [0.16, 1, 0.3, 1]

/**
 * Interactive engagement journey — auto-advancing stepper with
 * click / focus / touch selection. Shared across all solution pages.
 */
export default function SolutionJourney({ journey, sectionId = 'engagement-journey' }) {
  const reduceMotion = useReducedMotion()
  const steps = journey?.steps || []
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!steps.length || paused || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [steps.length, paused, reduceMotion])

  if (!journey || !steps.length) return null

  const selectStep = (index) => {
    setActiveIndex(index)
    setPaused(true)
    window.setTimeout(() => setPaused(false), STEP_MS)
  }

  const progress = steps.length > 1 ? activeIndex / (steps.length - 1) : 0

  return (
    <section
      id={sectionId}
      className="solution-section border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-journey-heading"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={28}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: SOLUTION_ACCENT }}
          >
            {journey.eyebrow}
          </p>
          <h2
            id="solution-journey-heading"
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-[#FFFFFF] sm:text-4xl"
          >
            {journey.headline}
          </h2>
        </ScrollReveal>

        {/* Desktop horizontal timeline */}
        <div
          className="mt-14 hidden lg:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol
            className="relative grid grid-cols-4 gap-6 text-left"
            role="listbox"
            aria-label={journey.eyebrow || 'Journey steps'}
            aria-activedescendant={`journey-step-${activeIndex}`}
          >
            {/* Base track */}
            <div
              className="pointer-events-none absolute top-5 right-8 left-8 h-px bg-white/15"
              aria-hidden="true"
            />
            {/* Animated progress fill */}
            <motion.div
              className="pointer-events-none absolute top-5 left-8 h-px origin-left"
              style={{ backgroundColor: SOLUTION_ACCENT, right: '2rem' }}
              aria-hidden="true"
              initial={false}
              animate={{
                scaleX: progress,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: EASE }
              }
            />

            {steps.map((step, i) => {
              const active = activeIndex === i
              const passed = i <= activeIndex
              return (
                <li key={step.title} className="relative">
                  <button
                    type="button"
                    id={`journey-step-${i}`}
                    role="option"
                    aria-selected={active}
                    onClick={() => selectStep(i)}
                    onFocus={() => selectStep(i)}
                    className="group w-full rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ outlineColor: SOLUTION_ACCENT }}
                  >
                    <motion.span
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-extrabold text-white"
                      style={{
                        backgroundColor: passed ? SOLUTION_ACCENT : '#1a1a1a',
                        boxShadow: active
                          ? `0 0 0 3px rgba(231,0,11,0.35), 0 0 24px rgba(231,0,11,0.35)`
                          : 'none',
                        border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                      }}
                      animate={
                        reduceMotion
                          ? undefined
                          : active
                            ? { scale: [1, 1.08, 1] }
                            : { scale: 1 }
                      }
                      transition={
                        active && !reduceMotion
                          ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.25 }
                      }
                      aria-hidden="true"
                    >
                      {i + 1}
                    </motion.span>

                    <motion.h3
                      className="mt-5 font-heading text-base font-bold"
                      animate={{
                        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      className="mt-3 font-body text-sm leading-relaxed"
                      animate={{
                        color: active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.32)',
                        opacity: active ? 1 : 0.9,
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                    >
                      {step.body}
                    </motion.p>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Step progress dots */}
          <div className="mt-10 flex items-center justify-center gap-2" aria-hidden="true">
            {steps.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                tabIndex={-1}
                onClick={() => selectStep(i)}
                className="h-1.5 rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: activeIndex === i ? '1.75rem' : '0.5rem',
                  backgroundColor:
                    activeIndex === i ? SOLUTION_ACCENT : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <ol
          className="relative mt-12 space-y-0 text-left lg:hidden"
          onTouchStart={() => setPaused(true)}
        >
          <div
            className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px bg-white/15"
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-3 left-[15px] w-px origin-top"
            style={{ backgroundColor: SOLUTION_ACCENT }}
            aria-hidden="true"
            initial={false}
            animate={{
              height: `${Math.max(8, progress * 100)}%`,
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
          />

          {steps.map((step, i) => {
            const active = activeIndex === i
            const passed = i <= activeIndex
            return (
              <li key={step.title} className="relative flex gap-4 pb-10 last:pb-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectStep(i)}
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: passed ? SOLUTION_ACCENT : '#1a1a1a',
                    border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: active ? '0 0 0 3px rgba(231,0,11,0.35)' : 'none',
                    outlineColor: SOLUTION_ACCENT,
                  }}
                >
                  {i + 1}
                </button>
                <button
                  type="button"
                  onClick={() => selectStep(i)}
                  className="min-w-0 flex-1 rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: SOLUTION_ACCENT }}
                >
                  <h3
                    className="font-heading text-base font-bold"
                    style={{ color: active ? '#FFFFFF' : 'rgba(255,255,255,0.55)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 font-body text-sm leading-relaxed"
                    style={{
                      color: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {step.body}
                  </p>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
