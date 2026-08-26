/**
 * LogoMarquee — horizontal auto-scrolling logo row (partners, customers, etc.).
 * Pass `logos` as { id, name|label, src? }[]; placeholders when src is absent.
 * `direction`: "forward" (left) | "reverse" (right).
 */

import ScrollReveal from './ScrollReveal'

const DEFAULT_LOGOS = [
  { id: '1', name: 'LOGO 1' },
  { id: '2', name: 'LOGO 2' },
  { id: '3', name: 'LOGO 3' },
  { id: '4', name: 'LOGO 4' },
  { id: '5', name: 'LOGO 5' },
  { id: '6', name: 'LOGO 6' },
  { id: '7', name: 'LOGO 7' },
  { id: '8', name: 'LOGO 8' },
]

function LogoCard({ logo }) {
  const label = logo.name || logo.label || 'Logo'

  return (
    <div
      className="sba-logo-box flex h-16 w-44 shrink-0 items-center justify-center sm:h-20 sm:w-52"
      data-placeholder={logo.src ? undefined : 'logo-card'}
    >
      {logo.src ? (
        <img
          src={encodeURI(logo.src)}
          alt={label}
          className="sba-logo-img"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="font-body text-xs tracking-[0.18em] text-white/40 uppercase sm:text-sm">
          {label}
        </span>
      )}
    </div>
  )
}

export default function LogoMarquee({
  logos = DEFAULT_LOGOS,
  eyebrow = 'Our Partners',
  heading = 'Technology Partners We Work With',
  headingClassName = 'text-white',
  direction = 'forward',
  duration = 32,
  id = 'logo-marquee',
}) {
  const loop = [...logos, ...logos]
  const isReverse = direction === 'reverse'
  const headingId = `${id}-heading`

  return (
    <section
      className="bg-black"
      aria-labelledby={headingId}
      data-placeholder={id}
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-6 sm:pt-12 lg:px-10">
        <ScrollReveal className="mb-6 text-center sm:mb-8" y={20}>
          {eyebrow ? (
            <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className={`font-heading text-2xl font-extrabold sm:text-3xl ${headingClassName} ${
              eyebrow ? 'mt-2' : ''
            }`}
          >
            {heading}
          </h2>
        </ScrollReveal>
      </div>

      <div
        className="sba-logo-marquee-viewport relative w-full overflow-hidden pb-10 sm:pb-12"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className={`sba-logo-marquee-track flex flex-row items-center gap-4 px-3 sm:gap-6 ${
            isReverse ? 'sba-logo-marquee-track--reverse' : ''
          }`}
          style={{ '--marquee-duration': `${duration}s` }}
        >
          {loop.map((logo, i) => (
            <LogoCard
              key={`${id}-${logo.id || logo.name}-${i < logos.length ? 'a' : 'b'}`}
              logo={logo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/** @deprecated Prefer LogoMarquee — kept as alias for existing imports */
export { LogoMarquee as VerticalLogoMarquee }
