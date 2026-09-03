import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

/**
 * Thin fixed scroll progress line (#E7000B). Below header z-index so nav stays usable.
 */
export default function SolutionScrollProgress({ accent = SOLUTION_ACCENT }) {
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
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2.5px] origin-left"
      style={{
        scaleX,
        backgroundColor: accent,
        boxShadow: `0 0 12px ${accent}8C`,
      }}
      aria-hidden="true"
    />
  )
}
