import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_PROOF } from '../../data/aboutContent'
import { HeroArchitecture } from './ArchitectureVisuals'

const EASE = [0.16, 1, 0.3, 1]

export default function AboutHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
      aria-labelledby="about-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 15% 30%, rgba(231,0,11,0.12) 0%, transparent 55%), radial-gradient(ellipse 40% 45% at 85% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pt-[108px] pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:pb-24">
        <div>
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            About SBA
          </motion.p>

          <motion.h1
            id="about-hero-heading"
            className="mt-4 max-w-[16ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-[3.35rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          >
            Built to keep enterprises moving forward.
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl font-heading text-base font-semibold text-white/70 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
          >
            Engineering the modern, secure, and resilient enterprise.
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
          >
            We help organisations modernise critical foundations, protect
            business continuity, activate intelligence, and build the digital
            capabilities that keep them ready for what comes next.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
          >
            <Link
              to="/#capabilities"
              className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Our Capabilities
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
          >
            {ABOUT_PROOF.map((item) => (
              <li key={item.label}>
                <p className="font-heading text-2xl font-extrabold text-white">{item.value}</p>
                <p className="mt-1 font-body text-xs text-white/50">{item.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative h-[380px] sm:h-[460px] lg:h-[540px]"
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <HeroArchitecture />
        </motion.div>
      </div>
    </section>
  )
}
