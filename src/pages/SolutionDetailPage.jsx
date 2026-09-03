/**
 * Solution detail page — /solutions/:slug
 * Templates: Modernize the Core, Protect and Recover, Make Data Actionable.
 */

import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'
import { getSolutionBySlug, SOLUTION_ACCENT } from '../data/solutions'
import SolutionScrollProgress from '../components/solutions/SolutionScrollProgress'
import SolutionSubNav from '../components/solutions/SolutionSubNav'
import SolutionHero from '../components/solutions/SolutionHero'
import SolutionOverview from '../components/solutions/SolutionOverview'
import SolutionPillars from '../components/solutions/SolutionPillars'
import SolutionProof from '../components/solutions/SolutionProof'
import SolutionJourney from '../components/solutions/SolutionJourney'
import SolutionConnected from '../components/solutions/SolutionConnected'
import SolutionArchitectCta from '../components/solutions/SolutionArchitectCta'

/** Shared Engagement Journey visual for all solution pages. */
function midSection(solution) {
  if (solution.template === 'protect-and-recover' && solution.resilience) {
    return (
      <SolutionJourney
        sectionId="resilience-assurance"
        journey={{
          eyebrow: solution.resilience.eyebrow,
          headline: solution.resilience.headline,
          steps: solution.resilience.steps,
        }}
      />
    )
  }

  if (solution.template === 'make-data-actionable' && solution.blueprint) {
    return (
      <SolutionJourney
        sectionId="data-to-ai-blueprint"
        journey={{
          eyebrow: solution.blueprint.eyebrow,
          headline: solution.blueprint.headline,
          steps: (solution.blueprint.stages || []).map((stage) => ({
            title: stage.label,
            body: stage.detail,
          })),
        }}
      />
    )
  }

  return <SolutionJourney journey={solution.journey} />
}

function ctaSectionId(solution) {
  if (solution.template === 'protect-and-recover') return 'talk-to-a-security-expert'
  if (solution.template === 'make-data-actionable') return 'talk-to-a-data-architect'
  return 'talk-to-an-architect'
}

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)
  const accent = solution?.accent || SOLUTION_ACCENT

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const breadcrumbs = useMemo(
    () =>
      solution
        ? [
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/#capabilities' },
            { name: solution.label || solution.slug, path: solution.path },
          ]
        : [],
    [solution],
  )

  usePageMeta({
    title: solution?.seoTitle || 'Solutions | SBA Info Solutions',
    description: solution?.metaDescription || '',
    path: solution?.path || '/solutions',
    breadcrumbs,
  })

  if (!solution) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="mx-auto max-w-[960px] px-5 py-28 text-center sm:px-6 lg:px-10">
          <h1 className="font-heading text-3xl font-extrabold">Solution not found</h1>
          <p className="mt-3 font-body text-white/55">That solution page does not exist yet.</p>
          <Link
            to="/"
            className="mt-8 inline-flex font-heading text-sm font-bold tracking-wide uppercase"
            style={{ color: SOLUTION_ACCENT }}
          >
            Back to Home →
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="solution-detail-page relative min-h-screen bg-black text-white">
      <SolutionScrollProgress accent={accent} />
      <Header />

      <main>
        <SolutionHero hero={solution.hero} accent={accent} />
        <SolutionSubNav anchors={solution.anchors} accent={accent} />
        <SolutionOverview overview={solution.overview} />
        <SolutionPillars pillars={solution.pillars} />
        <SolutionProof capabilities={solution.capabilities} />
        {midSection(solution)}
        <SolutionConnected whySba={solution.whySba} />
        <SolutionArchitectCta cta={solution.cta} sectionId={ctaSectionId(solution)} />
      </main>

      <Footer />
    </div>
  )
}
