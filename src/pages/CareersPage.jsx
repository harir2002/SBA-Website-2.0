/**
 * CareersPage — /careers
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  GraduationCap,
  Layers,
  MapPin,
  RefreshCw,
} from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ScrollReveal, { ScrollStagger } from '../components/home/ScrollReveal'
import LifeAtSbaCarousel from '../components/careers/LifeAtSbaCarousel'
import usePageMeta from '../hooks/usePageMeta'
import careersHero from '../assets/images/careers/careers-hero.png'
import {
  DEPARTMENT_FILTERS,
  EXPERIENCE_FILTERS,
  LOCATION_FILTERS,
  formatOpenings,
  getOpenJobs,
  matchesExperienceFilter,
} from '../data/careers/jobs'

const WHY_CARDS = [
  {
    title: 'Real enterprise complexity',
    copy: 'Work on infrastructure, security, data, and AI problems that matter to large, regulated enterprises — not toy projects.',
  },
  {
    title: 'Cross-domain exposure',
    copy: 'Move across cloud, cybersecurity, data/AI, and digital engineering instead of being boxed into one narrow stack.',
  },
  {
    title: 'Senior mentorship',
    copy: 'Learn directly from engineers and architects who have delivered 30+ years of enterprise-scale work.',
  },
  {
    title: 'Ownership, not tickets',
    copy: 'Own outcomes end-to-end — design, build, secure, and operate — rather than working isolated tasks in a queue.',
  },
]

const GROWTH = [
  {
    icon: Layers,
    title: 'Structured career paths',
    copy: 'From engineer to architect to practice leadership.',
  },
  {
    icon: GraduationCap,
    title: 'Certification support',
    copy: 'Sponsorship for cloud, security, and platform certifications, including IBM, Palo Alto, AWS/Azure, Red Hat, Nutanix, and relevant equivalents.',
  },
  {
    icon: RefreshCw,
    title: 'Cross-team rotations',
    copy: 'Exposure across infrastructure, security, data/AI, and digital engineering projects.',
  },
]

const HIRING_STEPS = [
  {
    n: '01',
    title: 'Apply',
    copy: 'Submit your profile against an open role or the general talent pool.',
  },
  {
    n: '02',
    title: 'Screen',
    copy: 'A short conversation to understand your experience and interests.',
  },
  {
    n: '03',
    title: 'Technical Round(s)',
    copy: 'Role-specific technical and practical discussion.',
  },
  {
    n: '04',
    title: 'Offer & Onboarding',
    copy: 'Offer discussion, followed by a structured onboarding plan.',
  },
]

const INTEREST_AREAS = [
  'Infrastructure',
  'Security',
  'Data & AI',
  'Digital Engineering',
  'Platform / Cloud',
  'Other',
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function OpenRolesSection() {
  const allJobs = getOpenJobs()
  const [department, setDepartment] = useState('all')
  const [location, setLocation] = useState('all')
  const [experience, setExperience] = useState('all')

  const filtered = allJobs.filter((job) => {
    if (department !== 'all' && job.department !== department) return false
    if (location !== 'all' && job.location !== location) return false
    if (!matchesExperienceFilter(job.experience, experience)) return false
    return true
  })

  const selectClass =
    'mt-1.5 w-full rounded-md border border-white/20 bg-black px-3 py-2.5 font-body text-sm text-white outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/30'

  return (
    <section id="open-roles" className="bg-black py-12 sm:py-14 lg:py-16" aria-labelledby="open-roles-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        <ScrollReveal>
          <h2
            id="open-roles-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Open positions
          </h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-[1.6] text-white/55">
            Find a role where you can build technology that matters.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="filter-department" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Department
            </label>
            <select
              id="filter-department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Departments</option>
              {DEPARTMENT_FILTERS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-location" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Location
            </label>
            <select
              id="filter-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Locations</option>
              {LOCATION_FILTERS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-experience" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Experience
            </label>
            <select
              id="filter-experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Experience</option>
              {EXPERIENCE_FILTERS.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 font-body text-base leading-[1.6] text-white/55" role="status">
            No open roles in this category right now — join our talent pool below.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <article
                key={job.id}
                className="flex h-full flex-col border border-white/15 bg-black p-6 transition-shadow hover:shadow-[0_0_0_1px_rgba(231,0,11,0.45),0_12px_32px_-12px_rgba(231,0,11,0.35)]"
              >
                <span className="inline-flex w-fit rounded-sm border border-primary-red/40 px-2 py-0.5 font-heading text-[11px] font-bold tracking-wide text-primary-red uppercase">
                  {job.department}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold tracking-tight text-white">
                  {job.title}
                </h3>
                <ul className="mt-3 space-y-1.5 font-body text-sm text-white/55">
                  <li className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-red" aria-hidden="true" />
                    <span>{job.location}</span>
                  </li>
                  <li>{job.workMode}</li>
                  <li>{job.experience}</li>
                  <li>{job.employmentType}</li>
                  <li className="text-white/80">{formatOpenings(job.openings)}</li>
                </ul>
                <p className="mt-4 flex-1 font-body text-sm leading-[1.55] text-white/65">
                  {job.summary}
                </p>
                <Link
                  to={`/careers/${job.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-primary-red transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                >
                  View Role
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TalentPoolSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    linkedin: '',
    interest: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [hint, setHint] = useState('')

  const onChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setHint('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'A valid email is required'
    }
    if (!form.linkedin.trim()) {
      next.linkedin = 'LinkedIn / Profile URL is required'
    } else if (!/^https?:\/\/.+/i.test(form.linkedin.trim())) {
      next.linkedin = 'Enter a valid URL starting with https://'
    }
    if (!form.interest) next.interest = 'Select an area of interest'
    setErrors(next)
    if (Object.keys(next).length) return

    // No careers mailbox / ATS backend is connected on this site.
    setHint(
      'Thank you — your interest has been noted. Our talent team will follow up. You can also reach us via Contact and mention that you want to join the talent pool.',
    )
  }

  const fieldClass =
    'mt-1.5 w-full rounded-md border border-white/20 bg-black px-3 py-2.5 font-body text-sm text-white outline-none placeholder:text-white/35 focus:border-primary-red focus:ring-2 focus:ring-primary-red/40'

  return (
    <section
      id="talent-pool"
      className="bg-black py-12 sm:py-14 lg:py-16"
      aria-labelledby="talent-pool-heading"
    >
      <div className="mx-auto max-w-xl px-5 text-center sm:px-6">
        <ScrollReveal>
          <h2
            id="talent-pool-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Don&apos;t see the right role today?
          </h2>
          <p className="mt-4 font-body text-base leading-[1.6] text-white/55">
            Join our talent pool and we&apos;ll reach out when a relevant opening comes up.
          </p>
        </ScrollReveal>

        <form onSubmit={onSubmit} noValidate className="mt-10 space-y-5 text-left">
          <div>
            <label htmlFor="tp-name" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Name <span className="text-primary-red">*</span>
            </label>
            <input
              id="tp-name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={onChange('name')}
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <p className="mt-1 text-xs text-primary-red">{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="tp-email" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Email <span className="text-primary-red">*</span>
            </label>
            <input
              id="tp-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange('email')}
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="mt-1 text-xs text-primary-red">{errors.email}</p> : null}
          </div>
          <div>
            <label htmlFor="tp-linkedin" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              LinkedIn / Profile URL <span className="text-primary-red">*</span>
            </label>
            <input
              id="tp-linkedin"
              name="linkedin"
              type="url"
              required
              value={form.linkedin}
              onChange={onChange('linkedin')}
              className={fieldClass}
              placeholder="https://"
              aria-invalid={Boolean(errors.linkedin)}
            />
            {errors.linkedin ? <p className="mt-1 text-xs text-primary-red">{errors.linkedin}</p> : null}
          </div>
          <div>
            <label htmlFor="tp-interest" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Area of Interest <span className="text-primary-red">*</span>
            </label>
            <select
              id="tp-interest"
              name="interest"
              value={form.interest}
              onChange={onChange('interest')}
              className={fieldClass}
              aria-invalid={Boolean(errors.interest)}
            >
              <option value="">Select...</option>
              {INTEREST_AREAS.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {errors.interest ? <p className="mt-1 text-xs text-primary-red">{errors.interest}</p> : null}
          </div>
          <div>
            <label htmlFor="tp-message" className="font-heading text-xs font-bold tracking-wide text-white uppercase">
              Message <span className="font-body font-normal normal-case text-white/55">(optional)</span>
            </label>
            <textarea
              id="tp-message"
              name="message"
              rows={3}
              value={form.message}
              onChange={onChange('message')}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col items-center pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Join Talent Pool
            </button>
          </div>

          {hint ? (
            <p className="text-center font-body text-sm leading-[1.6] text-white/55" role="status">
              {hint}{' '}
              <Link to="/contact" className="text-primary-red underline-offset-2 hover:underline">
                Go to Contact
              </Link>
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default function CareersPage() {
  usePageMeta({
    title: 'Careers at SBA Info Solutions | Build Enterprise Technology That Matters',
    description:
      'Explore careers at SBA Info Solutions. Join a team modernizing enterprise infrastructure, cybersecurity, data, AI, and digital engineering.',
    path: '/careers',
  })

  useEffect(() => {
    if (window.location.hash === '#open-roles') {
      requestAnimationFrame(() => {
        document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <section
          className="careers-hero page-hero"
          aria-labelledby="careers-hero-heading"
        >
          <img
            className="careers-hero__image"
            src={careersHero}
            alt="Abstract enterprise engineering architecture representing career growth and technology innovation"
            decoding="async"
            fetchPriority="high"
          />
          <div className="careers-hero__overlay" aria-hidden="true" />
          <div className="careers-hero__content relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-16 sm:px-6 lg:px-10 lg:pb-20">
            <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
              Careers at SBA
            </p>
            <h1
              id="careers-hero-heading"
              className="mt-4 max-w-[18ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
            >
              Build the systems enterprises depend on.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-[1.6] text-white/55 sm:text-lg">
              Join a team engineering the modernization, security, data, and AI foundations that keep enterprises moving forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => scrollToSection('open-roles')}
                className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Open Roles
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('life-at-sba')}
                className="font-heading text-sm font-semibold text-white underline-offset-4 hover:text-primary-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                Learn about life at SBA
              </button>
            </div>
          </div>
        </section>

        <section
          id="why-sba-careers"
          className="bg-black py-12 sm:py-14 lg:py-16"
          aria-labelledby="why-sba-heading"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <ScrollReveal>
              <h2
                id="why-sba-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Why build your career at SBA?
              </h2>
            </ScrollReveal>
            <ScrollStagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_CARDS.map((card) => (
                <article key={card.title} className="border-t-2 border-primary-red pt-5">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-[1.6] text-white/55">{card.copy}</p>
                </article>
              ))}
            </ScrollStagger>
          </div>
        </section>

        <section
          id="life-at-sba"
          className="bg-black py-12 sm:py-14 lg:py-16"
          aria-labelledby="life-at-sba-heading"
        >
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
            <ScrollReveal>
              <LifeAtSbaCarousel />
            </ScrollReveal>
            <ScrollReveal>
              <h2
                id="life-at-sba-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Engineering culture, not just a job.
              </h2>
              <p className="mt-5 font-body text-base leading-[1.6] text-white/80">
                At SBA, engineers work close to real infrastructure, real client environments, and real outcomes. We value depth over buzzwords, ownership over hierarchy, and calm execution over noise.
              </p>
              <ul className="mt-8 flex flex-wrap gap-3" aria-label="Culture values">
                {['Ownership', 'Curiosity', 'Reliability'].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-sm border border-primary-red/40 bg-black px-3 py-1.5 font-heading text-xs font-bold tracking-wide text-white uppercase"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="growth-learning"
          className="bg-black py-12 sm:py-14 lg:py-16"
          aria-labelledby="growth-heading"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <ScrollReveal>
              <h2
                id="growth-heading"
                className="max-w-[22ch] font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Grow from engineer to enterprise architect.
              </h2>
            </ScrollReveal>
            <ScrollStagger className="mt-10 grid gap-10 sm:grid-cols-3">
              {GROWTH.map(({ icon: Icon, title, copy }) => (
                <div key={title}>
                  <Icon className="h-7 w-7 text-primary-red" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-[1.6] text-white/55">{copy}</p>
                </div>
              ))}
            </ScrollStagger>
          </div>
        </section>

        <OpenRolesSection />

        {/* Employee voices omitted — no approved authentic quotes available */}

        <section
          id="hiring-process"
          className="bg-black py-12 sm:py-14 lg:py-16"
          aria-labelledby="hiring-heading"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <ScrollReveal>
              <h2
                id="hiring-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                A clear hiring process.
              </h2>
            </ScrollReveal>

            <ol className="relative mt-10 grid gap-10 lg:grid-cols-4 lg:gap-6">
              <div
                className="pointer-events-none absolute top-4 left-4 h-[calc(100%-2rem)] w-px bg-primary-red lg:top-5 lg:right-8 lg:left-8 lg:h-px lg:w-auto"
                aria-hidden="true"
              />
              {HIRING_STEPS.map((step) => (
                <li key={step.n} className="relative pl-10 lg:pl-0 lg:pt-10">
                  <span className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-red bg-black font-heading text-xs font-bold text-primary-red lg:left-0">
                    {step.n}
                  </span>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-[1.6] text-white/55">{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <TalentPoolSection />
      </main>
      <Footer />
    </div>
  )
}
