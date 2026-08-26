import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_COMPLEXITY_POINTS } from '../../data/aboutContent'
import { ComplexityLayers } from './ArchitectureVisuals'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutComplexity() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-labelledby="about-complexity-heading"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Enterprise Engineering DNA
          </motion.p>

          <motion.h2
            id="about-complexity-heading"
            className="mt-3 max-w-[16ch] font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.65rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
          >
            Built for the complexity behind critical operations.
          </motion.h2>

          <motion.div
            className="mt-6 space-y-4 font-body text-sm leading-relaxed text-white/55 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p>
              The modern enterprise does not run on one platform, one vendor, or one
              team. It runs on a connected landscape of applications,
              infrastructure, identities, data, security controls, operations, and
              customer interactions.
            </p>
            <p>
              SBA understands the interdependencies behind this complexity. We help
              clients make change without compromising business continuity, security
              posture, operational visibility, or the confidence to scale.
            </p>
          </motion.div>

          <ul className="mt-8 space-y-3">
            {ABOUT_COMPLEXITY_POINTS.map((point, i) => (
              <motion.li
                key={point}
                className="flex gap-3 font-body text-sm text-white/70"
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: EASE }}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-red" aria-hidden="true" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

        <ComplexityLayers />
      </div>
    </section>
  )
}
