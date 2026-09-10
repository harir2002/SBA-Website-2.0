/**
 * Solutions overview — /solutions
 */

import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ScrollReveal, { ScrollStagger } from '../components/home/ScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import { ALL_SOLUTION_OFFERINGS } from '../data/solutions/connectedOfferings'
import { SOLUTION_ACCENT } from '../data/solutions'

export default function SolutionsOverviewPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
    ],
    [],
  )

  usePageMeta({
    title: 'Solutions | Enterprise Technology Capabilities | SBA Info Solutions',
    description:
      'Explore SBA Info Solutions capabilities across modernization, cyber resilience, data, digital engineering, managed operations, and business AI.',
    path: '/solutions',
    breadcrumbs,
  })

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <section
          className="page-hero border-b border-white/[0.08] bg-black"
          aria-labelledby="solutions-overview-heading"
        >
          <div className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
            <ScrollReveal y={24}>
              <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
                Solutions
              </p>
              <h1
                id="solutions-overview-heading"
                className="mt-4 max-w-[18ch] font-heading text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
              >
                Enterprise capabilities engineered to move you forward.
              </h1>
              <p className="mt-5 max-w-2xl font-body text-base leading-[1.6] text-white/55 sm:text-lg">
                Modernize the foundation, protect continuity, activate intelligence, build connected
                products, and operate with assurance — six connected solution areas, one engineering
                partner.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-black py-12 sm:py-16 lg:py-20" aria-label="Solution catalog">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
            <ScrollStagger
              className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.08}
              y={24}
            >
              {ALL_SOLUTION_OFFERINGS.map((item) => (
                <article
                  key={item.slug}
                  className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(231,0,11,0.35)] hover:shadow-[0_12px_40px_rgba(231,0,11,0.12)]"
                >
                  <h2 className="font-heading text-xl font-extrabold tracking-tight text-white">
                    <Link
                      to={item.href}
                      className="outline-none hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                  <Link
                    to={item.href}
                    className="mt-6 inline-flex w-fit font-heading text-sm font-bold tracking-wide uppercase"
                    style={{ color: SOLUTION_ACCENT }}
                  >
                    Explore →
                  </Link>
                </article>
              ))}
            </ScrollStagger>
          </div>
        </section>

        <section className="border-t border-white/[0.08] bg-black py-14 sm:py-16" aria-label="Contact">
          <div className="mx-auto max-w-[820px] px-5 text-center sm:px-6 lg:px-10">
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Ready to engineer what comes next?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base">
              Talk with our architects about the solution path that fits your workloads, risk
              posture, and delivery timeline.
            </p>
            <Link
              to="/contact#enquiry"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-primary-red px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
