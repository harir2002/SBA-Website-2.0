/**
 * CaseStudiesPage — /case-studies (enterprise engagements only).
 */

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ScrollReveal from '../components/home/ScrollReveal'
import CaseStudyCard from '../components/insights/CaseStudyCard'
import caseStudiesHero from '../assets/images/insights/case-studies-hero.png'
import FilterChip from '../components/insights/FilterChip'
import usePageMeta from '../hooks/usePageMeta'
import { INDUSTRY_SECTORS } from '../data/industriesContent'
import { getPublishedCaseStudies } from '../data/insights/content'

export default function CaseStudiesPage() {
  const [params, setParams] = useSearchParams()
  const industry = params.get('industry') || 'all'

  usePageMeta({
    title: 'Case Studies | Enterprise Engagements | SBA Info Solutions',
    description:
      'See how SBA Info Solutions engineers modernization, security, data, and AI platforms for enterprises across BFSI, IT/ITES, manufacturing, and diversified enterprises.',
    path: '/case-studies',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const setIndustry = (value) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('industry')
    else next.set('industry', value)
    setParams(next, { replace: true })
  }

  const published = useMemo(() => getPublishedCaseStudies(), [])
  const filtered = useMemo(
    () =>
      published.filter(
        (item) =>
          industry === 'all' ||
          (item.industry || '').toLowerCase() === industry.toLowerCase(),
      ),
    [published, industry],
  )

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <section
          className="case-studies-hero page-hero"
          aria-labelledby="case-studies-hero-heading"
        >
          <img
            className="case-studies-hero__image"
            src={caseStudiesHero}
            alt="Abstract enterprise technology architecture representing proven engineering outcomes"
            decoding="async"
            fetchPriority="high"
          />
          <div className="case-studies-hero__overlay" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-16 sm:px-6 lg:px-10 lg:pb-20">
            <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
              Case Studies
            </p>
            <h1
              id="case-studies-hero-heading"
              className="mt-4 max-w-[18ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
            >
              Real engagements. Proven patterns.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-[1.6] text-white/55 sm:text-lg">
              How SBA designs and delivers governed platforms across BFSI, IT/ITES, manufacturing, and diversified enterprises — from air-gapped AI to unified observability.
            </p>
          </div>
        </section>

        <section className="bg-black py-12 sm:py-16 lg:py-20" aria-label="Case studies">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <div className="border-b border-white/15 pb-10">
              <p className="font-heading text-xs font-bold tracking-wide text-white uppercase">
                Industry
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
                <FilterChip active={industry === 'all'} onClick={() => setIndustry('all')}>
                  All industries
                </FilterChip>
                {INDUSTRY_SECTORS.map((sector) => (
                  <FilterChip
                    key={sector.label}
                    active={industry.toLowerCase() === sector.label.toLowerCase()}
                    onClick={() => setIndustry(sector.label)}
                  >
                    {sector.label}
                  </FilterChip>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="mt-12 font-body text-base text-white/55" role="status">
                No published case studies match this industry.
              </p>
            ) : (
              <div className="mt-12 space-y-8">
                {filtered.map((item, i) => (
                  <ScrollReveal key={item.slug}>
                    <CaseStudyCard item={item} index={i} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
