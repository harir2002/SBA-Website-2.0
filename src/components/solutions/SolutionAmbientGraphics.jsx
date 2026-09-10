import { motion, useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

/**
 * Lightweight decorative motion for solution section backgrounds.
 * Variants: network | orbit | signal
 */
export default function SolutionAmbientGraphics({ variant = 'network', id = 'sol-ambient' }) {
  const reduceMotion = useReducedMotion()

  if (variant === 'orbit') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(231,0,11,0.18) 0%, transparent 65%)`,
          }}
        />
        <svg
          className="absolute top-1/2 left-1/2 h-[min(380px,70%)] w-[min(380px,70%)] -translate-x-1/2 -translate-y-1/2 opacity-[0.28]"
          viewBox="0 0 400 400"
          fill="none"
        >
          {[70, 110, 155].map((r, i) => (
            <motion.circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              stroke={SOLUTION_ACCENT}
              strokeWidth="1"
              strokeOpacity={0.5 - i * 0.1}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            />
          ))}
          {!reduceMotion ? (
            <>
              <circle r="2.2" fill="#FFFFFF" opacity="0.9">
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M130 200 A70 70 0 1 1 270 200 A70 70 0 1 1 130 200"
                />
              </circle>
              <circle r="2" fill={SOLUTION_ACCENT}>
                <animateMotion
                  dur="14s"
                  repeatCount="indefinite"
                  path="M90 200 A110 110 0 1 1 310 200 A110 110 0 1 1 90 200"
                />
              </circle>
            </>
          ) : null}
          <circle cx="200" cy="200" r="4" fill={SOLUTION_ACCENT} opacity="0.9" />
          <circle cx="200" cy="200" r="10" fill={SOLUTION_ACCENT} opacity="0.15" />
        </svg>
      </div>
    )
  }

  if (variant === 'signal') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full opacity-[0.22]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`${id}-beam`} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor={SOLUTION_ACCENT} stopOpacity="0" />
              <stop offset="50%" stopColor={SOLUTION_ACCENT} stopOpacity="0.85" />
              <stop offset="100%" stopColor={SOLUTION_ACCENT} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[80, 160, 240, 320].map((y, i) => (
            <motion.line
              key={y}
              x1="80"
              y1={y}
              x2="1120"
              y2={y}
              stroke={`url(#${id}-beam)`}
              strokeWidth="1"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 0.7 - i * 0.1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.08 }}
            />
          ))}
          {!reduceMotion
            ? [200, 400, 600, 800, 1000].map((x, i) => (
                <motion.circle
                  key={x}
                  cx={x}
                  cy={200}
                  r="3"
                  fill="#FFFFFF"
                  animate={{ opacity: [0.2, 0.85, 0.2], cy: [190, 210, 190] }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              ))
            : null}
        </svg>
      </div>
    )
  }

  // network (default) — overview / proof
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute top-0 right-0 h-full w-[min(640px,70%)] opacity-[0.2]"
        viewBox="0 0 640 520"
        fill="none"
      >
        <motion.path
          d="M80 120 L220 80 L360 140 L480 60 L580 160"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          fill="none"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        />
        <motion.path
          d="M120 280 L260 220 L400 300 L520 240 L600 340"
          stroke={SOLUTION_ACCENT}
          strokeWidth="1"
          strokeOpacity="0.55"
          fill="none"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.15 }}
        />
        {[
          [80, 120],
          [220, 80],
          [360, 140],
          [480, 60],
          [260, 220],
          [400, 300],
          [520, 240],
        ].map(([x, y], i) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i % 2 === 0 ? 3.5 : 2.5}
            fill={i % 3 === 0 ? SOLUTION_ACCENT : '#FFFFFF'}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 0.85, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
          />
        ))}
        {!reduceMotion ? (
          <circle r="2.5" fill="#FFFFFF">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path="M80 120 L220 80 L360 140 L480 60 L580 160"
            />
          </circle>
        ) : null}
      </svg>
      <div
        className="absolute bottom-0 left-0 h-48 w-48 opacity-40"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(231,0,11,0.12), transparent 70%)',
        }}
      />
    </div>
  )
}
