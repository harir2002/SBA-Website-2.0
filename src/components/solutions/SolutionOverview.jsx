import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal, { ScrollStagger } from '../home/ScrollReveal'

export default function SolutionOverview({ overview }) {
  if (!overview) return null

  return (
    <section
      id="overview"
      className="solution-section bg-[#000000]"
      aria-labelledby="solution-overview-heading"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={32}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: SOLUTION_ACCENT }}
          >
            {overview.eyebrow}
          </p>
          <h2
            id="solution-overview-heading"
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-[#FFFFFF] sm:text-4xl"
          >
            {overview.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl font-body text-sm font-medium leading-relaxed text-[rgba(255,255,255,0.55)] sm:text-base">
            {overview.body}
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-12 grid grid-cols-1 gap-5 text-left md:grid-cols-3" stagger={0.12} y={28}>
          {(overview.cards || []).map((card) => (
            <article
              key={card.painTitle}
              className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(231,0,11,0.35)] hover:shadow-[0_12px_40px_rgba(231,0,11,0.12)] focus-within:border-[rgba(231,0,11,0.45)]"
            >
              <h3 className="font-heading text-lg font-bold text-[#FFFFFF]">{card.painTitle}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
                {card.painCopy}
              </p>
              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <p
                  className="font-heading text-[0.65rem] font-bold tracking-[0.18em] uppercase"
                  style={{ color: SOLUTION_ACCENT }}
                >
                  SBA Resolution
                </p>
                <p className="mt-2 font-body text-sm font-medium leading-relaxed text-[#FFFFFF]/85">
                  {card.resolution}
                </p>
              </div>
            </article>
          ))}
        </ScrollStagger>
      </div>
    </section>
  )
}
