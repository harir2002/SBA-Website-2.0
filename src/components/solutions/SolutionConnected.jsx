import { Link } from 'react-router-dom'
import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal, { ScrollStagger } from '../home/ScrollReveal'

export default function SolutionConnected({ whySba }) {
  if (!whySba) return null

  return (
    <section
      id="why-sba"
      className="solution-section border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-why-heading"
      style={{ scrollMarginTop: '140px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <ScrollReveal y={32}>
          <p
            className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: SOLUTION_ACCENT }}
          >
            {whySba.eyebrow}
          </p>
          <h2
            id="solution-why-heading"
            className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-balance text-[#FFFFFF] sm:text-4xl"
          >
            {whySba.headline}
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-12 grid grid-cols-1 gap-5 text-left md:grid-cols-3" stagger={0.12} y={28}>
          {(whySba.offerings || []).map((card) => {
            const className =
              'flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(231,0,11,0.35)] hover:shadow-[0_12px_40px_rgba(231,0,11,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            const inner = (
              <>
                <h3 className="font-heading text-lg font-bold text-[#FFFFFF]">{card.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
                  {card.body}
                </p>
              </>
            )

            return (
              <article key={card.title} className="h-full">
                {card.href ? (
                  <Link
                    to={card.href}
                    className={className}
                    style={{ outlineColor: SOLUTION_ACCENT }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={className} style={{ outlineColor: SOLUTION_ACCENT }}>
                    {inner}
                  </div>
                )}
              </article>
            )
          })}
        </ScrollStagger>
      </div>
    </section>
  )
}
