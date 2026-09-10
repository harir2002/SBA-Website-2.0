import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal from '../home/ScrollReveal'

const STEP_MS = 4200
const EASE = [0.16, 1, 0.3, 1]

/**
 * Always-visible zone grid + auto-advancing lifecycle steps.
 * Shared mid section for every solution page.
 */
export default function SolutionEngineeringBlueprint({
  engineering,
  accent = SOLUTION_ACCENT,
  sectionId = 'engineering-blueprint',
  headingId = 'engineering-blueprint-heading',
  mapLabel = 'Enterprise Ecosystem Integration Map',
  cycleLabel = 'Engineering lifecycle',
}) {
  const reduceMotion = useReducedMotion()
  const zones = engineering?.zones || []
  const steps = engineering?.steps || []
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!steps.length || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [steps.length, reduceMotion])

  if (!engineering) return null

  const stepProgress = steps.length > 1 ? activeStep / (steps.length - 1) : 0
  const zoneGridClass =
    zones.length >= 5
      ? 'grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      : 'grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4'

  return (
    <section
      id={sectionId}
      className="solution-section relative overflow-x-hidden border-t border-white/[0.06] bg-black"
      aria-labelledby={headingId}
      style={{ scrollMarginTop: '140px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 15%, rgba(231,0,11,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={28}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            {engineering.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-white sm:text-4xl"
          >
            {engineering.headline}
          </h2>
        </ScrollReveal>

        {/* Always-visible zone grid */}
        {zones.length ? (
          <div
            className="mt-12 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0B0B0C]"
            role="group"
            aria-label={mapLabel}
          >
            <div className="border-b border-white/[0.08] px-5 py-4 text-left sm:px-6">
              <p className="font-heading text-[0.65rem] font-bold tracking-[0.2em] text-white/55 uppercase">
                {mapLabel}
              </p>
            </div>

            <ul className={`${zoneGridClass} items-stretch`}>
              {zones.map((zone, i) => (
                <li
                  key={zone.id}
                  className="group flex h-full min-h-0 flex-col bg-[#0B0B0C] px-5 py-6 text-left transition-[background-color] duration-200 hover:bg-[rgba(231,0,11,0.06)] sm:px-6 sm:py-7"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold leading-snug text-white sm:text-lg">
                    {zone.label}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/60">
                    {zone.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Lifecycle steps — same visual language as other solution journeys */}
        {steps.length ? (
          <div className="mt-16">
            <p className="font-heading text-[0.65rem] font-bold tracking-[0.2em] text-white/50 uppercase">
              {cycleLabel}
            </p>

            <div className="mt-10 hidden lg:block" aria-live="polite">
              <ol className="relative grid grid-cols-4 gap-6 text-left">
                <div
                  className="pointer-events-none absolute top-5 right-8 left-8 h-px bg-white/15"
                  aria-hidden="true"
                />
                <motion.div
                  className="pointer-events-none absolute top-5 left-8 h-px origin-left"
                  style={{ backgroundColor: accent, right: '2rem' }}
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleX: stepProgress }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
                />
                {!reduceMotion ? (
                  <motion.span
                    className="pointer-events-none absolute top-5 z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    style={{ boxShadow: `0 0 14px ${accent}, 0 0 4px #fff` }}
                    aria-hidden="true"
                    initial={false}
                    animate={{ left: `calc(2rem + (100% - 4rem) * ${stepProgress})` }}
                    transition={{ duration: 0.55, ease: EASE }}
                  />
                ) : null}

                {steps.map((step, i) => {
                  const isActive = activeStep === i
                  const passed = i <= activeStep
                  return (
                    <li key={step.title} className="relative" aria-current={isActive ? 'step' : undefined}>
                      <motion.span
                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-extrabold text-white"
                        style={{
                          backgroundColor: passed ? accent : '#1a1a1a',
                          border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        }}
                        animate={
                          !reduceMotion && isActive
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
                                boxShadow: isActive
                                  ? '0 0 0 3px rgba(231,0,11,0.35)'
                                  : '0 0 0 0px transparent',
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
                      <h3
                        className="mt-5 font-heading text-base font-bold"
                        style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="mt-3 font-body text-sm leading-relaxed"
                        style={{
                          color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
                        }}
                      >
                        {step.body}
                      </p>
                    </li>
                  )
                })}
              </ol>
            </div>

            <ol className="relative mt-10 space-y-0 text-left lg:hidden" aria-live="polite">
              <div
                className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px bg-white/15"
                aria-hidden="true"
              />
              <motion.div
                className="pointer-events-none absolute top-3 left-[15px] w-px origin-top"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
                initial={false}
                animate={{ height: `${Math.max(10, stepProgress * 100)}%` }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
              />
              {steps.map((step, i) => {
                const isActive = activeStep === i
                const passed = i <= activeStep
                return (
                  <li
                    key={step.title}
                    className="relative flex gap-4 pb-10 last:pb-0"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span
                      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white"
                      style={{
                        backgroundColor: passed ? accent : '#1a1a1a',
                        border: passed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        boxShadow: isActive ? '0 0 0 3px rgba(231,0,11,0.35)' : 'none',
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
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
          </div>
        ) : null}
      </div>
    </section>
  )
}
