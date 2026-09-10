/**
 * ScrollReveal — fades/slides content in as it enters the viewport.
 * Use on homepage sections for step-by-step scroll storytelling.
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 36,
  once = true,
  amount = 0.2,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as] || motion.div

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Stagger children one after another when the group enters view */
export function ScrollStagger({
  children,
  className = '',
  stagger = 0.12,
  y = 28,
  once = true,
  amount = 0.15,
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  // useInView + animate (not whileInView) so newly added children
  // still animate in after filter changes while the group stays on screen.
  const inView = useInView(ref, {
    once,
    amount,
    margin: '0px 0px -8% 0px',
  })

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const items = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {items.filter(Boolean).map((child, i) => (
        <motion.div
          key={child?.key ?? i}
          className="h-full min-h-0"
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
