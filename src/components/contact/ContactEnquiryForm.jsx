/**
 * ContactEnquiryForm — two-step progressive enquiry with SBA line-only inputs.
 */

import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ALLOWED_UPLOAD_EXT,
  ALLOWED_UPLOAD_TYPES,
  CONTACT_METHODS,
  COUNTRY_OPTIONS,
  DISCUSSION_OPTIONS,
  MAX_UPLOAD_MB,
  NEED_OPTIONS,
  PHONE_CODES,
  SCOPE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCode: '+91',
  phone: '',
  company: '',
  jobTitle: '',
  country: '',
  discussion: '',
  need: '',
  requirement: '',
  timeline: '',
  scope: '',
  contactMethod: 'Email',
  consent: false,
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

function validateStep1(form) {
  const errors = {}
  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'
  if (!form.email.trim()) {
    errors.email = 'Work email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid work email.'
  }
  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  if (!form.company.trim()) errors.company = 'Company name is required.'
  if (!form.jobTitle.trim()) errors.jobTitle = 'Job title is required.'
  if (!form.country) errors.country = 'Select a country / region.'
  return errors
}

function validateStep2(form, fileError) {
  const errors = {}
  if (!form.discussion) errors.discussion = 'Select what you would like to discuss.'
  if (!form.need) errors.need = 'Select the option that best describes your need.'
  if (!form.requirement.trim()) {
    errors.requirement = 'Please briefly describe your requirement.'
  }
  if (!form.consent) {
    errors.consent = 'Please agree to the privacy notice to continue.'
  }
  if (fileError) errors.file = fileError
  return errors
}

function validateFile(file) {
  if (!file) return ''
  const ext = `.${file.name.split('.').pop()?.toLowerCase()}`
  const typeOk =
    ALLOWED_UPLOAD_TYPES.includes(file.type) || ALLOWED_UPLOAD_EXT.includes(ext)
  if (!typeOk) {
    return 'Allowed formats: PDF, DOCX, PPTX, XLSX, PNG, JPG.'
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    return `File must be under ${MAX_UPLOAD_MB} MB.`
  }
  return ''
}

