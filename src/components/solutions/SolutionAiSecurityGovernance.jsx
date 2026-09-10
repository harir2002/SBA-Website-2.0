import { SOLUTION_ACCENT } from '../../data/solutions/modernizeTheCore'
import ScrollReveal, { ScrollStagger } from '../home/ScrollReveal'
import SolutionJourney from './SolutionJourney'

const ASSURANCES_DEFAULT = [
  'Approved AI access',
  'PII masking',
  'Source attribution',
  'Human-in-the-loop review',
  'Audit visibility',
  'Continuous model monitoring',
]

/**
 * AI Security & Governance — deployment journey + assurance panel.
 * Journey visual matches other solution pages; assurance panel is additive.
 */
export default function SolutionAiSecurityGovernance({ security, accent = SOLUTION_ACCENT }) {
  if (!security) return null

  const assurances = security.assurances || ASSURANCES_DEFAULT

  return (
    <div>
      <SolutionJourney
        sectionId="ai-security-and-governance"
        journey={{
          eyebrow: security.eyebrow,
          headline: security.headline,
          steps: security.steps,
        }}
      />

      <section
        className="solution-section relative overflow-x-hidden border-t border-white/[0.06] bg-black"
        aria-label="AI Security and Governance assurance"
      >
        <div className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
          <ScrollReveal y={24}>
            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0B0B0C] p-6 sm:p-8">
              <p
                className="text-center font-heading text-[0.65rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                AI Security & Governance
              </p>
              <ScrollStagger
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.06}
                y={16}
              >
                {assurances.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-11 items-center gap-3 rounded-lg border border-white/[0.08] bg-black px-4 py-3 text-left"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                      aria-hidden="true"
                    />
                    <span className="font-heading text-sm font-semibold text-white">{item}</span>
                  </div>
                ))}
              </ScrollStagger>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
