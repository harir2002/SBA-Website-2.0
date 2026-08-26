import { motion, useReducedMotion } from 'framer-motion'
import { PROCESS_STAGES } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactProcess() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-black" aria-labelledby="contact-process-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            A Clearer First Step
          </p>
          <h2
            id="contact-process-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            From first conversation to practical direction.
          </h2>
        </motion.div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Desktop connector between stages — sits behind cards, not through text */}
          <div
            className="pointer-events-none absolute top-8 right-[16%] left-[16%] hidden h-px bg-primary-red/40 md:block"
            aria-hidden="true"
          />

          {PROCESS_STAGES.map((stage, i) => (
            <motion.article
              key={stage.n}
              className="relative rounded-xl border border-white/[0.08] bg-[#0d0f14] p-6 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
            >
              <p className="font-heading text-sm font-bold tracking-[0.2em] text-primary-red">
                {stage.n}
              </p>
              <h3 className="mt-4 font-heading text-xl font-bold text-white">{stage.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">{stage.copy}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-12 max-w-3xl font-heading text-base font-semibold text-white/80 sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          No generic pitch. No unnecessary complexity. Just the right conversation,
          with the right people, at the right starting point.
        </motion.p>
      </div>
    </section>
  )
}
