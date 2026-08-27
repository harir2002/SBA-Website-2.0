/**
 * Shared abstract architecture visuals for About page (CSS/SVG only).
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Who We Are visual — vertical accountable path (not orbit / not card grid).
 */
const MODEL_STAGES = [
  { label: 'Discover', detail: 'Context & constraints' },
  { label: 'Design', detail: 'Architecture & risk' },
  { label: 'Engineer', detail: 'Build & harden' },
  { label: 'Operate', detail: 'Assure & evolve' },
]

export function ConnectedEngineeringModel() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="relative bg-black"
      aria-label="SBA connected engineering model"
    >
      {/* Soft red atmosphere only — no grey panel */}
      <div
        className="pointer-events-none absolute -top-24 right-[-20%] h-56 w-56 rounded-full opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(231,0,11,0.22) 0%, transparent 70%)',
        }}
      />

      <p className="relative z-10 font-heading text-[10px] font-bold tracking-[0.22em] text-primary-red uppercase">
        Connected model
      </p>
      <p className="relative z-10 mt-2 max-w-[18ch] font-heading text-xl font-extrabold leading-snug text-white sm:text-2xl">
        One accountable path from challenge to continuity.
      </p>

      {/* Vertical path */}
      <ol className="relative z-10 mt-9 ml-1">
        {/* Spine */}
        <span
          className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px bg-white/10"
          aria-hidden="true"
        />
        {!reduceMotion && (
          <motion.span
            className="pointer-events-none absolute left-[13px] h-10 w-[5px] rounded-full bg-primary-red"
            style={{
              boxShadow: '0 0 14px rgba(231,0,11,0.85)',
            }}
            animate={{ top: ['8%', '78%', '8%'] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {MODEL_STAGES.map((stage, i) => (
          <motion.li
            key={stage.label}
            className="group relative flex gap-4 py-3.5 first:pt-0 last:pb-0"
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: EASE }}
          >
            <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/15 bg-black transition-colors duration-300 group-hover:border-primary-red/50 group-hover:bg-primary-red/10" />
              <span className="relative font-heading text-[10px] font-bold tracking-wide text-white/50 transition-colors duration-300 group-hover:text-primary-red">
                {String(i + 1).padStart(2, '0')}
              </span>
            </span>

            <div className="min-w-0 flex-1 border-b border-white/[0.08] pb-3.5 transition-colors duration-300 group-hover:border-primary-red/35 last:border-b-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-heading text-base font-bold text-white transition-colors duration-300 group-hover:text-primary-red sm:text-lg">
                  {stage.label}
                </p>
                <span
                  className="h-px flex-1 max-w-[4rem] bg-white/10 transition-[background-color,max-width] duration-300 group-hover:max-w-[5.5rem] group-hover:bg-primary-red/60"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1 font-body text-sm text-white/45">{stage.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <p className="relative z-10 mt-6 font-heading text-[10px] tracking-[0.2em] text-white/30 uppercase">
        Challenge → continuity
      </p>
    </div>
  )
}

/**
 * Complexity visual — flat motion backbone on pure black (no grey card, no 3D text warp).
 */
const COMPLEXITY_LAYERS = [
  { label: 'Identity', fill: 72 },
  { label: 'Applications', fill: 58 },
  { label: 'Data', fill: 84 },
  { label: 'Cloud', fill: 64 },
  { label: 'Security', fill: 78 },
  { label: 'Operations', fill: 54 },
  { label: 'AI', fill: 70 },
  { label: 'Edge', fill: 48 },
]

export function ComplexityLayers() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative bg-black" aria-hidden="true">
      {/* Soft red atmosphere only — sits on page black */}
      <div
        className="pointer-events-none absolute -top-10 right-0 h-48 w-48 rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(231,0,11,0.2) 0%, transparent 70%)',
        }}
      />

      <p className="relative z-10 max-w-[18ch] font-heading text-base font-semibold leading-snug text-white sm:text-lg">
        26 layers of enterprise complexity.
        <span className="mt-1.5 block text-primary-red">One unified backbone.</span>
      </p>

      <ul className="relative z-10 mt-9 space-y-0">
        {/* Vertical backbone */}
        <span
          className="pointer-events-none absolute top-2 bottom-2 left-[11px] w-px bg-white/15"
          aria-hidden="true"
        />
        {!reduceMotion && (
          <motion.span
            className="pointer-events-none absolute left-[9px] h-8 w-[5px] rounded-full bg-primary-red"
            style={{ boxShadow: '0 0 12px rgba(231,0,11,0.9)' }}
            animate={{ top: ['6%', '82%', '6%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {COMPLEXITY_LAYERS.map((layer, i) => (
          <motion.li
            key={layer.label}
            className="relative flex items-center gap-4 py-2.5"
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.06 + i * 0.06, ease: EASE }}
          >
            <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black">
              <span className="font-heading text-[9px] font-bold text-white/55">
                {String(i + 1).padStart(2, '0')}
              </span>
            </span>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="font-heading text-sm font-semibold text-white">
                  {layer.label}
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-primary-red"
                  style={{
                    boxShadow: '0 0 10px rgba(231,0,11,0.55)',
                  }}
                  initial={reduceMotion ? false : { width: 0 }}
                  whileInView={
                    reduceMotion
                      ? undefined
                      : { width: `${layer.fill}%` }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.07,
                    ease: EASE,
                  }}
                />
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
