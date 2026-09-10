/**
 * Shared Connected Offerings catalog for all solution pages.
 * Each page shows the other five capabilities (excludes itself).
 */

export const ALL_SOLUTION_OFFERINGS = [
  {
    slug: 'modernize-the-core',
    title: 'Modernize the Core',
    body: 'Engineer a high-performance, resilient technology foundation around the workloads your business cannot afford to interrupt.',
    href: '/solutions/modernize-the-core',
  },
  {
    slug: 'protect-and-recover',
    title: 'Protect and Recover',
    body: 'Complement core infrastructure with immutable backup, disaster recovery, and perimeter zero-trust security.',
    href: '/solutions/protect-and-recover',
  },
  {
    slug: 'make-data-actionable',
    title: 'Make Data Actionable',
    body: 'Turn modernized platforms into trusted insight, real-time pipelines, and governed enterprise AI.',
    href: '/solutions/make-data-actionable',
  },
  {
    slug: 'build-and-connect',
    title: 'Build and Connect',
    body: 'Modernize application codebases into cloud-native microservices running on your new infrastructure.',
    href: '/solutions/build-and-connect',
  },
  {
    slug: 'operate-with-assurance',
    title: 'Operate with Assurance',
    body: '24x7 infrastructure monitoring, database administration, and SLA-driven L1-L3 support.',
    href: '/solutions/operate-with-assurance',
  },
  {
    slug: 'accelerate-business-ai',
    title: 'Accelerate Business AI',
    body: 'Deploy pre-built, domain-specific AI accelerators with governed security and rapid time-to-value.',
    href: '/solutions/accelerate-business-ai',
  },
]

/** Returns the other five offerings for the current solution page. */
export function getConnectedOfferings(excludeSlug) {
  return ALL_SOLUTION_OFFERINGS.filter((item) => item.slug !== excludeSlug).map(
    ({ title, body, href }) => ({ title, body, href }),
  )
}
