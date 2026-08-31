import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function IndustryUseCaseGrid({ useCases }) {
  const reduceMotion = useReducedMotion()
  if (!useCases) return null

  const isGrid = useCases.layout === 'grid'

  return (
    <section
      id="use-cases"
      className="relative bg-black"
      aria-labelledby="industry-usecases-heading"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.h2
          id="industry-usecases-heading"
          className="max-w-3xl font-heading text-3xl font-extrabold leading-tight text-[#F5F5F2] sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {useCases.headline}
        </motion.h2>

        {isGrid ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.items.map((item, i) => (
              <motion.li
                key={item.title}
                className="rounded-xl border border-white/[0.08] bg-[#111113] p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
              >
                <span className="block h-[2px] w-8 bg-primary-red" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-[#F5F5F2]">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#8E8E8E]">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : (
          <ul className="mt-10 space-y-4">
            {useCases.items.map((item, i) => (
              <motion.li
                key={typeof item === 'string' ? item : item.title}
                className="flex gap-4 border-b border-white/10 pb-4"
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }}
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-red"
                  aria-hidden="true"
                />
                <p className="font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base">
                  {typeof item === 'string' ? item : item.title}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
