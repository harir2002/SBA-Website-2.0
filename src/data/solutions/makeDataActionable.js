/**
 * Solution Page 3 — Make Data Actionable
 * Brand: red #E7000B · white #FFFFFF · black #000000
 * Hero/CTA follow shared solution-page pattern (compact hero + footer form).
 */

import heroImage from '../../assets/images/solutions/make-data-actionable-hero.png'
import { SOLUTION_ACCENT } from './modernizeTheCore'

export const MAKE_DATA_ACCENT = SOLUTION_ACCENT

export const MAKE_DATA_ACTIONABLE = {
  slug: 'make-data-actionable',
  path: '/solutions/make-data-actionable',
  template: 'make-data-actionable',
  label: 'Make Data Actionable',
  seoTitle:
    'Make Data Actionable | Enterprise Data Platforms, Analytics & Governed AI | SBA Info Solutions',
  metaDescription:
    'Turn fragmented enterprise data into trusted insight, intelligent automation, and governed AI embedded in everyday business workflows. Explore data platforms, pipelines, and AI-driven decision intelligence.',
  accent: MAKE_DATA_ACCENT,
  anchors: [
    { id: 'overview', label: 'Overview' },
    { id: 'pillars', label: 'Pillars' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'data-to-ai-blueprint', label: 'Data-to-AI Blueprint' },
    { id: 'why-sba', label: 'Why SBA' },
    { id: 'talk-to-a-data-architect', label: 'Talk to a Data Architect' },
  ],
  hero: {
    image: heroImage,
    imageAlt:
      'Enterprise data topology transforming fragmented data into governed decision intelligence',
    eyebrow: 'Make Data Actionable',
    title: 'Turn Fragmented Enterprise Data into Actionable Intelligence',
    primaryCta: {
      label: "Let's Connect",
      href: '#contact',
    },
    secondaryCta: null,
  },
  overview: {
    eyebrow: 'THE ENTERPRISE DATA BOTTLENECK',
    headline: 'Drowning in Information. Starved for Trusted Intelligence.',
    body: 'Most enterprises have vast amounts of data, but it is locked in departmental silos, legacy databases, unstructured documents, and unmonitored communication streams. Without a unified data foundation, business decisions remain slow, reporting is retrospective, and AI initiatives fail due to poor data quality, hallucination risks, and lack of governance.',
    cards: [
      {
        painTitle: 'Fragmented Silos & Data Debt',
        painCopy: 'Critical records trapped across disconnected ERPs, CRMs, and core DBs.',
        resolution:
          'SBA designs unified lakehouses, modern data fabrics, and automated streaming pipelines.',
      },
      {
        painTitle: 'Unstructured Data Blind Spots',
        painCopy: 'Contracts, tickets, and call records remain unusable for analytics.',
        resolution:
          'SBA deploys cognitive document extraction, multilingual sentiment models, and vector search.',
      },
      {
        painTitle: 'Ungoverned AI & Shadow Tools',
        painCopy: 'Teams adopt unvetted GenAI tools with security and compliance exposure.',
        resolution:
          'SBA implements enterprise-grade RAG, fine-grained access policies, and audit-ready AI guardrails.',
      },
    ],
  },
  pillars: {
    eyebrow: 'MAKE DATA ACTIONABLE',
    headline: 'Three architectural pillars for trusted enterprise intelligence.',
    items: [
      {
        title: 'Trusted Data Foundations',
        summary: 'Scalable lakehouses, streaming pipelines, and clean data governance.',
        capabilities: [
          {
            title: 'Data Platform Modernization',
            body: 'Architecture design and deployment of enterprise data lakes, modern warehouses, lakehouses, data fabrics, and cloud-native data architectures (Azure, AWS, GCP, Snowflake).',
          },
          {
            title: 'Data Integration & Engineering',
            body: 'High-throughput batch and real-time streaming ETL/ELT pipelines, data cleansing, automated schema validation, and feature store engineering.',
          },
          {
            title: 'Data Management & Performance',
            body: 'Mission-critical database migration, performance tuning, automated lifecycle archiving, master data management (MDM), and compliance quality controls.',
          },
        ],
      },
      {
        title: 'Insight & Intelligent Automation',
        summary: 'Real-time dashboards, operational telemetry, and automated extraction.',
        capabilities: [
          {
            title: 'Analytics & Decision Intelligence',
            body: 'Executive business reporting, interactive self-service dashboards, augmented analytics, and legacy BI modernization.',
          },
          {
            title: 'Operational Intelligence',
            body: 'Full-stack log analytics, application telemetry, cloud-cost FinOps insights, and predictive anomaly detection.',
          },
          {
            title: 'Workflow Automation',
            body: 'Cognitive document processing (IDP), classification engines, sentiment analysis, ticket triage, and rules-based automation pipelines.',
          },
        ],
      },
      {
        title: 'Governed AI & Agentic Workflows',
        summary: 'Enterprise RAG, contextual knowledge assistants, and autonomous agents.',
        capabilities: [
          {
            title: 'Enterprise Knowledge AI',
            body: 'Secure Retrieval-Augmented Generation (RAG), private enterprise semantic search, multilingual conversational assistants, and contextual document query engines.',
          },
          {
            title: 'AI-Enabled Business Workflows',
            body: 'Specialized copilots for IT support, HR, finance, procurement, and agentic multi-step task orchestration with human-in-the-loop review.',
          },
          {
            title: 'Responsible AI Delivery',
            body: 'Enterprise model tuning, vector database management, continuous model monitoring, bias detection, data leakage prevention, and regulatory guardrails.',
          },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'ENTERPRISE PROOF IN ACTION',
    headline: 'Data and AI built for real operational outcomes.',
    scenarios: [
      {
        title: 'AI-Powered Medico-Legal Summarization (Pravaah)',
        body: 'Engineered cognitive processing pipelines that extract, structure, and summarize thousands of pages of complex medical and legal case files into verifiable reports in minutes.',
      },
      {
        title: 'Omnichannel Customer Intelligence (Conversax)',
        body: 'Deployed AI-driven contact-center analytics processing millions of voice calls, emails, and WhatsApp chats for automated sentiment scoring and campaign optimization.',
      },
      {
        title: 'Enterprise Data Lake Migration for IT/ITES',
        body: 'Executed seamless, high-speed data migration pipelines to Azure Data Lake Storage (ADLS), modernizing analytics infrastructure for high-velocity telemetry.',
      },
      {
        title: 'Knowledge Search & Copilots in Real Estate',
        body: 'Deployed conversational search AI and project-management assistants that index project blueprints, vendor contracts, and engineering schedules to eliminate cross-team friction.',
      },
    ],
  },
  blueprint: {
    eyebrow: 'THE SBA DATA-TO-INTELLIGENCE LIFECYCLE',
    headline: 'From disconnected data to governed intelligence in four stages.',
    stages: [
      {
        id: 'data-fabric',
        navLabel: 'Data Fabric',
        label: 'Ingest & Unify',
        detail:
          'Connecting distributed databases, structured transactions, and unstructured documents into an governed data platform.',
      },
      {
        id: 'ingestion-engine',
        navLabel: 'Ingestion Engine',
        label: 'Transform & Enrich',
        detail:
          'Cleaning, cataloging, vectorizing, and enforcing data quality policies across all pipeline stages.',
      },
      {
        id: 'decision-intelligence',
        navLabel: 'Decision Intelligence',
        label: 'Analyze & Predict',
        detail:
          'Deploying self-service analytics models, real-time streaming dashboards, and predictive operational telemetry.',
      },
      {
        id: 'agentic-copilots',
        navLabel: 'Agentic Copilots',
        label: 'Activate & Automate',
        detail:
          'Embedding task-specific AI copilots and autonomous agentic workflows directly into everyday enterprise tools.',
      },
    ],
  },
  whySba: {
    eyebrow: 'CONNECTED OFFERINGS',
    headline: 'Build data intelligence on a foundation designed to scale.',
    offerings: [
      {
        title: 'Modernize the Core',
        body: 'Ensure high-performance compute and cloud storage infrastructure to host data platforms.',
        href: '/solutions/modernize-the-core',
      },
      {
        title: 'Protect and Recover',
        body: 'Protect data lakes with immutable backups and enforce zero-trust data access governance.',
        href: '/solutions/protect-and-recover',
      },
      {
        title: 'Accelerate Business AI',
        body: 'Leverage ready-made AI platforms like Conversax, Pravaah, and Ethana for immediate time-to-value.',
        href: null,
      },
    ],
  },
  cta: {
    eyebrow: 'ACTIVATE YOUR DATA',
    headline: 'Turn Enterprise Information into Your Strongest Competitive Advantage.',
    body: 'Speak with our data engineers and AI architects to map out a clear blueprint from fragmented data sources to production-grade, governed enterprise AI.',
    tagline: true,
  },
}
