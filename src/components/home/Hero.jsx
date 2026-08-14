import { motion, useReducedMotion } from 'framer-motion'
import CapabilityDiagram from './CapabilityDiagram'
import Background3D from './Background3D'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
      aria-labelledby="hero-heading"
    >
      <Background3D />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-20">
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
          >
            SBA Info Solutions
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 max-w-xl font-heading text-4xl leading-[1.1] font-extrabold text-white sm:text-5xl xl:text-6xl"
          >
            Engineering the modern, secure, and{' '}
            <span className="text-primary-red">intelligent</span> enterprise.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/75 sm:text-lg"
          >
            We partner with industry leaders to modernize core systems, secure and
            sustain critical operations, connect enterprise workflows, and activate
            data and AI-driven intelligence.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
            >
              Talk to SBA
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/5"
            >
              Explore Capabilities
            </button>
          </motion.div>
        </div>

        <CapabilityDiagram />
      </div>
    </section>
  )
}
