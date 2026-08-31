/**
 * CareersBanner — full-bleed original team photo with left-aligned CTA.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function CareersBanner() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="careers"
      className="join-team-section relative scroll-mt-[72px] flex items-center"
      aria-labelledby="careers-banner-heading"
    >
      <style>{`
        .join-team-section {
          position: relative;
          min-height: 580px;
          overflow: hidden;
          isolation: isolate;
          background: #000000;
        }

        .join-team-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 78% top;
          z-index: -2;
          transform: scale(1.04);
          transition: transform 8s ease-out;
        }

        .join-team-section:hover .join-team-image {
          transform: scale(1.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .join-team-image {
            transform: none;
            transition: none;
          }
          .join-team-section:hover .join-team-image {
            transform: none;
          }
        }

        .join-team-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(
              90deg,
              rgba(5, 5, 5, 0.96) 0%,
              rgba(5, 5, 5, 0.84) 38%,
              rgba(5, 5, 5, 0.42) 65%,
              rgba(5, 5, 5, 0.12) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.18) 0%,
              rgba(0, 0, 0, 0.42) 100%
            );
        }

        .join-team-content {
          position: relative;
          z-index: 1;
          max-width: 680px;
          padding: 88px 56px;
        }

        @media (max-width: 1024px) {
          .join-team-section {
            min-height: 540px;
          }

          .join-team-image {
            object-position: 72% top;
          }

          .join-team-content {
            padding: 72px 40px;
          }
        }

        @media (max-width: 768px) {
          .join-team-section {
            min-height: 560px;
          }

          .join-team-image {
            object-position: 65% top;
          }

          .join-team-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(5, 5, 5, 0.94) 0%,
                rgba(5, 5, 5, 0.80) 58%,
                rgba(5, 5, 5, 0.38) 100%
              ),
              linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.22) 0%,
                rgba(0, 0, 0, 0.52) 100%
              );
          }

          .join-team-content {
            max-width: 100%;
            padding: 64px 24px;
          }
        }
      `}</style>

      <img
        className="join-team-image"
        src="/images/join-sba-team-original.png"
        alt=""
        aria-hidden="true"
      />
      <div className="join-team-overlay" aria-hidden="true" />

      <div className="join-team-content">
        <motion.h2
          id="careers-banner-heading"
          className="font-heading text-[2.25rem] font-extrabold leading-tight text-white sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Build What&apos;s Next With SBA
        </motion.h2>

        <motion.p
          className="mt-3 font-body text-base text-white/65 sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
        >
          Let&apos;s engineer your modern, secure and Intelligent enterprise.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
        >
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="group mt-5 inline-flex items-center justify-center gap-2 rounded-md border-[1.75px] border-primary-red bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 ease-out hover:scale-[1.03] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Join the SBA Team
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
