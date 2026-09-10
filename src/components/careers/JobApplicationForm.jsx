/**
 * JobApplicationForm — frontend-only application UI.
 * Does not upload files, send email, or call a fake API.
 */

import { useEffect, useId, useRef, useState } from 'react'
import { FileText, X } from 'lucide-react'
import { submitJobApplication } from '../../services/submitJobApplication'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const ACCEPT_ATTR =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const SUCCESS_MESSAGE =
  'Thank you for applying. Our hiring team will review your profile. For a faster follow-up, email your resume and the job title to hr@sbainfo.in.'

const EXPERIENCE_OPTIONS = [
  'Fresher / Final-Year Student',
  '0–1 year',
  '2–3 years',
  '2–4 years',
  '3–5 years',
  '5+ years',
]

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getExtension(filename) {
  const i = filename.lastIndexOf('.')
  return i >= 0 ? filename.slice(i).toLowerCase() : ''
}

function isAllowedResume(file) {
  const ext = getExtension(file.name)
  return ACCEPTED_EXTENSIONS.includes(ext)
}

const fieldClass =
  'mt-1.5 w-full rounded-md border border-white/20 bg-black px-3 py-2.5 font-body text-sm text-white outline-none placeholder:text-white/35 focus:border-primary-red focus:ring-2 focus:ring-primary-red/30'

const labelClass = 'font-heading text-xs font-bold tracking-wide text-white uppercase'

