/**
 * ContactSection — Let's Connect form (client validation + demo success state).
 * Visual: line-only fields, two-column desktop grid. Logic unchanged.
 */

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const INTEREST_OPTIONS = [
  'Modernize the Core',
  'Protect and Recover',
  'Make Data Actionable',
  'Build and Connect',
  'Operate with Assurance',
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

function FormField({
  label,
  htmlFor,
  required,
  error,
  hasValue,
  className = '',
  children,
}) {
  return (
    <div
      className={`sba-form-field${hasValue ? ' is-filled' : ''}${error ? ' is-error' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      <label htmlFor={htmlFor} className="sba-form-label">
        {label}
        {required ? <span className="text-primary-red"> *</span> : null}
      </label>
      <div className="sba-form-control">{children}</div>
      {error ? (
        <p className="sba-form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
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

export default function ContactSection({ variant = 'page' }) {
  const reduceMotion = useReducedMotion()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent
  const messageRef = useRef(null)
  const isFooter = variant === 'footer'

  const resizeMessage = (el) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (name === 'message') {
      resizeMessage(event.target)
    }
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

  return (
    <section
      id="contact"
      className={`relative scroll-mt-[72px] overflow-hidden ${
        isFooter ? 'bg-transparent' : 'bg-black'
      }`}
      aria-labelledby="contact-heading"
    >
      <style>{`
        .sba-contact-block {
          width: 100%;
          max-width: 860px;
        }

        .sba-contact-block--footer {
          max-width: none;
          margin-left: 0;
          margin-right: 0;
        }

        .sba-contact-form {
          width: 100%;
        }

        .sba-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 36px;
          row-gap: 26px;
        }

        .sba-form-field--full {
          grid-column: 1 / -1;
        }

        .sba-form-field {
          min-width: 0;
        }

        .sba-form-label {
          display: block;
          margin-bottom: 6px;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
          transition: color 200ms ease;
        }

        .sba-form-field:focus-within .sba-form-label,
        .sba-form-field.is-filled .sba-form-label {
          color: #E7000B;
        }

        .sba-form-control {
          position: relative;
        }

        .sba-form-control input,
        .sba-form-control select,
        .sba-form-control textarea {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          box-sizing: border-box;
          padding: 10px 4px 12px;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.38);
          border-radius: 0;
          outline: none;
          background: transparent;
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.4;
          transition: border-color 200ms ease;
        }

        .sba-form-control input::placeholder,
        .sba-form-control textarea::placeholder {
          color: rgba(255, 255, 255, 0.55);
          opacity: 1;
        }

        .sba-form-control select {
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='rgba(255,255,255,0.55)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 2px center;
        }

        .sba-form-control select option {
          color: #111;
          background: #fff;
        }

        .sba-form-control textarea {
          min-height: 0;
          height: auto;
          overflow-y: hidden;
          resize: none;
          field-sizing: content;
        }

        /* Red focus line sits ON the field bottom border — not a separate layer below */
        .sba-form-control::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: #E7000B;
          box-shadow: 0 0 10px rgba(231, 0, 11, 0.45);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 240ms ease;
          pointer-events: none;
        }

        .sba-form-field:focus-within .sba-form-control::after {
          transform: scaleX(1);
        }

        .sba-form-field:focus-within .sba-form-control input,
        .sba-form-field:focus-within .sba-form-control select,
        .sba-form-field:focus-within .sba-form-control textarea {
          border-bottom-color: transparent;
        }

        .sba-form-field.is-error .sba-form-control input,
        .sba-form-field.is-error .sba-form-control select,
        .sba-form-field.is-error .sba-form-control textarea {
          border-bottom-color: #E7000B;
        }

        .sba-form-error {
          margin-top: 8px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #E7000B;
        }

        .sba-form-consent {
          margin-top: 28px;
        }

        .sba-form-actions {
          margin-top: 22px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sba-form-control::after {
            transition: none;
          }
          .sba-form-label {
            transition: none;
          }
        }

        @media (max-width: 768px) {
          .sba-form-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }
        }
      `}</style>

      <div
        className={
          isFooter
            ? 'sba-contact-block sba-contact-block--footer w-full px-0 py-0'
            : 'sba-contact-block mx-auto px-5 py-20 sm:px-6 sm:py-24'
        }
      >
        <motion.div
          className="text-left"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2
            id="contact-heading"
            className={`font-heading font-extrabold text-white ${
              isFooter ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            Let&apos;s Connect
          </h2>
          <p
            className={`mt-2 font-body text-white/55 ${
              isFooter ? 'text-sm' : 'mt-3 text-sm sm:text-base'
            }`}
          >
            Tell us how we can help your business
          </p>
        </motion.div>

        {status === 'sent' ? (
          <motion.div
            className={`px-0 py-10 text-center ${isFooter ? 'mt-6' : 'mt-10'}`}
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
          <motion.form
            className={`sba-contact-form ${isFooter ? 'mt-6' : 'mt-10'}`}
            onSubmit={handleSubmit}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          >
            <div className="sba-form-grid">
              <FormField
                label="Name"
                htmlFor="name"
                required
                error={errors.name}
                hasValue={Boolean(form.name.trim())}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                label="Work Email"
                htmlFor="email"
                required
                error={errors.email}
                hasValue={Boolean(form.email.trim())}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                label="Phone Number"
                htmlFor="phone"
                error={errors.phone}
                hasValue={Boolean(form.phone.trim())}
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </FormField>

              <FormField
                label="Company"
                htmlFor="company"
                required
                error={errors.company}
                hasValue={Boolean(form.company.trim())}
              >
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                label="Area of Interest"
                htmlFor="interest"
                required
                error={errors.interest}
                hasValue={Boolean(form.interest)}
                className="sba-form-field--full"
              >
                <select
                  id="interest"
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
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
              </FormField>

              <FormField
                label="Message"
                htmlFor="message"
                required
                error={errors.message}
                hasValue={Boolean(form.message.trim())}
                className="sba-form-field--full"
              >
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  rows={1}
                  value={form.message}
                  onChange={handleChange}
                />
              </FormField>
            </div>

            <div className="sba-form-consent">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#E7000B]"
                />
                <span className="font-body text-sm leading-relaxed text-white/65">
                  I agree to the Privacy Policy and Cookie Policy.
                </span>
              </label>
              {errors.consent ? (
                <p className="sba-form-error" role="alert">
                  {errors.consent}
                </p>
              ) : null}
            </div>

            <div className="sba-form-actions">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary-red px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Let's Connect
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
