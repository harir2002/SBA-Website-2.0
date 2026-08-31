import { Link } from 'react-router-dom'
import { INDUSTRIES } from '../../data/industriesContent'

export default function IndustryPageNavigation({ currentSlug }) {
  const others = INDUSTRIES.filter((item) => item.slug !== currentSlug)

  return (
    <nav
      className="border-t border-white/10 bg-black"
      aria-label="Other industries"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-6 lg:px-10">
        <p className="font-heading text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
          Explore other industries
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link
              to="/industries"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 font-heading text-sm font-semibold text-white/70 transition-colors hover:border-primary-red/50 hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
            >
              Industries Overview
            </Link>
          </li>
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/industries/${item.slug}`}
                className="inline-flex rounded-full border border-white/15 px-4 py-2 font-heading text-sm font-semibold text-white/70 transition-colors hover:border-primary-red/50 hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
