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
 * Shared solution hero — matches Industry detail compact format:
 * red eyebrow → large H1 → single red CTA with ▶
 */
export default function SolutionHero({ hero, accent = SOLUTION_ACCENT }) {
  const reduceMotion = useReducedMotion()
  if (!hero) return null

  const eyebrow = hero.eyebrow || 'Solutions'
  const title = hero.title || ''
  const ctaLabel = hero.primaryCta?.label || "Let's Connect"
  const ctaHref = hero.primaryCta?.href || '#contact'

  return (
    <section
      className="industry-hero industry-hero--detail solution-hero"
      aria-labelledby="solution-hero-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      {hero.image ? (
        <img
          src={hero.image}
          alt={hero.imageAlt || ''}
          className="industry-hero__image"
          decoding="async"
          fetchPriority="high"
        />
      ) : null}

      <div className="industry-hero__overlay" aria-hidden="true" />

      <div className="industry-hero__content-shell">
        <div className="industry-hero__content-column">
          <div className="industry-hero__content">
            <motion.p
              className="industry-hero__eyebrow font-heading text-sm font-bold tracking-wide sm:text-base lg:text-lg"
              style={{ color: accent }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              id="solution-hero-heading"
              className="industry-hero__title font-heading text-[1.625rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-white sm:text-[1.75rem] md:text-[2.125rem] lg:text-[2.5rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
            >
              {title}
            </motion.h1>

            <motion.div
              className="industry-hero__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => scrollToHash(ctaHref)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-7 py-3.5 font-heading text-sm font-extrabold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ backgroundColor: accent }}
              >
                {ctaLabel}
                <span aria-hidden="true" className="text-[0.7em] leading-none">
                  ▶
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
