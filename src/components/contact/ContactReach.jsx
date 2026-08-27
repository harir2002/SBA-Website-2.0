/**
 * ContactReach — abstract network only until approved addresses exist.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const NODES = [
  { t: '24%', l: '22%' },
  { t: '32%', l: '58%' },
  { t: '52%', l: '38%' },
  { t: '46%', l: '74%' },
  { t: '68%', l: '52%' },
]

export default function ContactReach() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-[#060606]" aria-labelledby="contact-reach-heading">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            Our Reach
          </p>
          <h2
            id="contact-reach-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Local context. Enterprise-scale delivery.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            SBA supports organisations through a connected delivery model—bringing
            together local engagement, cross-domain expertise, partner ecosystems,
            and accountable delivery teams.
          </p>
        </motion.div>

        <motion.div
          className="relative min-h-[280px] overflow-hidden bg-black"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M22 24 L58 32 L38 52 L74 46 L52 68"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.4"
            />
            {!reduceMotion && (
              <circle r="1.1" fill="#E7000B">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M22 24 L58 32 L38 52 L74 46 L52 68 L22 24"
                />
              </circle>
            )}
          </svg>
          {NODES.map((node, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/55"
              style={{
                top: node.t,
                left: node.l,
                boxShadow: '0 0 10px rgba(255,255,255,0.25)',
              }}
            />
          ))}
          <p className="absolute right-5 bottom-5 font-heading text-[10px] tracking-[0.2em] text-white/35 uppercase">
            Connected delivery
          </p>
        </motion.div>
      </div>
    </section>
  )
}
