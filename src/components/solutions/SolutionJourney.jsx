import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal from '../home/ScrollReveal'

const STEP_MS = 4200
const EASE = [0.16, 1, 0.3, 1]

/**
 * Auto-advancing journey stepper (no manual control).
 * Shared across Modernize, Protect, and Make Data Actionable.
 */
export default function SolutionJourney({ journey, sectionId = 'engagement-journey' }) {
  const reduceMotion = useReducedMotion()
  const steps = journey?.steps || []
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!steps.length || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [steps.length, reduceMotion])

  if (!journey || !steps.length) return null

  const progress = steps.length > 1 ? activeIndex / (steps.length - 1) : 0
  const active = steps[activeIndex]

  return (
    <section
      id={sectionId}
      className="solution-section relative overflow-x-hidden border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-journey-heading"
      style={{ scrollMarginTop: '140px' }}
    >
      {/* Soft architectural backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(231,0,11,0.08) 0%, transparent 60%)',
          }}
        />
        {!reduceMotion ? (
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" preserveAspectRatio="none">
            <defs>
              <pattern id={`${sectionId}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${sectionId}-grid)`} />
            <motion.circle
              cx="18%"
              cy="70%"
              r="2.5"
              fill={SOLUTION_ACCENT}
              animate={{ opacity: [0.2, 0.7, 0.2], cy: ['68%', '72%', '68%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="82%"
              cy="35%"
              r="2"
              fill="#FFFFFF"
              animate={{ opacity: [0.15, 0.55, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </svg>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
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

        {/* Desktop */}
        <div className="mt-14 hidden lg:block" aria-live="polite" aria-atomic="true">
          <ol
            className="relative grid grid-cols-4 gap-6 text-left"
            aria-label={journey.eyebrow || 'Journey steps'}
          >
            <div
              className="pointer-events-none absolute top-5 right-8 left-8 h-px bg-white/15"
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute top-5 left-8 h-px origin-left"
              style={{ backgroundColor: SOLUTION_ACCENT, right: '2rem' }}
              aria-hidden="true"
              initial={false}
              animate={{ scaleX: progress }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
            />
            {/* Traveling pulse along the track */}
            {!reduceMotion ? (
              <motion.span
                className="pointer-events-none absolute top-5 z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{
                  boxShadow: `0 0 14px ${SOLUTION_ACCENT}, 0 0 4px #fff`,
                }}
                aria-hidden="true"
                initial={false}
                animate={{
                  left: `calc(2rem + (100% - 4rem) * ${progress})`,
                }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            ) : null}

            {steps.map((step, i) => {
              const isActive = activeIndex === i
              const passed = i <= activeIndex
              return (
                <li
                  key={step.title}
                  className="relative"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className="w-full text-left">
                    <motion.span
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-extrabold text-white"
                      style={{
                        backgroundColor: passed ? SOLUTION_ACCENT : '#1a1a1a',
                        border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                      }}
                      animate={
                        reduceMotion
                          ? {
                              boxShadow: isActive
                                ? '0 0 0 3px rgba(231,0,11,0.35)'
                                : '0 0 0 0px transparent',
                            }
                          : isActive
                            ? {
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                  '0 0 0 3px rgba(231,0,11,0.25), 0 0 16px rgba(231,0,11,0.25)',
                                  '0 0 0 5px rgba(231,0,11,0.4), 0 0 28px rgba(231,0,11,0.4)',
                                  '0 0 0 3px rgba(231,0,11,0.25), 0 0 16px rgba(231,0,11,0.25)',
                                ],
                              }
                            : {
                                scale: 1,
                                boxShadow: '0 0 0 0px transparent',
                              }
                      }
                      transition={
                        isActive && !reduceMotion
                          ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.3 }
                      }
                      aria-hidden="true"
                    >
                      {i + 1}
                    </motion.span>

                    <motion.h3
                      className="mt-5 font-heading text-base font-bold"
                      animate={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      className="mt-3 font-body text-sm leading-relaxed"
                      animate={{
                        color: isActive ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.28)',
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                    >
                      {step.body}
                    </motion.p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile */}
        <ol className="relative mt-12 space-y-0 text-left lg:hidden" aria-live="polite">
          <div
            className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px bg-white/15"
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-3 left-[15px] w-px origin-top"
            style={{ backgroundColor: SOLUTION_ACCENT }}
            aria-hidden="true"
            initial={false}
            animate={{ height: `${Math.max(10, progress * 100)}%` }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
          />

          {steps.map((step, i) => {
            const isActive = activeIndex === i
            const passed = i <= activeIndex
            return (
              <li
                key={step.title}
                className="relative flex gap-4 pb-10 last:pb-0"
                aria-current={isActive ? 'step' : undefined}
              >
                <motion.span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white"
                  style={{
                    backgroundColor: passed ? SOLUTION_ACCENT : '#1a1a1a',
                    border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: isActive ? '0 0 0 3px rgba(231,0,11,0.35)' : 'none',
                  }}
                  animate={
                    !reduceMotion && isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }
                  }
                  transition={
                    isActive && !reduceMotion
                      ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.25 }
                  }
                  aria-hidden="true"
                >
                  {i + 1}
                </motion.span>
                <div className="min-w-0 flex-1">
                  <h3
                    className="font-heading text-base font-bold"
                    style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 font-body text-sm leading-relaxed"
                    style={{
                      color: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="sr-only">
          Current step: {activeIndex + 1} of {steps.length}. {active?.title}.
        </p>
      </div>
    </section>
  )
}
