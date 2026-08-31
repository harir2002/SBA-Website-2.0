import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function IndustryPromiseSection({ promise, accent = '#E7000B' }) {
  const reduceMotion = useReducedMotion()
  if (!promise) return null
  const paragraphs = (promise.body || '').split('\n\n').filter(Boolean)

  return (
    <section
      id="sba-promise"
      className="relative overflow-hidden bg-black"
      aria-labelledby="industry-promise-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <motion.h2
            id="industry-promise-heading"
            className="font-heading text-3xl font-extrabold leading-tight text-[#F5F5F2] sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {promise.headline}
          </motion.h2>

          {promise.supportingLine && (
            <motion.p
              className="mt-4 font-heading text-base font-semibold sm:text-lg"
              style={{ color: accent }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
            >
              {promise.supportingLine}
            </motion.p>
          )}

          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <motion.p
                key={p.slice(0, 28)}
                className="font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.ol
          className="relative space-y-3"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-label="Capability layers"
        >
          <div
            className="pointer-events-none absolute top-3 bottom-3 left-[11px] w-px"
            style={{ backgroundColor: `${accent}80` }}
            aria-hidden="true"
          />
          {(promise.layers || []).map((layer, i) => (
            <li
              key={layer}
              className="relative flex items-center gap-4 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3.5"
            >
              <span
                className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-heading text-[10px] font-bold text-white"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="font-heading text-sm font-semibold text-[#F5F5F2] sm:text-base">
                {layer}
              </span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
