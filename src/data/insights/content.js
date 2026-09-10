/**
 * Unified Insights library — Case Studies + Blogs.
 * CMS-ready records for /insights, /case-studies, /insights/:slug
 */

import identityArchitectureVisual from '../../assets/images/insights/insights-hero.png'
import architectureVisualGeneric from '../../assets/images/insights/case-studies-hero.png'

function section(heading, body, bullets) {
  return { heading, body: body || null, bullets: bullets || null }
}

const INSIGHT_VISUALS = {
  'air-gapped-openshift-for-ai': {
    thumbnailImage: '/images/insights/accelerating-ai-data-transformation.png',
    thumbnailAlt:
      'Abstract air-gapped platform architecture for GPU-powered AI inside a secure data center',
    heroImage: '/images/insights/accelerating-ai-data-transformation.png',
    heroAlt:
      'Abstract isolated container and GPU compute architecture representing air-gapped OpenShift for AI',
  },
  'one-pane-of-glass-unified-observability': {
    thumbnailImage: '/images/insights/cloud-infrastructure.png',
    thumbnailAlt:
      'Abstract hybrid observability architecture across platforms and virtual machines',
    heroImage: '/images/insights/cloud-infrastructure.png',
    heroAlt:
      'Abstract unified telemetry and monitoring topology across OpenShift and virtual machines',
  },
  'detect-early-recover-clean': {
    thumbnailImage: '/images/insights/strengthening-security-resilience.png',
    thumbnailAlt:
      'Abstract multi-cloud data protection and threat-detection architecture',
    heroImage: '/images/insights/strengthening-security-resilience.png',
    heroAlt:
      'Abstract air-gapped recovery and multi-cloud data-protection architecture',
  },
  'one-platform-three-workloads': {
    thumbnailImage: '/images/insights/modernizing-enterprise-infrastructure.png',
    thumbnailAlt:
      'Abstract hyperconverged infrastructure architecture for phased modernization',
    heroImage: '/images/insights/modernizing-enterprise-infrastructure.png',
    heroAlt:
      'Abstract modular HCI clusters representing consolidated enterprise workloads',
  },
  'two-employee-types-one-login': {
    thumbnailImage: identityArchitectureVisual,
    thumbnailAlt:
      'Abstract identity architecture connecting two workforce directories through a unified sign-in path',
    heroImage: identityArchitectureVisual,
    heroAlt:
      'Abstract SSO and identity-bridge architecture for a mixed on-roll and contract workforce',
  },
  'why-every-enterprise-deploying-ai-needs-a-red-team': {
    thumbnailImage: '/images/insights/ai-automation.png',
    thumbnailAlt:
      'Abstract governed AI security-testing architecture',
    heroImage: '/images/insights/ai-automation.png',
    heroAlt:
      'Abstract enterprise AI red-team architecture showing controlled attack-path analysis',
  },
  'shadow-ai-invisible-risk': {
    thumbnailImage: '/images/insights/data-analytics.png',
    thumbnailAlt:
      'Abstract architecture separating sanctioned and ungoverned AI data pathways',
    heroImage: '/images/insights/data-analytics.png',
    heroAlt:
      'Abstract enterprise data-boundary architecture representing Shadow AI governance',
  },
}

function withVisuals(item) {
  return {
    status: 'published',
    ...item,
    ...(INSIGHT_VISUALS[item.slug] || {
      thumbnailImage: architectureVisualGeneric,
      thumbnailAlt: 'Abstract SBA enterprise architecture graphic',
      heroImage: architectureVisualGeneric,
      heroAlt: 'Abstract SBA enterprise architecture graphic',
    }),
  }
}

