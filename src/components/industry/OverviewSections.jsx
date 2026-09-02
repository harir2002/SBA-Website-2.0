/**
 * Industries Overview page sections — /industries only.
 */

import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { INDUSTRY_OVERVIEW } from '../../data/industriesContent'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'
const data = INDUSTRY_OVERVIEW

/** Industries constellation — premium 2×2 signal hub (phone-first, not circular orbit). */
const INDUSTRY_NODES = [
  {
    slug: 'bfsi',
    label: 'BFSI',
    title: 'BFSI',
    blurb: 'Banking, financial services & insurance',
    spot: 'tl',
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing',
    title: 'Manufacturing',
    blurb: 'Plants, supply chains & operations',
    spot: 'tr',
  },
  {
    slug: 'diversified-enterprises',
    label: 'Diversified Enterprises',
    title: 'Diversified Enterprises',
    blurb: 'Multi-business group complexity',
    spot: 'bl',
  },
  {
    slug: 'it-ites',
    label: 'IT/ITES',
    title: 'IT / ITES',
    blurb: 'Digital delivery & scale platforms',
    spot: 'br',
  },
]

function OverviewHeroLandscape() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[440px] select-none sm:max-w-[480px]">
      {/* Soft brand atmosphere */}
      <div
        className="pointer-events-none absolute inset-[12%] rounded-[42%] opacity-90"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(231,0,11,0.28) 0%, rgba(231,0,11,0.08) 42%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Connector lattice behind tiles */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hub-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245,245,242,0.08)" />
            <stop offset="50%" stopColor="rgba(231,0,11,0.45)" />
            <stop offset="100%" stopColor="rgba(245,245,242,0.08)" />
          </linearGradient>
        </defs>
        <line x1="25" y1="25" x2="75" y2="75" stroke="url(#hub-line)" strokeWidth="0.35" />
        <line x1="75" y1="25" x2="25" y2="75" stroke="url(#hub-line)" strokeWidth="0.35" />
        <line x1="25" y1="25" x2="75" y2="25" stroke="rgba(245,245,242,0.1)" strokeWidth="0.25" />
        <line x1="75" y1="25" x2="75" y2="75" stroke="rgba(245,245,242,0.1)" strokeWidth="0.25" />
        <line x1="75" y1="75" x2="25" y2="75" stroke="rgba(245,245,242,0.1)" strokeWidth="0.25" />
        <line x1="25" y1="75" x2="25" y2="25" stroke="rgba(245,245,242,0.1)" strokeWidth="0.25" />
        {!reduceMotion && (
          <>
            <circle r="0.9" fill="#E7000B">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M25 25 L75 25 L75 75 L25 75 Z"
              />
            </circle>
            <circle r="0.55" fill="#F5F5F2" opacity="0.7">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                path="M75 25 L25 25 L25 75 L75 75 Z"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Equal 2×2 tiles — fixed cell size so IT/ITES matches the rest */}
      <div className="relative grid grid-cols-2 grid-rows-2 gap-3 sm:gap-3.5">
        {INDUSTRY_NODES.map((node, i) => (
          <motion.div
            key={node.slug}
            className="h-full min-h-0"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: [0, -5, 0] }
            }
            transition={
              reduceMotion
                ? { duration: 0.45, delay: 0.08 + i * 0.07, ease: EASE }
                : {
                    opacity: { duration: 0.45, delay: 0.08 + i * 0.07, ease: EASE },
                    y: {
                      duration: 3.8 + i * 0.35,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.6 + i * 0.4,
                    },
                  }
            }
          >
            <Link
              to={`/industries/${node.slug}`}
              className="group relative flex h-[168px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0A0A0A]/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#E7000B]/55 hover:bg-[#111] hover:shadow-[0_12px_40px_rgba(231,0,11,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7000B] sm:h-[180px] sm:p-5"
              aria-label={node.label}
            >
              {/* Corner accent */}
              <span
                className="absolute top-0 right-0 h-10 w-10 opacity-70 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(225deg, rgba(231,0,11,0.55) 0%, transparent 58%)',
                }}
              />
              <span className="relative flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rotate-45 bg-[#E7000B] shadow-[0_0_10px_rgba(231,0,11,0.7)]"
                  aria-hidden="true"
                />
                <span className="font-heading text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">
                  Industry
                </span>
              </span>
              <span className="relative">
                <span className="block min-h-[2.5rem] font-heading text-[0.92rem] font-extrabold leading-tight tracking-wide text-[#F5F5F2] uppercase sm:min-h-[2.7rem] sm:text-[1.02rem]">
                  {node.title}
                </span>
                <span className="mt-1.5 line-clamp-2 block min-h-[2.4em] font-body text-[11px] leading-snug text-[#8E8E8E] sm:text-xs">
                  {node.blurb}
                </span>
              </span>
              <span className="relative inline-flex items-center gap-1.5 font-heading text-[10px] font-bold tracking-[0.14em] text-[#E7000B] uppercase opacity-80 transition-[opacity,gap] group-hover:gap-2.5 group-hover:opacity-100">
                Explore
                <span aria-hidden="true">{'\u2192'}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Center hub badge — sits over the 2×2 seam */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [1, 1.04, 1] }
        }
        transition={
          reduceMotion
            ? { duration: 0.55, delay: 0.15, ease: EASE }
            : {
                opacity: { duration: 0.55, delay: 0.15, ease: EASE },
                scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
              }
        }
        aria-hidden="true"
      >
        {/* Soft square rings (not circular orbit) */}
        <div className="relative flex h-[96px] w-[96px] items-center justify-center sm:h-[104px] sm:w-[104px]">
          <div className="absolute inset-0 rounded-[24px] border border-white/10" />
          <div className="absolute inset-[-10px] rounded-[28px] border border-[#E7000B]/25" />
          {!reduceMotion && (
            <div
              className="absolute inset-[-10px] rounded-[28px] border border-[#E7000B]/50"
              style={{
                animation: 'hub-pulse 2.8s ease-in-out infinite',
              }}
            />
          )}
          <div
            className="relative flex h-[72px] w-[72px] flex-col items-center justify-center rounded-[18px] text-center sm:h-[80px] sm:w-[80px]"
            style={{
              background:
                'linear-gradient(145deg, #FF2A33 0%, #E7000B 48%, #9A0008 100%)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.12) inset, 0 10px 36px rgba(231,0,11,0.45)',
            }}
          >
            <span className="font-heading text-[9px] font-extrabold tracking-[0.16em] text-white uppercase sm:text-[10px]">
              Industries
            </span>
            <span className="mt-0.5 font-heading text-[9px] font-bold tracking-[0.18em] text-white/90 uppercase sm:text-[10px]">
              Overview
            </span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes hub-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hub-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

