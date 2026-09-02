import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'

export default function SolutionProof({ capabilities }) {
  if (!capabilities) return null

  return (
    <section
      id="capabilities"
      className="solution-section border-t border-white/[0.06] bg-[#000000]"
      aria-labelledby="solution-capabilities-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <p
          className="font-heading text-[0.7rem] font-bold tracking-[0.22em] uppercase"
          style={{ color: SOLUTION_ACCENT }}
        >
          {capabilities.eyebrow}
        </p>
        <h2
          id="solution-capabilities-heading"
          className="mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-[-0.01em] text-[#FFFFFF] sm:text-4xl"
        >
          {capabilities.headline}
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {(capabilities.scenarios || []).map((scenario, i) => (
            <li
              key={scenario.title}
              className="rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(231,0,11,0.35)] hover:shadow-[0_12px_40px_rgba(231,0,11,0.12)]"
            >
              <span
                className="font-heading text-[0.65rem] font-bold tracking-[0.18em] uppercase"
                style={{ color: SOLUTION_ACCENT }}
              >
                Scenario {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-[#FFFFFF] sm:text-xl">
                {scenario.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[rgba(255,255,255,0.55)] sm:text-[0.95rem]">
                {scenario.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