const INSIGHT_RECORDS = [
  {
    slug: 'air-gapped-openshift-for-ai',
    title:
      "Air-Gapped OpenShift for AI: Bringing GPU-Powered AI Inside Banking's Four Walls",
    dek: 'A governed DC-and-DR OpenShift pattern enabling GPU-powered AI workloads entirely inside a regulated bank’s own network.',
    type: 'case-study',
    topics: ['Modernization', 'Data & AI'],
    industry: 'BFSI',
    client: 'Leading Indian Bank',
    capability: 'Cloud & Infrastructure Engineering, AI Platform Enablement',

    publishDate: '2026-06-12',
    heroGraphic: 'openshift-ai',
    metaTitle:
      "Air-Gapped OpenShift for AI | BFSI Case Study | SBA Info Solutions",
    metaDescription:
      'How a leading Indian bank runs GPU-powered AI workloads on air-gapped OpenShift inside its own DC and DR network.',
    closingCta: 'Talk to an expert',
    sections: [
      section(
        'The Challenge',
        'The bank wanted to begin its AI journey using GPU-based workloads, but with one non-negotiable condition: everything had to run inside a fully isolated DC and DR environment, with no internet connectivity, and strict adherence to banking security and compliance policy.',
      ),
      section('The Approach', null, [
        'Designed and implemented two fully air-gapped Red Hat OpenShift clusters — one at DC, one at DR — dedicated to AI workloads.',
        "Built a self-contained platform hosting all container images, tools, and AI components entirely inside the bank's own network.",
        'Enabled GPU-based AI workloads on OpenShift, validated with test jobs prior to handover.',
        "Delivered a governed, repeatable pattern aligned to the bank's security, audit, and change-management processes.",
      ]),
      section(
        'The Outcome',
        'The bank now runs GPU-based AI workloads entirely within its own network — zero internet exposure, zero external registries — on a standardized OpenShift platform built for DC+DR resilience from day one, backed by multi-year Red Hat subscriptions and training.',
      ),
      section(
        'Why It Matters',
        'This is a reference pattern for any regulated enterprise that wants to adopt AI without compromising on security posture: standardize on one governed platform instead of building one-off, ungoverned “AI islands.”',
      ),
    ],
  },
  {
    slug: 'one-pane-of-glass-unified-observability',
    title:
      'One Pane of Glass: Unified Observability Across OpenShift and 500+ VMs for a Leading Bank',
    dek: 'A centralized ELK monitoring platform gave a leading bank a single audit-friendly view across OpenShift and more than 500 virtual machines.',
    type: 'case-study',
    topics: ['Modernization', 'Security'],
    industry: 'BFSI',
    client: 'Leading Bank',
    capability: 'Platform Engineering & Observability',

    publishDate: '2026-05-28',
    heroGraphic: 'observability',
    metaTitle:
      'Unified Observability Across OpenShift and 500+ VMs | BFSI Case Study | SBA Info Solutions',
    metaDescription:
      'How a leading bank gained a single pane of glass across OpenShift and 500+ VMs with centralized ELK monitoring.',
    closingCta: 'Talk to an expert',
    sections: [
      section(
        'The Challenge',
        'Operations teams were monitoring OpenShift clusters and 500+ VMs using multiple disconnected tools and manual checks, leaving leadership without a single view of capacity, performance, and risk — all while needing to respect strict banking security controls.',
      ),
      section('The Approach', null, [
        'Designed and implemented a centralized monitoring platform using Elasticsearch, Kibana, and Metricbeat (ELK) across both OpenShift and VM infrastructure.',
        'Deployed lightweight agents across clusters and VMs to continuously collect health and performance metrics.',
        'Built ready-to-use Kibana dashboards for real-time monitoring, compliance insight, and optimization views.',
        'Enabled threshold-based alerting so operations teams are notified before issues affect business services.',
      ]),
      section(
        'The Outcome',
        'The bank gained a single pane of glass across OpenShift and 500+ VMs, with role-based, audit-friendly dashboards that improved reliability, enabled proactive capacity planning, and identified both over- and under-utilized infrastructure for cost optimization.',
      ),
      section(
        'Why It Matters',
        'This case shows how unifying hybrid infrastructure visibility — containers and VMs together — turns monitoring from a reactive firefighting tool into a proactive capacity and risk-management capability.',
      ),
    ],
  },
  {
    slug: 'detect-early-recover-clean',
    title:
      'Detect Early, Recover Clean: Multi-Cloud Data Protection and Threat Detection for an IT/ITES Leader',
    dek: 'An air-gapped Commvault Metallic architecture and ThreatWise sensors unified backup and early threat detection across on-prem, AWS, Azure, and GCP.',
    type: 'case-study',
    topics: ['Security'],
    industry: 'IT/ITES',
    client: 'Leading IT/ITES Company',
    capability: 'Cyber Resilience & Multi-Cloud Data Protection',

    publishDate: '2026-04-18',
    heroGraphic: 'cyber-resilience',
    metaTitle:
      'Multi-Cloud Data Protection and Threat Detection | IT/ITES Case Study | SBA Info Solutions',
    metaDescription:
      'How an IT/ITES leader unified backup and early threat detection across on-prem, AWS, Azure, and GCP.',
    closingCta: 'Talk to an expert',
    sections: [
      section(
        'The Challenge',
        'The customer ran production VMs and business-critical applications across on-prem, AWS, Azure, and GCP — each with its own backup tools and security controls — making it impossible to get one consistent view of protection and cyber risk across the estate.',
      ),
      section('The Approach', null, [
        'SBA and Commvault jointly assessed multi-cloud datasets, critical workloads, and existing protection gaps.',
        'Implemented Commvault Metallic with an air-gapped backup architecture, isolating backup copies from production.',
        'Deployed Metallic ThreatWise deception-based sensors for early detection of suspicious activity targeting critical data.',
        'Consolidated data protection and cyber-threat visibility into a single management pane across the hybrid, multi-cloud landscape.',
      ]),
      section(
        'The Outcome',
        'The customer now manages backup and threat detection for on-prem, AWS, Azure, and GCP from one SaaS platform, with air-gapped recovery copies that resist ransomware tampering and deception-based sensors that raise high-fidelity alerts before traditional tools do.',
      ),
      section(
        'Why It Matters',
        'This case demonstrates how combining air-gapped backup with deception-based threat detection gives enterprises a genuinely proactive cyber-resilience posture — not just faster recovery, but earlier warning.',
      ),
    ],
  },
  {
    slug: 'one-platform-three-workloads',
    title:
      'One Platform, Three Workloads: A Phased Hyperconverged Journey for a Leading Insurer',
    dek: 'A phased all-flash Nutanix HCI roadmap modernized applications, Citrix VDI, and critical databases while reducing operational complexity.',
    type: 'case-study',
    topics: ['Modernization'],
    industry: 'Diversified Enterprises',
    client: 'Leading Insurance Company',
    capability: 'Cloud & Datacenter Modernization (Nutanix HCI)',

    publishDate: '2026-03-10',
    heroGraphic: 'hci',
    metaTitle:
      'Phased Hyperconverged Modernization | Diversified Enterprises Case Study | SBA Info Solutions',
    metaDescription:
      'How a leading insurer modernized applications, Citrix VDI, and critical databases on all-flash Nutanix HCI in phases.',
    closingCta: 'Talk to an expert',
    sections: [
      section(
        'The Challenge',
        'The insurer was running core applications, databases, and Citrix VDI on ageing blade infrastructure and separate storage systems, with compute and memory utilization already high and approximately 20% annual growth projected.',
      ),
      section('The Approach — Phased Modernization', null, [
        'Phase 1: Deployed an all-flash Nutanix HCI cluster with N+1 redundancy for enterprise workloads; migrated VMware VMs using Nutanix Move; trained the internal team on Prism-based operations.',
        'Phase 2: Migrated Citrix VDI onto a dedicated Nutanix cluster on AHV, consolidating file services from legacy Windows filers.',
        'Phase 3: Migrated business-critical databases from legacy non-x86 platforms onto a dedicated all-flash Nutanix configuration, aligned to licensing strategy and existing DR mechanisms.',
      ]),
      section(
        'The Outcome',
        'The insurer now runs enterprise applications, VDI, and critical databases on one standardized HCI platform — improving login and application performance with low-latency all-flash storage, while significantly simplifying operations through centralized Nutanix Prism management.',
      ),
      section(
        'Why It Matters',
        'This case is a strong reference for enterprises wary of “big-bang” infrastructure replacement: a phased, results-justified migration path lets each stage prove value before the next begins.',
      ),
    ],
  },
  {
    slug: 'two-employee-types-one-login',
    title:
      "Two Employee Types, One Login: Rethinking Identity When Your Workforce Isn't Homogeneous",
    dek: 'A mixed workforce does not require one identity store—just a deliberate ownership model and a unified sign-in experience.',
    type: 'blog',
    topics: ['Digital Engineering'],
    industry: null,
    client: null,
    capability: 'Digital Engineering',

    publishDate: '2026-07-02',
    heroGraphic: 'identity',
    metaTitle:
      'Two Employee Types, One Login | Identity Perspective | SBA Info Solutions',
    metaDescription:
      'How enterprises with mixed on-roll and contract workforces can unify login without forcing a single identity store.',
    closingCta:
      'Running a mixed on-roll/contract workforce with fragmented identity systems? Talk to our Digital Engineering team about a managed identity and SSO model.',
    sections: [
      section(
        'Opening',
        'Most identity strategies assume a single, uniform workforce. But many enterprises — insurers, BFSI, BPOs — run on a blend of on-roll employees and contract staff, often split across two entirely different identity stores. That split quietly becomes one of the most expensive operational and security problems in the enterprise.',
      ),
      section(
        'The Hidden Cost of Split Identity',
        "In one recent enterprise environment, on-roll employees lived in Active Directory, while contract staff — who ran the same business-critical enrolment and renewal applications — lived in Red Hat Directory Server (RHDS). AD was well understood internally. RHDS wasn't. Patching, upgrades, OTP integration, and password-policy management for RHDS became a persistent operational gap, while both user groups still had to log into multiple applications separately.",
      ),
      section('What a Real Fix Looks Like', null, [
        'Keep ownership where it\'s strongest. Let the internal team keep managing AD — the identity store they already understand well.',
        'Hand off what\'s under-resourced. Move full operational ownership of RHDS (DC and DR) — patching, user lifecycle, OTP/SMS, VAPT remediation — to a specialist partner under clear SLAs.',
        'Unify the experience, not the directories. Deploy a single sign-on layer, in this case Red Hat SSO using SAML, so users authenticate once regardless of which directory they sit in.',
        'Bridge directories deliberately. Use a one-way integration from AD into RHDS so cross-authentication works, while ownership boundaries between the two stores stay clean and auditable.',
      ]),
      section(
        'The Result',
        'Both employee types now get a single, unified login experience across multiple business applications — while the two directories remain under clear, separate ownership, each managed by whoever is genuinely best equipped to run it.',
      ),
      section(
        'The Bigger Lesson',
        "You don't have to unify your identity stores to unify the user experience. Fixing the login problem for a mixed workforce is often less about picking one directory to rule them all, and more about designing the right division of ownership — and layering SSO on top so users never feel the seam.",
      ),
    ],
  },
  {
    slug: 'why-every-enterprise-deploying-ai-needs-a-red-team',
    title:
      'Why Every Enterprise Deploying AI Needs a Red Team (Before Attackers Become One)',
    dek: 'AI introduces attack paths that traditional penetration testing was not designed to expose. Red-team AI systems before they reach production.',
    type: 'blog',
    topics: ['Security', 'Data & AI'],
    industry: null,
    client: null,
    capability: 'Cyber Resilience',

    publishDate: '2026-07-18',
    heroGraphic: 'ai-security',
    metaTitle:
      'Why Every Enterprise Deploying AI Needs a Red Team | SBA Info Solutions',
    metaDescription:
      'AI red teaming exposes prompt injection, jailbreaks, data leakage, and agent abuse before systems reach production.',
    closingCta:
      "SBA's Cyber Resilience team offers AI red teaming and security assessments for enterprise AI deployments. Talk to our security team before your AI system meets its first real adversary.",
    sections: [
      section(
        'Opening',
        'Every enterprise racing to deploy AI copilots, chatbots, and agentic workflows is quietly opening a new attack surface — one that traditional penetration testing was never designed to catch. AI red teaming is quickly becoming as essential as application security testing was a decade ago.',
      ),
      section(
        'What Makes AI Systems Different to Attack',
        'Traditional security testing looks for broken code — SQL injection, misconfigurations, weak authentication. AI systems introduce an entirely new category of failure: the model itself can be manipulated through language, not code.',
        [
          'Prompt injection: attackers embed hidden instructions inside documents, emails, or web content that the AI later ingests and obeys.',
          'Jailbreaking: carefully crafted prompts bypass safety guardrails to extract restricted information or actions.',
          'Data leakage: models inadvertently reveal training data, system prompts, or other users\' context.',
          'Tool/agent abuse: AI agents with access to internal tools such as email, databases, and ticketing systems can be tricked into taking unintended real-world actions.',
        ],
      ),
      section('What AI Red Teaming Actually Looks Like', null, [
        'Adversarial prompt testing: systematically attempting jailbreaks, injections, and boundary-pushing prompts against the deployed model.',
        'Data exposure testing: probing whether the model leaks sensitive training data, system instructions, or cross-tenant information.',
        'Agentic behavior testing: testing whether an AI agent can be manipulated into performing unauthorized actions via its connected tools.',
        'Supply-chain and integration testing: checking third-party models, plugins, and APIs the AI system depends on.',
        'Continuous re-testing: unlike a one-time pen test, AI red teaming must repeat as models are fine-tuned, updated, or reconfigured.',
      ]),
      section(
        'Why This Can\'t Wait',
        'Industry analysts have flagged AI-specific attacks — including prompt injection and model manipulation — as a top emerging enterprise security risk. Once an AI system is customer-facing or has access to internal tools, the cost of a successful attack moves from “inconvenient” to “material.”',
      ),
      section(
        'Where to Start',
        'Enterprises don\'t need to build an in-house AI red team overnight. The practical starting point is to red-team any AI system before it goes into production with real customer or internal data — testing prompt injection, jailbreak resistance, and agent boundary conditions — and to repeat that testing on every meaningful model or integration change.',
      ),
    ],
  },
  {
    slug: 'shadow-ai-invisible-risk',
    title: 'Shadow AI: The Invisible Risk Growing Inside Every Enterprise',
    dek: 'Unsanctioned AI tools are already creating a fast-moving, often invisible data-exposure risk across enterprise browsers and workflows.',
    type: 'blog',
    topics: ['Security'],
    industry: null,
    client: null,
    capability: 'Cyber Resilience',

    publishDate: '2026-08-04',
    heroGraphic: 'shadow-ai',
    metaTitle: 'Shadow AI: The Invisible Enterprise Risk | SBA Info Solutions',
    metaDescription:
      'Shadow AI is already inside most enterprises. Learn how to discover, govern, and replace unsanctioned AI usage safely.',
    closingCta:
      "Not sure how much Shadow AI risk exists in your organization today? SBA's Cyber Resilience team can help you find out.",
    sections: [
      section(
        'Opening',
        '“Shadow IT” — unsanctioned apps and devices employees quietly adopt — took enterprises a decade to get under control. “Shadow AI” is repeating that same pattern, except faster, and with far higher stakes for data exposure.',
      ),
      section(
        'What Is Shadow AI?',
        'Shadow AI refers to employees using unsanctioned AI tools — public chatbots, browser extensions, AI-powered coding assistants, or personal AI accounts — to do their jobs faster, without IT or security\'s knowledge or approval.',
      ),
      section('Why It\'s More Dangerous Than Shadow IT', null, [
        'Data leaves the perimeter instantly. Pasting a customer contract, source code, or financial data into a public AI chatbot can permanently expose that content to a third-party model.',
        'It\'s invisible by design. Unlike an unsanctioned SaaS app, a browser-based AI tool leaves almost no footprint in traditional monitoring systems.',
        'It scales instantly. A single employee can adopt and depend on a new AI tool in minutes, with zero procurement or IT review.',
        'It compounds regulatory risk. In regulated industries such as BFSI, healthcare, and insurance, one unsanctioned prompt can trigger a data-protection or compliance incident.',
      ]),
      section(
        'The Real-World Pattern',
        'It typically starts small — an engineer pasting a code snippet into a public assistant, an analyst uploading a spreadsheet to summarize it, a support agent copying customer details into a chatbot for a faster reply. None of these feel like a security incident in the moment. Collectively, they represent an organization\'s most sensitive data flowing to systems no one approved, logged, or governed.',
      ),
      section('What Enterprises Should Do About It', null, [
        'Discover, don\'t just ban. Use network and endpoint visibility to identify which AI tools are already in use before writing policy in a vacuum.',
        'Offer a sanctioned alternative fast. Employees adopt shadow tools because sanctioned options are slow or missing — provide a secure, approved AI tool before restricting the unsanctioned ones.',
        'Set data-handling guardrails, not blanket bans. Define clearly what data classes, including PII, source code, and financials, must never be pasted into any AI tool, sanctioned or not.',
        'Extend DLP and monitoring to AI traffic. Modern data-loss prevention and secure web gateways can flag and block sensitive data flowing to AI endpoints.',
        'Govern continuously. Treat AI tool usage as a living inventory, reviewed on the same cadence as other SaaS and endpoint risk.',
      ]),
      section(
        'Conclusion',
        'Shadow AI isn\'t a future risk — it is already inside most enterprises today, quietly running through browsers and personal accounts. The organizations that win are the ones that make the sanctioned path faster than the shadow one.',
      ),
    ],
  },
]

