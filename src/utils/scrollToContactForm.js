/**
 * Scroll to the in-page contact form.
 * Most pages: footer ContactSection (#contact).
 * Contact page: enquiry form (#enquiry) because footer form is hidden.
 */
export function scrollToContactForm() {
  const onContactPage =
    typeof window !== 'undefined' && window.location.pathname === '/contact'
  const id = onContactPage ? 'enquiry' : 'contact'
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}
