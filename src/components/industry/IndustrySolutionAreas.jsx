import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function IndustrySolutionAreas({
  solutions,
  accent = '#E7000B',
  mobileDetailsAlways = false,
}) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(0)
  if (!solutions) return null

  return (
    <section
      id="solution-areas"
      className="relative bg-black"
      aria-labelledby="industry-solutions-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.h2
          id="industry-solutions-heading"
          className={`max-w-3xl font-heading text-3xl font-extrabold leading-tight text-[#F5F5F2] sm:text-4xl ${
            solutions.headline ? '' : 'sr-only'
          }`}
          initial={reduceMotion || !solutions.headline ? false : { opacity: 0, y: 16 }}
          whileInView={
            reduceMotion || !solutions.headline ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {solutions.headline || 'Solution areas'}
        </motion.h2>

        <ul className="mt-10 space-y-4">
          {solutions.items.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.li
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  onFocus={() => setOpen(i)}
                  aria-expanded={isOpen || mobileDetailsAlways}
                  className="group w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-5 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7 sm:py-6"
                  style={{
                    outlineColor: accent,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}80`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                  }}
                >
                  <span
                    className="block h-[2px] w-10 origin-left transition-transform duration-500 group-hover:scale-x-150 group-focus-visible:scale-x-150"
                    style={{ backgroundColor: accent }}
                  />
                  <h3 className="mt-4 font-heading text-xl font-bold text-[#F5F5F2] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-[#8E8E8E] sm:text-base">
                    {item.summary}
                  </p>

                  {/* Mobile: always show details when requested (BFSI) */}
                  {mobileDetailsAlways && (
                    <p className="mt-4 border-t border-white/10 pt-4 font-body text-sm leading-relaxed text-white/70 md:hidden">
                      {item.details}
                    </p>
                  )}

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      mobileDetailsAlways ? 'hidden md:grid' : ''
                    } ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 border-t border-white/10 pt-4 font-body text-sm leading-relaxed text-white/70">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
