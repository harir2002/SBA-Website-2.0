import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { TEAM_CARDS } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactTeams({ onSelectCategory }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-black" aria-labelledby="contact-teams-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <motion.h2
          id="contact-teams-heading"
          className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Need something more specific?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {TEAM_CARDS.map((card, i) => {
            const inner = (
              <>
                <span
                  className="mb-4 block h-[2px] w-8 bg-primary-red transition-transform duration-300 group-hover:scale-x-150"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/55">
                  {card.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase">
                  {card.cta}
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </>
            )

            const className =
              'group flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0d0f14] p-6 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary-red/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red sm:p-7'

            return (
              <motion.div
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              >
                {card.href.startsWith('/#') || card.href === '/#careers' ? (
                  <Link to={card.href} className={`${className} no-underline`}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={className}
                    onClick={() => onSelectCategory(card.category || '')}
                  >
                    {inner}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
