/**
 * Shared Insight card + featured card for listing views.
 */

import { Link } from 'react-router-dom'

function typeLabel(type) {
  return type === 'case-study' ? 'Case Study' : 'Blog'
}

function metaLine(item) {
  if (item.type === 'case-study') {
    return item.industry || item.topics?.[0] || ''
  }
  return (item.topics || []).slice(0, 2).join(' · ')
}

function Thumb({ item }) {
  return (
    <img
      className="insight-card__image"
      src={item.thumbnailImage}
      alt={item.thumbnailAlt}
      loading="lazy"
    />
  )
}

export function InsightCard({ item, featured = false }) {
  const href = `/insights/${item.slug}`
  const cta = item.type === 'case-study' ? 'View case study' : 'Read insight'

  if (featured) {
    return (
      <article className="group grid overflow-hidden border border-white/15 bg-black transition-shadow hover:shadow-[0_0_0_1px_rgba(231,0,11,0.45),0_16px_40px_-16px_rgba(231,0,11,0.35)] lg:grid-cols-[1.1fr_1fr]">
        <Link to={href} className="relative block aspect-[16/10] overflow-hidden bg-black lg:aspect-auto lg:min-h-[280px]" tabIndex={-1} aria-hidden="true">
          <Thumb item={item} />
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
            {typeLabel(item.type)}
          </span>
          <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-[1.65rem]">
            <Link
              to={href}
              className="outline-none hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
            >
              {item.title}
            </Link>
          </h3>
          <p className="mt-3 font-body text-base leading-[1.6] text-white/55">{item.dek}</p>
          {metaLine(item) ? (
            <p className="mt-4 font-body text-sm text-white/55">{metaLine(item)}</p>
          ) : null}
          <Link
            to={href}
            className="mt-6 inline-flex w-fit font-heading text-sm font-bold text-primary-red underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          >
            {cta}
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col overflow-hidden border border-white/15 bg-black transition-shadow hover:shadow-[0_0_0_1px_rgba(231,0,11,0.45),0_12px_32px_-12px_rgba(231,0,11,0.35)]">
      <Link
        to={href}
        className="relative block aspect-[16/9] overflow-hidden bg-black"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Thumb item={item} />
      </Link>
      <div className="flex flex-col px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
        <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-primary-red uppercase">
          {typeLabel(item.type)}
        </span>
        <h3 className="mt-2 font-heading text-lg font-bold leading-snug tracking-tight text-white sm:text-[1.2rem]">
          <Link
            to={href}
            className="outline-none hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-[1.5] text-white/55">
          {item.dek}
        </p>
        {metaLine(item) ? (
          <p className="mt-3 font-body text-xs text-white/55">{metaLine(item)}</p>
        ) : null}
        <Link
          to={href}
          className="mt-3 inline-flex w-fit font-heading text-sm font-bold text-primary-red underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
        >
          {cta}
        </Link>
      </div>
    </article>
  )
}
