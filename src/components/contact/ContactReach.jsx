/**
 * ContactReach — locations only when approved.
 * No invented addresses or phone numbers.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactReach() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black" aria-labelledby="contact-reach-heading">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            Our Reach
          </p>
          <h2
            id="contact-reach-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Local context. Enterprise-scale delivery.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            SBA supports organisations through a connected delivery model—bringing
            together local engagement, cross-domain expertise, partner ecosystems,
            and accountable delivery teams.
          </p>

          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#0d0f14] p-5 sm:p-6">
            <p className="font-heading text-sm font-bold tracking-[0.16em] text-primary-red uppercase">
              India Headquarters
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
              Office address and phone details will appear here once confirmed for
              public publication. Start a conversation through the enquiry form and
              our team will connect you with the right specialist.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.08]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 50% 45% at 60% 40%, rgba(231,0,11,0.12) 0%, transparent 55%), linear-gradient(160deg, #0a0c10, #12151c)',
          }}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          {[
            { t: '22%', l: '28%' },
            { t: '38%', l: '62%' },
            { t: '58%', l: '40%' },
            { t: '48%', l: '78%' },
          ].map((node, i) => (
            <span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-white/50"
              style={{ top: node.t, left: node.l, boxShadow: '0 0 10px rgba(255,255,255,0.25)' }}
            />
          ))}
          <motion.span
            className="absolute h-3 w-3 rounded-full bg-primary-red"
            style={{
              top: '40%',
              left: '48%',
              boxShadow: '0 0 16px rgba(231,0,11,0.75)',
            }}
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="absolute right-5 bottom-5 font-heading text-[10px] tracking-[0.2em] text-white/35 uppercase">
            Connected delivery
          </p>
        </motion.div>
      </div>
    </section>
  )
}
