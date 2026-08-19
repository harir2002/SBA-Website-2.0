/**
 * TrustMetrics / About SBA — heading + stats with subtle Option A glow orbs.
 */

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const STATS = [
  { value: 30, suffix: '+', label: 'Years of Enterprise Trust', numeric: true },
  { value: 300, suffix: '+', label: 'Enterprise Clients', numeric: true },
  { value: 'Enduring', suffix: '', label: 'Client Partnerships', numeric: false },
  { value: 'Ecosystem-Led', suffix: '', label: 'Innovation', numeric: false },
]

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || typeof target !== 'number') return
    let startTime = null
    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [target, duration, active])
  return count
}

function StatCard({ stat, inView, reduceMotion }) {
  const count = useCountUp(
    typeof stat.value === 'number' ? stat.value : 0,
    1800,
    inView && !reduceMotion && stat.numeric,
  )
  const display = stat.numeric
    ? `${reduceMotion ? stat.value : inView ? count : 0}${stat.suffix}`
    : stat.value

  return (
    <article>
      <p className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{display}</p>
      <p className="mt-2 font-body text-sm text-white/70">{stat.label}</p>
      <span className="mt-3 block h-px w-12 bg-primary-red" aria-hidden="true" />
    </article>
  )
}

function AboutGlowBackground({ reduceMotion }) {
  const bgRef = useRef(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el || reduceMotion) return

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-paused', !entry.isIntersecting)
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <div
      ref={bgRef}
      className="sba-about-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft ambient mesh — top right */}
      <div
        className="sba-about-orb-a absolute will-change-transform"
        style={{
          top: '-12%',
          right: '-8%',
          width: 'min(520px, 70vw)',
          height: 'min(520px, 70vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.14) 0%, rgba(127,29,29,0.08) 40%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.9,
        }}
      />
      {/* Soft ambient mesh — bottom left */}
      <div
        className="sba-about-orb-b absolute will-change-transform"
        style={{
          bottom: '-18%',
          left: '-10%',
          width: 'min(460px, 65vw)',
          height: 'min(460px, 65vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(231,0,11,0.12) 0%, rgba(80,10,10,0.1) 45%, transparent 70%)',
          filter: 'blur(110px)',
          opacity: 0.85,
        }}
      />
      {/* Center-faint accent */}
      <div
        className="sba-about-orb-c absolute will-change-transform"
        style={{
          top: '28%',
          left: '38%',
          width: 'min(380px, 50vw)',
          height: 'min(380px, 50vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 68%)',
          filter: 'blur(90px)',
          opacity: 0.7,
        }}
      />
    </div>
  )
}

export default function TrustMetrics() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      ref={ref}
      id="about"
      className="relative scroll-mt-[72px] overflow-hidden border-t border-primary-red bg-black"
      aria-labelledby="about-sba-heading"
    >
      <AboutGlowBackground reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mb-12 max-w-[880px] sm:mb-14 lg:mb-16">
          <p className="font-heading text-sm font-bold tracking-[0.18em] uppercase sm:text-base">
            <span className="text-white/85">About </span>
            <span className="text-primary-red">SBA</span>
          </p>
          <h2
            id="about-sba-heading"
            className="mt-4 font-heading text-[22px] font-extrabold leading-[1.35] text-white/70 sm:text-[28px] lg:text-[34px]"
          >
            We partner with industry leaders to modernize core systems, protect
            business continuity, and activate AI-driven intelligence so they can
            operate at the speed of their best ideas.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
