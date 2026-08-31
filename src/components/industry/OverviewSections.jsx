/**
 * Industries Overview page sections — /industries only.
 */

import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { INDUSTRY_OVERVIEW } from '../../data/industriesContent'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'
const data = INDUSTRY_OVERVIEW

/** Dynamic radial industries hub — sits directly on page black (no card/box). */
const CX = 260
const CY = 260
const RING_R = 138
const HUB_R = 62
const VB = 520

const INDUSTRY_RADIAL = [
  { slug: 'bfsi', label: 'BFSI', lines: ['BFSI'] },
  { slug: 'manufacturing', label: 'Manufacturing', lines: ['MANUFACTURING'] },
  { slug: 'it-ites', label: 'IT/ITES', lines: ['IT/ITES'] },
  {
    slug: 'diversified-enterprises',
    label: 'Diversified Enterprises',
    lines: ['DIVERSIFIED', 'ENTERPRISES'],
  },
].map((item, i) => {
  const angleDeg = -90 + i * 90
  const rad = (angleDeg * Math.PI) / 180
  const x = CX + RING_R * Math.cos(rad)
  const y = CY + RING_R * Math.sin(rad)
  const labelR = RING_R + 46
  const lx = CX + labelR * Math.cos(rad)
  const ly = CY + labelR * Math.sin(rad)

  let anchor = 'middle'
  let dy = 0
  if (angleDeg === 0) {
    anchor = 'start'
    dy = 4
  } else if (angleDeg === 180 || angleDeg === -180) {
    anchor = 'end'
    dy = 4
  } else if (angleDeg === -90) {
    dy = -4
  } else if (angleDeg === 90) {
    dy = 16
  }

  return { ...item, x, y, lx, ly: ly + dy, anchor, angleDeg }
})

