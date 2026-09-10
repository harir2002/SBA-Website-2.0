/**
 * InsightsPage — /insights (published blogs only).
 */

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ScrollStagger } from '../components/home/ScrollReveal'
import { InsightCard } from '../components/insights/InsightCard'
import insightsHero from '../assets/images/insights/insights-hero.png'
import FilterChip from '../components/insights/FilterChip'
import usePageMeta from '../hooks/usePageMeta'
import {
  filterInsights,
  getPublishedBlogs,
} from '../data/insights/content'

export default function InsightsPage() {
  const [params, setParams] = useSearchParams()
  const topic = params.get('topic') || 'all'

  usePageMeta({
    title: 'Insights | Enterprise Technology Perspectives & Blogs | SBA Info Solutions',
    description:
      'Engineering perspectives from SBA Info Solutions on enterprise modernization, cyber resilience, data, AI, identity, and digital engineering.',
    path: '/insights',
  })

  const published = useMemo(() => getPublishedBlogs(), [])
  const topicChips = useMemo(() => {
    const seen = []
    published.forEach((item) => {
      ;(item.topics || []).forEach((t) => {
        if (!seen.some((x) => x.toLowerCase() === t.toLowerCase())) seen.push(t)
      })
    })
    return seen
  }, [published])

  const topicValid =
    topic === 'all' ||
    topicChips.some((t) => t.toLowerCase() === topic.toLowerCase())
  const activeTopic = topicValid ? topic : 'all'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!topicValid && topic !== 'all') {
      const next = new URLSearchParams(params)
      next.delete('topic')
      setParams(next, { replace: true })
    }
  }, [topic, topicValid, params, setParams])

  const setTopic = (value) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('topic')
    else next.set('topic', value)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(
    () => filterInsights(published, { type: 'blogs', topic: activeTopic }),
    [published, activeTopic],
  )

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <section
          className="insights-hero page-hero"
          aria-labelledby="insights-hero-heading"
        >
          <img
            className="insights-hero__image"
            src={insightsHero}
            alt="Abstract enterprise knowledge architecture representing engineering insight and innovation"
            decoding="async"
            fetchPriority="high"
          />
          <div className="insights-hero__overlay" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-16 sm:px-6 lg:px-10 lg:pb-20">
            <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
              Insights
            </p>
            <h1
              id="insights-hero-heading"
              className="mt-4 max-w-[18ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
            >
              Engineering thinking from the field.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-[1.6] text-white/55 sm:text-lg">
              Perspectives on modernization, security, data, and AI from SBA’s engineering teams — written to help enterprises make clearer technology decisions.
            </p>
          </div>
        </section>

        <section className="bg-black py-12 sm:py-16 lg:py-20" aria-label="Insights library">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <div className="border-b border-white/15 pb-10">
              <p className="font-heading text-xs font-bold tracking-wide text-white uppercase">
                Topic
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
                <FilterChip active={activeTopic === 'all'} onClick={() => setTopic('all')}>
                  All topics
                </FilterChip>
                {topicChips.map((t) => (
                  <FilterChip
                    key={t}
                    active={activeTopic.toLowerCase() === t.toLowerCase()}
                    onClick={() => setTopic(t)}
                  >
                    {t}
                  </FilterChip>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="mt-12 font-body text-base text-white/55" role="status">
                No published insights match this topic.
              </p>
            ) : (
              <ScrollStagger
                key={activeTopic}
                className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8"
              >
                {filtered.map((item, i) => (
                  <InsightCard key={item.slug} item={item} index={i} />
                ))}
              </ScrollStagger>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
