/**
 * CMS-style industry content — single source for overview + detail templates.
 * Capability ids match capabilities.js for RelatedCapabilities links.
 */

export const INDUSTRY_NAV = [
  { label: 'Industries Overview', path: '/industries' },
  { label: 'BFSI', path: '/industries/bfsi' },
  { label: 'Manufacturing', path: '/industries/manufacturing' },
  { label: 'IT/ITES', path: '/industries/it-ites' },
  { label: 'Diversified Enterprises', path: '/industries/diversified-enterprises' },
]

/** Shared industry image paths (detail heroes + overview cards). */
function industryHeroAssets(stem) {
  const base = `/images/industries/${stem}`
  return {
    heroImage: `${base}.jpg`,
    heroImageWebp: `${base}.webp`,
    heroImageSrcSet: {
      webp: `${base}-960.webp 960w, ${base}-1280.webp 1280w, ${base}.webp 1672w`,
      jpg: `${base}-960.jpg 960w, ${base}-1280.jpg 1280w, ${base}.jpg 1672w`,
    },
    heroImageWidth: 1672,
    heroImageHeight: 941,
  }
}

function industryCardImage(stem, imageAlt) {
  const assets = industryHeroAssets(stem)
  return {
    image: assets.heroImage,
    imageWebp: assets.heroImageWebp,
    imageSrcSet: assets.heroImageSrcSet,
    imageAlt,
  }
}

export const INDUSTRY_OVERVIEW = {
  slug: 'industries',
  seoTitle: 'Industries | SBA Info Solutions',
  metaDescription:
    'SBA engineers modern, secure, and resilient technology solutions for BFSI, manufacturing, IT/ITES, and diversified enterprise environments.',
  hero: {
    eyebrow: 'INDUSTRY SOLUTIONS',
    headline: 'Technology built for the realities of your industry.',
    subheadline: 'Built to keep enterprises moving forward.',
    body:
      'Every industry has different operational pressures, risks, and technology priorities. SBA brings modernisation, cyber resilience, data, AI, digital engineering, and managed operations together around what your business depends on most.',
    primaryCta: { label: 'Explore Our Industries', href: '#industry-cards' },
    secondaryCta: { label: 'Talk to an Industry Expert', href: '/contact' },
    visualKey: 'overview',
  },
  reality: {
    headline: 'Industry knowledge changes the outcome.',
    body: [
      'Technology transformation cannot be separated from the way an organisation operates. The systems that matter, the risks that must be controlled, the data that drives decisions, and the workflows that shape customer experience are different in every sector.',
      'SBA combines enterprise engineering depth with an understanding of sector-specific operating realities—helping clients modernise critical foundations, protect continuity, build connected experiences, and apply AI with purpose.',
    ],
  },
  cards: [
    {
      slug: 'bfsi',
      title: 'BFSI',
      body:
        'Secure, resilient technology foundations for high-volume transactions, regulated data, and always-on financial operations.',
      cta: 'Explore BFSI',
      ...industryCardImage('bfsi-industry-hero', 'BFSI technology and financial operations'),
    },
    {
      slug: 'manufacturing',
      title: 'Manufacturing',
      body:
        'Connected, protected, and observable technology environments for production, ERP, supply chains, and distributed sites.',
      cta: 'Explore Manufacturing',
      ...industryCardImage(
        'manufacturing-industry-hero',
        'Manufacturing technology and connected operations',
      ),
    },
    {
      slug: 'it-ites',
      title: 'IT/ITES',
      body:
        'Modern cloud, data, DevOps, and managed operations for businesses that need speed without instability.',
      cta: 'Explore IT/ITES',
      ...industryCardImage('it-ites-industry-hero', 'IT and IT-enabled services technology'),
    },
    {
      slug: 'diversified-enterprises',
      title: 'Diversified Enterprises',
      body:
        'Modern infrastructure, practical AI, secure operations, and technology continuity for complex operating environments.',
      cta: 'Explore Diversified Enterprises',
      ...industryCardImage(
        'diversified-enterprises-hero',
        'Diversified enterprise technology operations',
      ),
    },
  ],
  model: {
    eyebrow: 'THE SBA APPROACH',
    headline: 'One connected capability model. Applied to your context.',
    stages: [
      {
        title: 'Understand the operating environment',
        body: 'Identify the systems, processes, risks, data, and outcomes that shape the real challenge.',
      },
      {
        title: 'Strengthen the foundation',
        body: 'Modernise infrastructure, applications, platforms, and cloud environments around what the business cannot afford to interrupt.',
      },
      {
        title: 'Protect what matters',
        body: 'Build security, recovery, resilience, and governance into every critical layer.',
      },
      {
        title: 'Activate intelligence',
        body: 'Connect data, workflows, automation, and AI to create faster, more confident decisions.',
      },
      {
        title: 'Operate with assurance',
        body: 'Sustain performance through observability, managed services, SLA-backed operations, and continuous improvement.',
      },
    ],
  },
  cta: {
    headline: 'Find the right path forward for your industry.',
    body: 'Talk to SBA about the technology, security, resilience, data, and AI priorities shaping your organisation’s next chapter.',
    primaryCta: { label: 'Talk to an Industry Expert', href: '/contact' },
    secondaryCta: { label: 'Explore Our Capabilities', href: '/#capabilities' },
  },
}

