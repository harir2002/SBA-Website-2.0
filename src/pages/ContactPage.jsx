/**
 * ContactPage — minimal: hero + enquiry form. Address lives in shared Footer.
 */

import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ContactHero from '../components/contact/ContactHero'
import ContactEnquiryForm from '../components/contact/ContactEnquiryForm'
import ScrollReveal from '../components/home/ScrollReveal'
import usePageMeta from '../hooks/usePageMeta'

function scrollToEnquiry() {
  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
}

export default function ContactPage() {
  const location = useLocation()

  usePageMeta({
    title: 'Contact | SBA Info Solutions',
    description:
      'Connect with SBA Info Solutions to discuss enterprise modernization, cyber resilience, cloud, data, AI, digital engineering, and managed operations.',
    path: '/contact',
  })

  useEffect(() => {
    if (location.hash === '#enquiry') {
      requestAnimationFrame(() => scrollToEnquiry())
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  const startConversation = useCallback(() => {
    requestAnimationFrame(() => scrollToEnquiry())
  }, [])

  return (
    <div className="contact-page relative min-h-screen overflow-x-clip bg-black text-white">
      <Header />

      <main>
        <ContactHero onStart={startConversation} />
        <ScrollReveal y={36} amount={0.12}>
          <ContactEnquiryForm />
        </ScrollReveal>
      </main>

      <Footer hideContactForm />
    </div>
  )
}
