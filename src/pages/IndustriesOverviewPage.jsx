/**
 * Industries overview — /industries
 */

import { useEffect, useMemo } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'
import { INDUSTRY_OVERVIEW } from '../data/industriesContent'
import {
  OverviewHero,
  IndustryRealitySection,
  IndustryCardsSection,
  IndustryModelSection,
  OverviewFinalCta,
} from '../components/industry/OverviewSections'

export default function IndustriesOverviewPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ],
    [],
  )

  usePageMeta({
    title: INDUSTRY_OVERVIEW.seoTitle,
    description: INDUSTRY_OVERVIEW.metaDescription,
    path: '/industries',
    breadcrumbs,
  })

  return (
    <div className="industries-page relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <OverviewHero />
        <IndustryRealitySection />
        <IndustryCardsSection />
        <IndustryModelSection />
        <OverviewFinalCta />
      </main>
      <Footer />
    </div>
  )
}
