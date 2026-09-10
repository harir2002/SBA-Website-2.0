/**
 * ContactEnquiryForm — single-step enquiry: Name, Email, Phone, Message.
 */

import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PHONE_CODES } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

const INITIAL = {
  name: '',
  email: '',
  phoneCode: '+91',
  phone: '',
  message: '',
  website: '',
}

const lineClass =
  'w-full appearance-none border-0 border-b border-white/35 bg-transparent px-0.5 py-2.5 font-body text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/35 focus:border-transparent focus:shadow-[0_2px_0_0_#E7000B,0_6px_16px_-4px_rgba(231,0,11,0.45)]'

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-body text-sm text-white/80">
        {label}
        {required ? <span className="text-primary-red"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 font-body text-xs text-primary-red" role="alert">
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
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function ContactEnquiryForm() {
  const reduceMotion = useReducedMotion()
  const formId = useId()
  const messageRef = useRef(null)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const resizeMessage = (el) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const update = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'message') resizeMessage(event.target)
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const submit = async (event) => {
    event.preventDefault()
    if (form.website) return

    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('submitting')

    try {
      await new Promise((r) => setTimeout(r, 600))
      setStatus('sent')
    } catch {
      setStatus('idle')
      setErrors({ form: 'Something went wrong. Please try again.' })
    }
  }

  if (status === 'sent') {
    return (
      <section
        id="enquiry"
        className="relative scroll-mt-[100px] bg-black"
        aria-labelledby="contact-success-heading"
      >
        <div className="mx-auto max-w-[820px] px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-10">
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            Enquiries
          </p>
          <h2
            id="contact-success-heading"
            className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Thank you — we have received your enquiry.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Our team will review your message and get back to you shortly. Prefer
            email? Reach us at{' '}
            <a
              href="mailto:hr@sbainfo.in"
              className="font-semibold text-primary-red underline-offset-2 hover:underline"
            >
              hr@sbainfo.in
            </a>
            .
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/solutions"
              className="inline-flex rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase hover:brightness-110"
            >
              Explore our Solutions
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex rounded-md border border-white/25 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase hover:border-primary-red hover:text-primary-red"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="enquiry"
      className="relative scroll-mt-[100px] bg-black"
      aria-labelledby="enquiry-heading"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            Enquiry
          </p>
          <h2
            id="enquiry-heading"
            className="mt-3 max-w-[16ch] font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Tell us what you are working toward.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Share a few details and your message. A member of the SBA team will
            review your enquiry and connect you with the right specialist.
          </p>
        </motion.div>

        <motion.div
          className="border border-white/15 bg-black p-5 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <form onSubmit={submit} noValidate className="space-y-5">
            <Field id={`${formId}-name`} label="Name" required error={errors.name}>
              <input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={update}
                className={`${lineClass} ${errors.name ? 'border-primary-red' : ''}`}
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id={`${formId}-email`} label="Email" required error={errors.email}>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update}
                  className={`${lineClass} ${errors.email ? 'border-primary-red' : ''}`}
                />
              </Field>

              <Field id={`${formId}-phone`} label="Phone Number" required error={errors.phone}>
                <div className="flex items-end gap-3">
                  <select
                    name="phoneCode"
                    aria-label="Country code"
                    value={form.phoneCode}
                    onChange={update}
                    className="w-[4.75rem] shrink-0 border-0 border-b border-white/35 bg-transparent py-2.5 font-body text-sm text-white outline-none focus:border-primary-red"
                  >
                    {PHONE_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="text-black">
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={update}
                    className={`min-w-0 flex-1 ${lineClass} ${errors.phone ? 'border-primary-red' : ''}`}
                  />
                </div>
              </Field>
            </div>

            <Field id={`${formId}-message`} label="Message" required error={errors.message}>
              <textarea
                ref={messageRef}
                id={`${formId}-message`}
                name="message"
                rows={1}
                value={form.message}
                onChange={update}
                onInput={(event) => resizeMessage(event.target)}
                className={`${lineClass} block min-h-[2.75rem] resize-none overflow-hidden leading-relaxed ${errors.message ? 'border-primary-red' : ''}`}
              />
            </Field>

            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={`${formId}-website`}>Website</label>
              <input
                id={`${formId}-website`}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={update}
              />
            </div>

            {errors.form ? (
              <p className="font-body text-sm text-primary-red" role="alert">
                {errors.form}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-primary-red px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 disabled:opacity-60 sm:w-auto"
            >
              {status === 'submitting' ? 'Sending…' : "Let's Connect"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
