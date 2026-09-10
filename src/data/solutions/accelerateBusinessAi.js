/**
 * Solution Page 6 — Accelerate Business AI
 * Same structure/style template as Modernize the Core:
 * Hero → Overview → Pillars → Capabilities → Engagement Journey → Why SBA → CTA
 * Brand: red #E7000B · white #FFFFFF · black #000000
 */

import heroImage from '../../assets/images/solutions/accelerate-business-ai-hero.png'
import { SOLUTION_ACCENT } from './modernizeTheCore'

export const ACCELERATE_ACCENT = SOLUTION_ACCENT

export const ACCELERATE_BUSINESS_AI = {
  slug: 'accelerate-business-ai',
  path: '/solutions/accelerate-business-ai',
  template: 'accelerate-business-ai',
  label: 'Accelerate Business AI',
  seoTitle:
    'Accelerate Business AI | Enterprise AI Platforms, Accelerators & Governed Copilots | SBA Info Solutions',
  metaDescription:
    'Pre-built, domain-specific AI platforms and accelerators engineered for rapid time-to-value. Deploy Conversax.ai, Pravaah, Ethana, and governed enterprise knowledge copilots with built-in security.',
  accent: ACCELERATE_ACCENT,
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'engagement-journey', label: 'Engagement Journey' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-an-ai-specialist', label: 'Talk to an AI Specialist' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Governed enterprise AI workflows passing through security controls into business actions',
    eyebrow: 'Accelerate Business AI',
    title:
      'Pre-built, domain-specific AI platforms and managed services engineered to deliver rapid time-to-value',
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
  },
  overview: {
    eyebrow: 'THE ENTERPRISE AI ADOPTION DILEMMA',
    headline: 'Why 80% of Enterprise AI Pilots Fail to Reach Production',
    body: 'Enterprises want AI, but most get trapped in endless Proofs of Concept (PoCs). Building custom LLM pipelines from scratch takes quarters, while ungoverned public AI tools introduce serious data leakage, prompt-injection vulnerabilities, and regulatory compliance risks. To succeed, organizations need pre-engineered, modular AI accelerators that plug directly into existing enterprise data with strict governance from Day 1.',
    cards: [
      {
        painTitle: 'Slow Time-to-Value & High PoC Cost',
        painCopy: 'Custom AI development takes 9–12 months.',
        resolution:
          'SBA deploys pre-built, domain-specific accelerators (Conversax, Pravaah) in weeks.',
      },
      {
        painTitle: 'Data Leakage & Shadow AI Exposure',
        painCopy: 'Employees feed proprietary IP into unvetted public models.',
        resolution:
          'SBA deploys Ethana—an ISO 27001-certified internal AI workspace with automated PII masking.',
      },
      {
        painTitle: 'Hallucinations & Ungoverned Outputs',
        painCopy: 'Models generate unverified answers in critical workflows.',
        resolution:
          'SBA implements enterprise RAG architectures with strict source attribution and human-in-the-loop validation.',
      },
    ],
  },
  pillars: {
    eyebrow: 'ACCELERATE BUSINESS AI',
    headline: 'Three foundations for governed enterprise AI at scale.',
    items: [
      {
        title: 'Customer, Clinical & Knowledge AI',
        summary:
          'Domain-specific conversational engines, cognitive document extraction, and enterprise search.',
        capabilities: [
          {
            title: 'Conversax.ai',
            body: 'Omnichannel contact-center modernization across voice, WhatsApp, webchat, and email—utilizing Indian-accent speech AI, real-time intent detection, and automated conversation scoring.',
          },
          {
            title: 'Pravaah',
            body: 'AI-driven medical transcription, clinical workflow automation, and medico-legal document summarization that drastically reduces documentation effort.',
          },
          {
            title: 'Enterprise Knowledge AI',
            body: 'Secure Retrieval-Augmented Generation (RAG) and private conversational assistants that index enterprise policies, SOPs, contracts, and knowledge repositories.',
          },
        ],
      },
      {
        title: 'Platform Reliability & Observability AI',
        summary:
          'Intelligent SRE operations, automated workload migration, and SLA-backed resilience.',
        capabilities: [
          {
            title: 'Pulse Pilot',
            body: 'Full-stack observability and Site Reliability Engineering (SRE) support with proactive incident prevention, AI-powered root-cause analysis, and alert-storm suppression.',
          },
          {
            title: 'Quantum Leap',
            body: 'Rapid automated migration of legacy virtualized workloads to cloud-native, containerized, Kubernetes-managed platforms.',
          },
          {
            title: 'SBA Continuum',
            body: 'SLA-backed enterprise cyber resilience combining backup operations, immutable recovery, DR failover orchestration, and business-continuity governance.',
          },
        ],
      },
      {
        title: 'AI Security, Governance & Controls',
        summary:
          'LLM red-teaming, PII masking, shadow AI prevention, and regulatory guardrails.',
        capabilities: [
          {
            title: 'AI Security Services',
            body: 'Comprehensive vulnerability assessment and red-team testing of LLMs, RAG systems, and AI supply chains—aligned with the OWASP Top 10 for LLMs to prevent prompt injection and data poisoning.',
          },
          {
            title: 'Ethana (Internal AI Workspace & Control)',
            body: 'An ISO 27001-certified internal AI workspace providing approved GenAI access, real-time PII masking, cost tracking, and complete visibility into shadow-AI activity.',
          },
          {
            title: 'Responsible AI & Audit Governance',
            body: 'Model monitoring for drift, explainability frameworks, bias detection, and compliance auditing for regulated industries (BFSI, Healthcare).',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Pre-built accelerators for faster enterprise AI outcomes.',
    scenarios: [
      {
        title: 'Conversax.ai',
        body: 'Omnichannel contact-center modernization across voice, WhatsApp, webchat, and email—utilizing Indian-accent speech AI, real-time intent detection, and automated conversation scoring',
      },
      {
        title: 'Pravaah',
        body: 'AI-driven medical transcription, clinical workflow automation, and medico-legal document summarization that drastically reduces documentation effort',
      },
      {
        title: 'Pulse Pilot',
        body: 'Full-stack observability and Site Reliability Engineering (SRE) support with proactive incident prevention, AI-powered root-cause analysis, and alert-storm suppression',
      },
      {
        title: 'Ethana',
        body: 'An ISO 27001-certified internal AI workspace providing approved GenAI access, real-time PII masking, cost tracking, and complete visibility into shadow-AI activity',
      },
    ],
  },
  mid: {
    eyebrow: 'THE SBA FAST-TRACK AI DEPLOYMENT JOURNEY',
    headline: 'Move from high-value AI use case to governed production deployment',
    mapLabel: 'Enterprise AI Capability Map',
    cycleLabel: 'AI deployment journey',
    sectionId: 'engagement-journey',
    zones: [
      {
        id: 'data-readiness',
        label: 'Data Readiness',
        detail:
          'Assess source systems, knowledge repositories, and vector-ready datasets so accelerators can ground answers in trusted enterprise content',
      },
      {
        id: 'model-platform',
        label: 'Model & Platform',
        detail:
          'Align Conversax, Pravaah, Pulse Pilot, and Ethana to the right workflows with secure sandboxed proof-of-value environments',
      },
      {
        id: 'governance',
        label: 'Governance & Control',
        detail:
          'Apply SSO, PII masking, OWASP guardrails, responsible-AI monitoring, and audit controls for regulated industries',
      },
      {
        id: 'activation',
        label: 'Activation',
        detail:
          'Integrate AI pipelines with ERP, CRM, and ITSM backbones, then sustain accuracy, latency, and cost governance in production',
      },
    ],
    steps: [
      {
        title: 'Use Case & Security Discovery',
        body: 'Identifying high-ROI business workflows, data readiness, regulatory boundaries, and security policies',
      },
      {
        title: 'Accelerator Alignment & PoV',
        body: 'Deploying a pre-engineered accelerator (Conversax, Pravaah, or Ethana) on your data in a secure, sandboxed environment',
      },
      {
        title: 'Production Integration & Hardening',
        body: 'Connecting AI pipelines with enterprise ERP/CRM/ITSM backbones, configuring SSO, and applying OWASP security guardrails',
      },
      {
        title: 'Sustained Governance & Model Operations',
        body: 'Continuous monitoring for accuracy, latency optimization, cost governance, and regular model updates',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Accelerate AI on foundations built for security and scale.',
    offerings: [
      {
        title: 'Make Data Actionable',
        body: 'Build the enterprise lakehouse, vector databases, and data pipelines that feed your AI models.',
        href: '/solutions/make-data-actionable',
      },
      {
        title: 'Modernize the Core',
        body: 'Ensure high-performance compute and GPU clusters to run demanding AI inference workloads.',
        href: '/solutions/modernize-the-core',
      },
      {
        title: 'Protect and Recover',
        body: 'Defend enterprise AI supply chains and maintain immutable backups of critical data assets.',
        href: '/solutions/protect-and-recover',
      },
    ],
  },
  cta: {
    eyebrow: 'START SMALL. SCALE AI WITH CONFIDENCE.',
    headline: 'Put Governed Enterprise AI to Work in Weeks, Not Years.',
    body: 'Speak with our certified AI solution architects to test our pre-built accelerators on your data and map out an ethical, governed AI roadmap.',
    submitLabel: 'Talk to an AI Specialist',
    tagline: true,
  },
}
