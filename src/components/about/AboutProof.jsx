import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_CASES } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutProof() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative bg-black"
      aria-labelledby="about-proof-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2
            id="about-proof-heading"
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Engineered in the real world.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            SBA&apos;s work is built around live enterprise environments—where systems
            cannot go offline, customer operations cannot pause, and
            transformation must deliver practical value.
          </p>
        </motion.div>

        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
          {ABOUT_CASES.map((item, i) => (
            <motion.article
              key={item.id}
              className="w-[85%] shrink-0 snap-center rounded-2xl border border-white/[0.08] bg-[#0d0f14] p-6 sm:w-auto sm:shrink"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <span className="block h-[3px] w-10 rounded-full bg-primary-red" aria-hidden="true" />
              <h3 className="mt-5 font-heading text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-10 max-w-2xl font-heading text-base font-semibold text-white/80 sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        >
          From core infrastructure to AI-led workflows, we engineer outcomes
          where continuity matters.
        </motion.p>
      </div>
    </section>
  )
}
