import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export const BRAND_MOTTO = 'Engineering the modern, secure, and intelligent enterprise.'

/**
 * Brand motto lockup — red rule + emphasized “intelligent”.
 * Shared Solutions / Industries / About signature treatment.
 */
export default function BrandMotto({
  className = '',
  delay = 0.22,
  align = 'center',
  showRule = true,
}) {
  const reduceMotion = useReducedMotion()
  const isLeft = align === 'left'

  return (
    <motion.div
      className={`flex flex-col ${isLeft ? 'items-start' : 'items-center'} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {showRule ? (
        <span
          className={`mb-5 block h-[2px] w-10 rounded-full bg-primary-red ${
            isLeft ? 'origin-left' : 'origin-center'
          }`}
          aria-hidden="true"
        />
      ) : null}
      <p
        className={`max-w-xl font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-white/88 sm:text-lg ${
          isLeft ? 'text-left' : 'text-center'
        }`}
      >
        Engineering the modern, secure, and{' '}
        <span className="font-extrabold text-primary-red">intelligent</span> enterprise.
      </p>
    </motion.div>
  )
}
