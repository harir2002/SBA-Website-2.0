/**
 * Solution Page 1 — Modernize the Core
 * Content blueprint (exact copy). Routes for connected offerings only when they exist.
 */

import heroImage from '../../assets/images/solutions/modernize-the-core-hero.png'

export const SOLUTION_ACCENT = '#E7000B'

export const MODERNIZE_THE_CORE = {
  slug: 'modernize-the-core',
  path: '/solutions/modernize-the-core',
  template: 'modernize-the-core',
  label: 'Modernize the Core',
  seoTitle:
    'Modernize the Core | Data Center, Hybrid Cloud & Infrastructure Transformation | SBA Info Solutions',
  metaDescription:
    'Transform legacy infrastructure into an agile, cloud-ready foundation. SBA delivers compute, storage, HCI, hybrid cloud, virtualization, and zero-downtime workload migrations.',
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'engagement-journey', label: 'Engagement Journey' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-an-architect', label: 'Talk to an Architect' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Abstract visualization of legacy infrastructure transforming into modular cloud-native platforms with SBA red data paths',
    eyebrow: 'Modernize the Core',
    title: 'Engineer a High-Performance, Resilient Technology Foundation',
    subtitle: 'Modernized around the workloads your business cannot afford to interrupt.',
    body: "Legacy systems shouldn't hold back tomorrow's ambitions. We re-engineer your technology foundation—from high-performance compute and storage to hybrid cloud and container platforms—delivering cloud-like agility, enterprise stability, and zero-downtime execution.",
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
    credibility: [
      { value: '30+', label: 'Years of Enterprise Trust' },
      { value: '300+', label: 'Enterprise Clients' },
      { value: 'Enduring', label: 'Client Partnerships' },
    ],
  },
  overview: {
    eyebrow: 'THE MODERNIZATION CHALLENGE',
    headline: 'The Cost of Fragile Legacy Foundations',
    body: 'Enterprises face a growing dilemma: legacy monolithic architectures, aging hardware, and fragmented virtualization environments create operational bottlenecks and escalating licensing costs. Yet, rushing into public cloud without workload-specific planning leads to cost overruns and unpredictable latency. Modernization must be engineered with surgical precision—ensuring performance, security, and continuity at every stage.',
    cards: [
      {
        painTitle: 'Legacy Debt & Licensing Lock-in',
        painCopy: 'Aging proprietary platforms stall digital velocity.',
        resolution:
          'SBA modernizes compute/storage with hyperconverged architectures and containerized scale.',
      },
      {
        painTitle: 'Migration & Downtime Risk',
        painCopy: 'Complex databases and core ERP systems cannot pause.',
        resolution:
          'SBA executes phased, risk-free OS and database transitions with proven rollback mechanisms.',
      },
      {
        painTitle: 'Hybrid Cloud Disconnection',
        painCopy: 'Siloed on-premise infrastructure fails to integrate with public cloud.',
        resolution:
          'SBA builds unified hybrid landing zones, policy guardrails, and automated workload mobility.',
      },
    ],
  },
  pillars: {
    eyebrow: 'MODERNIZE THE CORE',
    headline: 'Three architectural pillars for a modern enterprise foundation.',
    items: [
      {
        title: 'Data Center & Hybrid Cloud',
        summary:
          'Scalable compute, storage, and landing zones built for enterprise scale.',
        capabilities: [
          {
            title: 'Compute, Storage & HCI Modernization',
            body: 'Right-sized, high-density infrastructure optimized for core applications, relational databases, real-time analytics, and virtual workloads.',
          },
          {
            title: 'Data Center Transformation',
            body: 'End-to-end upgrades spanning high-performance servers, SAN/NAS storage, virtualization layers, rack architectures, smart power/cooling, and network readiness.',
          },
          {
            title: 'Hybrid Cloud Enablement',
            body: 'Seamlessly connect on-premises data centers with AWS, Azure, and GCP for controlled scalability, workload flexibility, and unified governance.',
          },
        ],
      },
      {
        title: 'Platforms & Workload Mobility',
        summary:
          'Containerized scale and automated application migration without disruption.',
        capabilities: [
          {
            title: 'Virtualization & Container Platforms',
            body: 'Enterprise-grade platform engineering utilizing VMware, Nutanix, Kubernetes, and Red Hat OpenShift.',
          },
          {
            title: 'Workload Migration & Transformation',
            body: 'Frictionless migrations across operating systems, complex databases (Oracle/SQL/PostgreSQL), storage fabrics, and cloud platforms.',
          },
          {
            title: 'Cloud Foundation & Automation',
            body: 'Secure cloud landing zones, Infrastructure as Code (IaC), automated deployment pipelines, and centralized compliance guardrails.',
          },
        ],
      },
      {
        title: 'Reliability & Resilience Engineering',
        summary:
          'Built-in observability, capacity design, and continuous operational health.',
        capabilities: [
          {
            title: 'Performance, Capacity & Availability Design',
            body: 'High-availability architectures engineered around workload behavior, transactional velocity, and business criticality.',
          },
          {
            title: 'Full-Stack Observability & Health',
            body: 'Deep telemetry and proactive health monitoring across servers, SAN storage, clusters, and hybrid cloud environments.',
          },
          {
            title: 'Continuity-Ready Architecture',
            body: 'High-availability clustering, cross-site disaster recovery integration, aggressive RPO/RTO alignment, and operational runbooks.',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Battle-tested modernization for complex environments.',
    scenarios: [
      {
        title: 'BFSI Core Banking & Insurance Modernization',
        body: 'Upgraded mission-critical legacy IT environments using Enterprise Power servers, all-flash storage, and seamless OS migrations to process massive transaction volumes with zero downtime.',
      },
      {
        title: 'Manufacturing ERP & Infrastructure Migration',
        body: 'Executed complex transitions of legacy Oracle ERP environments to modernized enterprise infrastructure, centralizing engineering design data and smart datacenter operations.',
      },
      {
        title: 'IT/ITES Virtualization & Cloud Data Lakes',
        body: 'Modernized legacy datacenters with advanced HCI and deployed high-speed migration pipelines to Azure Data Lake Storage (ADLS) for big data analytics.',
      },
      {
        title: 'Institutional High-Performance Computing (HPC)',
        body: 'Deployed massive GPU/CPU compute clusters with enterprise Lustre high-speed filesystems, custom power, and liquid cooling for national research institutions.',
      },
    ],
  },
  journey: {
    eyebrow: 'THE SBA ENGAGEMENT JOURNEY',
    headline: 'Modernization engineered from discovery to continuous optimization.',
    steps: [
      {
        title: 'Workload & Infrastructure Discovery',
        body: 'Comprehensive assessment of compute utilization, storage IOPS, application dependencies, network latency, and licensing debt.',
      },
      {
        title: 'Target Architecture & Migration Blueprint',
        body: 'Designing the right-sized hybrid landing zone, HCI configuration, container platform, and phased wave-migration plan.',
      },
      {
        title: 'Zero-Impact Deployment & Migration',
        body: 'Safe execution using automated migration tooling, parallel testing, automated rollbacks, and data integrity validation.',
      },
      {
        title: 'Day-2 Governance & Optimization',
        body: 'Continuous health telemetry, capacity tuning, performance optimization, and operational handover.',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Modernize the core. Strengthen every layer around it.',
    offerings: [
      {
        title: 'Protect and Recover',
        body: 'Complement core infrastructure with immutable backup, disaster recovery, and perimeter zero-trust security.',
        href: null,
      },
      {
        title: 'Operate with Assurance',
        body: '24x7 infrastructure monitoring, database administration, and SLA-driven L1-L3 support.',
        href: null,
      },
      {
        title: 'Build and Connect',
        body: 'Modernize application codebases into cloud-native microservices running on your new infrastructure.',
        href: null,
      },
    ],
  },
  cta: {
    eyebrow: 'READY TO MODERNIZE?',
    headline: 'Build an Infrastructure Foundation That Never Slows Down',
    body: 'Talk to our senior enterprise architects to assess your current workloads and design a modernization path tailored to your budget and uptime requirements.',
    submitLabel: 'Request a Technical Assessment',
    tagline: 'Engineering the modern, secure, and intelligent enterprise.',
  },
}

export function getSolutionBySlug(slug) {
  if (slug === MODERNIZE_THE_CORE.slug) return MODERNIZE_THE_CORE
  return null
}
