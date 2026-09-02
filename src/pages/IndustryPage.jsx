/**
 * Industry detail template — one reusable page for all industry slugs.
 */

import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'
import { getIndustryBySlug } from '../data/industriesContent'
import IndustryHero from '../components/industry/IndustryHero'
import IndustryAnchorNavigation from '../components/industry/IndustryAnchorNavigation'
import IndustryChallengeSection from '../components/industry/IndustryChallengeSection'
import IndustryPromiseSection from '../components/industry/IndustryPromiseSection'
import IndustrySolutionAreas from '../components/industry/IndustrySolutionAreas'
import BfsiOperationsPillars from '../components/industry/BfsiOperationsPillars'
import IndustryOperationsPillars from '../components/industry/IndustryOperationsPillars'
import IndustryUseCaseGrid from '../components/industry/IndustryUseCaseGrid'
import IndustryWhySBA from '../components/industry/IndustryWhySBA'
import RelatedCapabilities from '../components/industry/RelatedCapabilities'
import IndustryCTA from '../components/industry/IndustryCTA'
import IndustryPageNavigation from '../components/industry/IndustryPageNavigation'

export default function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustryBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const breadcrumbs = useMemo(
    () =>
      industry
        ? [
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
            { name: industry.label, path: `/industries/${industry.slug}` },
          ]
        : [],
    [industry],
  )

  usePageMeta({
    title: industry?.seoTitle || 'Industries | SBA Info Solutions',
    description: industry?.metaDescription || '',
    path: industry ? `/industries/${industry.slug}` : '/industries',
    breadcrumbs,
  })

  const accent = '#E7000B'

  if (!industry) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="mx-auto max-w-[960px] px-5 py-28 text-center sm:px-6 lg:px-10">
          <h1 className="font-heading text-3xl font-extrabold">Industry not found</h1>
          <p className="mt-3 font-body text-white/60">
            That industry page does not exist yet.
          </p>
          <Link
            to="/industries"
            className="mt-8 inline-flex font-heading text-sm font-bold tracking-wide text-primary-red uppercase hover:brightness-110"
          >
            Back to Industries →
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="industry-detail-page relative min-h-screen bg-black text-white">
      <Header />

      <main>
        <IndustryHero hero={industry.hero} id="overview" accent={accent} />
        <IndustryAnchorNavigation key={industry.slug} />
        <IndustryChallengeSection challenges={industry.challenges} accent={accent} />
        <IndustryPromiseSection promise={industry.promise} accent={accent} />
        {industry.slug === 'bfsi' ? (
          <BfsiOperationsPillars />
        ) : industry.solutions?.pillars ? (
          <IndustryOperationsPillars
            key={`${industry.slug}-pillars`}
            headline={industry.solutions.headline}
            pillars={industry.solutions.pillars}
          />
        ) : (
          <IndustrySolutionAreas solutions={industry.solutions} accent={accent} />
        )}
        <IndustryUseCaseGrid useCases={industry.useCases} />
        <IndustryWhySBA whySba={industry.whySba} />
        <RelatedCapabilities capabilityIds={industry.relatedCapabilities} />
        <IndustryCTA variant={industry.slug === 'bfsi' ? 'clean' : 'default'} />
        <IndustryPageNavigation currentSlug={industry.slug} />
      </main>

      <Footer />
    </div>
  )
}
