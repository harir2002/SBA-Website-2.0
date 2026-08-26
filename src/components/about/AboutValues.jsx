import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_VALUES } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

function ValueIcon({ id }) {
  const common = {
    viewBox: '0 0 40 40',
    className: 'h-8 w-8 stroke-white/80',
    fill: 'none',
    strokeWidth: '1.5',
    'aria-hidden': true,
  }
  switch (id) {
    case 'continuous-improvement':
      return (
        <svg {...common}>
          <path d="M8 28c4-10 10-16 20-18" strokeLinecap="round" />
          <path d="M24 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="28" r="3" />
        </svg>
      )
    case 'commitment':
      return (
        <svg {...common}>
          <path d="M12 20l5 5 11-12" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="7" y="7" width="26" height="26" rx="4" />
        </svg>
      )
    case 'problem-solving':
      return (
        <svg {...common}>
          <circle cx="20" cy="16" r="6" />
          <path d="M12 30c2-5 6-7 8-7s6 2 8 7" strokeLinecap="round" />
        </svg>
      )
    case 'adaptability':
      return (
        <svg {...common}>
          <path d="M10 20h20M20 10v20" strokeLinecap="round" />
          <path d="M14 14l12 12M26 14L14 26" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="14" cy="16" r="4" />
          <circle cx="26" cy="16" r="4" />
          <circle cx="20" cy="26" r="4" />
          <path d="M17 18l2 5M23 18l-2 5M16 16h8" strokeLinecap="round" />
        </svg>
      )
  }
}

export default function AboutValues() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-labelledby="about-values-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            How We Work
          </p>
          <h2
            id="about-values-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            The values behind every commitment.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Technology changes quickly. Trust is built over time. Our values guide
            how we solve problems, work with clients, support each other, and stay
            accountable for outcomes.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="-mx-5 mt-12 flex gap-4 overflow-x-auto px-5 pb-2 md:hidden">
          {ABOUT_VALUES.map((value, i) => (
            <article
              key={value.id}
              className="w-[78%] shrink-0 rounded-xl border border-white/10 bg-[#12141a] p-6"
            >
              <ValueIcon id={value.id} />
              <h3 className="mt-5 font-heading text-lg font-bold text-white">
                {value.title}
              </h3>
              <span className="mt-3 block h-px w-10 bg-primary-red" aria-hidden="true" />
              <p className="mt-4 font-body text-sm leading-relaxed text-white/55">
                {value.description}
              </p>
              <p className="mt-4 font-heading text-[10px] tracking-[0.18em] text-white/30 uppercase">
                {String(i + 1).padStart(2, '0')}
              </p>
            </article>
          ))}
        </div>

        {/* Desktop: editorial pentagon-like arc */}
        <div className="relative mt-14 hidden md:block">
          <svg
            className="pointer-events-none absolute inset-x-[8%] top-[42%] h-24 w-[84%]"
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M40 60 C 200 10, 350 10, 500 40 S 800 90, 960 30"
              fill="none"
              stroke="#E7000B"
              strokeWidth="2"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(231,0,11,0.5))' }}
            />
          </svg>

          <div className="grid grid-cols-5 gap-4 lg:gap-5">
            {ABOUT_VALUES.map((value, i) => (
              <motion.article
                key={value.id}
                className="group relative rounded-xl border border-white/[0.08] bg-[#12141a]/90 p-5 pt-6 transition-[border-color,transform] duration-300 hover:border-primary-red/45"
                style={{ marginTop: i % 2 === 0 ? 0 : 40 }}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <ValueIcon id={value.id} />
                <h3 className="mt-4 font-heading text-sm font-bold leading-snug text-white lg:text-base">
                  {value.title}
                </h3>
                <span className="mt-3 block h-px w-0 bg-primary-red transition-[width] duration-300 group-hover:w-10" aria-hidden="true" />
                <p className="mt-3 font-body text-xs leading-relaxed text-white/50 lg:text-[13px]">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.p
          className="mt-14 font-heading text-lg font-bold text-white sm:text-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          One team. One commitment. One shared outcome.
        </motion.p>
      </div>
    </section>
  )
}
