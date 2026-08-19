/**
 * SlideCTAButton — outlined red rectangular CTA for capability carousel slides.
 * Shared across all six slides; pass label + href from slide data.
 */

import { Link } from 'react-router-dom'

export default function SlideCTAButton({ label, href }) {
  return (
    <Link
      to={href}
      className="slide-cta-btn inline-flex min-h-10 items-center gap-2 rounded-md border-[1.75px] border-primary-red bg-transparent px-5 py-2.5 font-heading text-[13px] font-semibold tracking-wide text-primary-red uppercase no-underline transition-[background,color,border-color] duration-200 ease-in-out hover:bg-primary-red hover:text-white focus-visible:bg-primary-red focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[390px]:px-4 max-[390px]:py-2 max-[390px]:text-xs"
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  )
}