function OverviewHeroLandscape() {
  const reduceMotion = useReducedMotion()
  const ringPath = `M${CX} ${CY - RING_R} A${RING_R} ${RING_R} 0 1 1 ${CX - 0.01} ${CY - RING_R}`

  return (
    <div className="relative w-full max-w-[560px]">
      <style>{`
        @keyframes radial-orbit-slow {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .radial-orbit-anim {
            animation: none !important;
          }
        }
      `}</style>

      {/* Static container — continuous float/rotate was causing page flicker */}
      <div className="relative aspect-square w-full overflow-visible bg-transparent">
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="h-full w-full overflow-visible"
          role="img"
          aria-label="Industries Overview: BFSI, Manufacturing, IT/ITES, and Diversified Enterprises"
        >
          <defs>
            <filter id="radial-hub-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="radial-hub-fill" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FF2A33" />
              <stop offset="55%" stopColor={RED} />
              <stop offset="100%" stopColor="#B50008" />
            </radialGradient>
            <radialGradient id="radial-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={RED} stopOpacity="0.42" />
              <stop offset="60%" stopColor={RED} stopOpacity="0.1" />
              <stop offset="100%" stopColor={RED} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r="124" fill="url(#radial-aura)" />

          {/* One slow outer orbit only */}
          <g
            className="radial-orbit-anim"
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: reduceMotion ? undefined : 'radial-orbit-slow 48s linear infinite',
            }}
          >
            <circle
              cx={CX}
              cy={CY}
              r="176"
              fill="none"
              stroke="rgba(245,245,242,0.08)"
              strokeWidth="1"
              strokeDasharray="3 10"
            />
            <circle cx={CX} cy={CY - 176} r="2.5" fill={RED} opacity="0.65" />
          </g>

          <circle
            cx={CX}
            cy={CY}
            r={RING_R}
            fill="none"
            stroke="rgba(245,245,242,0.28)"
            strokeWidth="1"
          />

          {INDUSTRY_RADIAL.map((node, i) => (
            <motion.line
              key={`spoke-${node.slug}`}
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              stroke="rgba(245,245,242,0.28)"
              strokeWidth="1"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.06, ease: EASE }}
            />
          ))}

          {!reduceMotion && (
            <circle r="3.25" fill="#fff">
              <animateMotion dur="8s" repeatCount="indefinite" path={ringPath} />
            </circle>
          )}

          {/* Center hub — entrance only, no looping transform */}
          <motion.g
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={HUB_R + 10}
              fill={RED}
              opacity="0.18"
              filter="url(#radial-hub-glow)"
            />
            <circle
              cx={CX}
              cy={CY}
              r={HUB_R}
              fill="url(#radial-hub-fill)"
              filter="url(#radial-hub-glow)"
            />
            <text
              x={CX}
              y={CY - 8}
              textAnchor="middle"
              fill="#FFFFFF"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              INDUSTRIES
            </text>
            <text
              x={CX}
              y={CY + 8}
              textAnchor="middle"
              fill="#FFFFFF"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              OVERVIEW
            </text>
          </motion.g>

          {INDUSTRY_RADIAL.map((node, i) => (
            <motion.g
              key={node.slug}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease: EASE }}
            >
              <circle cx={node.x} cy={node.y} r="5" fill="#FFFFFF" />
              <text
                x={node.lx}
                y={node.ly}
                textAnchor={node.anchor}
                fill="#F5F5F2"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: node.lines.length > 1 ? 9 : 10.5,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                {node.lines.map((line, li) => (
                  <tspan key={line} x={node.lx} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          ))}
        </svg>

        <ul className="absolute inset-0" aria-label="Industries">
          {INDUSTRY_RADIAL.map((node) => (
            <li
              key={node.slug}
              className="absolute"
              style={{
                left: `${(node.x / VB) * 100}%`,
                top: `${(node.y / VB) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '20%',
                height: '20%',
              }}
            >
              <Link
                to={`/industries/${node.slug}`}
                className="block h-full w-full rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                aria-label={node.label}
              >
                <span className="sr-only">{node.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export function OverviewHero() {
  const reduceMotion = useReducedMotion()
  const { hero } = data

  return (
    <section
      className="relative flex min-h-[min(100svh,900px)] items-center overflow-hidden bg-black"
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
        className="pointer-events-none absolute top-[108px] bottom-0 left-4 w-px origin-top sm:left-6 lg:left-10"
        style={{ background: `linear-gradient(180deg, ${RED} 0%, transparent 100%)` }}
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pt-[108px] pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10 lg:pb-24">
        <div>
          <motion.p
            className="font-heading text-xs font-bold tracking-[0.28em] uppercase"
            style={{ color: RED }}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="industries-overview-heading"
            className="mt-4 max-w-[18ch] font-heading text-[2.1rem] font-extrabold leading-[1.12] text-[#F5F5F2] sm:text-5xl lg:text-[3.2rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="mt-4 font-heading text-base font-semibold text-[#F5F5F2]/70 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            {hero.subheadline}
          </motion.p>
          <motion.span
            className="mt-6 block h-[2px] w-14 origin-left rounded-full"
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
                className="industry-card group grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] transition-[border-color] duration-300 hover:border-[#E7000B]/45 focus-visible:border-[#E7000B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7000B] md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="industry-card__image-wrap relative border-b border-white/[0.06] md:min-h-[200px] md:border-r md:border-b-0">
                  <picture>
                    {card.imageWebp && (
                      <source
                        type="image/webp"
                        srcSet={card.imageSrcSet?.webp || card.imageWebp}
                        sizes="(min-width: 768px) 42vw, 100vw"
                      />
                    )}
                    <img
                      className="industry-card__image"
                      src={card.image}
                      srcSet={card.imageSrcSet?.jpg}
                      sizes="(min-width: 768px) 42vw, 100vw"
                      alt={card.imageAlt}
                      width={960}
                      height={540}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="industry-card__content relative z-[2] flex flex-col justify-center p-6 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:p-8">
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
                    {card.cta} →
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
        {/* Soft signal constellation — no box placeholders */}
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
