/**
 * Solution Page 2 — Protect and Recover
 * Brand colours: red #E7000B · white #FFFFFF · black #000000
 */

import heroImage from '../../assets/images/solutions/protect-and-recover-hero.png'
import { SOLUTION_ACCENT } from './modernizeTheCore'

export const PROTECT_ACCENT = SOLUTION_ACCENT // #E7000B

export const PROTECT_AND_RECOVER = {
  slug: 'protect-and-recover',
  path: '/solutions/protect-and-recover',
  template: 'protect-and-recover',
  label: 'Protect and Recover',
  seoTitle:
    'Protect and Recover | Cyber Resilience, Zero Trust & Clean Recovery | SBA Info Solutions',
  metaDescription:
    'Secure every layer of the enterprise and maintain a tested, accountable path to recover critical business services when disruption occurs. Explore zero trust, threat response, and immutable clean recovery.',
  accent: PROTECT_ACCENT,
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'resilience-assurance', label: 'Resilience Assurance' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-a-security-expert', label: 'Talk to a Security Expert' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Layered enterprise cyber-resilience architecture with immutable recovery vault',
    eyebrow: 'Protect and Recover',
    title: 'Secure Every Layer. Guarantee Business Continuity',
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
  },
  overview: {
    eyebrow: 'THE RESILIENCE REALITY',
    headline: 'Prevention Is Critical. Recovery Is Non-Negotiable.',
    body: 'Modern enterprise perimeters are borderless. With distributed hybrid clouds, remote workforces, and sophisticated ransomware variants targeting backup repositories directly, traditional security tools alone are insufficient. If an attack bypasses the perimeter, organizations without an isolated, immutable clean-recovery environment face catastrophic operational downtime and regulatory penalties.',
    cards: [
      {
        painTitle: 'Ransomware Targeting Backups',
        painCopy: 'Attackers encrypt production and backup storage simultaneously.',
        resolution:
          'SBA implements air-gapped, immutable vaults that are mathematically write-locked and tamper-proof.',
      },
      {
        painTitle: 'Unvalidated Disaster Recovery',
        painCopy: 'DR plans look great on paper but fail during live incidents.',
        resolution:
          'SBA delivers continuous, automated recovery orchestration and quarterly validation drills backed by SLAs.',
      },
      {
        painTitle: 'Fragmented Security Point-Tools',
        painCopy: 'Blind spots between endpoints, networks, and cloud workloads.',
        resolution:
          'SBA integrates zero-trust access, centralized identity governance, and 24x7 MDR threat hunting into a unified posture.',
      },
    ],
  },
  pillars: {
    eyebrow: 'PROTECT AND RECOVER',
    headline: 'Three architectural pillars for enterprise cyber resilience.',
    items: [
      {
        title: 'Secure Access & Digital Perimeter',
        summary:
          'Zero-trust architecture, identity governance, and hardened application perimeters.',
        capabilities: [
          {
            title: 'Network, Cloud & Application Protection',
            body: 'Enterprise deployment of Next-Generation Firewalls (NGFW), Web Application Firewalls (WAF), micro-segmentation (VMware NSX), and cloud-native security postures.',
          },
          {
            title: 'Identity-Led Security',
            body: 'Enterprise Identity and Access Management (IAM), Single Sign-On (SSO), Privileged Access Management (PAM), and strict zero-trust access policies.',
          },
          {
            title: 'Secure-by-Design Delivery',
            body: 'Continuous vulnerability assessments, penetration testing, threat modeling, and automated application-security checks integrated into DevSecOps release cycles.',
          },
        ],
      },
      {
        title: 'Threat Detection & Response',
        summary:
          '24x7 proactive threat hunting, incident triage, and automated containment.',
        capabilities: [
          {
            title: '24x7 Security Monitoring (MDR)',
            body: 'Continuous Security Operations Center (SOC) coverage, Managed Detection & Response, endpoint telemetry (EDR/XDR), and centralized log analytics.',
          },
          {
            title: 'Investigation & Containment',
            body: 'Rapid alert prioritization, automated forensic analysis, coordinated containment playbooks, and root-cause remediation.',
          },
          {
            title: 'Risk Posture & Assurance',
            body: 'Comprehensive ransomware-readiness reviews, zero-trust maturity assessments, continuous vulnerability management, and regulatory alignment (CERT-In, ISO 27001, RBI/IRDAI).',
          },
        ],
      },
      {
        title: 'Cyber Recovery & Continuity',
        summary:
          'Immutable storage, isolated clean recovery environments, and validated DR orchestration.',
        capabilities: [
          {
            title: 'Resilient Data Protection',
            body: 'Policy-driven, enterprise-wide managed backup across on-premises datacenters, virtual environments, and multi-cloud SaaS platforms.',
          },
          {
            title: 'Clean Recovery Architecture',
            body: 'Air-gapped, immutable storage vaults and isolated recovery environments (IRE) engineered to restore clean system states without reinfecting the production estate.',
          },
          {
            title: 'Tested Continuity Operations',
            body: 'Automated disaster-recovery orchestration, RTO/RPO alignment with business criticality, live failover rehearsals, and board-ready recovery assurance reporting.',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Battle-tested cyber resilience for critical environments.',
    scenarios: [
      {
        title: 'BFSI Perimeter Defense & Zero-Trust Governance',
        body: 'Hardened perimeter defenses for banking institutions with high-capacity firewalls, WAF, centralized identity governance, database activity monitoring, and integrated DR to guarantee regulatory compliance and uptime.',
      },
      {
        title: 'Manufacturing Network Segmentation & Fleet Defense',
        body: 'Deployed VMware NSX micro-segmentation across massive manufacturing production floors, securing distributed pan-India endpoint fleets and critical ERP backup environments.',
      },
      {
        title: 'IT/ITES Proactive Threat Defense',
        body: 'Maintained 24x7 SOC monitoring, endpoint telemetry, and log analytics across high-density hybrid cloud environments, neutralizing vulnerabilities before business impact.',
      },
      {
        title: 'Institutional Resilience & Recovery Assurance',
        body: 'Designed and operated air-gapped immutable recovery vaults and automated disaster-recovery failovers for critical research data and municipal infrastructure.',
      },
    ],
  },
  resilience: {
    eyebrow: 'THE SBA RECOVERY ASSURANCE FRAMEWORK',
    headline: 'Engineer recovery before disruption occurs.',
    zones: [
      {
        id: 'perimeter',
        label: 'Perimeter',
        detail:
          'Zero-trust access, identity governance, network segmentation, and hardened application boundaries reduce attack pathways.',
      },
      {
        id: 'detection',
        label: 'Detection',
        detail:
          '24x7 monitoring, endpoint telemetry, log analytics, threat hunting, and containment playbooks identify and stop suspicious activity fast.',
      },
      {
        id: 'immutable-vault',
        label: 'Immutable Vault',
        detail:
          'Air-gapped, write-locked data protection preserves verified recovery points beyond the reach of production compromise.',
      },
      {
        id: 'ire',
        label: 'Isolated Recovery Environment',
        detail:
          'A clean, controlled restoration environment enables validated recovery without reinfecting production systems.',
      },
    ],
    steps: [
      {
        title: 'Posture Assessment & Threat Modeling',
        body: 'Identifying critical data paths, compliance requirements, RTO/RPO mandates, and vulnerable legacy perimeters.',
      },
      {
        title: 'Zero-Trust & Vault Architecture',
        body: 'Implementing micro-segmentation, identity controls, and immutable, write-locked air-gapped data vaults.',
      },
      {
        title: 'Automated DR Orchestration',
        body: 'Scripting non-disruptive failovers, recovery runbooks, and isolated clean-room restoration pipelines.',
      },
      {
        title: 'Continuous Resilience Drills',
        body: 'Regular simulated recovery drills and executive readiness reporting to prove recovery capabilities ahead of real-world crises.',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Protect today. Strengthen the enterprise for tomorrow.',
    offerings: [
      {
        title: 'Modernize the Core',
        body: 'Re-platform your core infrastructure and hybrid cloud to support built-in resilience.',
        href: '/solutions/modernize-the-core',
      },
      {
        title: 'Operate with Assurance',
        body: '24x7 Managed SOC, threat monitoring, and SLA-backed backup administration.',
        href: null,
      },
      {
        title: 'Accelerate Business AI (Ethana)',
        body: 'Protect AI pipelines, guard against prompt injection, and enforce AI governance and PII masking.',
        href: null,
      },
    ],
  },
  cta: {
    eyebrow: 'STRENGTHEN YOUR CYBER POSTURE',
    headline: 'Be Prepared to Withstand Disruption and Recover Immediately.',
    body: 'Connect with our senior cybersecurity and resilience architects for an objective assessment of your backup immutability, zero-trust readiness, and disaster-recovery capabilities.',
    tagline: true,
  },
}