export const SHARED_INDUSTRY_CTA = {
  eyebrow: 'READY TO MOVE FORWARD?',
  headline: 'Build the next chapter with confidence.',
  body: 'Talk to SBA about modernising the foundation, protecting critical operations, activating intelligence, and creating the connected capabilities your organisation needs next.',
  primaryCta: { label: 'Talk to an Industry Expert', href: '/contact' },
  secondaryCta: { label: 'Contact SBA', href: '/contact' },
  signature: 'Engineering the modern, secure, and resilient enterprise.',
}

export const INDUSTRY_ANCHORS = [
  { id: 'overview', label: 'Overview' },
  { id: 'industry-challenges', label: 'Industry Challenges' },
  { id: 'solution-areas', label: 'Solution Areas' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'why-sba', label: 'Why SBA' },
  { id: 'talk-to-an-expert', label: 'Talk to an Expert' },
]

/** @type {Record<string, object>} */
export const INDUSTRY_PAGES = {
  bfsi: {
    slug: 'bfsi',
    label: 'BFSI',
    seoTitle: 'BFSI | SBA Info Solutions',
    metaDescription:
      'Modernise financial technology foundations, strengthen cyber resilience, and maintain secure, always-on BFSI operations with SBA.',
    hero: {
      eyebrow: 'BFSI',
      headline: 'Built for financial operations that cannot pause.',
      subheadline: 'Modernise critical systems. Protect trust. Maintain continuity.',
      body: 'SBA helps financial institutions modernise critical systems, protect sensitive data, strengthen cyber resilience, and maintain continuity across high-volume, always-on operations.',
      primaryCta: { label: 'Talk to a BFSI Expert', href: '/contact' },
      secondaryCta: { label: 'Explore Cyber Resilience', href: '/#protect-and-recover' },
      visualKey: 'bfsi',
      ...industryHeroAssets('bfsi-industry-hero'),
    },
    challenges: {
      headline: 'In financial services, trust is engineered every day.',
      items: [
        {
          title: 'Legacy technology pressure',
          body: 'Core banking, insurance, and financial-data environments must modernise without disrupting business-critical services.',
        },
        {
          title: 'Growing threat exposure',
          body: 'Expanded digital channels, hybrid workloads, third parties, and customer data increase the attack surface.',
        },
        {
          title: 'Regulatory and operational scrutiny',
          body: 'Security, access, monitoring, retention, recoverability, and reporting must stand up to continuous scrutiny.',
        },
        {
          title: 'Continuity expectations',
          body: 'Every critical service needs a secure, tested, accountable path to recover when disruption occurs.',
        },
      ],
    },
    promise: {
      headline: 'Modernisation without compromising stability.',
      body: 'SBA brings together the capabilities BFSI organisations need to change with confidence: digital core modernisation, secure hybrid cloud, zero-trust controls, cyber resilience, observability, and 24x7 managed operations.\n\nWe help strengthen every layer around critical financial services—so transformation improves performance without creating fragility.',
      supportingLine: null,
      visualKey: 'bfsi-layers',
      layers: [
        'Core systems',
        'Hybrid cloud',
        'Security controls',
        'Recovery environment',
        'Operations centre',
      ],
    },
    solutions: {
      headline: 'Technology foundations for secure, always-on financial services.',
      items: [
        {
          title: 'Digital Core Modernisation',
          summary: 'Modernise the infrastructure and platforms behind critical financial workloads.',
          details:
            'Compute, storage, virtualisation, OS migration, workload transformation, platform engineering, performance and availability design.',
        },
        {
          title: 'Secure Hybrid Cloud and Zero Trust',
          summary:
            'Enable cloud agility while maintaining control over access, applications, data, and workloads.',
          details:
            'Hybrid-cloud enablement, Kubernetes, identity governance, firewall and WAF, segmentation, database security, secure-by-design delivery.',
        },
        {
          title: 'Resilience and Operations',
          summary:
            'Maintain a secure, tested path to protect, monitor, recover, and operate critical business services.',
          details:
            'Backup, DR, clean recovery, observability, managed detection and response, incident coordination, compliance support.',
        },
      ],
    },
    useCases: {
      headline: 'Where SBA helps BFSI organisations move forward.',
      layout: 'list',
      items: [
        'Modernising core banking, insurance, and high-volume data environments',
        'Upgrading data-centre, compute, storage, and virtualisation foundations',
        'Migrating critical workloads into secure hybrid-cloud environments',
        'Establishing container-ready, Kubernetes-based platform environments',
        'Strengthening identity, network, application, database, and perimeter security',
        'Building cyber recovery, backup, disaster-recovery, and continuity capabilities',
        'Improving infrastructure visibility, threat response, and managed operational control',
      ],
    },
    whySba: {
      headline: 'One connected partner for critical financial technology.',
      body: 'BFSI transformation cannot be divided between separate infrastructure, cloud, security, recovery, and operations vendors. SBA brings those disciplines together around one accountable engineering model—helping financial organisations modernise the core while maintaining the security, governance, and continuity their customers depend on.',
      proofStrip:
        'Core Modernisation · Secure Hybrid Cloud · Zero Trust · Cyber Recovery · 24x7 Operations',
    },
    relatedCapabilities: [
      'modernize-the-core',
      'protect-and-recover',
      'make-data-actionable',
      'build-and-connect',
      'engineered-for-your-industry',
      'accelerate-business-ai',
    ],
  },

  manufacturing: {
    slug: 'manufacturing',
    label: 'Manufacturing',
    seoTitle: 'Manufacturing | SBA Info Solutions',
    metaDescription:
      'Modernise ERP and infrastructure, secure production environments, and improve manufacturing resilience with SBA.',
    hero: {
      eyebrow: 'MANUFACTURING',
      headline: 'Keep production, supply chains, and operations moving as one.',
      subheadline: 'Secure the plant. Modernise the core. Build operational resilience.',
      body: 'SBA helps manufacturers connect and protect ERP, production, engineering, supply-chain, and operational environments—building a more resilient foundation for continuous performance.',
      primaryCta: { label: 'Talk to a Manufacturing Expert', href: '/contact' },
      secondaryCta: { label: 'Explore Managed Operations', href: '/#engineered-for-your-industry' },
      visualKey: 'manufacturing',
      fullHeight: true,
      ...industryHeroAssets('manufacturing-industry-hero'),
    },
    challenges: {
      headline: 'Disruption in technology becomes disruption in production.',
      items: [
        {
          title: 'Ageing core systems',
          body: 'Legacy ERP, infrastructure, and engineering environments can limit speed, reliability, and future readiness.',
        },
        {
          title: 'Expanded operational risk',
          body: 'Production networks, distributed sites, endpoints, suppliers, and OT-adjacent systems expand the security perimeter.',
        },
        {
          title: 'Limited visibility',
          body: 'Incomplete monitoring and fragmented operations make it harder to detect issues before they affect production.',
        },
        {
          title: 'Recovery complexity',
          body: 'Business continuity depends on data, applications, systems, and sites recovering in the right order.',
        },
      ],
    },
    promise: {
      headline: 'Technology that understands the cost of interruption.',
      body: 'SBA helps manufacturers strengthen the digital and operational foundations behind the plant. We modernise ERP and data-centre environments, secure networks and endpoints, improve visibility across critical systems, and maintain recovery readiness across the enterprise.\n\nThe result is a more resilient operational environment—built to support production, engineering, supply chain, and growth.',
      supportingLine: null,
      visualKey: 'manufacturing-layers',
      layers: [
        'ERP backbone',
        'Engineering / design layers',
        'Secured production zones',
        'Remote sites',
        'Central monitoring',
      ],
    },
    solutions: {
      headline: null,
      items: [
        {
          title: 'Digital Core and ERP Modernisation',
          summary:
            'Build a scalable, modern technology foundation for business-critical production and engineering workloads.',
          details:
            'ERP infrastructure migration, server and storage virtualisation, data-centre modernisation, centralised storage, scalable architecture.',
        },
        {
          title: 'Network Security and Cyber Resilience',
          summary:
            'Protect production, supply-chain, and distributed environments from disruption and risk propagation.',
          details:
            'Network segmentation, endpoint security, data protection, backup, disaster recovery, cybersecurity posture management.',
        },
        {
          title: '24x7 Operations and Observability',
          summary:
            'Improve stability with visibility, proactive management, and accountable technology operations.',
          details:
            'Monitoring, log management, infrastructure health, managed security operations, remote support, proactive incident response.',
        },
      ],
    },
    useCases: {
      headline: 'Engineering resilience across the manufacturing value chain.',
      layout: 'list',
      items: [
        'Modernising ERP and the underlying infrastructure that supports it',
        'Refreshing compute, storage, virtualisation, and centralised engineering-data environments',
        'Strengthening segmentation and protection for production and supply-chain networks',
        'Improving security posture across distributed endpoints and sites',
        'Centralising backup, retention, recovery, and continuity governance',
        'Establishing 24x7 monitoring across applications, infrastructure, networks, and logs',
        'Supporting technology environments through managed infrastructure and security operations',
      ],
    },
    whySba: {
      headline: 'One view of the factory, the data centre, and the enterprise.',
      body: 'SBA does not treat infrastructure, production systems, ERP, security, and operations as disconnected technology domains. We engineer them as one operational ecosystem—reducing risk, improving visibility, and supporting uninterrupted business performance.',
      proofStrip:
        'ERP Modernisation · Production Network Security · Endpoint Protection · Cyber Resilience · 24x7 Observability',
    },
    relatedCapabilities: [
      'modernize-the-core',
      'protect-and-recover',
      'make-data-actionable',
      'build-and-connect',
      'engineered-for-your-industry',
      'accelerate-business-ai',
    ],
  },

  'it-ites': {
    slug: 'it-ites',
    label: 'IT/ITES',
    seoTitle: 'IT/ITES | SBA Info Solutions',
    metaDescription:
      'Build digital velocity with cloud, data, DevOps, modern infrastructure, and managed technology operations from SBA.',
    hero: {
      eyebrow: 'IT / ITES',
      headline: 'Build digital velocity without creating operational drag.',
      subheadline: 'Modern platforms. Secure delivery. Always-on operations.',
      body: 'SBA helps IT and IT-enabled service organisations modernise platforms, accelerate cloud and data initiatives, automate delivery, and maintain secure, reliable operations as demand grows.',
      primaryCta: { label: 'Talk to an IT/ITES Expert', href: '/contact' },
      secondaryCta: { label: 'Explore Digital Engineering', href: '/#build-and-connect' },
      visualKey: 'it-ites',
      fullHeight: true,
      ...industryHeroAssets('it-ites-industry-hero'),
    },
    challenges: {
      headline: 'Faster delivery should not mean greater operational risk.',
      items: [
        {
          title: 'Rapid platform change',
          body: 'Cloud adoption, growing data demand, application evolution, and modern delivery practices can outpace operating models.',
        },
        {
          title: 'Technology debt',
          body: 'Legacy virtualisation, infrastructure, and fragmented environments can slow release velocity and increase cost.',
        },
        {
          title: 'Always-on service expectations',
          body: 'Clients and users expect consistent performance, fast issue resolution, and resilient operations around the clock.',
        },
        {
          title: 'Security at speed',
          body: 'Every release, cloud workload, data source, and integration must remain protected as the environment evolves.',
        },
      ],
    },
    promise: {
      headline: 'Connect build, run, protect, and improve.',
      body: 'SBA helps IT/ITES organisations remove the friction created when development, cloud, data, infrastructure, security, and operations are treated as separate agendas. We create a connected engineering environment that supports faster delivery, stronger reliability, better visibility, and continuous improvement.',
      supportingLine: null,
      visualKey: 'it-ites-layers',
      layers: [
        'Application / service layers',
        'Cloud & data platforms',
        'DevOps pipelines',
        'Container infrastructure',
        'Observability & SecOps',
      ],
    },
    solutions: {
      headline: null,
      items: [
        {
          title: 'Cloud, Data and DevOps',
          summary:
            'Accelerate digital delivery through modern cloud data foundations and automated engineering practices.',
          details:
            'Data lakes, Azure Data Lake Storage migration, DevOps automation, infrastructure as code, cloud platforms, modern delivery pipelines.',
        },
        {
          title: 'HCI and Core Modernisation',
          summary:
            'Upgrade core technology environments for performance, scalability, and operational flexibility.',
          details:
            'HCI deployment, virtualisation, infrastructure refresh, scalable compute, data-centre transformation, platform engineering.',
        },
        {
          title: 'Managed SecOps and Operations',
          summary:
            'Maintain availability, security, observability, and response across rapidly changing technology environments.',
          details:
            '24x7 monitoring, cloud operations, cybersecurity posture, endpoint monitoring, threat detection, managed support.',
        },
      ],
    },
    useCases: {
      headline: 'From technology debt to delivery momentum.',
      layout: 'list',
      items: [
        'Modernising virtualised and data-intensive technology environments',
        'Building cloud data-lake and analytics platforms',
        'Automating infrastructure provisioning, testing, release, and deployment workflows',
        'Refreshing data-centre and HCI foundations for growth',
        'Improving full-stack visibility, alert management, and incident response',
        'Strengthening cloud, endpoint, and infrastructure security posture',
        'Extending internal teams through managed infrastructure, cloud, and security operations',
      ],
    },
    whySba: {
      headline: 'A partner built for the full technology lifecycle.',
      body: 'SBA brings together the capabilities required to build and sustain digital momentum: cloud, data, infrastructure, DevOps, cybersecurity, observability, and managed operations. This lets IT/ITES organisations move faster without creating a more fragmented or fragile technology estate.',
      proofStrip:
        'Cloud Data · DevOps Automation · HCI Modernisation · Managed SecOps · Always-On Support',
    },
    relatedCapabilities: [
      'modernize-the-core',
      'protect-and-recover',
      'make-data-actionable',
      'build-and-connect',
      'engineered-for-your-industry',
      'accelerate-business-ai',
    ],
  },

  'diversified-enterprises': {
    slug: 'diversified-enterprises',
    label: 'Diversified Enterprises',
    seoTitle: 'Diversified Enterprises | SBA Info Solutions',
    metaDescription:
      'Apply modern infrastructure, practical AI, connected workflows, cyber resilience, and managed operations to complex enterprise environments.',
    hero: {
      eyebrow: 'DIVERSIFIED ENTERPRISES',
      headline: 'Technology engineered around the way your organisation operates.',
      subheadline: 'Modern infrastructure. Practical AI. Secure operations.',
      body: 'SBA brings infrastructure, practical AI, security, digital engineering, and managed operations together for complex environments that need to stay secure, resilient, and ready to evolve.',
      primaryCta: { label: 'Talk to an Industry Expert', href: '/contact' },
      secondaryCta: { label: 'Explore Business AI', href: '/#accelerate-business-ai' },
      visualKey: 'diversified',
      fullHeight: true,
      ...industryHeroAssets('diversified-enterprises-hero'),
    },
    challenges: {
      headline: 'Specialised operations need more than standard technology.',
      items: [
        {
          title: 'Complex, distributed workflows',
          body: 'Information moves across teams, locations, project environments, documents, systems, and customer channels.',
        },
        {
          title: 'Manual and document-heavy processes',
          body: 'Critical decisions can depend on unstructured information, fragmented knowledge, and time-intensive human coordination.',
        },
        {
          title: 'Evolving operational expectations',
          body: 'Stakeholders expect faster communication, more responsive service, better visibility, and more digital ways of working.',
        },
        {
          title: 'Infrastructure and security pressure',
          body: 'Growing workloads, sensitive data, specialised applications, and AI initiatives require a secure, scalable, recoverable foundation.',
        },
        {
          title: 'Limited internal capacity',
          body: 'Teams need a practical partner that can help build, secure, operate, and improve technology environments over time.',
        },
      ],
    },
    promise: {
      headline: 'A connected technology foundation for distinctive enterprise needs.',
      body: 'SBA helps specialised organisations move beyond isolated technology investments. We bring together modern infrastructure, intelligent automation, secure digital workflows, resilient operations, and managed support—so technology becomes a dependable platform for growth rather than a source of friction.',
      supportingLine: null,
      visualKey: 'diversified-layers',
      layers: [
        'High-performance compute',
        'Document / workflow streams',
        'Customer communication paths',
        'Project / planning layers',
        'Secure managed operations',
      ],
    },
    solutions: {
      headline: null,
      items: [
        {
          title: 'Modern Infrastructure and Advanced Compute',
          summary:
            'Build scalable foundations for demanding applications, data-intensive workloads, and future growth.',
          details:
            'Smart data centres, GPU/CPU compute, high-speed storage, virtual platforms, hybrid-cloud enablement, infrastructure operations.',
        },
        {
          title: 'AI and Intelligent Automation',
          summary:
            'Apply practical AI to documents, knowledge, customer conversations, project workflows, and decision-making.',
          details:
            'Document understanding, summarisation, enterprise search, conversational AI, workflow automation, sentiment analysis, AI assistants.',
        },
        {
          title: 'Connected Digital Workflows',
          summary:
            'Reduce friction by connecting people, systems, communication channels, and operational processes.',
          details:
            'Application integration, project/workflow automation, collaboration platforms, customer communications, digital workplace solutions.',
        },
        {
          title: 'Secure, Resilient Operations',
          summary: 'Keep critical environments protected, available, and ready to recover.',
          details:
            'Managed infrastructure, endpoint operations, cyber resilience, backup, DR, recovery validation, managed security operations.',
        },
      ],
    },
    useCases: {
      headline: 'Practical solutions for complex operating environments.',
      layout: 'grid',
      items: [
        {
          title: 'High-performance technology environments',
          body: 'Design and operate compute, storage, networking, and data-centre environments for demanding workloads.',
        },
        {
          title: 'Document and knowledge intelligence',
          body: 'Turn complex information into accessible, usable intelligence through document processing, summarisation, and enterprise search.',
        },
        {
          title: 'AI-enabled customer operations',
          body: 'Improve service quality and customer insight using conversational AI, interaction analysis, and workflow automation.',
        },
        {
          title: 'Project and operational workflow automation',
          body: 'Connect teams, data, and processes to reduce manual coordination and improve visibility across critical workflows.',
        },
        {
          title: 'Modern digital workplace operations',
          body: 'Support distributed users through secure collaboration, endpoint management, service automation, and managed operations.',
        },
        {
          title: 'Cyber resilience and continuity',
          body: 'Protect critical applications and data with accountable backup, recovery, continuity, and security operations.',
        },
      ],
    },
    whySba: {
      headline: 'Start focused. Build value. Extend with confidence.',
      body: 'SBA works well in environments where a standard technology approach is not enough. We can begin with a specific high-value need—such as an AI workflow, infrastructure upgrade, customer-operation improvement, or resilience requirement—and extend value through our connected capabilities.\n\nThis gives clients the flexibility to start where the need is greatest, while gaining access to a partner that can support the broader technology environment as requirements evolve.',
      proofStrip:
        'Advanced Infrastructure · Practical AI · Connected Workflows · Cyber Resilience · Managed Operations',
    },
    relatedCapabilities: [
      'modernize-the-core',
      'protect-and-recover',
      'make-data-actionable',
      'build-and-connect',
      'engineered-for-your-industry',
      'accelerate-business-ai',
    ],
  },
}

export function getIndustryBySlug(slug) {
  return INDUSTRY_PAGES[slug] || null
}

/** Nav-friendly list used by Header / Footer */
export const INDUSTRIES = Object.values(INDUSTRY_PAGES).map((page) => ({
  slug: page.slug,
  label: page.label,
  title: page.label,
  path: `/industries/${page.slug}`,
}))
