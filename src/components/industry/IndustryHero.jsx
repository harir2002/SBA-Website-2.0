import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import IndustryHeroVisual from './IndustryHeroVisual'

const EASE = [0.16, 1, 0.3, 1]

function CtaLink({ cta, primary, accent }) {
  if (!cta) return null
  const className = primary
    ? 'inline-flex items-center justify-center rounded-md px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

  const secondaryClass = !primary
    ? `${className} hover:opacity-90`
    : className

  if (cta.href?.startsWith('#')) {
    const isContact = cta.href === '#contact'
    return (
      <a
        href={cta.href}
        className={primary ? className : secondaryClass}
        style={primary ? { backgroundColor: accent } : undefined}
        onClick={
          isContact
            ? (e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            : undefined
        }
        onMouseEnter={
          primary
            ? undefined
            : (e) => {
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.color = accent
              }
        }
        onMouseLeave={
          primary
            ? undefined
            : (e) => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.color = ''
              }
        }
      >
        {cta.label}
      </a>
    )
  }
  return (
    <Link
      to={cta.href}
      className={primary ? className : secondaryClass}
      style={primary ? { backgroundColor: accent } : undefined}
      onMouseEnter={
        primary
          ? undefined
          : (e) => {
              e.currentTarget.style.borderColor = accent
              e.currentTarget.style.color = accent
            }
      }
      onMouseLeave={
        primary
          ? undefined
          : (e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.color = ''
            }
      }
    >
      {cta.label}
    </Link>
  )
}

function HeroCopy({ hero, accent, reduceMotion }) {
  const paragraphs = (hero.body || '').split('\n\n').filter(Boolean)

  return (
    <>
      <motion.p
        className="industry-hero__eyebrow font-heading text-xs font-extrabold tracking-[0.28em] uppercase"
        style={{ color: accent }}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        id="industry-hero-heading"
        className="industry-hero__title font-heading text-[2.1rem] font-black leading-[1.12] text-white sm:text-5xl lg:text-[3.2rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
      >
        {hero.headline}
      </motion.h1>

      {hero.subheadline && (
        <motion.p
          className="industry-hero__subtitle font-heading text-base font-extrabold text-white sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {hero.subheadline}
        </motion.p>
      )}

      <motion.span
        className="industry-hero__rule block h-[2px] w-14 origin-left rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
      />

      <div className="industry-hero__body text-white">
        {paragraphs.map((p) => (
          <motion.p
            key={p.slice(0, 32)}
            className="font-semibold"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="industry-hero__actions"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
      >
        <CtaLink cta={hero.primaryCta} primary accent={accent} />
        {hero.secondaryCta ? (
          <CtaLink cta={hero.secondaryCta} accent={accent} />
        ) : null}
      </motion.div>
    </>
  )
}

function usePreloadHeroImage(hero) {
  useEffect(() => {
    if (!hero?.heroImage) return undefined

    const href = hero.heroImageWebp || hero.heroImage
    const type = hero.heroImageWebp
      ? 'image/webp'
      : href.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg'
    const existing = document.head.querySelector(`link[data-industry-hero-preload="true"]`)
    if (existing) existing.remove()

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    link.type = type
    link.setAttribute('data-industry-hero-preload', 'true')
    if (hero.heroImageSrcSet?.webp) {
      link.setAttribute('imagesrcset', hero.heroImageSrcSet.webp)
      link.setAttribute('imagesizes', '100vw')
    }
    document.head.appendChild(link)

    return () => {
      link.remove()
    }
  }, [hero?.heroImage, hero?.heroImageWebp, hero?.heroImageSrcSet])
}

export default function IndustryHero({ hero, id = 'overview', accent = '#E7000B' }) {
  const reduceMotion = useReducedMotion()
  const hasPhoto = Boolean(hero?.heroImage)

  usePreloadHeroImage(hasPhoto ? hero : null)

  if (hasPhoto) {
    const focalClass = hero.visualKey ? ` industry-hero--${hero.visualKey}` : ''

    return (
      <section
        id={id}
        className={`industry-hero industry-hero--detail${focalClass}`}
        aria-labelledby="industry-hero-heading"
        style={{ scrollMarginTop: '100px' }}
      >
        <picture>
          {hero.heroImageWebp && (
            <source
              type="image/webp"
              srcSet={hero.heroImageSrcSet?.webp || hero.heroImageWebp}
              sizes="100vw"
            />
          )}
          <img
            className="industry-hero__image"
            src={hero.heroImage}
            srcSet={hero.heroImageSrcSet?.jpg}
            sizes="100vw"
            alt={hero.heroImageAlt || ''}
            aria-hidden={hero.heroImageAlt ? undefined : 'true'}
            width={hero.heroImageWidth || 1672}
            height={hero.heroImageHeight || 941}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="industry-hero__overlay" aria-hidden="true" />
        <div className="industry-hero__content-shell">
          <div className="industry-hero__content-column">
            <div className="industry-hero__content">
              <HeroCopy hero={hero} accent={accent} reduceMotion={reduceMotion} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={id}
      className="page-hero relative flex min-h-[min(100svh,900px)] items-center overflow-hidden bg-black"
      aria-labelledby="industry-hero-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 12% 28%, ${accent}1F 0%, transparent 55%), radial-gradient(ellipse 40% 45% at 88% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pb-14 sm:px-6 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10 lg:pb-20">
        <div>
          <HeroCopy hero={hero} accent={accent} reduceMotion={reduceMotion} />
        </div>
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
        >
          <IndustryHeroVisual visualKey={hero.visualKey} />
        </motion.div>
      </div>
    </section>
  )
}
