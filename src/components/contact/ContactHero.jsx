import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CONTACT_PROOF } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

function HeroVisual() {
  const reduceMotion = useReducedMotion()
  return (
    <div
      className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08]"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 65% 55% at 70% 40%, rgba(231,0,11,0.14) 0%, transparent 55%), linear-gradient(145deg, #0b0d12, #12151c)',
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-[10%] right-[14%] rounded-lg border border-white/10 bg-white/[0.03]"
          style={{ top: `${22 + i * 16}%`, height: '10%' }}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: EASE }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-[8%] h-[2px] origin-left rounded-full bg-primary-red"
        style={{ width: '72%', boxShadow: '0 0 12px rgba(231,0,11,0.55)' }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute top-1/2 right-[16%] h-3 w-3 -translate-y-1/2 rounded-full bg-primary-red"
        style={{ boxShadow: '0 0 14px rgba(231,0,11,0.8)' }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: EASE }}
      />
    </div>
  )
}

export default function ContactHero({ onStart }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[62svh] items-center overflow-hidden bg-black"
      aria-labelledby="contact-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 12% 30%, rgba(231,0,11,0.1) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pt-[108px] pb-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:pb-16">
        <div>
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Contact SBA
          </motion.p>

          <motion.h1
            id="contact-hero-heading"
            className="mt-4 max-w-[14ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-[3.2rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
          >
            Let&apos;s engineer what comes next.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          >
            The strongest technology initiatives begin with the right conversation.
            Tell us where your enterprise needs to move forward—and we will bring the
            right engineering, security, data, AI, and delivery expertise to the table.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => onStart()}
              className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a Conversation
            </button>
            <Link
              to="/#capabilities"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Our Capabilities
            </Link>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            {CONTACT_PROOF.map((item) => (
              <li key={item.label}>
                <p className="font-heading text-2xl font-extrabold text-white">{item.value}</p>
                <p className="mt-1 font-body text-xs text-white/50">{item.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="h-[300px] sm:h-[360px] lg:h-[400px]"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
