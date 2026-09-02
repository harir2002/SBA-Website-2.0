import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'

/**
 * Dim centred orbital motion used behind Industry CTA sections.
 * Shared by detail pages and Industries Overview.
 *
 * @param {{ idPrefix?: string }} props
 */
export default function IndustryCtaCentreMotion({ idPrefix = 'cta-centre' }) {
  const reduceMotion = useReducedMotion()
  const rings = [
    { rx: 120, ry: 48 },
    { rx: 190, ry: 78 },
    { rx: 270, ry: 110 },
  ]

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        className="h-[min(420px,70%)] w-[min(720px,92%)] opacity-[0.38]"
        viewBox="0 0 720 420"
        fill="none"
      >
        <defs>
          <linearGradient id={`${idPrefix}-beam`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={RED} stopOpacity="0" />
            <stop offset="50%" stopColor={RED} stopOpacity="0.9" />
            <stop offset="100%" stopColor={RED} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={RED} stopOpacity="0.35" />
            <stop offset="70%" stopColor={RED} stopOpacity="0.08" />
            <stop offset="100%" stopColor={RED} stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="360" cy="210" rx="300" ry="140" fill={`url(#${idPrefix}-glow)`} />

        <motion.line
          x1="80"
          y1="210"
          x2="640"
          y2="210"
          stroke={`url(#${idPrefix}-beam)`}
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        {rings.map((ring, i) => (
          <motion.ellipse
            key={`ring-${i}`}
            cx="360"
            cy="210"
            rx={ring.rx}
            ry={ring.ry}
            stroke={RED}
            strokeWidth="1.35"
            strokeOpacity={0.55 - i * 0.08}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
          />
        ))}

        {[160, 260, 360, 460, 560].map((x, i) => (
          <motion.g
            key={`node-${x}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.06, ease: EASE }}
          >
            <circle cx={x} cy="210" r="7" fill={RED} opacity="0.14" />
            <circle cx={x} cy="210" r="3" fill="#FFFFFF" opacity="0.85" />
            <circle cx={x} cy="210" r="1.4" fill={RED} />
          </motion.g>
        ))}

        {!reduceMotion && (
          <>
            {rings.map((ring, i) => (
              <circle key={`orbit-${i}`} r="2.3" fill="#FFFFFF" opacity="0.9">
                <animateMotion
                  dur={`${8 + i * 2}s`}
                  repeatCount="indefinite"
                  path={`M${360 - ring.rx} 210 A${ring.rx} ${ring.ry} 0 1 1 ${360 + ring.rx} 210 A${ring.rx} ${ring.ry} 0 1 1 ${360 - ring.rx} 210`}
                />
              </circle>
            ))}
            <circle r="2.6" fill={RED}>
              <animateMotion dur="7s" repeatCount="indefinite" path="M120 210 L600 210" />
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}
