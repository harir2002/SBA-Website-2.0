/**
 * Solution Page 5 — Operate with Assurance
 * Brand: red #E7000B · white #FFFFFF · black #000000
 * Matches shared solution-page format (compact hero + footer form CTA).
 */

import heroImage from '../../assets/images/solutions/operate-with-assurance-hero.png'
import { SOLUTION_ACCENT } from './modernizeTheCore'

export const OPERATE_ACCENT = SOLUTION_ACCENT

export const OPERATE_WITH_ASSURANCE = {
  slug: 'operate-with-assurance',
  path: '/solutions/operate-with-assurance',
  template: 'operate-with-assurance',
  label: 'Operate with Assurance',
  seoTitle:
    'Operate with Assurance | Managed Services, 24x7 SOC, NOC & Cloud Operations | SBA Info Solutions',
  metaDescription:
    'Keep users productive, platforms available, and recovery capabilities ready through SLA-backed 24x7 managed operations, intelligent AIOps, and clear accountability.',
  accent: OPERATE_ACCENT,
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'operational-framework', label: 'Operational Framework' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-an-operations-lead', label: 'Talk to an Operations Lead' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Enterprise operations observability architecture with SLA health telemetry and automated remediation signals',
    eyebrow: 'Operate with Assurance',
    title:
      'Keep users productive, platforms available, and recovery capabilities ready through SLA-backed operations, intelligent automation, and clear accountability',
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
  },
  overview: {
    eyebrow: 'THE OPERATIONAL BOTTLENECK',
    headline: 'The Friction of Fragmented Operations and Alert Fatigue',
    body: 'Internal IT teams are overwhelmed by operational firefighting: thousands of unprioritized monitoring alerts, escalating cloud costs, distributed endpoint sprawl, and fragmented support vendors. When incidents occur, multiple point-vendors pass the blame while business operations stall. Enterprises need an accountable managed services partner that takes full ownership of day-to-day stability.',
    cards: [
      {
        painTitle: 'Alert Storms & Reactive Support',
        painCopy: 'Engineers waste hours triaging false alarms and duplicate tickets.',
        resolution:
          'SBA implements AIOps to suppress noise and trigger automated self-healing workflows.',
      },
      {
        painTitle: 'Unmonitored Security & Backup Gaps',
        painCopy: 'Stealth breaches go undetected and backup failures are noticed only during disasters.',
        resolution:
          'SBA maintains continuous 24x7 MDR threat monitoring and quarterly DR recovery drills.',
      },
      {
        painTitle: 'Escalating Cloud & Database Costs',
        painCopy: 'Unmanaged cloud sprawl and unoptimized database queries drain IT budgets.',
        resolution:
          'SBA delivers proactive FinOps governance, capacity planning, and automated rightsizing.',
      },
    ],
  },
  pillars: {
    eyebrow: 'OPERATE WITH ASSURANCE',
    headline: 'Three operational pillars for accountable enterprise stability.',
    items: [
      {
        title: 'Digital Workplace & Collaboration',
        summary:
          'Zero-touch provisioning, endpoint lifecycle management, and AI-powered service desks.',
        capabilities: [
          {
            title: 'Managed Desktop & Endpoint Operations',
            body: 'Full lifecycle endpoint management, automated OS/software provisioning, zero-touch deployment, remote-user support, and SLA-backed hardware fleet management.',
          },
          {
            title: 'Messaging, Retention & Compliance',
            body: 'Enterprise email administration (M365/Google Workspace), collaboration platform support, compliance archiving, eDiscovery, and retention governance.',
          },
          {
            title: 'AI-Powered Service Desk',
            body: 'Intelligent ASK IT copilots for instant L1 request resolution, agent-assist triage tools, automated ticketing workflows, and real-time SLA performance analytics.',
          },
        ],
      },
      {
        title: 'Infrastructure & Cloud Operations',
        summary:
          '24x7 NOC monitoring, multi-cloud FinOps governance, and AIOps observability.',
        capabilities: [
          {
            title: '24x7 Infrastructure Operations',
            body: 'Round-the-clock monitoring and administration across on-premises datacenters, enterprise servers, SAN storage, hypervisors, and network switches.',
          },
          {
            title: 'Cloud & Database Assurance',
            body: 'Managed AWS, Azure, and GCP operations; proactive database administration (DBA), query performance tuning, capacity forecasting, and FinOps cost governance.',
          },
          {
            title: 'AIOps & Full-Stack Observability',
            body: 'AI-assisted alert-storm suppression, centralized telemetry (Nagios XI, Prometheus, Datadog), predictive anomaly detection, and automated incident remediation.',
          },
        ],
      },
      {
        title: 'Managed SecOps & Recovery Ops',
        summary:
          '24x7 SOC monitoring, automated threat containment, and continuous DR validation.',
        capabilities: [
          {
            title: 'Managed Detection & Response (MDR)',
            body: '24x7 SOC surveillance, XDR endpoint-security monitoring, security log aggregation, early-warning threat detection, and rapid incident triage.',
          },
          {
            title: 'Security Automation & Posture Management',
            body: 'Automated SOAR response playbooks, forensic analysis support, continuous vulnerability scanning, and regulatory posture enforcement.',
          },
          {
            title: 'Backup, DR & Clean-Recovery Operations',
            body: 'SLA-backed daily backup administration, retention policy enforcement, quarterly DR failover rehearsals, and isolated recovery-readiness assurance.',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Managed operations built for critical business environments.',
    scenarios: [
      {
        title: '24x7 Global Production Monitoring in Manufacturing',
        body: 'Deployed Nagios XI and centralized log management across distributed plant sites and application clusters, maintaining uninterrupted production uptime.',
      },
      {
        title: 'BFSI Unified DR & Endpoint Cluster Monitoring',
        body: 'Managing remote infrastructure, core banking endpoints, and quarterly disaster recovery failover validation for leading financial institutions.',
      },
      {
        title: 'Full-Stack Managed IT Operations for IT/ITES',
        body: 'Delivering 24x7 infrastructure support, automated DevOps monitoring, and continuous SOC posture enforcement for high-growth tech firms.',
      },
      {
        title: 'End-to-End Workplace & Datacenter Operations for Construction',
        body: 'Managed distributed desktop hardware fleets, on-site infrastructure health, and immutable cyber recovery for large infrastructure conglomerates.',
      },
    ],
  },
  mid: {
    eyebrow: 'THE SBA SLA-DRIVEN OPERATIONAL GOVERNANCE MODEL',
    headline: 'From telemetry to accountability, 24x7',
    mapLabel: '24x7 Operations Command Center',
    cycleLabel: 'Operational cycle',
    sectionId: 'operational-framework',
    zones: [
      {
        id: 'digital-workplace',
        label: 'Digital Workplace',
        detail:
          'Manage endpoint lifecycles, remote-user support, collaboration services, ticket workflows, and SLA visibility across distributed workforces',
      },
      {
        id: 'cloud-noc',
        label: 'Cloud NOC',
        detail:
          'Monitor infrastructure, cloud workloads, networks, databases, capacity, and service availability with proactive performance and FinOps governance',
      },
      {
        id: 'managed-soc',
        label: 'Managed SOC',
        detail:
          'Provide continuous threat monitoring, endpoint telemetry, log analysis, automated containment playbooks, and security posture enforcement',
      },
      {
        id: 'recovery-ops',
        label: 'Recovery Ops',
        detail:
          'Administer backups, validate retention, coordinate quarterly DR rehearsals, and maintain isolated clean-recovery readiness',
      },
    ],
    steps: [
      {
        title: 'Continuous Telemetry & Monitoring',
        body: 'Ingesting metrics, logs, and security events across workplace endpoints, cloud instances, and datacenters',
      },
      {
        title: 'AIOps Noise Reduction & Triage',
        body: 'Filtering false alarms, correlating root causes, and automatically routing critical incidents to dedicated L1-L3 engineers',
      },
      {
        title: 'SLA-Backed Incident Resolution',
        body: 'Executing rapid containment and remediation playbooks within strict contractual resolution windows',
      },
      {
        title: 'Continuous Optimization & Reporting',
        body: 'Monthly board-ready service reviews, FinOps cloud cost recommendations, and quarterly DR validation reports',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Operate with confidence on a resilient enterprise foundation.',
    offerings: [
      {
        title: 'Modernize the Core',
        body: 'Seamlessly transition newly modernized infrastructure into 24x7 managed operations.',
        href: '/solutions/modernize-the-core',
      },
      {
        title: 'Protect and Recover',
        body: 'Strengthen operations with managed clean recovery and continuous SOC monitoring.',
        href: '/solutions/protect-and-recover',
      },
      {
        title: 'Build and Connect',
        body: 'Provide SLA-driven L1/L2 application support and automated DevOps pipeline maintenance.',
        href: '/solutions/build-and-connect',
      },
    ],
  },
  cta: {
    eyebrow: 'ELEVATE YOUR OPERATIONAL ASSURANCE',
    headline: 'Gain 24x7 Enterprise Stability and Board-Ready Visibility.',
    body: 'Connect with our managed services leads to evaluate your current operational coverage, reduce alert fatigue, and establish rigorous SLA-backed governance.',
    submitLabel: 'Talk to an Operations Lead',
    tagline: true,
  },
}
