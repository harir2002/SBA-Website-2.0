/**
 * Lightweight SEO helper — title, description, canonical, OG, JSON-LD.
 * Canonical uses current origin (no hardcoded production domain).
 */

import { useEffect } from 'react'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function usePageMeta({
  title,
  description,
  path,
  breadcrumbs,
}) {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = path ? `${origin}${path}` : origin

    const prevTitle = document.title
    if (title) document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', `${origin}/src/assets/sba-logo.png`)
    upsertLink('canonical', url)

    if (breadcrumbs?.length) {
      upsertJsonLd('industry-breadcrumb-ld', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${origin}${item.path}`,
        })),
      })
    }

    upsertJsonLd('industry-org-ld', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SBA Info Solutions',
      url: origin,
    })

    return () => {
      document.title = prevTitle || 'SBA Info Solutions'
    }
  }, [title, description, path, breadcrumbs])
}
