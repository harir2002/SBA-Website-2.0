/**
 * Site footer — link columns, badges/social, copyright.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const SOLUTIONS = [
  { label: 'Modernize the Core', href: '#capabilities' },
  { label: 'Protect & Recover', href: '#capabilities' },
  { label: 'Make Data Actionable', href: '#capabilities' },
  { label: 'Build & Connect', href: '#capabilities' },
  { label: 'Operate with Assurance', href: '#capabilities' },
  { label: 'Accelerate Business AI', href: '#capabilities' },
]

const EXPLORE = [
  { label: 'Industries', href: '#capabilities' },
  { label: 'Our Capabilities', href: '#capabilities' },
  { label: 'About Us', href: '#about' },
  { label: 'Careers', href: '#careers' },
]

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
  { label: 'X (Twitter)', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com', Icon: Youtube },
]

const BADGES = ['Badge 1', 'Badge 2', 'Badge 3', 'Badge 4']

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-black to-[#0a0a0a]">
      <motion.div
        className="mx-auto max-w-[1280px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Link grid + CTA */}
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:pb-14">
          {/* Solutions */}
          <div>
            <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-white uppercase">
              Solutions
            </h3>
            <ul className="mt-5 space-y-3">
              {SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-body text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    <span
                      className="text-primary-red transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore SBA */}
          <div>
            <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-white uppercase">
              Explore SBA
            </h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/55 transition-colors duration-200 hover:text-primary-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA block */}
          <div className="border-t border-white/10 pt-8 sm:col-span-2 sm:border-t-0 sm:pt-0 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
              Have a challenge to solve?
            </h3>
            <p className="mt-2 font-body text-sm text-white/55">
              Let&apos;s explore what&apos;s possible together.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="group mt-6 inline-flex items-center gap-2 rounded-md bg-primary-red px-5 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.03] hover:brightness-110"
            >
              Talk to SBA
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* ROW 3 — Badges + social */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:justify-start"
            data-placeholder="footer-badges"
          >
            {BADGES.map((label) => (
              <div
                key={label}
                className="flex h-9 min-w-[72px] items-center justify-center rounded border border-dashed border-white/20 bg-white/5 px-3"
              >
                <span className="font-body text-[10px] tracking-wide text-white/40 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <ul className="flex items-center gap-3" aria-label="Social media">
            {SOCIAL.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/45 transition-colors duration-200 hover:border-primary-red/50 hover:text-primary-red"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ROW 4 — Copyright */}
        <div className="border-t border-white/10 py-8">
          <p className="text-center font-body text-[13px] text-white/40 sm:text-sm">
            © 1996 - 2026, SBA Info Solutions. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
