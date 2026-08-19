/**
 * ContactSection — Let's Connect form (client validation + demo success state).
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const INTEREST_OPTIONS = [
  'Modernize the Core',
  'Protect and Recover',
  'Make Data Actionable',
  'Build and Connect',
  'Engineered for Your Industry',
  'Accelerate Business AI',
  'General Inquiry',
]

const INITIAL = {
  name: '',
  email: '',
  company: '',
  phone: '',
  interest: '',
  message: '',
  consent: false,
}

const inputBase =
  'w-full rounded-lg border bg-[#16181f] px-3.5 py-3 font-body text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/35 focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(231,0,11,0.18)]'

function FieldShell({ label, htmlFor, required, error, children, delay, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      <label htmlFor={htmlFor} className="mb-2 block font-body text-sm text-white/85">
        {label}
        {required ? <span className="text-primary-red"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 font-body text-xs text-primary-red" role="alert">
          {error}
        </p>
      ) : null}
    </motion.div>
  )
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Work email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.company.trim()) errors.company = 'Company is required.'
  if (!form.interest) errors.interest = 'Select an area of interest.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  if (!form.consent) errors.consent = 'Please agree to the policies to continue.'
  return errors
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    // Demo only — no backend wiring yet
    setStatus('sent')
  }

  const borderFor = (key) =>
    errors[key] ? 'border-primary-red' : 'border-white/10'

  return (
    <section
      id="contact"
      className="relative scroll-mt-[72px] overflow-hidden border-t border-white/10 bg-black"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[700px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
        <motion.div
          className="text-center sm:text-left"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Let&apos;s Connect
          </h2>
          <p className="mt-3 font-body text-sm text-white/55 sm:text-base">
            Tell us how we can help your business
          </p>
        </motion.div>

        {status === 'sent' ? (
          <motion.div
            className="mt-10 rounded-2xl border border-white/[0.06] px-6 py-10 text-center"
            style={{
              background: 'linear-gradient(145deg, #0d0f14 0%, #16181f 100%)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="status"
          >
            <p className="font-heading text-lg font-bold text-white">
              Thank you! We&apos;ll be in touch.
            </p>
            <p className="mt-2 font-body text-sm text-white/55">
              Your message has been captured for this preview.
            </p>
            <button
              type="button"
              className="mt-6 font-heading text-xs font-bold tracking-wide text-primary-red uppercase hover:underline"
              onClick={() => {
                setStatus('idle')
                setForm(INITIAL)
                setErrors({})
              }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form className="mt-10 space-y-5" onSubmit={handleSubmit} noValidate>
            <FieldShell
              label="Name"
              htmlFor="name"
              required
              error={errors.name}
              delay={0.05}
              reduceMotion={reduceMotion}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('name')}`}
              />
            </FieldShell>

            <FieldShell
              label="Work Email"
              htmlFor="email"
              required
              error={errors.email}
              delay={0.1}
              reduceMotion={reduceMotion}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('email')}`}
              />
            </FieldShell>

            <FieldShell
              label="Company"
              htmlFor="company"
              required
              error={errors.company}
              delay={0.15}
              reduceMotion={reduceMotion}
            >
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('company')}`}
              />
            </FieldShell>

            <FieldShell
              label="Phone Number"
              htmlFor="phone"
              error={errors.phone}
              delay={0.2}
              reduceMotion={reduceMotion}
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('phone')}`}
                placeholder="Optional"
              />
            </FieldShell>

            <FieldShell
              label="Area of Interest"
              htmlFor="interest"
              required
              error={errors.interest}
              delay={0.25}
              reduceMotion={reduceMotion}
            >
              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('interest')} appearance-none`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FieldShell>

            <FieldShell
              label="Message"
              htmlFor="message"
              required
              error={errors.message}
              delay={0.3}
              reduceMotion={reduceMotion}
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} ${borderFor('message')} resize-y`}
              />
            </FieldShell>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#E7000B]"
                />
                <span className="font-body text-sm leading-relaxed text-white/65">
                  I agree to the{' '}
                  <a
                    href="/privacy"
                    className="text-primary-red underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/cookies"
                    className="text-primary-red underline-offset-2 hover:underline"
                  >
                    Cookie Policy
                  </a>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p className="mt-1.5 font-body text-xs text-primary-red" role="alert">
                  {errors.consent}
                </p>
              ) : null}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
            >
              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary-red px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Submit
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </motion.div>
          </form>
        )}
      </div>
    </section>
  )
}
