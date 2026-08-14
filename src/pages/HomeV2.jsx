import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import TrustMetrics from '../components/home/TrustMetrics'
import CapabilitiesGrid from '../components/home/CapabilitiesGrid'
import PartnerLogos from '../components/home/PartnerLogos'
import InsightsCarousel from '../components/home/InsightsCarousel'
import CareersBanner from '../components/home/CareersBanner'
import ContactSection from '../components/home/ContactSection'

export default function HomeV2() {
  return (
    <div className="home-v2 min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <TrustMetrics />
        <CapabilitiesGrid />
        <PartnerLogos />
        <InsightsCarousel />
        <CareersBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
