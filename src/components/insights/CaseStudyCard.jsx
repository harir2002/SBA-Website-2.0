import { Link } from 'react-router-dom'

export default function CaseStudyCard({ item }) {
  const href = `/insights/${item.slug}`

  return (
    <article className="group grid overflow-hidden border border-white/15 bg-[#0B0B0C] transition-shadow hover:shadow-[0_0_0_1px_rgba(231,0,11,0.45),0_16px_40px_-16px_rgba(231,0,11,0.35)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
      <Link
        to={href}
        className="relative block aspect-[16/10] overflow-hidden bg-black lg:aspect-auto lg:min-h-[240px]"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          className="insight-card__image h-full"
          src={item.thumbnailImage}
          alt={item.thumbnailAlt}
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          {item.industry ? (
            <span className="border border-white/20 px-2 py-0.5 font-heading text-[10px] font-bold tracking-[0.16em] text-white/80 uppercase">
              {item.industry}
            </span>
          ) : null}
          <span className="font-heading text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase">
            Case Study
          </span>
        </div>
        {item.client ? (
          <p className="mt-3 font-heading text-xs font-bold tracking-wide text-white/45 uppercase">
            {item.client}
          </p>
        ) : null}
        <h3 className="mt-2 font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          <Link
            to={href}
            className="outline-none hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 font-body text-sm leading-[1.6] text-white/55 sm:text-base">{item.dek}</p>
        {item.capability ? (
          <p className="mt-4 font-body text-xs text-white/45">{item.capability}</p>
        ) : null}
        <Link
          to={href}
          className="mt-6 inline-flex w-fit font-heading text-sm font-bold text-primary-red underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
        >
          Read case study
        </Link>
      </div>
    </article>
  )
}
