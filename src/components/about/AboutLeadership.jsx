import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { ABOUT_LEADERSHIP } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

function initialsFor(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Portrait({ name, photo }) {
  const [failed, setFailed] = useState(false)
  const src = photo ? encodeURI(photo) : null

  return (
    <div
      className="relative w-full shrink-0 grow-0 overflow-hidden bg-[#1a1c22]"
      style={{ aspectRatio: '4 / 5', height: 'auto' }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(180,180,190,0.35) 0%, transparent 60%), linear-gradient(180deg, #2a2d36 0%, #12141a 100%)',
            }}
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center font-heading text-4xl font-extrabold tracking-widest text-white/25">
            {initialsFor(name)}
          </span>
        </>
      )}
      <span
        className="absolute top-0 left-0 h-full w-[2.5px] origin-top scale-y-0 bg-primary-red transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />
    </div>
  )
}

function LinkedInLink({ href, name, className = '' }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/55 transition-colors hover:border-primary-red/60 hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red ${className}`}
      aria-label={`Open ${name}'s LinkedIn profile`}
    >
      <Linkedin className="h-4 w-4" aria-hidden="true" />
    </a>
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
        {leader.linkedin ? (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 font-heading text-xs font-bold tracking-[0.14em] text-white uppercase no-underline transition-colors hover:border-primary-red hover:text-primary-red"
            aria-label={`Open ${leader.name}'s LinkedIn profile`}
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            View on LinkedIn
          </a>
        ) : null}
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
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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

        <div className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_LEADERSHIP.map((leader, i) => (
            <motion.button
              key={leader.id}
              type="button"
              className="group flex w-full cursor-pointer flex-col border-0 bg-transparent p-0 text-left"
              onClick={() => setActive(leader)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              aria-label={`View profile for ${leader.name}, ${leader.role}`}
            >
              <Portrait name={leader.name} photo={leader.photo} />
              <div className="mt-4 flex flex-col">
                <p className="font-heading text-[0.8125rem] font-bold leading-snug text-white sm:text-sm lg:text-[0.9375rem]">
                  <span className="inline-block whitespace-nowrap border-b-2 border-primary-red pb-0.5">
                    {leader.name}
                  </span>
                </p>
                <p className="mt-1.5 font-body text-sm text-white/50">{leader.role}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 font-heading text-[11px] font-bold tracking-[0.14em] text-white/45 uppercase transition-colors group-hover:text-primary-red">
                    View profile
                    <span aria-hidden="true">→</span>
                  </span>
                  <LinkedInLink href={leader.linkedin} name={leader.name} />
                </div>
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
