import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import { scrollToContactForm } from '../../utils/scrollToContactForm'

export default function SolutionHero({ hero }) {
  if (!hero) return null

  return (
    <section
      className="solution-hero relative isolate min-h-[min(92vh,920px)] overflow-hidden bg-black"
      aria-labelledby="solution-hero-heading"
    >
      {hero.image ? (
        <img
          src={hero.image}
          alt={hero.imageAlt || ''}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.38) 32%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0.04) 100%), linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[min(92vh,920px)] max-w-[1280px] flex-col justify-start px-5 pb-14 pt-[calc(var(--header-height,88px)+2rem)] sm:px-6 sm:pt-[calc(var(--header-height,88px)+2.5rem)] lg:px-10 lg:pb-16 lg:pt-[calc(var(--header-height,88px)+3rem)]">
        <h1
          id="solution-hero-heading"
          className="max-w-[18ch] font-heading text-[2.05rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.15rem]"
        >
          {hero.title}
        </h1>

        <p className="mt-4 max-w-2xl font-heading text-base font-semibold text-white/90 sm:text-lg">
          {hero.subtitle}
        </p>

        <p className="mt-5 max-w-2xl font-body text-sm font-medium leading-relaxed text-white/55 sm:text-base">
          {hero.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToContactForm()}
            className="inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: SOLUTION_ACCENT }}
          >
            {hero.primaryCta?.label || "Let's Connect"}
          </button>
        </div>

        <ul
          className="mt-10 flex max-w-4xl gap-8 overflow-x-auto border-t border-white/[0.08] pt-7 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-10 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          aria-label="Credibility"
        >
          {(hero.credibility || []).map((item) => {
            const value = typeof item === 'string' ? item : item.value
            const label = typeof item === 'string' ? null : item.label
            return (
              <li key={`${value}-${label || ''}`} className="min-w-[140px] shrink-0 sm:min-w-0 sm:flex-1">
                <p className="font-heading text-3xl font-extrabold leading-none tracking-tight text-white sm:text-4xl">
                  {value}
                </p>
                {label ? (
                  <p className="mt-2 font-body text-sm font-medium text-white/60 sm:text-[0.95rem]">
                    {label}
                  </p>
                ) : null}
                <span
                  className="mt-3 block h-[2px] w-10 rounded-full"
                  style={{ backgroundColor: SOLUTION_ACCENT }}
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
