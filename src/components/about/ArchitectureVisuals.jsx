/**
 * Shared abstract architecture visuals for About page (CSS/SVG only).
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_LAYERS } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

/** Hero visual — six labeled capability layers (not empty placeholders) */
export function HeroArchitecture() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="about-hero-arch relative flex h-full min-h-[320px] w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/[0.08] p-5 sm:p-7"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 80% 20%, rgba(231,0,11,0.14) 0%, transparent 55%), linear-gradient(145deg, #0b0d12 0%, #12151c 50%, #0a0a0a 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <p className="relative z-10 mb-4 font-heading text-[10px] font-bold tracking-[0.22em] text-primary-red uppercase sm:text-xs">
        Unified backbone
      </p>

      <ul className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
        {ABOUT_LAYERS.map((label, i) => (
          <motion.li
            key={label}
            className="flex items-center gap-3 rounded-lg border border-white/[0.1] bg-black/35 px-3.5 py-2.5 backdrop-blur-[2px] sm:px-4 sm:py-3"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
          >
            <span
              className="h-7 w-[3px] shrink-0 rounded-full bg-primary-red"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 font-heading text-xs font-semibold text-white sm:text-sm">
              {label}
            </span>
            <span className="shrink-0 font-heading text-[10px] tracking-[0.14em] text-white/30 uppercase">
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/** Six capability layers — dark list for Who We Are */
export function StackedLayers({ layers = [] }) {
  const reduceMotion = useReducedMotion()

  return (
    <ul className="relative space-y-3" aria-label="SBA capability layers">
      {layers.map((label, i) => (
        <motion.li
          key={label}
          className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#0d0f14] px-4 py-4 transition-[border-color,background-color] duration-300 hover:border-primary-red/40 hover:bg-[#12151c] sm:px-5"
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
        >
          <span
            className="h-8 w-[3px] shrink-0 rounded-full bg-primary-red"
            aria-hidden="true"
          />
          <span className="flex-1 font-heading text-sm font-semibold text-white sm:text-base">
            {label}
          </span>
          <span className="font-heading text-[11px] tracking-[0.16em] text-white/30 uppercase">
            {String(i + 1).padStart(2, '0')}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

/** Complexity visual — abstract density bars, no line through copy */
export function ComplexityLayers() {
  const reduceMotion = useReducedMotion()
  const rows = 12

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 sm:p-8"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 90% 0%, rgba(231,0,11,0.12) 0%, transparent 50%), linear-gradient(160deg, #0a0c10, #11141a)',
      }}
      aria-hidden="true"
    >
      <p className="relative z-10 mb-7 max-w-[18ch] font-heading text-base font-semibold leading-snug text-white sm:text-lg">
        26 layers of enterprise complexity.
        <span className="mt-1.5 block text-primary-red">One unified backbone.</span>
      </p>

      <div className="relative z-10 space-y-2">
        {Array.from({ length: rows }).map((_, i) => {
          const width = 62 + ((i * 19) % 34)
          const fill = 28 + (i % 5) * 10
          return (
            <motion.div
              key={i}
              className="relative h-2 overflow-hidden rounded-full bg-white/[0.07]"
              style={{ width: `${width}%` }}
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0.7 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.035, ease: EASE }}
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-primary-red/50"
                style={{ width: `${fill}%` }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
