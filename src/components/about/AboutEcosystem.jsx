import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_ECOSYSTEM } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

function logoLabel(filename) {
  return filename
    .replace(/\.(png|jpe?g|webp|svg)$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\blogo\b/gi, '')
    .trim()
}

export default function AboutEcosystem() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(ABOUT_ECOSYSTEM[0].id)
  const current = ABOUT_ECOSYSTEM.find((c) => c.id === active) || ABOUT_ECOSYSTEM[0]

  return (
    <section
      className="relative bg-black"
      aria-labelledby="about-ecosystem-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2
            id="about-ecosystem-heading"
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Stronger through the right ecosystem.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Complex enterprise challenges require the right combination of
            engineering expertise, technology platforms, and delivery partnerships.
            SBA works with a broad ecosystem of Tier-1 technology providers to
            help clients build, secure, modernise, and operate their environments
            with confidence.
          </p>
        </motion.div>

        <div
          className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-1"
          role="tablist"
          aria-label="Partner categories"
        >
          {ABOUT_ECOSYSTEM.map((cat) => {
            const isActive = cat.id === active
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                className={`rounded-t-md px-3 py-2.5 font-heading text-xs font-semibold tracking-wide transition-colors sm:text-sm ${
                  isActive
                    ? 'border-b-2 border-primary-red text-primary-red'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <motion.div
          key={current.id}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          role="tabpanel"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {current.logos.map((file) => {
            const label = logoLabel(file)
            return (
              <div
                key={file}
                className="flex h-20 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0d0f14] px-3"
              >
                <img
                  src={encodeURI(`/logos/partners/${file}`)}
                  alt={label}
                  className="max-h-10 max-w-[120px] object-contain opacity-85"
                  style={{ filter: 'grayscale(1) invert(1)' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )
          })}
        </motion.div>

        <p className="mt-10 font-heading text-sm font-semibold text-white/70">
          Backed by 60+ Tier-1 OEM partnerships.
        </p>
      </div>
    </section>
  )
}
