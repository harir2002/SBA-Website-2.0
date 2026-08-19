/**
 * IntelligenceVideoPlaceholder — temporary hero-video wireframe.
 * Replace with real video embed when approved (data-placeholder="hero-video").
 */

export default function IntelligenceVideoPlaceholder() {
  return (
    <section
      className="relative border-t border-white/10 bg-black"
      aria-labelledby="intelligence-video-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <h2
          id="intelligence-video-heading"
          className="mb-10 text-center font-heading text-2xl font-extrabold sm:text-3xl lg:text-4xl"
        >
          <span className="text-primary-red">Engineering</span>
          <span className="text-white"> the modern, secure, and intelligent enterprise</span>
        </h2>

        <button
          type="button"
          data-placeholder="hero-video"
          aria-label="Play video (placeholder)"
          className="group relative mx-auto block w-full max-w-5xl overflow-hidden rounded-xl border border-dashed border-white/30 bg-[#1a1a1a] text-left transition-colors hover:border-primary-red/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
          style={{ aspectRatio: '16 / 9' }}
        >
          {/* Watermark */}
          <span className="pointer-events-none absolute right-4 top-4 z-10 font-heading text-xs font-bold tracking-[0.2em] text-white/35 uppercase">
            SBA
          </span>
          <span className="pointer-events-none absolute left-4 top-4 z-10 rounded border border-white/20 bg-black/50 px-2 py-0.5 font-body text-[10px] tracking-wide text-white/50 uppercase">
            Placeholder
          </span>

          {/* Soft placeholder fill */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, rgba(231,0,11,0.12) 0%, transparent 55%), #141414',
            }}
            aria-hidden="true"
          />

          {/* Play button */}
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-red shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </section>
  )
}
