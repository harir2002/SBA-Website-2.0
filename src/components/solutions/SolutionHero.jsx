import { motion, useReducedMotion } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import { scrollToContactForm } from '../../utils/scrollToContactForm'

const EASE = [0.16, 1, 0.3, 1]

function scrollToHash(href) {
  if (!href?.startsWith('#')) return
  const id = href.slice(1)
  if (id === 'contact') {
    scrollToContactForm()
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Shared solution hero format:
 * red eyebrow → full-width H1 → single red CTA with ▶
 */
export default function SolutionHero({ hero, accent = SOLUTION_ACCENT }) {
  const reduceMotion = useReducedMotion()
  if (!hero) return null

  const eyebrow = hero.eyebrow || 'Solutions'
  const enter = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        }

  return (
    <section
      className="solution-hero relative isolate min-h-[100svh] overflow-hidden bg-black"
      aria-labelledby="solution-hero-heading"
    >
      {hero.image ? (
        <motion.img
          src={hero.image}
          alt={hero.imageAlt || ''}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
          initial={reduceMotion ? false : { scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.26) 42%, rgba(0,0,0,0.42) 100%), linear-gradient(0deg, rgba(0,0,0,0.18), rgba(0,0,0,0.18))',
        }}
      />

      <div className="relative flex min-h-[100svh] w-full flex-col justify-center px-5 py-16 pt-[calc(var(--header-height,88px)+1.25rem)] sm:px-8 lg:px-10">
        <div className="w-full max-w-none text-left">
          <motion.p
            className="font-heading text-base font-bold tracking-wide sm:text-lg lg:text-xl"
            style={{ color: accent }}
            {...enter(0.05)}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            id="solution-hero-heading"
            className="mt-4 w-full font-heading text-[2.35rem] font-black leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]"
            {...enter(0.15)}
          >
            {hero.title}
          </motion.h1>

          <motion.div className="mt-8" {...enter(0.28)}>
            <button
              type="button"
              onClick={() => scrollToHash(hero.primaryCta?.href || '#contact')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-7 py-3.5 font-heading text-sm font-extrabold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundColor: accent }}
            >
              {hero.primaryCta?.label || "Let's Connect"}
              <span aria-hidden="true" className="text-[0.7em] leading-none">
                ▶
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
