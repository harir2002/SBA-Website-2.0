/**
 * Solution detail page — /solutions/:slug
 * Currently implements Modernize the Core blueprint.
 */

import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'
import { getSolutionBySlug, SOLUTION_ACCENT } from '../data/solutions/modernizeTheCore'
import SolutionScrollProgress from '../components/solutions/SolutionScrollProgress'
import SolutionSubNav from '../components/solutions/SolutionSubNav'
import SolutionHero from '../components/solutions/SolutionHero'
import SolutionOverview from '../components/solutions/SolutionOverview'
import SolutionPillars from '../components/solutions/SolutionPillars'
import SolutionProof from '../components/solutions/SolutionProof'
import SolutionJourney from '../components/solutions/SolutionJourney'
import SolutionConnected from '../components/solutions/SolutionConnected'
import SolutionArchitectCta from '../components/solutions/SolutionArchitectCta'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const breadcrumbs = useMemo(
    () =>
      solution
        ? [
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/#capabilities' },
            { name: 'Modernize the Core', path: solution.path },
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
      <SolutionScrollProgress />
      <Header />

      <main>
        <SolutionHero hero={solution.hero} />
        <SolutionSubNav anchors={solution.anchors} />
        <SolutionOverview overview={solution.overview} />
        <SolutionPillars pillars={solution.pillars} />
        <SolutionProof capabilities={solution.capabilities} />
        <SolutionJourney journey={solution.journey} />
        <SolutionConnected whySba={solution.whySba} />
        <SolutionArchitectCta cta={solution.cta} />
      </main>

      <Footer />
    </div>
  )
}
