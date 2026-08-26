/**
 * ScrollReveal — fades/slides content in as it enters the viewport.
 * Use on homepage sections for step-by-step scroll storytelling.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 36,
  once = true,
  amount = 0.05,
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
      viewport={{ once, amount }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Stagger children one after another when the group enters view */
export function ScrollStagger({
  children,
  className = '',
  stagger = 0.1,
  y = 24,
  once = true,
  amount = 0.05,
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: '0px 0px -5% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={child?.key ?? i}
              variants={{
                hidden: { opacity: 0, y },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: EASE },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
