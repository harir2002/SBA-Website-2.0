/**
 * AnimatedBackground — CSS-only animated layer for major sections.
 * Uses only brand colours: #E7000B (red), #FFFFFF (white), #000000 (black).
 * Opacity is kept 10-20% so text is never affected.
 * Respects prefers-reduced-motion via CSS (see index.css).
 */
export default function AnimatedBackground({ variant = 'default' }) {
  if (variant === 'grid') {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Drifting grid lines */}
        <div
          className="sba-bg-grid absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.8,
          }}
        />
        {/* Red accent glow */}
        <div
          className="sba-bg-pulse absolute"
          style={{
            inset: 0,
            background:
              'radial-gradient(ellipse at 20% 80%, rgba(231,0,11,0.15) 0%, transparent 60%)',
          }}
        />
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Floating soft orbs */}
        <div
          className="sba-bg-shape-a absolute"
          style={{
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231,0,11,0.12) 0%, transparent 70%)',
            top: '-80px',
            right: '10%',
          }}
        />
        <div
          className="sba-bg-shape-b absolute"
          style={{
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            bottom: '0px',
            left: '5%',
          }}
        />
        <div
          className="sba-bg-shape-c absolute"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231,0,11,0.08) 0%, transparent 70%)',
            top: '40%',
            left: '30%',
          }}
        />
      </div>
    )
  }

  if (variant === 'cross') {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Red corner glow */}
        <div
          className="sba-bg-pulse absolute"
          style={{
            inset: 0,
            background:
              'radial-gradient(ellipse at 80% 50%, rgba(231,0,11,0.14) 0%, transparent 55%)',
          }}
        />
        {/* Fine diagonal grid */}
        <div
          className="sba-bg-grid absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(231,0,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(231,0,11,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="sba-bg-shape-b absolute"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            top: '-60px',
            left: '20%',
          }}
        />
      </div>
    )
  }

  /* default variant — subtle shapes + red pulse */
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="sba-bg-shape-a absolute"
        style={{
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(231,0,11,0.10) 0%, transparent 70%)',
          top: '-100px',
          right: '-60px',
        }}
      />
      <div
        className="sba-bg-shape-b absolute"
        style={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          bottom: '-40px',
          left: '10%',
        }}
      />
      <div
        className="sba-bg-shape-c absolute"
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(231,0,11,0.07) 0%, transparent 70%)',
          top: '45%',
          left: '45%',
        }}
      />
    </div>
  )
}
