import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SHARED_INDUSTRY_CTA } from '../../data/industriesContent'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'
const SIGNAL_PATH =
  'M30 95 C110 95, 150 55, 230 68 S340 120, 400 88 S500 42, 580 72 S680 110, 770 78'

function SignalWave({ reduceMotion }) {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 mx-auto h-36 w-[92%] max-w-4xl opacity-75"
      viewBox="0 0 800 140"
      aria-hidden="true"
    >
      <defs>
        <filter id="industry-cta-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="industry-cta-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.12" />
          <stop offset="50%" stopColor={RED} stopOpacity="1" />
          <stop offset="100%" stopColor={RED} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <ellipse
        cx="400"
        cy="105"
        rx="340"
        ry="22"
        fill="none"
        stroke="rgba(245,245,242,0.07)"
        strokeWidth="1"
      />

      <motion.path
        d={SIGNAL_PATH}
        fill="none"
        stroke="url(#industry-cta-wave)"
        strokeWidth="2.4"
        strokeLinecap="round"
        filter="url(#industry-cta-glow)"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.55, ease: EASE }}
      />

      {!reduceMotion && (
        <path
          d={SIGNAL_PATH}
          fill="none"
          stroke={RED}
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeOpacity="0.35"
          strokeDasharray="7 16"
        />
      )}

      {[
        [140, 88],
        [230, 68],
        [400, 88],
        [580, 72],
        [720, 82],
      ].map(([cx, cy], i) => (
        <motion.g
          key={`${cx}-${cy}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: EASE }}
        >
          <circle cx={cx} cy={cy} r="9" fill={RED} opacity="0.12" filter="url(#industry-cta-glow)" />
          <circle cx={cx} cy={cy} r="3.25" fill="#fff" />
          <circle cx={cx} cy={cy} r="1.75" fill={RED} />
        </motion.g>
      ))}

      {!reduceMotion && (
        <circle r="3" fill="#fff" filter="url(#industry-cta-glow)">
          <animateMotion dur="9s" repeatCount="indefinite" path={SIGNAL_PATH} />
        </circle>
      )}
    </svg>
  )
}

/**
 * @param {{ cta?: typeof SHARED_INDUSTRY_CTA, variant?: 'default' | 'clean' }} props
 * `clean` — soft glow only (no wave overlay); used on BFSI.
 */
export default function IndustryCTA({ cta = SHARED_INDUSTRY_CTA, variant = 'default' }) {
  const reduceMotion = useReducedMotion()
  const isClean = variant === 'clean'

  return (
    <section
      id="talk-to-an-expert"
      className="relative overflow-hidden bg-black"
      aria-labelledby="industry-cta-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: isClean
              ? 'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(231,0,11,0.14) 0%, transparent 58%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 50%)'
              : 'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(231,0,11,0.14) 0%, transparent 58%)',
          }}
        />
        {isClean && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        )}
        {!isClean && <SignalWave reduceMotion={reduceMotion} />}
      </div>

      <div
        className={`relative z-10 mx-auto max-w-[820px] px-5 text-center sm:px-6 lg:px-10 ${
          isClean ? 'py-12 sm:py-14 lg:py-16' : 'py-14 sm:py-16 lg:py-20'
        }`}
      >
        {cta.eyebrow && (
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {cta.eyebrow}
          </motion.p>
        )}

        <motion.h2
          id="industry-cta-heading"
          className="mt-5 font-heading text-[2rem] font-extrabold leading-[1.15] text-[#F5F5F2] sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          {cta.headline}
        </motion.h2>

        {isClean && (
          <motion.span
            className="mx-auto mt-6 block h-[2.5px] w-12 origin-center rounded-full bg-primary-red"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          />
        )}

        <motion.p
          className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {cta.body}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          <Link
            to={cta.primaryCta.href}
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cta.primaryCta.label}
          </Link>
          <Link
            to={cta.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cta.secondaryCta.label}
          </Link>
        </motion.div>

        {cta.signature && (
          <motion.p
            className={`font-heading text-sm font-medium tracking-wide sm:text-[0.95rem] ${
              isClean ? 'mt-16 text-white/40' : 'mt-14 text-white/55'
            }`}
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          >
            {cta.signature}
          </motion.p>
        )}
      </div>
    </section>
  )
}
