/**
 * Site footer — link columns, contact form, badges/social, copyright.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import ContactSection from '../home/ContactSection'

const EASE = [0.16, 1, 0.3, 1]

const SOLUTIONS = [
  { label: 'Modernize the Core', href: '#capabilities' },
  { label: 'Protect & Recover', href: '#capabilities' },
  { label: 'Make Data Actionable', href: '#capabilities' },
  { label: 'Build & Connect', href: '#capabilities' },
  { label: 'Operate with Assurance', href: '#engineered-for-your-industry' },
  { label: 'Accelerate Business AI', href: '#capabilities' },
]

const EXPLORE = [
  { label: 'Industries', href: '#capabilities' },
  { label: 'Our Solutions', href: '#capabilities' },
  { label: 'About SBA', href: '/about' },
  { label: 'Careers', href: '#careers' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/sba-info-solutions',
    Icon: Linkedin,
  },
]

const certificationBadges = [
  { name: 'ISO 9001:2015', sub: 'Quality Management', src: '/badges/iso-9001.jpg' },
  { name: 'ISO/IEC 27001:2022', sub: 'Information Security', src: '/badges/iso-27001.png' },
  { name: 'ISO/IEC 20000-1:2018', sub: 'IT Service Management', src: '/badges/iso-20000.jpg' },
  { name: 'Gartner', sub: 'Research & Advisory', src: '/badges/Gartner.png' },
  { name: 'Stanford Seed', sub: 'Innovation Partnership', src: '/badges/stanford-seed.png' },
]

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="bg-gradient-to-b from-black to-[#0a0a0a]">
      <motion.div
        className="mx-auto max-w-[1280px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Left: Solutions + Explore SBA | Right: contact form */}
        <div className="grid grid-cols-1 items-start gap-12 pb-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
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
          </div>

          <div className="min-w-0">
            <ContactSection variant="footer" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 py-8 sm:flex-row sm:items-center">
          <div className="cert-badge-row" aria-label="Certifications">
            {certificationBadges.map((badge) => (
              <div className="cert-badge-item" key={badge.name}>
                <img src={badge.src} alt={badge.name} className="cert-badge-img" />
                <span className="cert-badge-name">{badge.name}</span>
                <span className="cert-badge-sub">{badge.sub}</span>
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/45 transition-colors duration-200 hover:border-primary-red/50 hover:text-primary-red"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-8">
          <p className="text-center font-body text-[13px] text-white/40 sm:text-sm">
            © 1996 - 2026, SBA Info Solutions. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
