import { motion, useReducedMotion } from 'framer-motion'
import { ConnectedEngineeringModel } from './ArchitectureVisuals'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutWhoWeAre() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative bg-black text-white"
      aria-labelledby="about-who-heading"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            One Connected Partner
          </motion.p>

          <motion.h2
            id="about-who-heading"
            className="mt-3 max-w-[18ch] font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
          >
            Enterprise complexity. Engineered as one connected system.
          </motion.h2>

          <motion.div
            className="mt-6 space-y-4 font-body text-sm leading-relaxed text-white/55 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p>
              SBA Info Solutions is an enterprise technology and engineering partner
              built for organisations operating in complex, high-stakes environments.
            </p>
            <p>
              For more than three decades, we have helped enterprises strengthen the
              systems that run their business—from data centres, hybrid cloud, and
              digital infrastructure to cybersecurity, business continuity, data
              platforms, AI, digital products, and managed operations.
            </p>
            <p>
              We do not approach these as disconnected projects. We bring them
              together through one accountable engineering model—so every
              modernisation programme, security investment, digital product, and AI
              initiative works as part of a stronger whole.
            </p>
          </motion.div>

          <motion.blockquote
            className="mt-8 border-l-[3px] border-primary-red pl-5 font-heading text-xl font-bold leading-snug text-white sm:text-2xl"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            One unified backbone for the modern enterprise.
          </motion.blockquote>
        </div>

        <ConnectedEngineeringModel />
      </div>
    </section>
  )
}
