/**
 * InsightDetailPage — /insights/:slug (case studies + blogs)
 */

import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { InsightCard } from '../components/insights/InsightCard'
import usePageMeta from '../hooks/usePageMeta'
import {
  getInsightBySlug,
  getRelatedInsights,
} from '../data/insights/content'
import { scrollToContactForm } from '../utils/scrollToContactForm'

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function typeLabel(type) {
  return type === 'case-study' ? 'Case Study' : 'Blog'
}

export default function InsightDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = getInsightBySlug(slug)
  const related = item
    ? getRelatedInsights(item, 3).filter((rel) => rel.type === item.type)
    : []
  const listingHref = item?.type === 'case-study' ? '/case-studies' : '/insights'
  const listingLabel =
    item?.type === 'case-study' ? '← Back to Case Studies' : '← Back to Insights'

  const goContact = () => {
    if (!scrollToContactForm()) {
      navigate('/contact')
    }
  }

  const ogImage =
    item?.heroImage &&
    (item.heroImage.startsWith('http')
      ? item.heroImage
      : `${typeof window !== 'undefined' ? window.location.origin : ''}${item.heroImage}`)

  usePageMeta({
    title: item?.metaTitle || 'Insight | SBA Info Solutions',
    description: item?.metaDescription || '',
    path: item ? `/insights/${item.slug}` : '/insights',
    ogType: 'article',
    ogImage,
    jsonLd: item
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: item.title,
          description: item.dek,
          datePublished: item.publishDate,
          image: ogImage || undefined,
          author: {
            '@type': 'Organization',
            name: 'SBA Info Solutions',
          },
          publisher: {
            '@type': 'Organization',
            name: 'SBA Info Solutions',
          },
          articleSection: typeLabel(item.type),
          keywords: [...(item.topics || []), item.industry, item.capability]
            .filter(Boolean)
            .join(', '),
        }
      : null,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!item) {
    return <Navigate to="/insights" replace />
  }

  const metadata =
    item.type === 'case-study'
      ? [item.client, item.industry, item.capability, formatDate(item.publishDate)]
          .filter(Boolean)
          .join(' · ')
      : [...(item.topics || []), formatDate(item.publishDate)]
          .filter(Boolean)
          .join(' · ')

  const ctaLabel =
    item.type === 'case-study' ? 'Talk to an expert' : 'Talk to our team'
  const ctaCopy =
    item.type === 'case-study'
      ? null
      : item.closingCta

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <article>
          <header className="page-hero bg-black pb-12 text-white sm:pb-14">
            <div className="mx-auto max-w-[720px] px-5 sm:px-6">
              <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                {typeLabel(item.type)}
              </p>
              <h1 className="mt-4 font-heading text-[1.85rem] font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
                {item.title}
              </h1>
              <p className="mt-4 font-body text-base leading-[1.6] text-white/55 sm:text-lg">
                {item.dek}
              </p>
              <p className="mt-5 font-body text-sm text-white/55">{metadata}</p>
            </div>
            <div className="mx-auto mt-10 max-w-[720px] overflow-hidden px-5 sm:px-6">
              <img
                className="insight-detail__hero-image"
                src={item.heroImage}
                alt={item.heroAlt}
                fetchPriority="high"
              />
            </div>
          </header>

          <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-6 sm:py-16">
            <div className="space-y-10">
              {item.sections.map((section, index) => {
                const showHeading =
                  section.heading &&
                  section.heading.trim().toLowerCase() !== 'opening'
                const headingId = `sec-${index}`
                return (
                  <section
                    key={headingId}
                    {...(showHeading ? { 'aria-labelledby': headingId } : {})}
                  >
                    {showHeading ? (
                      <h2
                        id={headingId}
                        className="font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl"
                      >
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.body ? (
                      <p
                        className={`font-body text-base leading-[1.6] text-white/80 ${showHeading ? 'mt-4' : ''}`}
                      >
                        {section.body}
                      </p>
                    ) : null}
                    {section.bullets?.length ? (
                      <ul
                        className={`list-disc space-y-2.5 pl-5 font-body text-base leading-[1.6] text-white/80 ${showHeading || section.body ? 'mt-4' : ''}`}
                      >
                        {section.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                )
              })}
            </div>

            {/* Closing CTA */}
            <aside className="mt-16 bg-black px-6 py-10 text-center sm:px-10">
              {ctaCopy ? (
                <p className="font-body text-base leading-[1.6] text-white">{ctaCopy}</p>
              ) : (
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white">
                  {ctaLabel}
                </h2>
              )}
              <button
                type="button"
                onClick={goContact}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.type === 'case-study' ? 'Talk to an expert' : 'Get in touch'}
              </button>
            </aside>

            {related.length > 0 ? (
              <section className="mt-16" aria-labelledby="related-heading">
                <h2
                  id="related-heading"
                  className="font-heading text-xl font-extrabold tracking-tight text-white"
                >
                  Related content
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                  {related.map((rel, i) => (
                    <InsightCard key={rel.slug} item={rel} index={i + 10} />
                  ))}
                </div>
              </section>
            ) : null}

            <p className="mt-12">
              <Link
                to={listingHref}
                className="font-heading text-sm font-bold text-primary-red underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                {listingLabel}
              </Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