export default function ContactEnquiryForm({ preselectedCategory = '' }) {
  const reduceMotion = useReducedMotion()
  const formId = useId()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!preselectedCategory) return
    setForm((prev) => ({ ...prev, discussion: preselectedCategory }))
    setStep(1)
    setStatus('idle')
  }, [preselectedCategory])

  const update = (event) => {
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

  const onFileChange = (event) => {
    const next = event.target.files?.[0] || null
    const err = validateFile(next)
    setFileError(err)
    setFile(err ? null : next)
    if (errors.file) {
      setErrors((prev) => {
        const n = { ...prev }
        delete n.file
        return n
      })
    }
  }

  const goStep2 = (event) => {
    event.preventDefault()
    const next = validateStep1(form)
    setErrors(next)
    if (Object.keys(next).length) return
    setStep(2)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (form.website) return

    const next = validateStep2(form, fileError)
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('submitting')

    const payload = {
      ...form,
      phoneFull: `${form.phoneCode} ${form.phone}`.trim(),
      fileName: file?.name || null,
      fileSize: file?.size || null,
      source: 'contact-page',
      submittedAt: new Date().toISOString(),
    }

    try {
      console.info('[SBA Contact enquiry]', payload)
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
        className="relative scroll-mt-[100px] bg-[#060606]"
        aria-labelledby="contact-success-heading"
      >
        <div className="mx-auto max-w-[820px] px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-10">
          <p className="font-heading text-xs font-bold tracking-[0.24em] text-primary-red uppercase">
            Conversation Started
          </p>
          <h2
            id="contact-success-heading"
            className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Thank you. Your conversation with SBA has started.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-sm leading-relaxed text-white/55 sm:text-base">
            Our team will review your requirement and connect you with the
            appropriate specialist. In the meantime, you can explore SBA&apos;s
            capabilities and the ways we help enterprises modernise, protect,
            operate, and accelerate.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/#capabilities"
              className="inline-flex rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase hover:brightness-110"
            >
              Explore Capabilities
            </Link>
            <Link
              to="/#insights"
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
      className="relative scroll-mt-[100px] bg-[#060606]"
      aria-labelledby="enquiry-heading"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
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
            Tell us where you need to move forward. We will help engineer the
            right next step.
          </p>
          <p className="mt-5 font-body text-sm leading-relaxed text-white/45">
            Share a little context. A member of the SBA team will review your
            enquiry and connect you with the right specialist.
          </p>
        </motion.div>

        <motion.div
          className="border border-white/15 bg-black p-5 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <div className="mb-8" aria-label={`Step ${step} of 2`}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-xs font-bold tracking-[0.16em] text-white/70 uppercase">
                Step {step}: {step === 1 ? 'Your Details' : 'Your Requirement'}
              </p>
              <p className="font-body text-xs text-white/40">{step} / 2</p>
            </div>
            <div className="mt-3 flex gap-2">
              <span className={`h-1 flex-1 ${step >= 1 ? 'bg-primary-red' : 'bg-white/15'}`} />
              <span className={`h-1 flex-1 ${step >= 2 ? 'bg-primary-red' : 'bg-white/15'}`} />
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={goStep2} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-first`} label="First Name" required error={errors.firstName}>
                  <input
                    id={`${formId}-first`}
                    name="firstName"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={update}
                    className={`${lineClass} ${errors.firstName ? 'border-primary-red' : ''}`}
                  />
                </Field>
                <Field id={`${formId}-last`} label="Last Name" required error={errors.lastName}>
                  <input
                    id={`${formId}-last`}
                    name="lastName"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={update}
                    className={`${lineClass} ${errors.lastName ? 'border-primary-red' : ''}`}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-email`} label="Work Email" required error={errors.email}>
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

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-company`} label="Company Name" required error={errors.company}>
                  <input
                    id={`${formId}-company`}
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={update}
                    className={`${lineClass} ${errors.company ? 'border-primary-red' : ''}`}
                  />
                </Field>
                <Field id={`${formId}-title`} label="Job Title" required error={errors.jobTitle}>
                  <input
                    id={`${formId}-title`}
                    name="jobTitle"
                    autoComplete="organization-title"
                    value={form.jobTitle}
                    onChange={update}
                    className={`${lineClass} ${errors.jobTitle ? 'border-primary-red' : ''}`}
                  />
                </Field>
              </div>

              <Field id={`${formId}-country`} label="Country / Region" required error={errors.country}>
                <select
                  id={`${formId}-country`}
                  name="country"
                  value={form.country}
                  onChange={update}
                  className={`${lineClass} ${errors.country ? 'border-primary-red' : ''}`}
                >
                  <option value="" className="text-black">
                    Select country / region
                  </option>
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c} value={c} className="text-black">
                      {c}
                    </option>
                  ))}
                </select>
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

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-primary-red px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 sm:w-auto"
              >
                Continue →
              </button>
            </form>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <Field
                id={`${formId}-discussion`}
                label="What would you like to discuss?"
                required
                error={errors.discussion}
              >
                <select
                  id={`${formId}-discussion`}
                  name="discussion"
                  value={form.discussion}
                  onChange={update}
                  className={`${lineClass} ${errors.discussion ? 'border-primary-red' : ''}`}
                >
                  <option value="" className="text-black">
                    Select a topic
                  </option>
                  {DISCUSSION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-black">
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>

              <fieldset>
                <legend className="mb-3 font-body text-sm text-white/80">
                  Which best describes your need? <span className="text-primary-red">*</span>
                </legend>
                <div className="space-y-2.5">
                  {NEED_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-start gap-3 border-b border-white/10 py-2.5"
                    >
                      <input
                        type="radio"
                        name="need"
                        value={opt}
                        checked={form.need === opt}
                        onChange={update}
                        className="mt-1 accent-[#E7000B]"
                      />
                      <span className="font-body text-sm text-white/80">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.need ? (
                  <p className="mt-1.5 font-body text-xs text-primary-red" role="alert">
                    {errors.need}
                  </p>
                ) : null}
              </fieldset>

              <Field
                id={`${formId}-requirement`}
                label="Briefly describe your requirement"
                required
                error={errors.requirement}
              >
                <textarea
                  id={`${formId}-requirement`}
                  name="requirement"
                  rows={3}
                  value={form.requirement}
                  onChange={update}
                  className={`${lineClass} resize-y ${errors.requirement ? 'border-primary-red' : ''}`}
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-timeline`} label="Expected timeline">
                  <select
                    id={`${formId}-timeline`}
                    name="timeline"
                    value={form.timeline}
                    onChange={update}
                    className={lineClass}
                  >
                    <option value="" className="text-black">
                      Select timeline (optional)
                    </option>
                    {TIMELINE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="text-black">
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id={`${formId}-scope`} label="Approximate project scope">
                  <select
                    id={`${formId}-scope`}
                    name="scope"
                    value={form.scope}
                    onChange={update}
                    className={lineClass}
                  >
                    <option value="" className="text-black">
                      Select scope (optional)
                    </option>
                    {SCOPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="text-black">
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                id={`${formId}-file`}
                label="Upload a brief, RFP, or architecture document"
                error={errors.file || fileError}
              >
                <input
                  id={`${formId}-file`}
                  name="file"
                  type="file"
                  accept={ALLOWED_UPLOAD_EXT.join(',')}
                  onChange={onFileChange}
                  className="w-full font-body text-sm text-white/70 file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:font-heading file:text-xs file:font-bold file:tracking-wide file:text-white file:uppercase"
                />
                <p className="mt-1.5 font-body text-xs text-white/40">
                  PDF, DOCX, PPTX, XLSX, PNG, JPG — max {MAX_UPLOAD_MB} MB.
                </p>
                {file && !fileError ? (
                  <p className="mt-1 font-body text-xs text-white/60">Selected: {file.name}</p>
                ) : null}
              </Field>

              <fieldset>
                <legend className="mb-3 font-body text-sm text-white/80">
                  Preferred contact method
                </legend>
                <div className="flex flex-wrap gap-4">
                  {CONTACT_METHODS.map((method) => (
                    <label key={method} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={form.contactMethod === method}
                        onChange={update}
                        className="accent-[#E7000B]"
                      />
                      <span className="font-body text-sm text-white/75">{method}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={update}
                    className="mt-1 accent-[#E7000B]"
                  />
                  <span className="font-body text-sm text-white/70">
                    I agree that SBA may use my information to respond to this enquiry,
                    in accordance with the Privacy Policy.
                    <span className="text-primary-red"> *</span>
                  </span>
                </label>
                {errors.consent ? (
                  <p className="mt-1.5 font-body text-xs text-primary-red" role="alert">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <p className="font-body text-xs leading-relaxed text-white/40">
                We will use your information only to respond to your enquiry. Please
                do not include passwords, confidential credentials, or sensitive
                personal data in this form.
              </p>

              {errors.form ? (
                <p className="font-body text-sm text-primary-red" role="alert">
                  {errors.form}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase hover:border-white/40"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-primary-red px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 disabled:opacity-60 sm:flex-none"
                >
                  {status === 'submitting' ? 'Sending…' : 'Request a Conversation'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
