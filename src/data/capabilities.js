/**
 * Capability data for the CapabilityCarousel.
 *
 * Images are text-free visuals only (same filenames as before).
 * All eyebrow / heading / description / CTA copy is rendered by
 * CapabilityCarousel.jsx as DOM text — never baked into the image.
 */

const imageModules = import.meta.glob(
  '/src/assets/capabilities/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true },
)

/**
 * Resolve an image URL by filename stem. Case-insensitive.
 */
function getImage(...candidates) {
  const keys = Object.keys(imageModules)
  for (const name of candidates) {
    const stem = name.replace(/\.(png|jpe?g)$/i, '').toLowerCase()
    const match = keys.find((k) => {
      const file = k.split('/').pop().replace(/\.(png|jpe?g)$/i, '').toLowerCase()
      return file === stem
    })
    if (match) return imageModules[match].default
  }
  return null
}

export const CAPABILITIES = [
  {
    id: 'modernize-the-core',
    eyebrow: 'SBA Info Solutions',
    title: 'Modernize the Core',
    description:
      "Legacy systems shouldn't hold back tomorrow's ambitions. We re-engineer your technology foundation for the speed, scale, and agility modern enterprises demand.",
    sectionDescription:
      'Engineer a high-performance, resilient technology foundation — modernized around the workloads your business cannot afford to interrupt.',
    ctaShort: 'Explore Modernization',
    link: '/solutions/modernize-the-core',
    image: getImage('Modernize the core', 'Modernize the Core'),
    alt: 'Modernize the Core visual',
    objectPosition: '85% 25%',
    imageZoom: 1.16,
    imageOrigin: 'right center',
  },
  {
    id: 'protect-and-recover',
    eyebrow: 'SBA Info Solutions',
    title: 'Protect and Recover',
    description:
      "Downtime isn't an option. We build resilient, secure enterprises that anticipate threats, withstand disruption, and recover without missing a beat.",
    sectionDescription:
      'Secure every layer of the enterprise — and maintain a tested, accountable path to recover critical business services when disruption occurs.',
    ctaShort: 'Explore Cyber Resilience',
    link: '/capabilities/protect-and-recover',
    image: getImage('Protect and Recover'),
    alt: 'Protect and Recover visual',
    objectPosition: '70% center',
    imageZoom: 1.16,
    imageOrigin: 'right center',
  },
  {
    id: 'make-data-actionable',
    eyebrow: 'SBA Info Solutions',
    title: 'Make Data Actionable',
    description:
      'Your data holds answers you haven’t asked yet. We turn scattered, complex information into clear, trusted intelligence that drives every decision.',
    sectionDescription:
      'Turn fragmented enterprise data into trusted insight, intelligent automation, and governed AI embedded in everyday business workflows.',
    ctaShort: 'Explore Data Solutions',
    link: '/capabilities/make-data-actionable',
    image: getImage('Make Data Actionable'),
    alt: 'Make Data Actionable visual',
    objectPosition: '92% 48%',
    imageZoom: 1.72,
    imageOrigin: 'right center',
  },
  {
    id: 'build-and-connect',
    eyebrow: 'SBA Info Solutions',
    title: 'Build and Connect',
    description:
      'From product strategy and digital engineering to cloud-native delivery and integration, we turn ambitious ideas into secure, scalable experiences built to evolve.',
    sectionDescription:
      'Reduce digital friction by modernizing critical applications, delivering secure digital products, and connecting workflows across the enterprise.',
    ctaShort: 'Explore Digital Engineering',
    link: '/capabilities/build-and-connect',
    image: getImage('Build and Connect'),
    alt: 'Build and Connect visual',
    objectPosition: '65% center',
    imageZoom: 1.16,
    imageOrigin: 'right center',
  },
  {
    id: 'engineered-for-your-industry',
    eyebrow: 'SBA Info Solutions',
    title: 'Operate with Assurance',
    description:
      'Generic technology creates generic outcomes. We deliver solutions purpose-built for your sector’s regulations, risks, and realities.',
    sectionDescription:
      'Keep users productive, platforms available, and recovery capabilities ready through SLA-backed operations, intelligent automation, and clear accountability.',
    ctaShort: 'Explore Industry Solutions',
    link: '/capabilities/engineered-for-your-industry',
    image: getImage('Engineered for Your Industry'),
    alt: 'Operate with Assurance visual',
    objectPosition: 'right center',
    /* Already balanced — keep near-native scale */
    imageZoom: 1.04,
    imageOrigin: 'center center',
  },
  {
    id: 'accelerate-business-ai',
    eyebrow: 'SBA Info Solutions',
    title: 'Accelerate Business AI',
    description:
      "AI’s real value isn’t the technology - it’s the outcome. We deploy governed, enterprise-ready AI that automates work, elevates experience, and compounds ROI.",
    sectionDescription:
      'Choose a focused use case, deploy with speed, and extend through SBA’s connected foundation of data, engineering, security, and managed operations.',
    ctaShort: 'Explore AI Solutions',
    link: '/capabilities/accelerate-business-ai',
    image: getImage('Accelerate Business AI'),
    alt: 'Accelerate Business AI visual',
    objectPosition: '68% center',
    imageZoom: 1.16,
    imageOrigin: 'right center',
  },
]
