/**
 * ContactPage — guided enterprise conversation experience.
 */

import { useCallback, useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ContactHero from '../components/contact/ContactHero'
import ContactPathways from '../components/contact/ContactPathways'
import ContactEnquiryForm from '../components/contact/ContactEnquiryForm'
import ContactProcess from '../components/contact/ContactProcess'
import ContactTeams from '../components/contact/ContactTeams'
import ContactReach from '../components/contact/ContactReach'
import ContactFinalCta from '../components/contact/ContactFinalCta'

function scrollToEnquiry() {
  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
}

export default function ContactPage() {
  const [preselectedCategory, setPreselectedCategory] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact SBA | SBA Info Solutions'
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
        <ContactPathways onSelect={(category) => startConversation(category)} />
        <ContactEnquiryForm preselectedCategory={preselectedCategory} />
        <ContactProcess />
        <ContactTeams onSelectCategory={(category) => startConversation(category)} />
        <ContactReach />
        <ContactFinalCta onStart={() => startConversation()} />
      </main>

      <Footer />
    </div>
  )
}
