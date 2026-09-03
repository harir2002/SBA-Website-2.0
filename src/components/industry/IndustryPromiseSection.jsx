import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const CYCLE_MS = 2600

function PromiseLayersRail({ layers = [], accent = '#E7000B', reduceMotion }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused || layers.length < 2) return undefined
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % layers.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, layers.length])

  return (
    <motion.ol
      className="promise-layers relative"
      initial={reduceMotion ? false : { opacity: 0, x: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: EASE }}
      aria-label="Capability layers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="flex flex-col gap-3">
        {layers.map((layer, i) => {
          const isActive = i === active
          return (
            <motion.li key={layer} className="relative list-none">
              <button
                type="button"
                className="group relative flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  borderColor: isActive ? `${accent}99` : 'rgba(255,255,255,0.12)',
                  background: isActive
                    ? `linear-gradient(105deg, ${accent}22 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.03) 100%)`
                    : 'rgba(255,255,255,0.035)',
                  boxShadow: isActive
                    ? `0 0 0 1px ${accent}33, 0 12px 36px rgba(0,0,0,0.35), 0 0 28px ${accent}22`
                    : 'none',
                  transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                }}
                aria-current={isActive ? 'step' : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white transition-transform duration-300"
                  style={{
                    backgroundColor: isActive ? accent : 'rgba(255,255,255,0.12)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 0 4px ${accent}33` : 'none',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className="block font-heading text-sm font-bold leading-snug sm:text-base"
                    style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.72)' }}
                  >
                    {layer}
                  </span>
                </span>

                {/* Active sweep */}
                {isActive && !reduceMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-xl"
                    style={{
                      background: `linear-gradient(90deg, ${accent}28, transparent)`,
                    }}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: [0, 1, 0], x: ['-10%', '110%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            </motion.li>
          )
        })}
      </div>
    </motion.ol>
  )
}

export default function IndustryPromiseSection({ promise, accent = '#E7000B' }) {
  const reduceMotion = useReducedMotion()
  if (!promise) return null
  const paragraphs = (promise.body || '').split('\n\n').filter(Boolean)

  return (
    <section
      id="sba-promise"
      className="relative overflow-hidden bg-black"
      aria-labelledby="industry-promise-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 18% 40%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 82% 55%, rgba(231,0,11,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-14 text-center sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20 lg:text-left">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-none">
          <motion.h2
            id="industry-promise-heading"
            className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-white sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {promise.headline}
          </motion.h2>

          {promise.supportingLine && (
            <motion.p
              className="mt-4 font-heading text-base font-bold sm:text-lg"
              style={{ color: accent }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
            >
              {promise.supportingLine}
            </motion.p>
          )}

          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <motion.p
                key={p.slice(0, 28)}
                className="font-body text-sm font-medium leading-relaxed text-white/80 sm:text-base"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <PromiseLayersRail
          layers={promise.layers || []}
          accent={accent}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  )
}
