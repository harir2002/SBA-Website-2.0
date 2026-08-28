/**
 * IndustryPage — dedicated landing for BFSI, Manufacturing, IT/ITES, Diversified.
 */

import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroCarousel from '../components/home/HeroCarousel'
import { getIndustryBySlug, INDUSTRIES } from '../data/industries'
import { bfsiHeroSlides } from '../data/bfsiHeroSlides'

const INDUSTRY_HERO_SLIDES = {
  bfsi: bfsiHeroSlides,
}

export default function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustryBySlug(slug)
  const heroSlides = INDUSTRY_HERO_SLIDES[slug] || null

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
            to="/"
            className="mt-8 inline-flex font-heading text-sm font-bold tracking-wide text-primary-red uppercase hover:brightness-110"
          >
            Back to home →
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {heroSlides && (
          <HeroCarousel
            slides={heroSlides}
            sectionId={`${slug}-hero`}
            ariaLabel={`${industry.label} hero`}
            variant="fullBleed"
          />
        )}

        <section
          className={`relative overflow-hidden ${heroSlides ? '' : ''}`}
          style={heroSlides ? undefined : { paddingTop: 0 }}
        >
          {!heroSlides && (
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 0%, rgba(231,0,11,0.18) 0%, transparent 45%),
                  radial-gradient(ellipse at 80% 40%, rgba(255,255,255,0.04) 0%, transparent 40%),
                  linear-gradient(180deg, #0a0a0a 0%, #000 100%)
                `,
              }}
            />
          )}

          <div
            className="relative mx-auto max-w-[1100px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
            style={heroSlides ? undefined : { paddingTop: 'calc(72px + 4rem)' }}
          >
            {!heroSlides && (
              <>
                <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
                  {industry.eyebrow}
                </p>
                <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {industry.title}
                </h1>
                <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/65 sm:text-lg">
                  {industry.summary}
                </p>
              </>
            )}

            {heroSlides && (
              <>
                <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  How SBA helps {industry.label}
                </h2>
                <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-white/60">
                  {industry.summary}
                </p>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-md bg-primary-red px-5 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter,transform] hover:scale-[1.02] hover:brightness-110"
              >
                Get in Touch
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 font-heading text-sm font-bold tracking-wide text-white/80 uppercase transition-colors hover:border-primary-red/50 hover:text-primary-red"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-6 sm:py-16 lg:px-10">
          {!heroSlides && (
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
              How SBA helps {industry.label}
            </h2>
          )}
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${heroSlides ? '' : 'mt-8'}`}>
            {industry.highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-white/10 bg-[#0d0f14] p-6"
              >
                <h3 className="font-heading text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-white/55">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#0a0a0a]">
          <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-6 lg:px-10">
            <p className="font-heading text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
              Explore other industries
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {INDUSTRIES.filter((item) => item.slug !== industry.slug).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/industries/${item.slug}`}
                    className="inline-flex rounded-full border border-white/15 px-4 py-2 font-heading text-sm font-semibold text-white/70 transition-colors hover:border-primary-red/50 hover:text-primary-red"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
