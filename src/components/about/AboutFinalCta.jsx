/**
 * AboutFinalCta â€” clean closing brand CTA (no decorative boxes / wave overlays).
 */

import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutFinalCta() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex items-center overflow-hidden bg-black"
      aria-labelledby="about-final-heading"
    >
      {/* Soft atmosphere only â€” no boxes or path overlays */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(231,0,11,0.14) 0%, transparent 58%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[820px] px-5 py-12 text-center sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <motion.p
          className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          Ready for What&apos;s Next?
        </motion.p>

        <motion.h2
          id="about-final-heading"
          className="mt-5 font-heading text-[2.15rem] font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-[3.15rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          Keep your enterprise moving forward.
        </motion.h2>

        <motion.span
          className="mx-auto mt-6 block h-[2.5px] w-12 origin-center rounded-full bg-primary-red"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        />

        <motion.p
          className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          Modernise the foundation. Protect what matters. Turn data into action.
          Build what comes next. Operate with confidence.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        >
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get in Touch
          </Link>
          <Link
            to="/#capabilities"
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore our Solutions
          </Link>
        </motion.div>

        <motion.p
          className="mt-16 font-heading text-sm font-medium tracking-wide text-white/40 sm:text-[0.95rem]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
        >
          Engineering the modern, secure, and resilient enterprise.
        </motion.p>
      </div>
    </section>
  )
}
