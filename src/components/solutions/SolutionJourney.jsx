import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

export default function SolutionJourney({ journey }) {
  if (!journey) return null
  const steps = journey.steps || []

  return (
    <section
      id="engagement-journey"
      className="solution-section border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-journey-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <p
          className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
          style={{ color: SOLUTION_ACCENT }}
        >
          {journey.eyebrow}
        </p>
        <h2
          id="solution-journey-heading"
          className="mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-[#FFFFFF] sm:text-4xl"
        >
          {journey.headline}
        </h2>

        {/* Desktop horizontal timeline */}
        <ol className="relative mt-14 hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <div
            className="pointer-events-none absolute top-5 right-8 left-8 h-px"
            style={{ backgroundColor: `${SOLUTION_ACCENT}66` }}
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-extrabold text-white"
                style={{ backgroundColor: SOLUTION_ACCENT }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-base font-bold text-[#FFFFFF]">{step.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">{step.body}</p>
            </li>
          ))}
        </ol>

        {/* Mobile / tablet vertical timeline */}
        <ol className="relative mt-12 space-y-0 lg:hidden">
          <div
            className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px"
            style={{ backgroundColor: `${SOLUTION_ACCENT}66` }}
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-10 last:pb-0">
              <span
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-extrabold text-white"
                style={{ backgroundColor: SOLUTION_ACCENT }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-[#FFFFFF]">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
