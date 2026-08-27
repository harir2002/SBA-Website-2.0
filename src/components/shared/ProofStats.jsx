/**
 * ProofStats — count-up metrics matching homepage TrustMetrics motion.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

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

function ProofStat({ stat, inView, reduceMotion, delay }) {
  const numeric = typeof stat.value === 'number'
  const count = useCountUp(numeric ? stat.value : 0, 1800, inView && !reduceMotion && numeric)
  const display = numeric
    ? `${reduceMotion ? stat.value : inView ? count : 0}${stat.suffix ?? ''}`
    : `${stat.value}${stat.suffix ?? ''}`

  return (
    <motion.li
      className="group/stat"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <p className="font-heading text-3xl font-extrabold text-white transition-colors duration-300 group-hover/stat:text-primary-red sm:text-4xl lg:text-5xl">
        {display}
      </p>
      <p className="mt-2 font-body text-[11px] leading-snug text-white/55 sm:text-sm lg:text-base">
        {stat.label}
      </p>
      <motion.span
        className="mt-3 block h-px origin-left bg-primary-red"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={inView || reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: EASE }}
        style={{ width: 48 }}
      />
    </motion.li>
  )
}

export default function ProofStats({ items, className = '' }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <ul
      ref={ref}
      className={`grid grid-cols-3 gap-3 border-t border-white/10 pt-8 sm:gap-8 lg:gap-12 ${className}`}
    >
      {items.map((stat, i) => (
        <ProofStat
          key={stat.label}
          stat={stat}
          inView={inView}
          reduceMotion={reduceMotion}
          delay={0.08 + i * 0.08}
        />
      ))}
    </ul>
  )
}
