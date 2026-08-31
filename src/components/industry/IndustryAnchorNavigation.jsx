/**
 * Sticky local anchor nav for industry detail pages.
 */

import { useEffect, useState } from 'react'
import { INDUSTRY_ANCHORS } from '../../data/industriesContent'

const HEADER_OFFSET = 96

export default function IndustryAnchorNavigation() {
  const [active, setActive] = useState(INDUSTRY_ANCHORS[0].id)

  useEffect(() => {
    const ids = INDUSTRY_ANCHORS.map((a) => a.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`,
        threshold: [0.1, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav
      className="sticky top-[88px] z-40 border-b border-white/10 bg-black/95 backdrop-blur-md"
      aria-label="On this page"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        <ul className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {INDUSTRY_ANCHORS.map((item, i) => (
            <li key={item.id} className="flex shrink-0 items-center">
              {i > 0 && (
                <span className="mx-2 text-white/25" aria-hidden="true">
                  ·
                </span>
              )}
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`whitespace-nowrap rounded-md px-2.5 py-1.5 font-heading text-xs font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red sm:text-sm ${
                  active === item.id
                    ? 'text-primary-red'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
