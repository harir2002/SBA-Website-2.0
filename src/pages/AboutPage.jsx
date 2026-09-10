/**
 * AboutPage — premium SBA corporate brand experience.
 */

import { useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AboutHero from '../components/about/AboutHero'
import AboutPromise from '../components/about/AboutPromise'
import AboutWhoWeAre from '../components/about/AboutWhoWeAre'
import AboutCapabilities from '../components/about/AboutCapabilities'
import AboutComplexity from '../components/about/AboutComplexity'
import AboutProof from '../components/about/AboutProof'
import AboutValues from '../components/about/AboutValues'
import AboutLeadership from '../components/about/AboutLeadership'
import AboutEcosystem from '../components/about/AboutEcosystem'
import AboutFinalCta from '../components/about/AboutFinalCta'
import usePageMeta from '../hooks/usePageMeta'

export default function AboutPage() {
  usePageMeta({
    title: 'About | SBA Info Solutions',
    description:
      'Learn about SBA Info Solutions and our enterprise engineering approach to modern infrastructure, cybersecurity, data, AI, and managed operations.',
    path: '/about',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page relative min-h-screen bg-black text-white">
      <Header />

      <main>
        <AboutHero />
        <AboutPromise />
        <AboutWhoWeAre />
        <AboutCapabilities />
        <AboutComplexity />
        <AboutProof />
        <AboutValues />
        <AboutLeadership />
        <AboutEcosystem />
        <AboutFinalCta />
      </main>

      <Footer />
    </div>
  )
}
