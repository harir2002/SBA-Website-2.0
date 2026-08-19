/**
 * CareersBanner — full-bleed darkened visual with centered CTA.
 * Swap careersBg once a final photo is approved (data-placeholder="careers-bg").
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function CareersBanner() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="careers"
      className="relative scroll-mt-[72px] flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[480px]"
      aria-labelledby="careers-banner-heading"
      data-placeholder="careers-bg"
    >
      {/* Placeholder visual texture (replace with photo when ready) */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.88)),
            radial-gradient(ellipse at 30% 40%, rgba(231,0,11,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 45%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-10">
        <motion.h2
          id="careers-banner-heading"
          className="font-heading text-[2.25rem] font-extrabold leading-tight text-white sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Build What&apos;s Next With SBA
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-xl font-body text-base text-white/65 sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
        >
          Join a team shaping the future of technology, AI, and enterprise solutions.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
        >
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-md border-[1.75px] border-primary-red bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 ease-out hover:scale-[1.03] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Join the SBA Team
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