export function OverviewHero() {
  const reduceMotion = useReducedMotion()
  const { hero } = data

  return (
    <section
      className="industry-overview-hero"
      aria-labelledby="industries-overview-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 12% 28%, rgba(231,0,11,0.12) 0%, transparent 55%), radial-gradient(ellipse 40% 45% at 88% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }}
      />

      {/* Page progress motif — starts in hero */}
      <motion.div
        className="pointer-events-none absolute top-[calc(var(--header-height)+24px)] bottom-0 left-4 w-px origin-top sm:left-6 lg:left-10"
        style={{ background: `linear-gradient(180deg, ${RED} 0%, transparent 100%)` }}
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <div className="industry-hero__content-shell">
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10">
          <div className="industry-hero__content max-w-none">
            <motion.p
              className="industry-hero__eyebrow font-heading text-xs font-bold tracking-[0.28em] uppercase"
              style={{ color: RED }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              id="industries-overview-heading"
              className="industry-hero__title max-w-[18ch] font-heading text-[2.1rem] font-extrabold leading-[1.12] text-[#F5F5F2] sm:text-5xl lg:text-[3.2rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              className="industry-hero__subtitle font-heading text-base font-semibold text-[#F5F5F2]/70 sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            >
              {hero.subheadline}
            </motion.p>
            <motion.span
              className="industry-hero__rule block h-[2px] w-14 origin-left rounded-full"
              style={{ backgroundColor: RED }}
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            />
            <motion.p
              className="industry-hero__body text-[#8E8E8E]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            >
              {hero.body}
            </motion.p>
            <motion.div
              className="industry-hero__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
            >
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-md px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ backgroundColor: RED }}
              >
                {hero.primaryCta.label}
              </a>
              <Link
                to={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-[#E7000B] hover:text-[#E7000B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {hero.secondaryCta.label}
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          >
            <OverviewHeroLandscape />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function IndustryRealitySection() {
  const reduceMotion = useReducedMotion()
  const { reality } = data

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-labelledby="industry-reality-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,245,242,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,242,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <motion.h2
          id="industry-reality-heading"
          className="font-heading text-4xl font-extrabold leading-[1.08] text-[#F5F5F2] sm:text-5xl lg:text-[3.6rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {reality.headline}
        </motion.h2>
        <div className="space-y-5 self-center">
          {reality.body.map((p) => (
            <motion.p
              key={p.slice(0, 24)}
              className="font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustryCardsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="industry-cards"
      className="relative bg-black"
      aria-labelledby="industry-cards-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <h2 id="industry-cards-heading" className="sr-only">
          Explore our industries
        </h2>
        <ul className="space-y-5">
          {data.cards.map((card, i) => (
            <motion.li
              key={card.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            >
              <Link
                to={`/industries/${card.slug}`}
                className="industry-card group grid min-h-[200px] grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] transition-[border-color] duration-300 hover:border-[#E7000B]/45 focus-visible:border-[#E7000B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7000B] md:min-h-[220px] md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="industry-card__image-wrap relative border-b border-white/[0.06] md:min-h-[200px] md:border-r md:border-b-0">
                  <img
                    className="industry-card__image"
                    src={card.image}
                    alt={card.imageAlt}
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="industry-card__content relative z-[2] flex min-h-[180px] flex-col justify-center p-6 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:min-h-[200px] sm:p-8">
                  <h3 className="font-heading text-2xl font-extrabold text-[#F5F5F2]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base">
                    {card.body}
                  </p>
                  <span
                    className="mt-5 font-heading text-xs font-bold tracking-wide uppercase"
                    style={{ color: RED }}
                  >
                    {card.cta}
                    {' \u2192'}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export function IndustryModelSection() {
  const reduceMotion = useReducedMotion()
  const { model } = data

  return (
    <section
      className="relative bg-black"
      aria-labelledby="industry-model-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <p
          className="font-heading text-xs font-bold tracking-[0.28em] uppercase"
          style={{ color: RED }}
        >
          {model.eyebrow}
        </p>
        <h2
          id="industry-model-heading"
          className="mt-4 max-w-3xl font-heading text-3xl font-extrabold text-[#F5F5F2] sm:text-4xl"
        >
          {model.headline}
        </h2>

        <div className="relative mt-12">
          {/* Desktop connecting line */}
          <svg
            className="pointer-events-none absolute top-5 right-4 left-4 hidden h-3 w-[calc(100%-2rem)] lg:block"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M20 6 H980"
              fill="none"
              stroke={RED}
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            />
          </svg>

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-5">
            {model.stages.map((stage, i) => (
              <motion.li
                key={stage.title}
                className="relative pl-8 lg:pl-0"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              >
                {/* Mobile vertical connector */}
                {i < model.stages.length - 1 && (
                  <span
                    className="absolute top-6 bottom-[-2.5rem] left-[11px] w-px lg:hidden"
                    style={{ backgroundColor: `${RED}66` }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className="absolute top-0 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full font-heading text-[10px] font-bold text-white lg:relative lg:mx-auto"
                  style={{ backgroundColor: RED }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-[#F5F5F2] lg:text-center">
                  {stage.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#8E8E8E] lg:text-center">
                  {stage.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function OverviewFinalCta() {
  const reduceMotion = useReducedMotion()
  const { cta } = data

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-labelledby="industries-overview-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(231,0,11,0.14) 0%, transparent 58%)',
          }}
        />
        {/* Soft signal constellation - no box placeholders */}
        <svg
          className="absolute inset-x-0 bottom-0 mx-auto h-40 w-[94%] max-w-5xl opacity-80"
          viewBox="0 0 900 160"
        >
          <defs>
            <filter id="cta-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cta-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={RED} stopOpacity="0.15" />
              <stop offset="45%" stopColor={RED} stopOpacity="1" />
              <stop offset="100%" stopColor={RED} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Soft horizon arcs */}
          <ellipse
            cx="450"
            cy="118"
            rx="390"
            ry="28"
            fill="none"
            stroke="rgba(245,245,242,0.08)"
            strokeWidth="1"
          />
          <ellipse
            cx="450"
            cy="118"
            rx="260"
            ry="16"
            fill="none"
            stroke="rgba(245,245,242,0.06)"
            strokeWidth="1"
          />

          {/* Smooth flowing signal */}
          <motion.path
            d="M40 105 C140 105, 180 58, 270 70 S380 125, 450 95 S560 45, 640 78 S760 120, 860 88"
            fill="none"
            stroke="url(#cta-wave)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#cta-glow)"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          {!reduceMotion && (
            <path
              d="M40 105 C140 105, 180 58, 270 70 S380 125, 450 95 S560 45, 640 78 S760 120, 860 88"
              fill="none"
              stroke={RED}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="8 18"
              opacity="0.4"
            />
          )}

          {/* Glowing nodes along the path */}
          {[
            [140, 98],
            [270, 70],
            [450, 95],
            [640, 78],
            [800, 92],
          ].map(([cx, cy], i) => (
            <motion.g
              key={`${cx}-${cy}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease: EASE }}
            >
              <circle cx={cx} cy={cy} r="8" fill={RED} opacity="0.1" />
              <circle cx={cx} cy={cy} r="3.5" fill="#fff" />
              <circle cx={cx} cy={cy} r="2" fill={RED} />
            </motion.g>
          ))}

          {!reduceMotion && (
            <circle r="3" fill="#fff">
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M40 105 C140 105, 180 58, 270 70 S380 125, 450 95 S560 45, 640 78 S760 120, 860 88"
              />
            </circle>
          )}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[820px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:pb-28 lg:pt-20">
        <motion.h2
          id="industries-overview-cta-heading"
          className="font-heading text-[2rem] font-extrabold leading-[1.15] text-[#F5F5F2] sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {cta.headline}
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          {cta.body}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          <Link
            to={cta.primaryCta.href}
            className="inline-flex items-center justify-center rounded-md px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: RED }}
          >
            {cta.primaryCta.label}
          </Link>
          <Link
            to={cta.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-[#E7000B] hover:text-[#E7000B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cta.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
