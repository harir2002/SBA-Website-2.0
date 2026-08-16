/**
 * Capability data for the CapabilityCarousel.
 *
 * Images are loaded via import.meta.glob so filenames with spaces
 * never need to be manually imported one-by-one.
 *
 * ═══════════════════════════════════════════════════════════════════
 * IMAGE REQUIREMENT — TEXT-FREE ASSETS ONLY
 * ═══════════════════════════════════════════════════════════════════
 * Every PNG in src/assets/capabilities/ must be TEXT-FREE.
 * All slide copy (eyebrow, heading, description, CTA) is rendered by
 * CapabilityCarousel.jsx — never bake that copy into the image.
 *
 * If an image still contains Canva text, the UI will show duplicate
 * headings/descriptions. Re-export visuals only (art / 3D graphic /
 * connecting lines) on a dark background with no left-column copy.
 *
 * PRODUCTION NOTE: Before final build, convert all PNGs to WebP for
 * optimal LCP (expected ~60–80% size reduction at equivalent quality).
 */

// Eagerly import all PNGs from the capabilities folder.
// Keys will be: "/src/assets/capabilities/<filename>.png"
const imageModules = import.meta.glob(
  '/src/assets/capabilities/*.png',
  { eager: true },
)

/**
 * Resolve an image URL by matching the slide title to the filename.
 * Case-insensitive: works even if the PNG file uses different capitalisation.
 * Returns null if the file hasn't been placed yet (fallback handled in UI).
 */
function getImage(title) {
  // Try exact match first
  const exact = `/src/assets/capabilities/${title}.png`
  if (imageModules[exact]) return imageModules[exact].default

  // Fall back to case-insensitive search
  const lowerTitle = title.toLowerCase()
  const match = Object.keys(imageModules).find(
    (k) => k.toLowerCase() === `/src/assets/capabilities/${lowerTitle}.png`,
  )
  return match ? imageModules[match].default : null
}

export const CAPABILITIES = [
  {
    id:          'modernize-the-core',
    title:       'Modernize the Core',
    description: 'Modernise legacy systems and strengthen your technology foundation.',
    ctaShort:    'Explore Modernization',
    link:        '/capabilities/modernize-the-core',
    // This image must be text-free — all text is rendered by the component, not baked into the image.
    image:       getImage('Modernize the Core'),
    alt:         'Modernize the Core',
  },
  {
    id:          'protect-and-recover',
    title:       'Protect and Recover',
    description: 'Strengthen security, resilience, and recovery to keep critical business operations running.',
    ctaShort:    'Explore Security',
    link:        '/capabilities/protect-and-recover',
    // This image must be text-free — all text is rendered by the component, not baked into the image.
    image:       getImage('Protect and Recover'),
    alt:         'Protect and Recover',
  },
  {
    id:          'make-data-actionable',
    title:       'Make Data Actionable',
    description: 'Turn complex data into meaningful insights that support smarter business decisions.',
    ctaShort:    'Explore Data & AI',
    link:        '/capabilities/make-data-actionable',
    // This image must be text-free — all text is rendered by the component, not baked into the image.
    image:       getImage('Make Data Actionable'),
    alt:         'Make Data Actionable',
  },
  {
    id:          'build-and-connect',
    title:       'Build and Connect',
    description: 'Connect applications, systems, and platforms to create a more integrated digital ecosystem.',
    ctaShort:    'Explore Integration',
    link:        '/capabilities/build-and-connect',
    // This image must be text-free — all text is rendered by the component, not baked into the image.
    image:       getImage('Build and Connect'),
    alt:         'Build and Connect',
  },
  {
    id:          'operate-with-assurance',
    title:       'Operate with Assurance',
    description: 'Improve reliability, performance, and visibility through smarter technology operations.',
    ctaShort:    'Explore Operations',
    link:        '/capabilities/operate-with-assurance',
    // This image must be text-free — all text is rendered by the component, not baked into the image.
    image:       getImage('Operate with Assurance'),
    alt:         'Operate with Assurance',
  },
  {
    id:          'accelerate-business-ai',
    title:       'Accelerate Business AI',
    description: 'Harness AI to automate processes, unlock new possibilities, and accelerate business growth.',
    ctaShort:    'Explore Business AI',
    link:        '/capabilities/accelerate-business-ai',
    // This image must be text-free — all text is rendered by the component below, not baked into the image.
    // Current asset still has Canva left-column copy; replace with visual-only export (AI process cards, checkmarks, lines — no heading/description).
    image:       getImage('Accelerate Business AI'),
    alt:         'Accelerate Business AI',
  },
]
