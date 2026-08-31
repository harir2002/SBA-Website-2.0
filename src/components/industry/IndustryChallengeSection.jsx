import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function IndustryChallengeSection({ challenges, accent = '#E7000B' }) {
  const reduceMotion = useReducedMotion()
  if (!challenges) return null

  const count = challenges.items.length
  const gridCols =
    count >= 5
      ? 'lg:grid-cols-3 xl:grid-cols-5'
      : count === 3
        ? 'lg:grid-cols-3'
        : 'lg:grid-cols-2'

  return (
    <section
      id="industry-challenges"
      className="relative bg-black"
      aria-labelledby="industry-challenges-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.p
          className="font-heading text-xs font-bold tracking-[0.28em] uppercase"
          style={{ color: accent }}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          Industry Challenges
        </motion.p>

        <motion.h2
          id="industry-challenges-heading"
          className="mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight text-[#F5F5F2] sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {challenges.headline}
        </motion.h2>

        <motion.span
          className="mt-6 block h-[2px] w-12 origin-left rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        />

        <ul className={`mt-10 grid gap-4 sm:grid-cols-2 ${gridCols}`}>
          {challenges.items.map((item, i) => (
            <motion.li
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary-red/40 hover:bg-white/[0.035] sm:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            >
              <span
                className="absolute top-0 left-0 h-full w-[2.5px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />

              <div className="flex items-start gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-heading text-xs font-bold text-white"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold leading-snug text-[#F5F5F2]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#8E8E8E]">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
