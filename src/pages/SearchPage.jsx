/**
 * SearchPage — local content search via ?q=
 */

import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'
import { searchSite } from '../utils/siteSearch'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const results = useMemo(() => searchSite(q), [q])

  usePageMeta({
    title: q ? `Search: ${q} | SBA Info Solutions` : 'Search | SBA Info Solutions',
    description: 'Search SBA Info Solutions solutions, industries, careers, and insights.',
    path: q ? `/search?q=${encodeURIComponent(q)}` : '/search',
  })

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main className="page-hero mx-auto max-w-[800px] px-5 pb-20 sm:px-6 lg:px-10">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white">
          Search
        </h1>
        {q ? (
          <p className="mt-3 font-body text-sm text-white/55">
            Results for “{q}”
          </p>
        ) : (
          <p className="mt-3 font-body text-sm text-white/55">
            Enter a search term in the header to find solutions, industries, careers, and insights.
          </p>
        )}

        {q && results.length === 0 ? (
          <p className="mt-10 font-body text-base text-white/55" role="status">
            No results found for “{q}”.
          </p>
        ) : null}

        {results.length > 0 ? (
          <ul className="mt-10 space-y-6">
            {results.map((item) => (
              <li key={item.href} className="border-b border-white/15 pb-6">
                <p className="font-heading text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase">
                  {item.type}
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold text-white">
                  <Link
                    to={item.href}
                    className="hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                  >
                    {item.title}
                  </Link>
                </h2>
                {item.dek ? (
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/55">{item.dek}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
