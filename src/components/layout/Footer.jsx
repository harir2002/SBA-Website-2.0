/**
 * Site footer — link columns, contact form, badges/social, copyright.
 * Same footer on Home, About, Contact, and Industry pages.
 */

import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import ContactSection from '../home/ContactSection'

const EASE = [0.16, 1, 0.3, 1]

const SOLUTIONS = [
  { label: 'Modernize the Core', to: '/#modernize-the-core' },
  { label: 'Protect & Recover', to: '/#protect-and-recover' },
  { label: 'Make Data Actionable', to: '/#make-data-actionable' },
  { label: 'Build & Connect', to: '/#build-and-connect' },
  { label: 'Operate with Assurance', to: '/#engineered-for-your-industry' },
  { label: 'Accelerate Business AI', to: '/#accelerate-business-ai' },
]

const EXPLORE = [
  { label: 'Industries', to: '/industries' },
  { label: 'Our Solutions', to: '/#capabilities' },
  { label: 'About SBA', to: '/about' },
  { label: 'Careers', to: '/#careers' },
  { label: 'Contact Us', to: '/contact' },
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

function FooterNavLink({ to, children }) {
  const isHashOnHome = to.startsWith('/#')
  if (isHashOnHome) {
    return (
      <a
        href={to}
        className="font-body text-sm text-white/55 transition-colors duration-200 hover:text-primary-red"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      to={to}
      className="font-body text-sm text-white/55 transition-colors duration-200 hover:text-primary-red"
    >
      {children}
    </Link>
  )
}

export default function Footer({ hideContactForm = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="bg-black">
      <motion.div
        className="mx-auto max-w-[1280px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Left: Solutions + Explore SBA | Right: contact form (or large address on Contact page) */}
        <div
          className={`grid grid-cols-1 items-start gap-12 pb-14 ${
            hideContactForm
              ? 'lg:grid-cols-3 lg:gap-10 xl:gap-14'
              : 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16'
          }`}
        >
          {hideContactForm ? (
            <>
              <div>
                <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                  Solutions
                </h3>
                <ul className="mt-5 space-y-3">
                  {SOLUTIONS.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                  Explore SBA
                </h3>
                <ul className="mt-5 space-y-3">
                  {EXPLORE.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                  Chennai Office
                </h3>
                <p className="mt-5 font-heading text-lg font-bold text-white sm:text-xl">
                  SBA Info Solutions
                </p>
                <address className="mt-3 font-body text-sm font-medium leading-relaxed text-white/65 not-italic sm:text-base">
                  SBA House #19, (Old No. 17), 46th Street
                  <br />
                  Manthope Colony, Ashok Nagar
                  <br />
                  Chennai, Tamil Nadu 600083
                  <br />
                  India
                </address>
                <a
                  href="https://maps.app.goo.gl/7CezVRheio8reNnPA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase no-underline transition-colors hover:text-white"
                  aria-label="Get directions to SBA Info Solutions Chennai Office on Google Maps"
                >
                  Get Directions
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:max-w-3xl">
                <div>
                  <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                    Solutions
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {SOLUTIONS.map((link) => (
                      <li key={link.label}>
                        <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="font-heading text-xs font-bold tracking-[0.18em] text-primary-red uppercase">
                      Chennai Office
                    </p>
                    <p className="mt-2.5 font-heading text-base font-bold text-white">
                      SBA Info Solutions
                    </p>
                    <address className="mt-2.5 font-body text-sm font-medium leading-relaxed text-white/65 not-italic sm:text-[15px]">
                      SBA House #19, (Old No. 17), 46th Street
                      <br />
                      Manthope Colony, Ashok Nagar
                      <br />
                      Chennai, Tamil Nadu 600083
                      <br />
                      India
                    </address>
                    <a
                      href="https://maps.app.goo.gl/7CezVRheio8reNnPA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase no-underline transition-colors hover:text-white"
                      aria-label="Get directions to SBA Info Solutions Chennai Office on Google Maps"
                    >
                      Get Directions
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                    Explore SBA
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {EXPLORE.map((link) => (
                      <li key={link.label}>
                        <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <ContactSection variant="footer" />
              </div>
            </>
          )}
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
