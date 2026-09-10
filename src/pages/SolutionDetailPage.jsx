/**
 * Solution detail page — /solutions/:slug
 * Shared structure for all solutions:
 * Hero → Overview → Pillars → Capabilities → Mid (zones + steps) → Why SBA → CTA
 */

import { useLayoutEffect, useMemo } from 'react'
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
import SolutionEngineeringBlueprint from '../components/solutions/SolutionEngineeringBlueprint'
import SolutionConnected from '../components/solutions/SolutionConnected'
import SolutionArchitectCta from '../components/solutions/SolutionArchitectCta'
import { getConnectedOfferings } from '../data/solutions/connectedOfferings'

const CTA_SECTION_IDS = {
  'protect-and-recover': 'talk-to-a-security-expert',
  'make-data-actionable': 'talk-to-a-data-architect',
  'build-and-connect': 'talk-to-an-engineering-lead',
  'operate-with-assurance': 'talk-to-an-operations-lead',
  'accelerate-business-ai': 'talk-to-an-ai-specialist',
  'modernize-the-core': 'talk-to-an-architect',
}

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)
  const accent = solution?.accent || SOLUTION_ACCENT
  const mid = solution?.mid

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const breadcrumbs = useMemo(
    () =>
      solution
        ? [
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
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

      <main key={slug}>
        <SolutionHero hero={solution.hero} accent={accent} />
        <SolutionSubNav anchors={solution.anchors} accent={accent} />
        <SolutionOverview overview={solution.overview} />
        <SolutionPillars pillars={solution.pillars} />
        <SolutionProof capabilities={solution.capabilities} />
        {mid ? (
          <SolutionEngineeringBlueprint
            engineering={mid}
            accent={accent}
            sectionId={mid.sectionId || 'engagement-journey'}
            headingId={`${mid.sectionId || 'engagement-journey'}-heading`}
            mapLabel={mid.mapLabel || 'Capability Map'}
            cycleLabel={mid.cycleLabel || 'Engagement journey'}
          />
        ) : null}
        <SolutionConnected
          whySba={{
            ...solution.whySba,
            offerings: getConnectedOfferings(solution.slug),
          }}
        />
        <SolutionArchitectCta
          cta={solution.cta}
          sectionId={CTA_SECTION_IDS[solution.slug] || 'talk-to-an-architect'}
        />
      </main>

      <Footer />
    </div>
  )
}
