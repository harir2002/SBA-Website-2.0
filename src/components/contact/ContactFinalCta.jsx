import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactFinalCta({ onStart }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[70svh] items-center overflow-hidden bg-[#060606]"
      aria-labelledby="contact-final-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(231,0,11,0.12) 0%, transparent 58%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[820px] px-5 py-20 text-center sm:px-6 lg:px-10">
        <motion.p
          className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          Ready to Move Forward?
        </motion.p>

        <motion.h2
          id="contact-final-heading"
          className="mt-4 font-heading text-[2.1rem] font-extrabold leading-tight text-white sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          Build the next chapter with confidence.
        </motion.h2>

        <motion.span
          className="mx-auto mt-6 block h-[2.5px] w-14 origin-center rounded-full bg-primary-red"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
        />

        <motion.p
          className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-white/55 sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          From critical foundations and cyber resilience to connected digital
          products, data intelligence, and governed AI—SBA is ready to help you
          engineer what comes next.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
        >
          <button
            type="button"
            onClick={() => onStart()}
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start a Conversation
          </button>
          <Link
            to="/#capabilities"
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Our Capabilities
          </Link>
        </motion.div>

        <motion.p
          className="mt-14 font-heading text-sm font-medium tracking-wide text-white/40"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
        >
          Engineering the modern, secure, and resilient enterprise.
        </motion.p>
      </div>
    </section>
  )
}
