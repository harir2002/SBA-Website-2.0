import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CapabilityCarousel from '../components/home/CapabilityCarousel'
import TrustMetrics from '../components/home/TrustMetrics'
import IntelligenceVideoPlaceholder from '../components/home/IntelligenceVideoPlaceholder'
import CapabilitiesShowcase from '../components/home/CapabilitiesShowcase'
import InsightsCarousel from '../components/home/InsightsCarousel'
import CareersBanner from '../components/home/CareersBanner'
import ContactSection from '../components/home/ContactSection'
import LogoMarquee from '../components/home/LogoMarquee'
import { CUSTOMER_LOGOS } from '../data/customerLogos'

const PARTNER_LOGOS = [
  { id: 'p1', name: 'LOGO 1' },
  { id: 'p2', name: 'LOGO 2' },
  { id: 'p3', name: 'LOGO 3' },
  { id: 'p4', name: 'LOGO 4' },
  { id: 'p5', name: 'LOGO 5' },
  { id: 'p6', name: 'LOGO 6' },
  { id: 'p7', name: 'LOGO 7' },
  { id: 'p8', name: 'LOGO 8' },
]

export default function HomeV2() {
  return (
    <div className="home-v2 min-h-screen bg-black text-white">
      <Header />

      <main>
        <CapabilityCarousel />
        <TrustMetrics />
        <LogoMarquee
          id="customers-marquee"
          eyebrow="Our Customers"
          heading="Trusted by Leading Enterprises"
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
          direction="forward"
        />
        <InsightsCarousel />
        <CareersBanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
