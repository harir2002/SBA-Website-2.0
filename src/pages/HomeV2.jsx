import { useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CapabilityCarousel from '../components/home/CapabilityCarousel'
import TrustMetrics from '../components/home/TrustMetrics'
import IntelligenceVideoPlaceholder from '../components/home/IntelligenceVideoPlaceholder'
import CapabilitiesShowcase from '../components/home/CapabilitiesShowcase'
import InsightsCarousel from '../components/home/InsightsCarousel'
import CareersBanner from '../components/home/CareersBanner'
import LogoMarquee from '../components/home/LogoMarquee'
import PageScrollProgress from '../components/home/PageScrollProgress'
import { CUSTOMER_LOGOS } from '../data/customerLogos'
import { PARTNER_LOGOS } from '../data/partnerLogos'

export default function HomeV2() {
  useEffect(() => {
    document.title = 'Home | SBA Info Solutions'
    return () => {
      document.title = 'SBA Info Solutions'
    }
  }, [])

  return (
    <div className="home-v2 min-h-screen bg-black text-white">
      <PageScrollProgress />
      <Header />

      <main>
        <CapabilityCarousel />
        <TrustMetrics />
        <LogoMarquee
          id="customers-marquee"
          eyebrow=""
          heading="Our Enterprise Clients"
          headingClassName="text-primary-red"
          logos={CUSTOMER_LOGOS}
          direction="reverse"
        />
        <IntelligenceVideoPlaceholder />
        <CapabilitiesShowcase />
        <LogoMarquee
          id="partners-marquee"
          eyebrow="Our Partners"
          heading="Technology Partners We Work With"
          logos={PARTNER_LOGOS}
          direction="reverse"
        />
        <InsightsCarousel />
        <CareersBanner />
      </main>

      <Footer />
    </div>
  )
}
