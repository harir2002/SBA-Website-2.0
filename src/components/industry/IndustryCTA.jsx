import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SHARED_INDUSTRY_CTA } from '../../data/industriesContent'
import IndustryCtaCentreMotion from './IndustryCtaCentreMotion'
import { scrollToContactForm } from '../../utils/scrollToContactForm'
import BrandMotto from '../shared/BrandMotto'

const EASE = [0.16, 1, 0.3, 1]

function CtaControl({ href, label, className }) {
  if (!href || !label) return null
  if (href === '#contact' || href === '/#contact') {
    return (
      <button type="button" onClick={() => scrollToContactForm()} className={className}>
        {label}
      </button>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link to={href} className={className}>
      {label}
    </Link>
  )
}

/**
 * @param {{ cta?: typeof SHARED_INDUSTRY_CTA, variant?: 'default' | 'clean' }} props
 */
export default function IndustryCTA({ cta = SHARED_INDUSTRY_CTA, variant = 'default' }) {
  const reduceMotion = useReducedMotion()
  const isClean = variant === 'clean'

  return (
    <section
      id="talk-to-an-expert"
      className="relative overflow-hidden bg-black"
      aria-labelledby="industry-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(231,0,11,0.1) 0%, transparent 58%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
        <IndustryCtaCentreMotion idPrefix="detail-cta-centre" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 50% 45%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 48%, transparent 75%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-[820px] px-5 text-center sm:px-6 lg:px-10 ${
          isClean ? 'py-12 sm:py-14 lg:py-16' : 'py-14 sm:py-16 lg:py-20'
        }`}
      >
        {cta.eyebrow && (
          <motion.p
            className="font-heading text-xs font-extrabold tracking-[0.28em] text-primary-red uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {cta.eyebrow}
          </motion.p>
        )}

        <motion.h2
          id="industry-cta-heading"
          className="mt-5 font-heading text-[2rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          {cta.headline}
        </motion.h2>

        <motion.span
          className="mx-auto mt-6 block h-[2.5px] w-12 origin-center rounded-full bg-primary-red"
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
          <CtaControl
            href={cta.primaryCta.href}
            label={cta.primaryCta.label}
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-7 py-3.5 font-heading text-sm font-extrabold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
          {cta.secondaryCta ? (
            <CtaControl
              href={cta.secondaryCta.href}
              label={cta.secondaryCta.label}
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-extrabold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
          ) : null}
        </motion.div>

        {cta.signature ? <BrandMotto className="mt-16" /> : null}
      </div>
    </section>
  )
}
