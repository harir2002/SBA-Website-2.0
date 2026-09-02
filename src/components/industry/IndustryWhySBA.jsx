import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function IndustryWhySBA({ whySba }) {
  const reduceMotion = useReducedMotion()
  if (!whySba) return null
  const paragraphs = (whySba.body || '').split('\n\n').filter(Boolean)

  return (
    <section
      id="why-sba"
      className="relative bg-black"
      aria-labelledby="industry-why-heading"
    >
      <div className="mx-auto max-w-[960px] px-5 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.h2
          id="industry-why-heading"
          className="font-heading text-3xl font-extrabold leading-tight text-[#F5F5F2] sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {whySba.headline}
        </motion.h2>

        <motion.span
          className="mx-auto mt-6 block h-[2px] w-12 origin-center rounded-full bg-primary-red"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        />

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

        {whySba.proofStrip && (
          <motion.p
            className="mt-10 font-heading text-xs font-semibold tracking-[0.12em] text-white/50 uppercase sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            {whySba.proofStrip}
          </motion.p>
        )}
      </div>
    </section>
  )
}
