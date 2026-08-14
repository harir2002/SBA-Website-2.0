import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'

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

function StatCard({ stat, inView, reduceMotion, index }) {
  const count = useCountUp(
    typeof stat.value === 'number' ? stat.value : 0,
    1800,
    inView && !reduceMotion && stat.numeric,
  )
  const display = stat.numeric
    ? `${reduceMotion ? stat.value : inView ? count : 0}${stat.suffix}`
    : stat.value

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <p className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{display}</p>
      <p className="mt-2 font-body text-sm text-white/70">{stat.label}</p>
      <span className="mt-3 block h-px w-12 bg-primary-red" aria-hidden="true" />
    </motion.article>
  )
}

export default function TrustMetrics() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="about"
      className="relative scroll-mt-[72px] overflow-hidden border-t border-primary-red bg-black"
      aria-labelledby="trust-heading"
    >
      <AnimatedBackground variant="grid" />
      <h2 id="trust-heading" className="sr-only">
        Trust metrics
      </h2>
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            inView={inView}
            reduceMotion={reduceMotion}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
