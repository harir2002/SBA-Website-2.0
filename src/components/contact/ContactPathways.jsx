import { motion, useReducedMotion } from 'framer-motion'
import { CONTACT_PATHWAYS } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactPathways({ onSelect }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative bg-black"
      aria-labelledby="contact-pathways-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            How Can We Help?
          </p>
          <h2
            id="contact-pathways-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Choose the right starting point.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Whether you are modernising a critical foundation, strengthening cyber
            resilience, building a digital product, making data actionable, or
            scaling practical AI—we are ready to help define the path forward.
          </p>
        </motion.div>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0">
          {CONTACT_PATHWAYS.map((card, i) => (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => onSelect(card.category)}
              className="group flex w-[78%] shrink-0 snap-center flex-col rounded-xl border border-white/15 bg-[#0d0f14] p-5 text-left transition-[border-color,transform] duration-300 hover:border-primary-red/50 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red lg:w-auto lg:shrink"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            >
              <span
                className="mb-4 block h-[2px] w-8 origin-left bg-primary-red transition-transform duration-300 group-hover:scale-x-150"
                aria-hidden="true"
              />
              <h3 className="font-heading text-base font-bold leading-snug text-white">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 font-body text-xs leading-relaxed text-white/50 sm:text-sm">
                {card.copy}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-heading text-[11px] font-bold tracking-[0.14em] text-primary-red uppercase">
                Start here
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
