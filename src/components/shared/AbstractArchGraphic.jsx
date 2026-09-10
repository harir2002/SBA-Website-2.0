/**
 * Abstract dark architecture / red-line graphic for Careers & Insights.
 * Decorative only — no stock photography.
 */

const VARIANTS = {
  grid: (
    <>
      <defs>
        <pattern id="sba-arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="rgba(231,0,11,0.18)" strokeWidth="1" />
        </pattern>
        <linearGradient id="sba-arch-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(231,0,11,0.35)" />
          <stop offset="100%" stopColor="rgba(231,0,11,0)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sba-arch-grid)" />
      <path d="M0 80 L120 40 L240 90 L360 20 L480 70" fill="none" stroke="url(#sba-arch-fade)" strokeWidth="1.5" />
      <path d="M40 0 V200 M160 0 V200 M280 0 V200 M400 0 V200" stroke="rgba(231,0,11,0.12)" strokeWidth="1" />
      <circle cx="360" cy="70" r="4" fill="#E7000B" opacity="0.7" />
    </>
  ),
  'openshift-ai': null,
  observability: null,
  'cyber-resilience': null,
  hci: null,
  identity: null,
  'ai-security': null,
  'shadow-ai': null,
}

function defaultGraphic(seed = 0) {
  const offset = (seed * 37) % 60
  return (
    <>
      <defs>
        <pattern id={`sba-g-${seed}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(231,0,11,0.14)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#sba-g-${seed})`} />
      <rect x="8%" y="18%" width="35%" height="2" fill="#E7000B" opacity="0.55" />
      <rect x="8%" y={`${35 + offset / 4}%`} width="55%" height="1" fill="rgba(255,255,255,0.2)" />
      <rect x="8%" y={`${48 + offset / 5}%`} width="42%" height="1" fill="rgba(255,255,255,0.12)" />
      <path
        d={`M${20 + offset} 90 L${90 + offset} 40 L${160 + offset} 100 L${240 + offset} 30`}
        fill="none"
        stroke="rgba(231,0,11,0.45)"
        strokeWidth="1.5"
      />
      <circle cx={`${70 + (offset % 20)}%`} cy="42%" r="3" fill="#E7000B" opacity="0.8" />
    </>
  )
}

export default function AbstractArchGraphic({
  variant = 'grid',
  className = '',
  seed = 0,
}) {
  const content = VARIANTS[variant] ?? defaultGraphic(seed)

  return (
    <svg
      className={className}
      viewBox="0 0 480 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="480" height="240" fill="#000000" />
      {content || defaultGraphic(seed)}
    </svg>
  )
}
