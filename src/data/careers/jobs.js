/**
 * Careers job listings — CMS/ATS-ready shape.
 * Replace this module later with Airtable / Notion / headless CMS / ATS feed.
 */

export const JOBS = [
  {
    id: 'technical-support-engineer-security-av',
    slug: 'technical-support-engineer-security-av',
    title: 'Technical Support Engineer - Security (AV)',
    department: 'Technical',
    openings: 3,
    experience: '2–4 years',
    location: 'Chennai',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary: 'EDR, XDR, Trend Micro, and endpoint security support.',
    responsibilities: [
      'Generate regular security reports and metrics related to endpoint health and threats.',
      'Participate in threat hunting and EDR investigations.',
      'Assist in audits, risk assessments, and compliance initiatives as needed.',
    ],
    preferredSkills: [
      'In-depth knowledge of desktop hardware and software systems.',
      'Proficient in computer operating systems such as Linux and Windows.',
      'Familiarity with SIEM tools, vulnerability management, and patching tools.',
      'Strong problem-solving skills and ability to work under pressure during incidents.',
    ],
    education:
      'Any graduation. CEH certification is optional; other relevant security certifications are also welcome.',
    benefits: 'As per company policy.',
    recruiterEmail: 'hr@sbainfo.in',
    status: 'Open',
    applyUrl: '/careers/technical-support-engineer-security-av#apply',
  },
  {
    id: 'technical-support-engineer-data-center',
    slug: 'technical-support-engineer-data-center',
    title: 'Technical Support Engineer - Data Center (Server and Storage)',
    department: 'Technical',
    openings: 1,
    experience: '3–5 years',
    location: 'Chennai',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary: 'Server, storage, backup, and HCI support.',
    responsibilities: [
      'Support HCI, VMware, Hyper-V, and server virtualization environments.',
      'Design and implement complex virtual infrastructure solutions in mid-to-large-scale data center environments.',
      'Implement and maintain backup software, including Veritas and Commvault.',
      'Follow standard escalation procedures for unresolved issues and coordinate with the appropriate internal teams.',
    ],
    preferredSkills: [
      'Good communication skills.',
      'Basic data center knowledge.',
      'Professional email communication.',
      'Punctuality and willingness to work before or after office hours on special occasions.',
    ],
    education: 'Any computer graduate.',
    benefits: 'As per company policy.',
    recruiterEmail: 'hr@sbainfo.in',
    status: 'Open',
    applyUrl: '/careers/technical-support-engineer-data-center#apply',
  },
  {
    id: 'technical-support-engineer-desktop-support',
    slug: 'technical-support-engineer-desktop-support',
    title: 'Technical Support Engineer / Desktop Support Engineer',
    department: 'Technical',
    openings: 1,
    experience: '2–3 years',
    location: 'Chennai',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary: 'Active Directory, DNS, DHCP, Group Policy, child domains, and forests.',
    responsibilities: [
      'Manage end devices and Active Directory environments.',
      'Support domain integration and Group Policy management.',
      'Manage organizational units (OUs).',
      'Support primary and secondary replication.',
    ],
    preferredSkills: [
      'Active Directory administration.',
      'DNS and DHCP knowledge.',
      'Group Policy management.',
      'Child domain and forest administration.',
      'Endpoint and desktop support troubleshooting.',
    ],
    education: 'Any computer graduate.',
    benefits: 'As per company policy.',
    recruiterEmail: 'hr@sbainfo.in',
    status: 'Open',
    applyUrl: '/careers/technical-support-engineer-desktop-support#apply',
  },
  {
    id: 'accounts-assistant',
    slug: 'accounts-assistant',
    title: 'Accounts Assistant',
    department: 'Finance/Accounts',
    openings: 1,
    experience: 'Freshers / 0–1 year',
    location: 'Chennai',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary: 'Basic accounting support, Tally operations, bookkeeping, invoices, and vouchers.',
    responsibilities: [
      'Perform Tally-related work.',
      'Support bookkeeping activities.',
      'Prepare invoices and vouchers.',
    ],
    preferredSkills: ['Tally.'],
    education: 'B.Com graduates with Tally certification.',
    benefits: 'As per company policy.',
    recruiterEmail: 'hr@sbainfo.in',
    status: 'Open',
    applyUrl: '/careers/accounts-assistant#apply',
  },
  {
    id: 'software-engineer-intern',
    slug: 'software-engineer-intern',
    title: 'Software Engineer Intern',
    department: 'Technical',
    openings: 2,
    experience: 'Freshers / Final-Year Students',
    location: 'Chennai',
    workMode: 'On-site / Remote',
    employmentType: 'Full-time',
    summary:
      "We're looking for passionate, freshly graduated engineers to join our growing AI and software development team.",
    responsibilities: [
      'Full-stack web application development using React, Node.js, and Python.',
      'AI/ML integrations including voice agents, sentiment analysis, and RAG-based systems.',
      'Cloud deployment and API integrations using AWS and Hugging Face.',
      'Work on real client projects across BFSI, healthcare, and enterprise domains.',
    ],
    preferredSkills: [
      'Strong fundamentals in Data Structures & Algorithms, OOP, and DBMS.',
      'Proficiency in at least one language: Python, Java, or JavaScript.',
      'Basic understanding of web development with HTML, CSS, and JavaScript, or app development.',
      'Familiarity with Git and GitHub version control.',
      'Bonus: exposure to AI/ML, REST APIs, or cloud platforms such as AWS.',
      'Strong problem-solving mindset and eagerness to learn fast.',
    ],
    education: '2025/2026 pass-outs: B.E./B.Tech CSE, B.Sc. CS, or a related degree.',
    benefits: 'As per company policy.',
    recruiterEmail: 'hr@sbainfo.in',
    status: 'Open',
    applyUrl: '/careers/software-engineer-intern#apply',
  },
]

/** Fixed filter options for the Open Roles UI */
export const DEPARTMENT_FILTERS = ['Technical', 'Finance/Accounts']
export const LOCATION_FILTERS = ['Chennai']
export const EXPERIENCE_FILTERS = [
  'Freshers',
  '0–1 year',
  '2–3 years',
  '2–4 years',
  '3–5 years',
]

export function getOpenJobs() {
  return JOBS.filter((job) => job.status.toLowerCase() === 'open')
}

export function getJobBySlug(slug) {
  return JOBS.find((job) => job.slug === slug) || null
}

export function matchesExperienceFilter(jobExperience, filterValue) {
  if (!filterValue || filterValue === 'all') return true
  const exp = jobExperience || ''
  if (filterValue === 'Freshers') {
    return /fresher/i.test(exp)
  }
  return exp.includes(filterValue)
}

export function formatOpenings(count) {
  const n = Number(count) || 0
  return n === 1 ? '1 opening' : `${n} openings`
}
