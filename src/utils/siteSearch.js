import { getAllSolutions } from '../data/solutions'
import { INDUSTRY_PAGES } from '../data/industriesContent'
import { getOpenJobs } from '../data/careers/jobs'
import { getPublishedInsights } from '../data/insights/content'

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function haystack(...parts) {
  return normalize(parts.filter(Boolean).join(' '))
}

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'for',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
])

function tokenize(value, { keepStopWords = false } = {}) {
  return normalize(value)
    .split(' ')
    .filter((token) => {
      if (token.length <= 1) return false
      if (!keepStopWords && STOP_WORDS.has(token)) return false
      return true
    })
}

function levenshtein(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const rows = a.length + 1
  const cols = b.length + 1
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[a.length][b.length]
}

function allowedDistance(token) {
  if (token.length >= 8) return 2
  if (token.length >= 5) return 1
  return 0
}

function tokenMatches(token, hay, hayWords) {
  if (hay.includes(token)) return { hit: true, fuzzy: false }

  for (const word of hayWords) {
    if (word.includes(token) || token.includes(word)) {
      return { hit: true, fuzzy: word !== token }
    }

    const maxDist = Math.min(allowedDistance(token), allowedDistance(word))
    if (maxDist > 0 && Math.abs(word.length - token.length) <= maxDist) {
      if (levenshtein(token, word) <= maxDist) {
        return { hit: true, fuzzy: true }
      }
    }
  }

  return { hit: false, fuzzy: false }
}

/**
 * Score a document against the query.
 * Higher is better. Returns 0 when it should not match.
 */
function scoreMatch(query, text) {
  const q = normalize(query)
  const hay = normalize(text)
  if (!q || !hay) return 0

  if (hay.includes(q)) return 100

  // Ignore filler words in the query so "modernize the core" ≈ "modernize core"
  const tokens = tokenize(q, { keepStopWords: false })
  if (!tokens.length) return 0

  const hayWords = tokenize(hay, { keepStopWords: true })
  let score = 0
  let matched = 0

  for (const token of tokens) {
    const result = tokenMatches(token, hay, hayWords)
    if (!result.hit) return 0
    matched += 1
    score += result.fuzzy ? 8 : 16
  }

  // Prefer titles that cover most of the query words densely
  score += matched * 2
  if (matched === tokens.length) score += 10

  return score
}

function pushUnique(results, item, score) {
  if (score <= 0) return
  const existing = results.find((r) => r.href === item.href)
  if (existing) {
    existing.score = Math.max(existing.score, score)
    return
  }
  results.push({ ...item, score })
}

const STATIC_PAGES = [
  {
    type: 'Page',
    title: 'About SBA',
    dek: 'Who we are, leadership, values, and how SBA helps enterprises modernize with confidence.',
    href: '/about',
    text: 'about sba who we are leadership company values ecosystem',
  },
  {
    type: 'Page',
    title: 'Solutions',
    dek: 'Explore SBA capabilities across modernization, cyber resilience, data, digital engineering, operations, and AI.',
    href: '/solutions',
    text: 'solutions capabilities modernize protect data build operate ai',
  },
  {
    type: 'Page',
    title: 'Careers',
    dek: 'Open roles and life at SBA Info Solutions.',
    href: '/careers',
    text: 'careers jobs open roles life at sba hiring',
  },
  {
    type: 'Page',
    title: 'Contact',
    dek: 'Get in touch with SBA Info Solutions.',
    href: '/contact',
    text: 'contact connect lets connect talk to us',
  },
  {
    type: 'Page',
    title: 'Insights',
    dek: 'Blogs, perspectives, and thought leadership from SBA.',
    href: '/insights',
    text: 'insights blogs articles thought leadership',
  },
  {
    type: 'Page',
    title: 'Case Studies',
    dek: 'Customer outcomes and delivery stories across industries.',
    href: '/case-studies',
    text: 'case studies customer stories success stories',
  },
]

export function searchSite(query) {
  const q = (query || '').trim()
  if (!q) return []

  const results = []

  STATIC_PAGES.forEach((page) => {
    pushUnique(
      results,
      {
        type: page.type,
        title: page.title,
        dek: page.dek,
        href: page.href,
      },
      scoreMatch(q, haystack(page.title, page.dek, page.text, page.href)),
    )
  })

  getAllSolutions().forEach((s) => {
    const text = haystack(
      s.label,
      s.slug,
      s.path,
      s.seoTitle,
      s.metaDescription,
      s.hero?.title,
      s.hero?.eyebrow,
    )
    pushUnique(
      results,
      {
        type: 'Solution',
        title: s.label,
        dek: s.metaDescription,
        href: s.path,
      },
      scoreMatch(q, text),
    )
  })

  Object.values(INDUSTRY_PAGES).forEach((p) => {
    const text = haystack(
      p.label,
      p.slug,
      p.seoTitle,
      p.metaDescription,
      p.hero?.headline,
      p.hero?.eyebrow,
      p.hero?.body,
    )
    pushUnique(
      results,
      {
        type: 'Industry',
        title: p.label,
        dek: p.metaDescription,
        href: `/industries/${p.slug}`,
      },
      scoreMatch(q, text),
    )
  })

  getOpenJobs().forEach((job) => {
    const text = haystack(
      job.title,
      job.slug,
      job.summary,
      job.department,
      job.location,
      ...(job.preferredSkills || []),
    )
    pushUnique(
      results,
      {
        type: 'Career',
        title: job.title,
        dek: job.summary,
        href: `/careers/${job.slug}`,
      },
      scoreMatch(q, text),
    )
  })

  getPublishedInsights().forEach((item) => {
    const text = haystack(
      item.title,
      item.slug,
      item.dek,
      item.type,
      item.industry,
      ...(item.topics || []),
    )
    pushUnique(
      results,
      {
        type: item.type === 'case-study' ? 'Case Study' : 'Blog',
        title: item.title,
        dek: item.dek,
        href: `/insights/${item.slug}`,
      },
      scoreMatch(q, text),
    )
  })

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .map(({ score, ...item }) => item)
}
