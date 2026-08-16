/**
 * Header — solid black bar, always at the top.
 * Hero carousel sits below it (page content padded by header height).
 */

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="/" className="flex items-center gap-2" aria-label="SBA Info Solutions home">
          <img
            src="/src/assets/sba-logo.png"
            alt="SBA Info Solutions"
            className="h-9 w-auto"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="font-heading text-sm font-extrabold tracking-widest text-white uppercase">
            SBA Info Solutions
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href.slice(1))}
              className="font-heading text-sm font-bold tracking-wide text-white/80 uppercase transition-colors hover:text-primary-red"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-5 py-2 font-heading text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Talk to SBA
          </button>
        </nav>

        <button
          className="inline-flex items-center justify-center p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-black px-4 pb-6 pt-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => { scrollTo(link.href.slice(1)); setOpen(false) }}
                  className="font-heading text-base font-bold tracking-wide text-white/80 uppercase hover:text-primary-red"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => { scrollTo('contact'); setOpen(false) }}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary-red px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                Talk to SBA
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
