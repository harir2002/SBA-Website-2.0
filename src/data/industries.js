/**
 * Industry landing page content for /industries/:slug
 */

export const INDUSTRIES = [
  {
    slug: 'bfsi',
    label: 'BFSI',
    title: 'Banking, Financial Services & Insurance',
    eyebrow: 'Industry',
    summary:
      'Secure, compliant, and resilient technology for banks, NBFCs, insurers, and capital markets — built for regulation, scale, and customer trust.',
    highlights: [
      {
        title: 'Secure digital channels',
        body: 'Modernize customer journeys with identity, fraud controls, and always-on availability.',
      },
      {
        title: 'Core & cloud modernization',
        body: 'Re-platform legacy cores and data estates without disrupting day-to-day operations.',
      },
      {
        title: 'Risk, compliance & resilience',
        body: 'Strengthen cyber posture, recovery readiness, and audit-ready operations.',
      },
    ],
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing',
    title: 'Manufacturing',
    eyebrow: 'Industry',
    summary:
      'Connected plants, resilient supply chains, and data-driven operations that keep production moving and quality rising.',
    highlights: [
      {
        title: 'Smart operations',
        body: 'Unify OT/IT, visibility, and automation across lines, plants, and partners.',
      },
      {
        title: 'Secure industrial estates',
        body: 'Protect critical systems with segmentation, monitoring, and rapid recovery.',
      },
      {
        title: 'Data for throughput',
        body: 'Turn shop-floor and supply data into actionable decisions for yield and uptime.',
      },
    ],
  },
  {
    slug: 'it-ites',
    label: 'IT/ITES',
    title: 'IT / ITES',
    eyebrow: 'Industry',
    summary:
      'Scalable platforms, secure delivery centers, and AI-ready operations for technology and services organizations competing on speed and quality.',
    highlights: [
      {
        title: 'Cloud-native delivery',
        body: 'Build and run reliable platforms with modern engineering and SRE practices.',
      },
      {
        title: 'Enterprise security',
        body: 'Protect client data, delivery environments, and multi-tenant operations.',
      },
      {
        title: 'Automation & AI',
        body: 'Raise productivity with governed automation across service and engineering workflows.',
      },
    ],
  },
  {
    slug: 'diversified-enterprises',
    label: 'Diversified enterprises',
    title: 'Diversified Enterprises',
    eyebrow: 'Industry',
    summary:
      'One partner for complex portfolios — aligning modernization, security, data, and AI across businesses with different needs and shared ambition.',
    highlights: [
      {
        title: 'Portfolio-wide modernization',
        body: 'Standardize platforms where it helps, specialize where the business demands it.',
      },
      {
        title: 'Shared security backbone',
        body: 'Consistent controls, identity, and resilience across group companies.',
      },
      {
        title: 'Actionable enterprise data',
        body: 'Connect silos so leadership sees one trusted view of performance and risk.',
      },
    ],
  },
]

export function getIndustryBySlug(slug) {
  return INDUSTRIES.find((item) => item.slug === slug) || null
}
