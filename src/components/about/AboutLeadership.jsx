import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ABOUT_LEADERSHIP } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

function Portrait({ name }) {
  const initials = name.slice(0, 2).toUpperCase()
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1a1c22]">
      <div
        className="absolute inset-0 grayscale transition-[filter,opacity] duration-500 group-hover:grayscale-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(180,180,190,0.35) 0%, transparent 60%), linear-gradient(180deg, #2a2d36 0%, #12141a 100%)',
        }}
        aria-hidden="true"
      />
      <span className="absolute inset-0 flex items-center justify-center font-heading text-4xl font-extrabold tracking-widest text-white/25 transition-colors duration-500 group-hover:text-white/45">
        {initials}
      </span>
      <span
        className="absolute top-0 left-0 h-full w-[2.5px] origin-top scale-y-0 bg-primary-red transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />
    </div>
  )
}

function LeaderModal({ leader, onClose }) {
  if (!leader) return null
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leader-modal-title"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <motion.div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#12141a] p-7 shadow-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-heading text-xs tracking-wide text-white/50 uppercase hover:text-white"
          aria-label="Close leadership profile"
        >
          Close
        </button>
        <p className="font-heading text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
          Leadership
        </p>
        <h3 id="leader-modal-title" className="mt-2 font-heading text-2xl font-bold text-white">
          {leader.name}
        </h3>
        <p className="mt-1 font-body text-sm text-white/55">{leader.role}</p>
        <span className="mt-4 block h-px w-12 bg-primary-red" aria-hidden="true" />
        <p className="mt-4 font-body text-sm leading-relaxed text-white/70">{leader.profile}</p>
      </motion.div>
    </div>
  )
}

export default function AboutLeadership() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <section
      id="leadership"
      className="relative scroll-mt-[88px] bg-black"
      aria-labelledby="about-leadership-heading"
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
            Leadership
          </p>
          <h2
            id="about-leadership-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Experience that stays accountable.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            SBA is led by technology, delivery, and commercial leaders who
            understand that enterprise transformation is not complete at go-live.
            It requires deep context, practical execution, and accountability that
            lasts beyond the project.
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Our leadership team brings together strategic direction, engineering
            depth, global growth, and delivery discipline—working alongside clients
            from ambition to outcome.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_LEADERSHIP.map((leader, i) => (
            <motion.button
              key={leader.id}
              type="button"
              className="group cursor-pointer border-0 bg-transparent p-0 text-left"
              onClick={() => setActive(leader)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              aria-label={`View profile for ${leader.name}, ${leader.role}`}
            >
              <Portrait name={leader.name} />
              <div className="mt-4">
                <p className="font-heading text-lg font-bold text-white">
                  <span className="border-b-2 border-primary-red pb-0.5">{leader.name}</span>
                </p>
                <p className="mt-1.5 font-body text-sm text-white/50">{leader.role}</p>
                <p className="mt-3 max-h-0 overflow-hidden font-body text-sm leading-relaxed text-white/60 opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                  {leader.profile}
                </p>
                <span className="mt-3 inline-flex font-heading text-[11px] font-bold tracking-[0.14em] text-primary-red uppercase">
                  View profile →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <a
            href="#leadership"
            className="inline-flex items-center rounded-md border border-primary-red px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-primary-red uppercase no-underline transition-colors hover:bg-primary-red hover:text-white"
          >
            Meet Our Leadership
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <LeaderModal leader={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