export default function JobApplicationForm({ job }) {
  const formId = useId()
  const ids = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    mobile: `${formId}-mobile`,
    location: `${formId}-location`,
    experience: `${formId}-experience`,
    linkedin: `${formId}-linkedin`,
    resume: `${formId}-resume`,
    cover: `${formId}-cover`,
    consent: `${formId}-consent`,
  }

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const mobileRef = useRef(null)
  const locationRef = useRef(null)
  const experienceRef = useRef(null)
  const linkedinRef = useRef(null)
  const resumeRef = useRef(null)
  const consentRef = useRef(null)
  const fileInputRef = useRef(null)
  const successRef = useRef(null)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    currentLocation: '',
    yearsOfExperience: '',
    linkedinUrl: '',
    coverNote: '',
    consent: false,
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [submittedNotice, setSubmittedNotice] = useState(false)

  useEffect(() => {
    if (submittedNotice) {
      successRef.current?.focus()
    }
  }, [submittedNotice])

  const onChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const onResumeChange = (e) => {
    const file = e.target.files?.[0] || null
    setErrors((prev) => {
      const next = { ...prev }
      delete next.resume
      return next
    })

    if (!file) {
      setResumeFile(null)
      return
    }

    if (!isAllowedResume(file)) {
      setResumeFile(null)
      e.target.value = ''
      setErrors((prev) => ({
        ...prev,
        resume: 'Please select a PDF, DOC, or DOCX file.',
      }))
      return
    }

    if (file.size > MAX_RESUME_BYTES) {
      setResumeFile(null)
      e.target.value = ''
      setErrors((prev) => ({
        ...prev,
        resume: 'Resume must be 5 MB or smaller.',
      }))
      return
    }

    setResumeFile(file)
  }

  const clearResume = () => {
    setResumeFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setErrors((prev) => {
      const next = { ...prev }
      delete next.resume
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.email.trim()) {
      next.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address'
    }
    if (!form.mobile.trim()) next.mobile = 'Mobile number is required'
    if (!form.currentLocation.trim()) next.currentLocation = 'Current location is required'
    if (!form.yearsOfExperience) next.yearsOfExperience = 'Years of experience is required'
    if (!form.linkedinUrl.trim()) {
      next.linkedinUrl = 'LinkedIn profile URL is required'
    } else if (!/^https?:\/\/.+/i.test(form.linkedinUrl.trim())) {
      next.linkedinUrl = 'Enter a valid URL starting with https://'
    }
    if (!resumeFile) {
      next.resume = 'Please select a resume file'
    } else if (!isAllowedResume(resumeFile)) {
      next.resume = 'Please select a PDF, DOC, or DOCX file.'
    } else if (resumeFile.size > MAX_RESUME_BYTES) {
      next.resume = 'Resume must be 5 MB or smaller.'
    }
    if (!form.consent) {
      next.consent = 'Consent is required to submit your application'
    }
    return next
  }

  const focusFirstError = (next) => {
    const order = [
      ['fullName', nameRef],
      ['email', emailRef],
      ['mobile', mobileRef],
      ['currentLocation', locationRef],
      ['yearsOfExperience', experienceRef],
      ['linkedinUrl', linkedinRef],
      ['resume', resumeRef],
      ['consent', consentRef],
    ]
    for (const [key, ref] of order) {
      if (next[key]) {
        ref.current?.focus()
        break
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      focusFirstError(next)
      return
    }

    // Frontend-only: call stub that does not transmit data.
    await submitJobApplication({
      jobId: job.id,
      jobSlug: job.slug,
      jobTitle: job.title,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      currentLocation: form.currentLocation.trim(),
      yearsOfExperience: form.yearsOfExperience,
      linkedinUrl: form.linkedinUrl.trim(),
      resumeFile,
      coverNote: form.coverNote.trim() || undefined,
      consent: form.consent,
    })

    setSubmittedNotice(true)
  }

  const mailtoHref = `mailto:hr@sbainfo.in?subject=${encodeURIComponent(
    `Application — ${job.title}`,
  )}`

  if (submittedNotice) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-md border border-white/15 bg-black p-6 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red sm:p-8"
      >
        <p className="font-body text-base leading-[1.6] text-white">{SUCCESS_MESSAGE}</p>
        <p className="mt-4 font-body text-sm text-white/70">
          Applying for:{' '}
          <span className="font-semibold text-white">{job.title}</span>
        </p>
        <p className="mt-4 font-body text-sm text-white/55">
          Email{' '}
          <a
            href={mailtoHref}
            className="font-semibold text-primary-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          >
            hr@sbainfo.in
          </a>
          . Attach your resume in your email client; this link does not attach files automatically.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-labelledby={`${formId}-heading`}>
      <div>
        <h2 id={`${formId}-heading`} className="font-heading text-2xl font-extrabold tracking-tight text-white">
          Apply for this Role
        </h2>
        <p className="mt-2 font-body text-sm text-white/70">
          Applying for:{' '}
          <span className="font-semibold text-white">{job.title}</span>
        </p>
        <input type="hidden" name="jobTitle" value={job.title} readOnly />
      </div>

      <div>
        <label htmlFor={ids.name} className={labelClass}>
          Full Name <span className="text-primary-red">*</span>
        </label>
        <input
          ref={nameRef}
          id={ids.name}
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={onChange('fullName')}
          className={fieldClass}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? `${ids.name}-error` : undefined}
        />
        {errors.fullName ? (
          <p id={`${ids.name}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.email} className={labelClass}>
          Email Address <span className="text-primary-red">*</span>
        </label>
        <input
          ref={emailRef}
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onChange('email')}
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
        />
        {errors.email ? (
          <p id={`${ids.email}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.mobile} className={labelClass}>
          Mobile Number <span className="text-primary-red">*</span>
        </label>
        <input
          ref={mobileRef}
          id={ids.mobile}
          name="mobile"
          type="tel"
          autoComplete="tel"
          value={form.mobile}
          onChange={onChange('mobile')}
          className={fieldClass}
          aria-invalid={Boolean(errors.mobile)}
          aria-describedby={errors.mobile ? `${ids.mobile}-error` : undefined}
        />
        {errors.mobile ? (
          <p id={`${ids.mobile}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.mobile}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.location} className={labelClass}>
          Current Location <span className="text-primary-red">*</span>
        </label>
        <input
          ref={locationRef}
          id={ids.location}
          name="currentLocation"
          type="text"
          value={form.currentLocation}
          onChange={onChange('currentLocation')}
          className={fieldClass}
          aria-invalid={Boolean(errors.currentLocation)}
          aria-describedby={errors.currentLocation ? `${ids.location}-error` : undefined}
        />
        {errors.currentLocation ? (
          <p id={`${ids.location}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.currentLocation}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.experience} className={labelClass}>
          Years of Experience <span className="text-primary-red">*</span>
        </label>
        <select
          ref={experienceRef}
          id={ids.experience}
          name="yearsOfExperience"
          value={form.yearsOfExperience}
          onChange={onChange('yearsOfExperience')}
          className={fieldClass}
          aria-invalid={Boolean(errors.yearsOfExperience)}
          aria-describedby={errors.yearsOfExperience ? `${ids.experience}-error` : undefined}
        >
          <option value="">Select…</option>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.yearsOfExperience ? (
          <p id={`${ids.experience}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.yearsOfExperience}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.linkedin} className={labelClass}>
          LinkedIn Profile URL <span className="text-primary-red">*</span>
        </label>
        <input
          ref={linkedinRef}
          id={ids.linkedin}
          name="linkedinUrl"
          type="url"
          required
          value={form.linkedinUrl}
          onChange={onChange('linkedinUrl')}
          className={fieldClass}
          placeholder="https://"
          aria-invalid={Boolean(errors.linkedinUrl)}
          aria-describedby={errors.linkedinUrl ? `${ids.linkedin}-error` : undefined}
        />
        {errors.linkedinUrl ? (
          <p id={`${ids.linkedin}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.linkedinUrl}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.resume} className={labelClass}>
          Resume <span className="text-primary-red">*</span>
        </label>
        <p id={`${ids.resume}-hint`} className="mt-1 font-body text-xs text-white/45">
          Accepted formats: PDF, DOC, DOCX. Maximum file size: 5 MB.
        </p>
        <input
          ref={(el) => {
            fileInputRef.current = el
            resumeRef.current = el
          }}
          id={ids.resume}
          name="resume"
          type="file"
          accept={ACCEPT_ATTR}
          onChange={onResumeChange}
          className="mt-2 block w-full font-body text-sm text-white file:mr-3 file:rounded-md file:border-0 file:bg-primary-red file:px-3 file:py-2 file:font-heading file:text-xs file:font-bold file:tracking-wide file:text-white file:uppercase file:hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          aria-invalid={Boolean(errors.resume)}
          aria-describedby={
            errors.resume ? `${ids.resume}-hint ${ids.resume}-error` : `${ids.resume}-hint`
          }
        />
        {resumeFile ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md border border-white/15 px-3 py-2">
            <FileText className="h-4 w-4 shrink-0 text-primary-red" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm text-white">{resumeFile.name}</p>
              <p className="font-body text-xs text-white/55">
                {getExtension(resumeFile.name).replace('.', '').toUpperCase()} ·{' '}
                {formatFileSize(resumeFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={clearResume}
              className="inline-flex items-center gap-1 font-heading text-xs font-bold text-white/70 hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          </div>
        ) : null}
        {errors.resume ? (
          <p id={`${ids.resume}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.resume}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={ids.cover} className={labelClass}>
          Cover Note{' '}
          <span className="font-body font-normal normal-case text-white/45">(optional)</span>
        </label>
        <textarea
          id={ids.cover}
          name="coverNote"
          rows={4}
          maxLength={1000}
          value={form.coverNote}
          onChange={onChange('coverNote')}
          className={fieldClass}
        />
        <p className="mt-1 text-right font-body text-xs text-white/40">
          {form.coverNote.length}/1000
        </p>
      </div>

      <div>
        <label className="flex items-start gap-3 font-body text-sm leading-[1.55] text-white/80">
          <input
            ref={consentRef}
            id={ids.consent}
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={onChange('consent')}
            className="mt-1 h-4 w-4 shrink-0 accent-[#E7000B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${ids.consent}-error` : undefined}
          />
          <span>
            I agree that SBA Info Solutions may use my information to evaluate my application and
            contact me regarding this role.{' '}
            <span className="text-primary-red">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${ids.consent}-error`} className="mt-1 text-xs text-primary-red" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Submit Application
        </button>
        <p className="font-body text-sm text-white/55">
          Or email{' '}
          <a
            href={mailtoHref}
            className="font-semibold text-primary-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          >
            hr@sbainfo.in
          </a>
        </p>
      </div>
    </form>
  )
}
