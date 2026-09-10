/**
 * NotFoundPage — unmatched client routes (not Home).
 */

import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found | SBA Info Solutions',
    description: 'The page you requested was not found on the SBA Info Solutions website.',
    path: typeof window !== 'undefined' ? window.location.pathname : '/404',
  })

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main className="page-hero mx-auto max-w-[720px] px-5 py-24 text-center sm:px-6 lg:px-10">
        <p className="font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase">
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 font-body text-base leading-[1.6] text-white/55">
          This URL is not a published page on the SBA website. Use the navigation or return home to continue.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  )
}
