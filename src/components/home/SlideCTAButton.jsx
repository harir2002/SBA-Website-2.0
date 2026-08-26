/**
 * SlideCTAButton — outlined red rectangular CTA for capability carousel slides.
 * Shared across all six slides; pass label + href from slide data.
 */

import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function SlideCTAButton({ label, href }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { scale: 1.04, x: 2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="inline-flex"
    >
      <Link
        to={href}
        className="slide-cta-btn group inline-flex min-h-10 items-center gap-2 rounded-md border-[1.75px] border-primary-red bg-transparent px-5 py-2.5 font-heading text-[13px] font-semibold tracking-wide text-primary-red uppercase no-underline transition-[background,color,border-color,box-shadow] duration-200 ease-in-out hover:bg-primary-red hover:text-white hover:shadow-[0_0_24px_rgba(231,0,11,0.35)] focus-visible:bg-primary-red focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[390px]:px-4 max-[390px]:py-2 max-[390px]:text-xs"
      >
        {label}
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </motion.div>
  )
}
