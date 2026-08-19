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

const EASE = [0.16, 1, 0.3, 1]
const BADGE = 'w-14 h-14 sm:w-16 sm:h-16'
const RAIL_W = 'w-14 sm:w-16'

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

  return (
    <article className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 lg:gap-x-10">
      {/* Badge column — spine is continuous at list level; badge sits on top */}
      <div className={`relative z-10 flex ${RAIL_W} shrink-0 justify-center self-start`}>
        <motion.div
          className={`flex ${BADGE} items-center justify-center rounded-full border border-primary-red/40 bg-[#12141a] font-heading text-sm font-bold text-white sm:text-base`}
          style={{
            boxShadow:
              '0 0 0 1px rgba(231,0,11,0.15), 0 0 22px rgba(231,0,11,0.28)',
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {n}
        </motion.div>
      </div>

      {/* Premium card — heading + description + detail grid */}
      <motion.div
        className="relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.06]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(231,0,11,0.07) 0%, transparent 55%), linear-gradient(145deg, #0d0f14 0%, #16181f 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
      >
        <div className="px-6 pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pt-10">
          <h3 className="font-heading text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
            <span className="tracking-[0.14em] text-primary-red uppercase">
              {accent}
            </span>
            {rest ? <span className="text-white"> {rest}</span> : null}
          </h3>

          <span
            className="mt-4 block h-[3px] w-10 rounded-full bg-primary-red"
            aria-hidden="true"
          />

          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/60 sm:text-base">
            {cap.description}
          </p>
        </div>

        <CapabilityDetailGrid columns={CAPABILITY_DETAIL_GRIDS[cap.id] || []} />
      </motion.div>
    </article>
  )
}

function TimelineSpine({ containerRef, reduceMotion }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.35'],
  })
  const draw = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="pointer-events-none absolute top-7 bottom-7 left-0 z-0 flex w-14 justify-center sm:top-8 sm:bottom-8 sm:w-16"
      aria-hidden="true"
    >
      {/* Track */}
      <div
        className="absolute top-0 bottom-0 w-[2px] rounded-full"
        style={{
          background:
            'linear-gradient(to bottom, rgba(231,0,11,0.35), rgba(231,0,11,0.12) 40%, rgba(255,255,255,0.08))',
        }}
      />
      {/* Scroll-drawn fill */}
      {!reduceMotion ? (
        <motion.div
          className="absolute top-0 w-[2px] origin-top rounded-full bg-primary-red"
          style={{ height: draw }}
        />
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
      className="relative border-t border-white/10 bg-black"
      aria-labelledby="capabilities-showcase-heading"
      data-placeholder="capabilities-showcase"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mb-14 max-w-3xl sm:mb-16">
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
            What We Do
          </p>
          <h2
            id="capabilities-showcase-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Capabilities that define tomorrow
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          <TimelineSpine containerRef={timelineRef} reduceMotion={reduceMotion} />

          <div className="relative z-[1] flex flex-col gap-20 sm:gap-24">
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
