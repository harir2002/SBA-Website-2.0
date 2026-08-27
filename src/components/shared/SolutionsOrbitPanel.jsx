/**
 * SolutionsOrbitPanel — hub + six capability nodes.
 * Used on Contact hero and About hero.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CAPABILITIES } from '../../data/capabilities'

const EASE = [0.16, 1, 0.3, 1]

/** Fill the panel — nodes near the rim, labels tucked just inside */
const NODE_SLOTS = [
  { x: 50, y: 10, labelPos: 'below' },
  { x: 88, y: 28, labelPos: 'below' },
  { x: 88, y: 72, labelPos: 'above' },
  { x: 50, y: 90, labelPos: 'above' },
  { x: 12, y: 72, labelPos: 'above' },
  { x: 12, y: 28, labelPos: 'below' },
]

const LABEL_CLASS = {
  below:
    'absolute top-3 left-1/2 w-[8.75rem] -translate-x-1/2 text-center sm:w-[10rem]',
  above:
    'absolute bottom-3 left-1/2 w-[8.75rem] -translate-x-1/2 text-center sm:w-[10rem]',
}

const NODES = CAPABILITIES.slice(0, 6).map((cap, i) => ({
  id: cap.id,
  label: cap.title,
  delay: 0.18 + i * 0.1,
  ...NODE_SLOTS[i],
}))

export default function SolutionsOrbitPanel({ className = '' }) {
  const reduceMotion = useReducedMotion()
  const glowId = useId().replace(/:/g, '')

  const beamPaths = NODES.map((n) => `M50 50 L${n.x} ${n.y}`)
  const loopPath = [
    'M50 50',
    ...NODES.map((n) => `L${n.x} ${n.y}`),
    'L50 50',
  ].join(' ')

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      aria-hidden="true"
      style={{ minHeight: 280 }}
    >
      {/* Soft red atmosphere only — no grey panel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(231,0,11,0.14) 0%, transparent 60%)',
        }}
      />

      {/* Rings fill the panel — no max-size caps / no shrink scale */}
      <div className="absolute inset-[4%] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-white/[0.08]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35" />
          <span className="absolute bottom-[18%] left-[8%] h-1 w-1 rounded-full bg-primary-red/70" />
        </motion.div>

        <motion.div
          className="absolute inset-[16%] rounded-full border border-primary-red/25"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: 'inset 0 0 40px rgba(231,0,11,0.06)' }}
        >
          <span className="absolute top-[12%] right-[10%] h-2 w-2 rounded-full bg-primary-red shadow-[0_0_12px_rgba(231,0,11,0.8)]" />
        </motion.div>

        <motion.div
          className="absolute inset-[34%] rounded-full border border-white/15"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="relative z-10 flex h-[28%] max-h-28 min-h-[5.25rem] w-[28%] max-w-28 min-w-[5.25rem] aspect-square flex-col items-center justify-center rounded-full px-2 text-center"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #ff3b3f 0%, #E7000B 45%, #8a0006 100%)',
            boxShadow:
              '0 0 0 6px rgba(231,0,11,0.15), 0 0 36px rgba(231,0,11,0.55)',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    '0 0 0 6px rgba(231,0,11,0.15), 0 0 36px rgba(231,0,11,0.55)',
                    '0 0 0 10px rgba(231,0,11,0.22), 0 0 48px rgba(231,0,11,0.7)',
                    '0 0 0 6px rgba(231,0,11,0.15), 0 0 36px rgba(231,0,11,0.55)',
                  ],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-heading text-[10px] font-extrabold leading-tight tracking-[0.08em] text-white uppercase sm:text-[11px]">
            Our
          </span>
          <span className="mt-0.5 font-heading text-[9px] font-bold leading-tight tracking-[0.12em] text-white/90 uppercase sm:text-[10px]">
            Solutions
          </span>
        </motion.div>
      </div>

      {NODES.map((node) => (
        <motion.div
          key={node.id}
          className="absolute z-20"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: node.delay, ease: EASE }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <span
              className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            />
            {!reduceMotion && (
              <motion.span
                className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
                animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: node.delay,
                }}
              />
            )}
            <span
              className={`${LABEL_CLASS[node.labelPos]} font-heading text-[8px] leading-[1.25] tracking-[0.04em] text-white/65 uppercase sm:text-[9px]`}
            >
              {node.label}
            </span>
          </div>
        </motion.div>
      ))}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {beamPaths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.35"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE }}
          />
        ))}
        {!reduceMotion && (
          <circle r="0.95" fill="#E7000B" filter={`url(#${glowId})`}>
            <animateMotion dur="5.5s" repeatCount="indefinite" path={loopPath} />
          </circle>
        )}
        <defs>
          <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  )
}
