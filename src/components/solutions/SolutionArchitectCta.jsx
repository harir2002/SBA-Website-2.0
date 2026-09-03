import { motion, useReducedMotion } from 'framer-motion'
import IndustryCtaCentreMotion from '../industry/IndustryCtaCentreMotion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import { scrollToContactForm } from '../../utils/scrollToContactForm'
import BrandMotto from '../shared/BrandMotto'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Final conversion section — scrolls to the shared footer contact form on this page.
 */
export default function SolutionArchitectCta({ cta, sectionId = 'talk-to-an-architect' }) {
  const reduceMotion = useReducedMotion()
  if (!cta) return null

  return (
    <section
      id={sectionId}
      className="solution-section relative overflow-hidden bg-black"
      aria-labelledby="solution-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(231,0,11,0.1) 0%, transparent 58%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
        <IndustryCtaCentreMotion idPrefix="solution-cta-centre" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 50% 45%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 48%, transparent 75%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[820px] px-5 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.p
          className="font-heading text-xs font-extrabold tracking-[0.28em] uppercase"
          style={{ color: SOLUTION_ACCENT }}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {cta.eyebrow}
        </motion.p>

        <motion.h2
          id="solution-cta-heading"
          className="mt-5 font-heading text-[2rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          {cta.headline}
        </motion.h2>

        <motion.span
          className="mx-auto mt-6 block h-[2.5px] w-12 origin-center rounded-full"
          style={{ backgroundColor: SOLUTION_ACCENT }}
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        />

        <motion.p
          className="mx-auto mt-6 max-w-xl font-body text-sm font-medium leading-relaxed text-white/75 sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {cta.body}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          <button
            type="button"
            onClick={() => scrollToContactForm()}
            className="inline-flex min-h-11 items-center justify-center rounded-md px-7 py-3.5 font-heading text-sm font-extrabold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: SOLUTION_ACCENT }}
          >
            Let's Connect
          </button>
        </motion.div>

        {cta.tagline ? <BrandMotto className="mt-16" /> : null}
      </div>
    </section>
  )
}
