import { useEffect, useState } from 'react'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

/**
 * Sticky in-page solution sub-nav with shared IntersectionObserver + rAF scroll-spy.
 */
export default function SolutionSubNav({ anchors = [] }) {
  const [active, setActive] = useState(anchors[0]?.id)

  useEffect(() => {
    if (!anchors.length) return undefined
    setActive(anchors[0].id)
    const ids = anchors.map((a) => a.id)

    const pickActive = () => {
      const stickyBottom =
        document.querySelector('.solution-subnav')?.getBoundingClientRect().bottom ??
        (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) ||
          88) +
          (parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--solution-subnav-height'),
          ) || 52)

      const line = stickyBottom + Math.min(96, window.innerHeight * 0.12)
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(() => pickActive(), {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
    })
    elements.forEach((el) => observer.observe(el))

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(pickActive)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', pickActive)
    const boot = window.requestAnimationFrame(pickActive)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(boot)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', pickActive)
    }
  }, [anchors])

  return (
    <nav
      className="solution-subnav sticky top-[var(--header-height,88px)] z-40 border-b border-white/[0.08] bg-[#000000]/95 backdrop-blur-md"
      aria-label="On this page"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        <ul className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {anchors.map((item, i) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="flex shrink-0 items-center">
                {i > 0 && (
                  <span className="mx-2 text-white/25" aria-hidden="true">
                    ·
                  </span>
                )}
                <a
                  href={`#${item.id}`}
                  className="solution-subnav__link whitespace-nowrap rounded-md px-2.5 py-2.5 font-heading text-xs font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
                  style={{
                    color: isActive ? SOLUTION_ACCENT : 'rgba(255,255,255,0.55)',
                    outlineColor: SOLUTION_ACCENT,
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setActive(item.id)}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
