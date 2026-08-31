/**
 * ContactPage — minimal: hero + enquiry form. Address lives in shared Footer.
 */

import { useCallback, useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ContactHero from '../components/contact/ContactHero'
import ContactEnquiryForm from '../components/contact/ContactEnquiryForm'
import ScrollReveal from '../components/home/ScrollReveal'

function scrollToEnquiry() {
  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
}

export default function ContactPage() {
  const [preselectedCategory, setPreselectedCategory] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact | SBA Info Solutions'
    return () => {
      document.title = 'SBA Info Solutions'
    }
  }, [])

  const startConversation = useCallback((category = '') => {
    if (category) setPreselectedCategory(category)
    requestAnimationFrame(() => scrollToEnquiry())
  }, [])

  return (
    <div className="contact-page relative min-h-screen overflow-x-clip bg-black text-white">
      <Header />

      <main>
        <ContactHero onStart={() => startConversation()} />
        <ScrollReveal y={36} amount={0.12}>
          <ContactEnquiryForm preselectedCategory={preselectedCategory} />
        </ScrollReveal>
      </main>

      <Footer hideContactForm />
    </div>
  )
}
