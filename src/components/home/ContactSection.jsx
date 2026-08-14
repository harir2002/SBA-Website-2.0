import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: connect this form to the production contact endpoint
    setStatus('sent')
    setForm(INITIAL_FORM)
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-[72px] overflow-hidden bg-black"
      aria-labelledby="contact-heading"
    >
      <AnimatedBackground variant="grid" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-20">
        <div>
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Contact SBA
          </h2>
          <p className="mt-3 font-body text-sm text-white/70">
            Tell us about the systems you need to modernize, secure, connect, or make intelligent.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            <div>
              <label htmlFor="message" className="mb-2 block font-body text-sm text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full resize-y border border-white/20 bg-black px-3 py-2.5 font-body text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary-red"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
            {status === 'sent' && (
              <p className="font-body text-sm text-white/80" role="status">
                Thank you. Your message has been captured for this preview.
              </p>
            )}
          </form>
        </div>

        <div>
          <div className="relative flex h-64 items-center justify-center overflow-hidden border border-white/15 bg-black">
            {/* TODO: replace this placeholder with the approved Google Maps embed */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <p className="relative px-6 text-center font-body text-sm text-white/70">
              Google Maps embed placeholder
              <span className="mt-1 block text-white/50">Ashok Nagar, Chennai</span>
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-red" aria-hidden="true" />
              <p className="font-body text-sm text-white">
                SBA House #19, (Old No.17), 46th St, Manthope Colony, Ashok Nagar, Chennai, Tamil
                Nadu 600083
              </p>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary-red" aria-hidden="true" />
              <a
                href="tel:+914424897598"
                className="font-body text-sm text-white hover:text-primary-red"
              >
                044 24897598
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary-red" aria-hidden="true" />
              <a
                href="mailto:sales@sbainfo.in"
                className="font-body text-sm text-white hover:text-primary-red"
              >
                sales@sbainfo.in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-body text-sm text-white">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-white/20 bg-black px-3 py-2.5 font-body text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary-red"
      />
    </div>
  )
}
