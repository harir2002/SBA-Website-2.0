/**
 * Header — Industries, Our Solutions, Insights dropdowns; About SBA, Careers, Search, Contact Us.
 */

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { INDUSTRIES as INDUSTRY_PAGES } from '../../data/industries'

const INDUSTRIES = INDUSTRY_PAGES.map((item) => ({
  label: item.label,
  path: `/industries/${item.slug}`,
}))

const SOLUTIONS = [
  { label: 'Modernize the Core', id: 'modernize-the-core' },
  { label: 'Protect and Recover', id: 'protect-and-recover' },
  { label: 'Make Data Actionable', id: 'make-data-actionable' },
  { label: 'Build and Connect', id: 'build-and-connect' },
  { label: 'Operate with Assurance', id: 'engineered-for-your-industry' },
  { label: 'Accelerate Business AI', id: 'accelerate-business-ai' },
]

const INSIGHTS = [
  { label: 'Case Studies', id: 'insights' },
  { label: 'Blog', id: 'insights' },
]

const NAV_LINKS = [
  { label: 'About SBA', path: '/about' },
  { label: 'Careers', href: '#careers' },
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
          className={`min-w-[260px] origin-top rounded-lg border border-white/10 bg-[#0d0f14] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-[transform,opacity] duration-200 ease-out ${
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
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const industriesRef = useRef(null)
  const solutionsRef = useRef(null)
  const insightsRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!industriesOpen && !solutionsOpen && !insightsOpen) return
    const onPointerDown = (event) => {
      if (industriesOpen && !industriesRef.current?.contains(event.target)) {
        setIndustriesOpen(false)
      }
      if (solutionsOpen && !solutionsRef.current?.contains(event.target)) {
        setSolutionsOpen(false)
      }
      if (insightsOpen && !insightsRef.current?.contains(event.target)) {
        setInsightsOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [industriesOpen, solutionsOpen, insightsOpen])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => scrollToId(id))
    } else if (
      location.pathname.startsWith('/industries/') ||
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
      setSolutionsOpen,
      setInsightsOpen,
      setMobileIndustriesOpen,
      setMobileSolutionsOpen,
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

  const goHash = (id) => {
    closeMenus()
    const onHome = location.pathname === '/' || location.pathname === '/home-v2'
    if (onHome) {
      scrollToId(id)
    } else {
      navigate(`/#${id}`)
    }
  }

  const openOnly = (which) => (fn) => {
    setIndustriesOpen(which === 'industries' ? fn : false)
    setSolutionsOpen(which === 'solutions' ? fn : false)
    setInsightsOpen(which === 'insights' ? fn : false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled
          ? 'border-white/10 bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'border-transparent bg-black'
      }`}
    >      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="/" className="flex shrink-0 items-center" aria-label="SBA Info Solutions home">
          <img
            src="/src/assets/sba-logo.png"
            alt="SBA Info Solutions"
            className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </a>

        <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Main navigation">
          <NavDropdown
            label="Industries"
            items={INDUSTRIES}
            open={industriesOpen}
            setOpen={openOnly('industries')}
            menuRef={industriesRef}
            onSelect={goTo}
          />

          <NavDropdown
            label="Our Solutions"
            items={SOLUTIONS}
            open={solutionsOpen}
            setOpen={openOnly('solutions')}
            menuRef={solutionsRef}
            onSelect={goTo}
          />

          <NavDropdown
            label="Insights"
            items={INSIGHTS}
            open={insightsOpen}
            setOpen={openOnly('insights')}
            menuRef={insightsRef}
            onSelect={goTo}
          />

          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                if (link.path) {
                  closeMenus()
                  navigate(link.path)
                  return
                }
                goHash(link.href.slice(1))
              }}
              className={`${navLinkClass}${
                link.path && location.pathname === link.path ? ' text-primary-red' : ''
              }`}
            >
              {link.label}
            </button>
          ))}

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
              navigate('/contact')
            }}
            className={`${navLinkClass}${
              location.pathname === '/contact' ? ' text-primary-red' : ''
            }`}
          >
            Contact Us
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
          className="bg-black px-4 pb-6 pt-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((v) => !v)}
                aria-expanded={mobileIndustriesOpen}
                className="flex w-full items-center justify-between font-heading text-base font-semibold text-white/80 hover:text-primary-red"
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
                onClick={() => setMobileSolutionsOpen((v) => !v)}
                aria-expanded={mobileSolutionsOpen}
                className="flex w-full items-center justify-between font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                Our Solutions
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileSolutionsOpen && (
                <ul className="mt-2 space-y-1 border-l border-white/15 pl-4">
                  {SOLUTIONS.map((item) => (
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
                  {INSIGHTS.map((item) => (
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

            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (link.path) {
                      closeMenus()
                      navigate(link.path)
                      return
                    }
                    goHash(link.href.slice(1))
                  }}
                  className="font-heading text-base font-semibold text-white/80 hover:text-primary-red"
                >
                  {link.label}
                </button>
              </li>
            ))}

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
                  navigate('/contact')
                }}
                className="font-heading text-base font-semibold text-white/80 hover:text-primary-red"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
