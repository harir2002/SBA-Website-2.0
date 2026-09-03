import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export const BRAND_MOTTO = 'Engineering the modern, secure, and intelligent enterprise.'

/**
 * Brand motto lockup — red rule + emphasized “intelligent”.
 */
export default function BrandMotto({ className = '', delay = 0.22 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <span
        className="mb-5 block h-[2px] w-10 origin-center rounded-full bg-primary-red"
        aria-hidden="true"
      />
      <p className="max-w-xl text-center font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-white/88 sm:text-lg">
        Engineering the modern, secure, and{' '}
        <span className="font-extrabold text-primary-red">intelligent</span> enterprise.
      </p>
    </motion.div>
  )
}
