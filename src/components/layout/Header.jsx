/**
 * Header — About, Solutions, Industries, Insights (Case Studies + Insights), Contact.
 * CTA: Let's Connect
 */

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { INDUSTRY_NAV } from '../../data/industriesContent'
import { scrollToContactForm } from '../../utils/scrollToContactForm'

const INDUSTRIES = INDUSTRY_NAV

const CAPABILITIES = [
  { label: 'Modernize the Core', id: 'modernize-the-core', path: '/solutions/modernize-the-core' },
  { label: 'Protect and Recover', id: 'protect-and-recover', path: '/solutions/protect-and-recover' },
  { label: 'Make Data Actionable', id: 'make-data-actionable', path: '/solutions/make-data-actionable' },
  { label: 'Build and Connect', id: 'build-and-connect' },
  { label: 'Operate with Assurance', id: 'engineered-for-your-industry' },
  { label: 'Accelerate Business AI', id: 'accelerate-business-ai' },
]

/** Combined Case Studies + Insights dropdown (shared homepage section). */
const INSIGHTS_MENU = [
  { label: 'Case Studies', id: 'insights' },
  { label: 'Insights', id: 'insights' },
]

const navLinkClass =
  'whitespace-nowrap font-heading text-sm font-semibold tracking-normal text-white/80 transition-colors hover:text-primary-red'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function NavDropdown({
  label,
  items,
  open,
  setOpen,
  menuRef,
  onSelect,
}) {
  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 ${navLinkClass} ${
          open ? 'text-primary-red' : ''
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute top-full left-0 z-50 pt-2 transition-opacity duration-150 ${
          open
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <ul
          className={`min-w-[280px] origin-top rounded-lg border border-white/10 bg-[#0d0f14] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-[transform,opacity] duration-200 ease-out ${
            open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-1 scale-[0.98] opacity-0'
          }`}
          role="menu"
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => onSelect(item)}
                className="w-full px-4 py-2.5 text-left font-heading text-sm font-semibold tracking-normal text-white/80 transition-colors hover:bg-white/5 hover:text-primary-red"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function closeAllMenus(setters) {
  setters.forEach((set) => set(false))
}

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false)
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const industriesRef = useRef(null)
  const capabilitiesRef = useRef(null)
  const insightsRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!industriesOpen && !capabilitiesOpen && !insightsOpen) return
    const onPointerDown = (event) => {
      if (industriesOpen && !industriesRef.current?.contains(event.target)) {
        setIndustriesOpen(false)
      }
      if (capabilitiesOpen && !capabilitiesRef.current?.contains(event.target)) {
        setCapabilitiesOpen(false)
      }
      if (insightsOpen && !insightsRef.current?.contains(event.target)) {
        setInsightsOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [industriesOpen, capabilitiesOpen, insightsOpen])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => scrollToId(id))
    } else if (
      location.pathname.startsWith('/industries') ||
      location.pathname.startsWith('/solutions') ||
      location.pathname === '/about' ||
      location.pathname === '/contact'
    ) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  const handleSearch = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
  }

  const closeMenus = () => {
    closeAllMenus([
      setIndustriesOpen,
      setCapabilitiesOpen,
      setInsightsOpen,
      setMobileIndustriesOpen,
      setMobileCapabilitiesOpen,
      setMobileInsightsOpen,
      setOpen,
    ])
  }

  const goTo = (item) => {
    closeMenus()
    if (item.path) {
      navigate(item.path)
      return
    }
    if (item.id) {
      const onHome = location.pathname === '/' || location.pathname === '/home-v2'
      if (onHome) {
        scrollToId(item.id)
      } else {
        navigate(`/#${item.id}`)
      }
    }
  }

  const openOnly = (which) => (fn) => {
    setIndustriesOpen(which === 'industries' ? fn : false)
    setCapabilitiesOpen(which === 'capabilities' ? fn : false)
    setInsightsOpen(which === 'insights' ? fn : false)
  }

  const industriesActive = location.pathname.startsWith('/industries')

  const isScrolled = scrolled || open

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="/" className="flex shrink-0 items-center" aria-label="SBA Info Solutions home">
          <img
            src="/src/assets/sba-logo.png"
            alt="SBA Info Solutions"
            className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </a>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => {
              closeMenus()
              navigate('/about')
            }}
            className={`${navLinkClass}${
              location.pathname === '/about' ? ' text-primary-red' : ''
            }`}
          >
            About SBA
          </button>

          <NavDropdown
            label="Solutions"
            items={CAPABILITIES}
            open={capabilitiesOpen}
            setOpen={openOnly('capabilities')}
            menuRef={capabilitiesRef}
            onSelect={goTo}
          />

          <NavDropdown
            label="Industries"
            items={INDUSTRIES}
            open={industriesOpen}
            setOpen={openOnly('industries')}
            menuRef={industriesRef}
            onSelect={goTo}
          />

          <NavDropdown
            label="Insights"
            items={INSIGHTS_MENU}
            open={insightsOpen}
            setOpen={openOnly('insights')}
            menuRef={insightsRef}
            onSelect={goTo}
          />

          <button
            type="button"
            onClick={() => {
              closeMenus()
              navigate('/contact')
            }}
            className={`${navLinkClass}${
              location.pathname === '/contact' ? ' text-primary-red' : ''
            }`}
          >
            Contact
          </button>

          <form onSubmit={handleSearch} className="relative flex items-center" role="search">
            {searchOpen ? (
              <div className="flex items-center gap-1.5">
                <label htmlFor="header-search" className="sr-only">
                  Search
                </label>
                <input
                  id="header-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  autoFocus
                  className="w-36 rounded-md border border-white/15 bg-[#16181f] px-2.5 py-1.5 font-body text-sm text-white outline-none placeholder:text-white/40 focus:border-primary-red lg:w-44"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setQuery('') }}
                  className="p-1.5 text-white/70 hover:text-white"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center justify-center p-1.5 text-white/80 transition-colors hover:text-primary-red"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </form>

          <button
            type="button"
            onClick={() => {
              closeMenus()
              scrollToContactForm()
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary-red px-4 py-2 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter,transform] hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Let's Connect
          </button>
        </nav>

        <button
          type="button"
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
          className="site-header__mobile px-4 pb-6 pt-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenus()
                  navigate('/about')
                }}
                className="font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                About SBA
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setMobileCapabilitiesOpen((v) => !v)}
                aria-expanded={mobileCapabilitiesOpen}
                className="flex w-full items-center justify-between font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                Solutions
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileCapabilitiesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileCapabilitiesOpen && (
                <ul className="mt-2 space-y-1 border-l border-white/15 pl-4">
                  {CAPABILITIES.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => goTo(item)}
                        className="w-full py-2 text-left font-body text-sm text-white/70 hover:text-primary-red"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((v) => !v)}
                aria-expanded={mobileIndustriesOpen}
                className={`flex w-full items-center justify-between font-heading text-base font-semibold hover:text-primary-red ${
                  industriesActive ? 'text-primary-red' : 'text-white/80'
                }`}
              >
                Industries
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileIndustriesOpen && (
                <ul className="mt-2 space-y-1 border-l border-white/15 pl-4">
                  {INDUSTRIES.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => goTo(item)}
                        className="w-full py-2 text-left font-body text-sm text-white/70 hover:text-primary-red"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => setMobileInsightsOpen((v) => !v)}
                aria-expanded={mobileInsightsOpen}
                className="flex w-full items-center justify-between font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                Insights
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileInsightsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileInsightsOpen && (
                <ul className="mt-2 space-y-1 border-l border-white/15 pl-4">
                  {INSIGHTS_MENU.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => goTo(item)}
                        className="w-full py-2 text-left font-body text-sm text-white/70 hover:text-primary-red"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenus()
                  navigate('/contact')
                }}
                className="font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                Contact
              </button>
            </li>

            <li>
              <form
                onSubmit={(e) => { handleSearch(e); setOpen(false) }}
                className="flex gap-2"
              >
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#16181f] px-3 py-2 font-body text-sm text-white outline-none placeholder:text-white/40 focus:border-primary-red"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary-red px-3 py-2 text-white"
                  aria-label="Submit search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </li>

            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenus()
                  scrollToContactForm()
                }}
                className="w-full rounded-md bg-primary-red px-4 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase"
              >
                Let's Connect
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
