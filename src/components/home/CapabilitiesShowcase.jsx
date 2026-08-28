/**
 * CapabilitiesShowcase — premium timeline of capability chapters.
 * Continuous spine behind badges; each block is a depth card + detail grid.
 */

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { CAPABILITIES } from '../../data/capabilities'
import { CAPABILITY_DETAIL_GRIDS } from '../../data/capabilityDetails'
import CapabilityDetailGrid from './CapabilityDetailGrid'
import VideoCapabilitiesBridge from './VideoCapabilitiesBridge'

const EASE = [0.16, 1, 0.3, 1]
const BADGE = 'w-14 h-14 sm:w-16 sm:h-16'
const RAIL_W = 'w-14 sm:w-16'

const BADGE_ICONS = {
  'modernize-the-core': {
    src: '/images/icons/modernize-core.png',
    alt: 'Modernize the Core icon',
  },
  'protect-and-recover': {
    src: '/images/icons/protect-and-recover.png',
    alt: 'Protect and Recover icon',
  },
  'make-data-actionable': {
    src: '/images/icons/make-data-actionable.png',
    alt: 'Make Data Actionable icon',
  },
  'build-and-connect': {
    src: '/images/icons/build-and-connect.png',
    alt: 'Build and Connect icon',
  },
  'engineered-for-your-industry': {
    src: '/images/icons/engineered-for-industry.png',
    alt: 'Operate with Assurance icon',
  },
  'accelerate-business-ai': {
    src: '/images/icons/accelerate-business-ai.png',
    alt: 'Accelerate Business AI icon',
  },
}

function accentWord(title) {
  const parts = title.split(' ')
  if (parts.length === 1) return { accent: parts[0], rest: '' }
  return {
    accent: parts[0],
    rest: parts.slice(1).join(' '),
  }
}

function CapabilityBlock({ cap, index, reduceMotion }) {
  const { accent, rest } = accentWord(cap.title)
  const n = String(index + 1).padStart(2, '0')
  const icon = BADGE_ICONS[cap.id]

  return (
    <article
      id={cap.id}
      className="relative grid scroll-mt-[88px] grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 lg:gap-x-10"
    >
      <div className={`relative z-[2] flex ${RAIL_W} shrink-0 justify-center self-start`}>
        <motion.div
          id={`cap-badge-${n}`}
          className={`capability-badge relative z-[2] ${BADGE} shrink-0 rounded-full border border-primary-red/40 bg-[#12141a]`}
          style={{
            boxShadow:
              '0 0 0 1px rgba(231,0,11,0.15), 0 0 22px rgba(231,0,11,0.28)',
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {!reduceMotion && (
            <span
              className="capability-badge-ring pointer-events-none absolute inset-[-5px] rounded-full"
              aria-hidden="true"
            />
          )}
          <span className="absolute inset-0 overflow-hidden rounded-full">
            {icon ? (
              <img
                src={icon.src}
                alt={icon.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-heading text-sm font-bold text-white sm:text-base">
                {n}
              </span>
            )}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="group/cap relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.06] transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary-red/35 hover:shadow-[0_24px_56px_rgba(0,0,0,0.5),0_0_40px_rgba(231,0,11,0.08)]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(231,0,11,0.07) 0%, transparent 55%), linear-gradient(145deg, #0d0f14 0%, #16181f 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cap:opacity-100"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(231,0,11,0.12) 0%, transparent 55%)',
          }}
        />

        <div className="relative px-6 pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pt-10">
          <h3 className="font-heading text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
            <span className="tracking-[0.14em] text-primary-red uppercase">
              {accent}
            </span>
            {rest ? <span className="text-white"> {rest}</span> : null}
          </h3>

          <motion.span
            className="mt-4 block h-[3px] origin-left rounded-full bg-primary-red"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            style={{ width: 40 }}
          />

          {(cap.sectionDescription || cap.description) ? (
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/60 sm:text-base">
              {cap.sectionDescription || cap.description}
            </p>
          ) : null}
        </div>

        <CapabilityDetailGrid columns={CAPABILITY_DETAIL_GRIDS[cap.id] || []} />
      </motion.div>
    </article>
  )
}

function TimelineSpine({ containerRef, reduceMotion }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.3'],
  })
  const draw = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const tipTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="pointer-events-none absolute top-7 bottom-7 left-0 z-[1] flex w-14 justify-center sm:top-8 sm:bottom-8 sm:w-16"
      aria-hidden="true"
    >
      <div
        className="absolute top-0 bottom-0 w-[2px] rounded-full"
        style={{
          background:
            'linear-gradient(to bottom, rgba(231,0,11,0.28), rgba(231,0,11,0.1) 45%, rgba(255,255,255,0.08))',
        }}
      />

      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute top-0 w-[2.5px] origin-top rounded-full bg-primary-red"
            style={{
              height: draw,
              boxShadow: '0 0 10px rgba(231,0,11,0.7), 0 0 18px rgba(231,0,11,0.35)',
            }}
          />
          <motion.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-red"
            style={{
              top: tipTop,
              boxShadow:
                '0 0 0 2px rgba(231,0,11,0.35), 0 0 14px rgba(231,0,11,0.9)',
            }}
          />
        </>
      ) : (
        <div className="absolute top-0 bottom-0 w-[2px] rounded-full bg-primary-red/70" />
      )}
    </div>
  )
}

export default function CapabilitiesShowcase() {
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef(null)

  return (
    <section
      id="industries"
      className="relative scroll-mt-[72px] overflow-visible bg-black"
      aria-label="Capabilities"
      data-placeholder="capabilities-showcase"
    >
      <VideoCapabilitiesBridge />

      <div className="mx-auto box-border max-w-[1200px] px-6 pt-0 pb-16 sm:pb-20 lg:pb-24">
        <div ref={timelineRef} className="relative">
          <TimelineSpine containerRef={timelineRef} reduceMotion={reduceMotion} />

          <div className="relative flex flex-col gap-20 sm:gap-24">
            {CAPABILITIES.map((cap, index) => (
              <CapabilityBlock
                key={cap.id}
                cap={cap}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
