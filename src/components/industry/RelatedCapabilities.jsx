import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CAPABILITIES } from '../../data/capabilities'

const EASE = [0.16, 1, 0.3, 1]

export default function RelatedCapabilities({ capabilityIds = [] }) {
  const reduceMotion = useReducedMotion()
  const items = capabilityIds
    .map((id) => CAPABILITIES.find((c) => c.id === id))
    .filter(Boolean)

  if (!items.length) return null

  return (
    <section
      id="related-capabilities"
      className="relative bg-black"
      aria-labelledby="related-capabilities-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.h2
          id="related-capabilities-heading"
          className="font-heading text-3xl font-extrabold text-[#F5F5F2] sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Explore the capabilities behind the outcome.
        </motion.h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cap, i) => (
            <motion.li
              key={cap.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            >
              <Link
                to={
                  cap.link?.startsWith('/solutions/')
                    ? cap.link
                    : `/#${cap.id}`
                }
                className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-black p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary-red/50 focus-visible:border-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                <span
                  className="block h-[2px] w-8 origin-left bg-primary-red transition-transform duration-500 group-hover:scale-x-[2.2] group-focus-visible:scale-x-[2.2]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-heading text-lg font-bold text-[#F5F5F2]">
                  {cap.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-[#8E8E8E]">
                  {cap.sectionDescription || cap.description}
                </p>
                <span className="mt-4 font-heading text-xs font-bold tracking-wide text-primary-red uppercase">
                  {cap.ctaShort}
                  {' \u2192'}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