export const INSIGHTS = INSIGHT_RECORDS.map(withVisuals)

export function getPublishedInsights() {
  return INSIGHTS.filter((item) => item.status === 'published').sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
  )
}

export function getPublishedCaseStudies() {
  return getPublishedInsights().filter((item) => item.type === 'case-study')
}

export function getPublishedBlogs() {
  return getPublishedInsights().filter((item) => item.type === 'blog')
}

export function getInsightBySlug(slug) {
  return INSIGHTS.find((item) => item.slug === slug) || null
}

export function filterInsights(items, { type = 'all', topic = 'all' } = {}) {
  return items.filter((item) => {
    const typeOk =
      type === 'all' ||
      (type === 'case-studies' && item.type === 'case-study') ||
      (type === 'blogs' && item.type === 'blog')
    const topicOk =
      topic === 'all' ||
      item.topics.some((t) => t.toLowerCase() === topic.toLowerCase())
    return typeOk && topicOk
  })
}

export function getRelatedInsights(current, limit = 3) {
  if (!current) return []
  const scored = getPublishedInsights()
    .filter((item) => item.slug !== current.slug)
    .map((item) => {
      let score = 0
      if (item.type === current.type) score += 2
      if (item.industry && item.industry === current.industry) score += 3
      if (item.capability && item.capability === current.capability) score += 2
      const sharedTopics = item.topics.filter((t) => current.topics.includes(t))
      score += sharedTopics.length
      return { item, score }
    })
    .sort((a, b) => b.score - a.score || new Date(b.item.publishDate) - new Date(a.item.publishDate))

  return scored.slice(0, limit).map((entry) => entry.item)
}

export const INSIGHT_TOPICS = [
  'Modernization',
  'Security',
  'Data & AI',
  'Digital Engineering',
]
