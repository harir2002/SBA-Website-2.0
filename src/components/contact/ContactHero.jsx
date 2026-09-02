import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CONTACT_PROOF } from '../../data/contactContent'
import ContactMotionPanel from './ContactMotionPanel'
import ProofStats from '../shared/ProofStats'
import ScrollReveal from '../home/ScrollReveal'

const EASE = [0.16, 1, 0.3, 1]

export default function ContactHero({ onStart }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="contact-hero page-hero relative overflow-hidden bg-black"
      aria-labelledby="contact-hero-heading"
      style={{
        minHeight: 'clamp(560px, 62vh, 760px)',
      }}
    >
      <style>{`
        .contact-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 58%) minmax(280px, 42%);
          align-items: center;
          gap: clamp(32px, 5vw, 92px);
          padding: 0 clamp(24px, 7vw, 80px) clamp(48px, 6vw, 80px);
          max-width: 1280px;
          margin: 0 auto;
        }
        .contact-hero__visual {
          width: min(100%, 480px);
          justify-self: center;
          aspect-ratio: 1 / 1;
        }
        .contact-hero__content {
          max-width: 700px;
        }
        @media (max-width: 768px) {
          .contact-hero-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 0 24px 64px;
          }
          .contact-hero__visual {
            width: min(82vw, 320px);
          }
        }
      `}</style>

      <div className="contact-hero-grid relative z-10 w-full">
        <div className="contact-hero__content">
          <ScrollReveal y={24} amount={0.2}>
            <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
              Contact SBA
            </p>
          </ScrollReveal>

          <ScrollReveal y={28} delay={0.06} amount={0.2}>
            <h1
              id="contact-hero-heading"
              className="mt-4 max-w-[14ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-[3.15rem]"
            >
              Let&apos;s engineer what comes next.
            </h1>
          </ScrollReveal>

          <ScrollReveal y={24} delay={0.12} amount={0.2}>
            <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base">
              The strongest technology initiatives begin with the right conversation.
              Tell us where your enterprise needs to move forwardâ€”and we will bring the
              right engineering, security, data, AI, and delivery expertise to the table.
            </p>
          </ScrollReveal>

          <ScrollReveal y={20} delay={0.18} amount={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onStart()}
                className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Let's Connect
              </button>
              <Link
                to="/#capabilities"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore our Solutions
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal y={24} delay={0.24} amount={0.15}>
            <ProofStats items={CONTACT_PROOF} className="mt-10" />
          </ScrollReveal>
        </div>

        <motion.div
          className="contact-hero__visual"
          initial={reduceMotion ? false : { opacity: 0, x: 28, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <ContactMotionPanel className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  )
}
