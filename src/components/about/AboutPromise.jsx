import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_PILLARS } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutPromise() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-labelledby="about-promise-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.h2
            id="about-promise-heading"
            className="max-w-[11ch] font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Built to keep enterprises moving forward.
          </motion.h2>

          <motion.div
            className="space-y-5 font-body text-sm leading-relaxed text-white/60 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p>
              Every enterprise is under pressure to move faster—modernising core
              systems, connecting new platforms, responding to threats, making data
              useful, and adopting AI.
            </p>
            <p>
              But progress can create complexity. Complexity can create fragility.
            </p>
            <p>
              SBA helps enterprises move forward without losing control. We bring
              together engineering, security, data, AI, and managed operations to
              create technology environments that are ready to change, built to
              perform, and prepared to recover.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {ABOUT_PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#12151c] to-[#0d0f14] p-6 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <motion.span
                className="mb-5 block h-[3px] w-10 origin-left rounded-full bg-primary-red"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
              />
              <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                {pillar.description}
              </p>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(231,0,11,0.12) 0%, transparent 55%)',
                }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
