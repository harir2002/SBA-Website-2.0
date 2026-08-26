/**
 * PageScrollProgress — thin brand-red bar that tracks scroll depth.
 */

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function PageScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2.5px] origin-left bg-primary-red"
      style={{
        scaleX,
        boxShadow: '0 0 12px rgba(231,0,11,0.55)',
      }}
      aria-hidden="true"
    />
  )
}
