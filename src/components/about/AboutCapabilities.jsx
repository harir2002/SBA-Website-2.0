import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_CAPABILITIES } from '../../data/aboutContent'

const EASE = [0.16, 1, 0.3, 1]

function CapTile({ cap, index, reduceMotion }) {
  return (
    <motion.article
      className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0d0f14] p-6 transition-[border-color,transform] duration-300 hover:border-primary-red/50 sm:p-7"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at ${20 + (index % 3) * 30}% ${30 + (index % 2) * 40}%, rgba(231,0,11,0.14) 0%, transparent 55%),
            linear-gradient(160deg, #10131a 0%, #0a0c10 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <span
        className="absolute top-0 left-0 h-[2px] w-0 bg-primary-red transition-[width] duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <p className="font-heading text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-3 font-heading text-xl font-bold text-white">{cap.title}</h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/55">
          {cap.description}
        </p>
        <Link
          to={cap.href}
          className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase no-underline transition-colors hover:text-[#ff3340]"
        >
          {cap.cta}
          <span
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  )
}

export default function AboutCapabilities() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative bg-black"
      aria-labelledby="about-capabilities-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2
            id="about-capabilities-heading"
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]"
          >
            The capabilities behind enterprise momentum.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            SBA brings the engineering depth required to modernise, secure,
            connect, operate, and accelerate the enterprise—without forcing
            clients to manage multiple disconnected partners.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {ABOUT_CAPABILITIES.map((cap, i) => (
            <CapTile key={cap.id} cap={cap} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
