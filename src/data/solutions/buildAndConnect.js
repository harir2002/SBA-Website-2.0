/**
 * Solution Page 4 — Build and Connect
 * Brand: red #E7000B · white #FFFFFF · black #000000
 * Matches shared solution-page format (compact hero + footer form CTA).
 */

import heroImage from '../../assets/images/solutions/build-and-connect-hero.png'
import { SOLUTION_ACCENT } from './modernizeTheCore'

export const BUILD_CONNECT_ACCENT = SOLUTION_ACCENT

export const BUILD_AND_CONNECT = {
  slug: 'build-and-connect',
  path: '/solutions/build-and-connect',
  template: 'build-and-connect',
  label: 'Build and Connect',
  seoTitle:
    'Build and Connect | Digital Product Engineering, App Modernization & Integration | SBA Info Solutions',
  metaDescription:
    'Reduce digital friction by modernizing critical applications, delivering secure cloud-native digital products, and connecting enterprise workflows via API-led integrations and DevSecOps.',
  accent: BUILD_CONNECT_ACCENT,
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'engineering-blueprint', label: 'Engineering Blueprint' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-an-engineering-lead', label: 'Talk to an Engineering Lead' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Digital engineering architecture connecting legacy applications, APIs, microservices, and DevSecOps delivery',
    eyebrow: 'Build and Connect',
    title:
      'Reduce digital friction by modernizing critical applications, delivering secure digital products, and connecting workflows across the enterprise',
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
  },
  overview: {
    eyebrow: 'THE APPLICATION & INTEGRATION CHALLENGE',
    headline: 'The High Cost of Monolithic Silos and Vendor Fragmentation',
    body: 'Enterprises face a dual challenge: aging legacy codebases slow down feature delivery and increase maintenance costs, while point-to-point integrations create fragile, unmanageable spaghetti architecture. Furthermore, managing separate vendors for software engineering, cloud infrastructure, and cybersecurity leads to endless finger-pointing during outages. Digital engineering requires a unified, full-stack partner.',
    cards: [
      {
        painTitle: 'Monolithic Drag & Technical Debt',
        painCopy: 'Legacy architectures resist rapid updates and modern user experiences.',
        resolution:
          'SBA refactors monoliths into agile, modular microservices and modern APIs.',
      },
      {
        painTitle: 'Fragile Point-to-Point Integrations',
        painCopy: 'Disconnected ERP, CRM, HRMS, and ITSM platforms create data silos.',
        resolution:
          'SBA builds resilient API-led integration fabrics and event-driven automation pipelines.',
      },
      {
        painTitle: 'Fragmented Vendor Hand-offs',
        painCopy: 'Software developers ignore infrastructure sizing and security compliance.',
        resolution:
          'SBA delivers end-to-end product engineering with built-in DevSecOps and cloud readiness.',
      },
    ],
  },
  pillars: {
    eyebrow: 'BUILD AND CONNECT',
    headline: 'Three architectural pillars for frictionless digital delivery.',
    items: [
      {
        title: 'Application Renewal & Architecture',
        summary:
          'Modernize monolithic codebases, decouple architectures, and design AI-ready apps.',
        capabilities: [
          {
            title: 'Friction Audit & Modernization Blueprint',
            body: 'Deep-dive workflow analysis, legacy codebase dependency mapping, target cloud-native architecture, and value-led refactoring roadmaps.',
          },
          {
            title: 'Legacy Application Renewal',
            body: 'Monolith decomposition into microservices, container readiness, re-platforming, code refactoring, and database modernization.',
          },
          {
            title: 'AI-Ready Experience Design',
            body: 'Modern UI/UX design, enterprise copilot strategy, retrieval-augmented knowledge interfaces, and contextual workflows embedded in business apps.',
          },
        ],
      },
      {
        title: 'Product Build & Release Engineering',
        summary:
          'Custom enterprise apps, automated CI/CD pipelines, and secure cloud delivery.',
        capabilities: [
          {
            title: 'Cloud-Native Application Delivery',
            body: 'Full-stack enterprise web and mobile applications, REST/GraphQL APIs, microservices, containerized deployments (Kubernetes/Docker), and responsive digital portals.',
          },
          {
            title: 'DevSecOps Delivery Automation',
            body: 'Robust CI/CD pipelines, Infrastructure as Code (Terraform/Ansible), automated unit/regression testing, dependency vulnerability scanning, and automated release gates.',
          },
          {
            title: 'Data & AI Integration Build',
            body: 'Vector database connectivity, LLM API orchestration toolchains, intelligent digital-labor workflows, and unstructured data ingestion pipelines.',
          },
        ],
      },
      {
        title: 'Integration & Workflow Intelligence',
        summary:
          'API-led ecosystem integration, AIOps telemetry, and SLA-driven app operations.',
        capabilities: [
          {
            title: 'Enterprise Systems Integration',
            body: 'API-led integration across ERP (SAP/Oracle), HRMS, LMS, CRM (Salesforce), ITSM (ServiceNow), partner ecosystems, and communication channels.',
          },
          {
            title: 'Application Observability & AIOps',
            body: 'Full-stack APM telemetry, distributed transaction tracing, AI-assisted root-cause analysis, and cloud cost visibility.',
          },
          {
            title: 'SLA-Driven Application Operations',
            body: 'L1-L3 application support, version management, proactive security patching, automated ticket resolution, and continuous feature enhancements.',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Digital engineering built for operational outcomes.',
    scenarios: [
      {
        title: 'Enterprise DevOps Automation for IT/ITES',
        body: 'Designed automated CI/CD and infrastructure deployment pipelines, accelerating digital application releases from months to days with built-in security scans.',
      },
      {
        title: 'Real Estate Workflow & Knowledge Integration',
        body: 'Built and integrated conversational search AI and project-management portals across ERPs and vendor systems, eliminating digital friction for project managers.',
      },
      {
        title: 'Core Banking OS & App Modernization (BFSI)',
        body: 'Modernized legacy financial application workloads, refactoring critical transaction processing for containerized Kubernetes scale with zero disruption.',
      },
      {
        title: 'Manufacturing Centralized Application Storage & Observability',
        body: 'Integrated global engineering and design applications with high-performance storage clusters and 24x7 application telemetry.',
      },
    ],
  },
  mid: {
    eyebrow: 'THE SBA ENGINEERING LIFECYCLE',
    headline: 'From legacy friction to continuously evolving digital products',
    mapLabel: 'Enterprise Ecosystem Integration Map',
    cycleLabel: 'Engineering lifecycle',
    sectionId: 'engineering-blueprint',
    zones: [
      {
        id: 'legacy-core',
        label: 'Legacy Core',
        detail:
          'Audit legacy applications, map technical debt, identify dependencies, and define an incremental modernization pathway',
      },
      {
        id: 'api-gateway',
        label: 'API Gateway',
        detail:
          'Create secure, governed API access that connects internal applications, partners, data services, and enterprise platforms',
      },
      {
        id: 'microservices',
        label: 'Microservices',
        detail:
          'Decouple monolithic functions into modular, scalable application services designed for independent delivery and evolution',
      },
      {
        id: 'devsecops',
        label: 'DevSecOps Pipeline',
        detail:
          'Automate builds, testing, infrastructure provisioning, vulnerability scanning, release gates, and secure deployment workflows',
      },
      {
        id: 'enterprise-saas',
        label: 'Enterprise SaaS',
        detail:
          'Connect modern products with ERP, CRM, HRMS, ITSM, collaboration tools, and external partner ecosystems',
      },
    ],
    steps: [
      {
        title: 'Architecture & Discovery',
        body: 'Auditing current codebase, identifying technical debt, mapping API dependencies, and defining target user experience',
      },
      {
        title: 'Agile Pod Engineering',
        body: 'Deploying dedicated, multi-disciplinary pods (Product Engineers, Cloud Architects, and DevSecOps specialists) for rapid sprint delivery',
      },
      {
        title: 'Automated DevSecOps & Security Hardening',
        body: 'Continuous integration, automated vulnerability scanning, load testing, and zero-downtime blue/green deployment',
      },
      {
        title: 'SLA-Backed Operations & Continuous Evolution',
        body: 'Ongoing application performance monitoring, proactive patching, and iterative feature enhancements',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Build better products on a stronger enterprise foundation.',
    offerings: [
      {
        title: 'Modernize the Core',
        body: 'Deploy applications on resilient, high-performance hybrid cloud and Kubernetes platforms.',
        href: '/solutions/modernize-the-core',
      },
      {
        title: 'Protect and Recover',
        body: 'Hardened application perimeters with WAF, zero-trust IAM, and API vulnerability protection.',
        href: '/solutions/protect-and-recover',
      },
      {
        title: 'Operate with Assurance',
        body: '24x7 SLA-backed application support, L1/L2 incident management, and continuous optimization.',
        href: '/solutions/operate-with-assurance',
      },
    ],
  },
  cta: {
    eyebrow: 'ACCELERATE YOUR PRODUCT ROADMAP',
    headline: 'Build, Modernize, and Scale Without Digital Friction.',
    body: 'Speak with our product engineering leads and cloud architects to modernize legacy applications, build custom digital products, or integrate complex enterprise systems.',
    submitLabel: 'Talk to an Engineering Lead',
    tagline: true,
  },
}
