/**
 * CapabilityCarousel — homepage hero; thin wrapper over shared HeroCarousel.
 */

import { CAPABILITIES } from '../../data/capabilities'
import HeroCarousel from './HeroCarousel'

const CAROUSEL_SLIDES = CAPABILITIES.map((cap) =>
  cap.id === 'engineered-for-your-industry'
    ? { ...cap, title: 'Engineered for your Industry' }
    : cap,
)

export default function CapabilityCarousel() {
  return (
    <HeroCarousel
      slides={CAROUSEL_SLIDES}
      sectionId="capabilities"
      ariaLabel="SBA Capabilities"
    />
  )
}
