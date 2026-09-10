/**
 * Intelligence video section — plays /SBA Corporate Video.mp4 from public/.
 * Pre-play: branded poster with ambient motion (not a blank black frame).
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const VIDEO_SRC = encodeURI('/SBA Corporate Video.mp4')
const EASE = [0.16, 1, 0.3, 1]
const ACCENT = '#E7000B'

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function PosterAmbient({ reduceMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(231,0,11,0.22) 0%, transparent 58%), radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Soft grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" preserveAspectRatio="none">
        <defs>
          <pattern id="video-poster-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#video-poster-grid)" />
      </svg>

      {/* Orbital rings around play area */}
      <svg
        className="absolute top-1/2 left-1/2 h-[min(320px,70%)] w-[min(320px,70%)] -translate-x-1/2 -translate-y-1/2 opacity-50"
        viewBox="0 0 320 320"
        fill="none"
      >
        {[70, 105, 145].map((r, i) => (
          <circle
            key={r}
            cx="160"
            cy="160"
            r={r}
            stroke={ACCENT}
            strokeWidth="1"
            strokeOpacity={0.45 - i * 0.1}
          />
        ))}
        {!reduceMotion ? (
          <>
            <circle r="2.4" fill="#FFFFFF" opacity="0.9">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                path="M90 160 A70 70 0 1 1 230 160 A70 70 0 1 1 90 160"
              />
            </circle>
            <circle r="2" fill={ACCENT}>
              <animateMotion
                dur="13s"
                repeatCount="indefinite"
                path="M55 160 A105 105 0 1 1 265 160 A105 105 0 1 1 55 160"
              />
            </circle>
          </>
        ) : null}
      </svg>

      {/* Corner brackets */}
      <span className="absolute top-4 left-4 h-8 w-8 border-t border-l border-white/25" />
      <span className="absolute top-4 right-4 h-8 w-8 border-t border-r border-white/25" />
      <span className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-white/25" />
      <span className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-white/25" />
    </div>
  )
}

export default function IntelligenceVideoPlaceholder() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [durationLabel, setDurationLabel] = useState(null)
  const [posterReady, setPosterReady] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const unlockPoster = () => {
      try {
        if (video.readyState >= 1 && video.currentTime < 0.05) {
          video.currentTime = 0.12
        }
      } catch {
        // Ignore seek errors before metadata
      }
      setPosterReady(true)
    }

    const onMeta = () => {
      setDurationLabel(formatDuration(video.duration))
      unlockPoster()
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('loadeddata', unlockPoster)
    if (video.readyState >= 1) onMeta()

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('loadeddata', unlockPoster)
    }
  }, [])

  const handlePlayClick = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setPlaying(true)
    } catch {
      setPlaying(true)
    }
  }

  return (
    <section className="relative bg-black" aria-labelledby="intelligence-video-heading">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-2 sm:px-6 sm:pt-16 sm:pb-4 lg:px-10 lg:pt-20">
        <ScrollReveal y={24}>
          <h2
            id="intelligence-video-heading"
            className="mb-8 text-center font-heading text-2xl font-extrabold sm:text-3xl lg:text-4xl"
          >
            <span className="text-primary-red">Engineering</span>
            <span className="text-white/70"> the modern, secure, and intelligent enterprise</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12} y={28}>
          <motion.div
            className="group relative z-20 mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a] transition-[border-color,box-shadow] duration-300 hover:border-primary-red/45 hover:shadow-[0_0_48px_rgba(231,0,11,0.18)]"
            style={{ aspectRatio: '16 / 9' }}
            data-placeholder="hero-video"
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-[filter,opacity] duration-500 ${
                playing ? 'opacity-100' : posterReady ? 'opacity-70 blur-[1.5px] saturate-[0.85]' : 'opacity-0'
              }`}
              src={VIDEO_SRC}
              controls={playing}
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => setLoadError(true)}
            >
              Your browser does not support the video tag.
            </video>

            {loadError ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 px-6 text-center">
                <p className="font-body text-sm text-white/70">
                  Video could not be loaded. Please refresh and try again.
                </p>
              </div>
            ) : !playing ? (
              <button
                type="button"
                onClick={handlePlayClick}
                aria-label="Play SBA corporate video"
                className="absolute inset-0 z-10 flex flex-col items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                <PosterAmbient reduceMotion={reduceMotion} />

                {/* Top meta */}
                <div className="absolute top-4 right-4 left-4 z-20 flex items-start justify-end gap-3">
                  <div className="flex items-center gap-2">
                    {durationLabel ? (
                      <span className="rounded border border-white/15 bg-black/40 px-2 py-1 font-heading text-[0.65rem] font-semibold tracking-wide text-white/70 tabular-nums">
                        {durationLabel}
                      </span>
                    ) : null}
                    <span className="font-heading text-xs font-bold tracking-[0.2em] text-white/45 uppercase">
                      SBA
                    </span>
                  </div>
                </div>

                {/* Play control */}
                <span className="relative z-20 flex flex-col items-center gap-4">
                  <span className="relative flex h-16 w-16 items-center justify-center sm:h-[4.75rem] sm:w-[4.75rem]">
                    {!reduceMotion && (
                      <>
                        <span
                          className="sba-play-pulse absolute inset-0 rounded-full bg-primary-red/40"
                          aria-hidden="true"
                        />
                        <span
                          className="sba-play-pulse sba-play-pulse--delay absolute inset-0 rounded-full bg-primary-red/25"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <span className="relative flex h-full w-full items-center justify-center rounded-full bg-primary-red shadow-[0_8px_32px_rgba(231,0,11,0.45)] transition-transform duration-200 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="font-heading text-xs font-bold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
                    Watch the film
                  </span>
                </span>

                {/* Bottom hint */}
                <p className="absolute right-4 bottom-4 left-4 z-20 text-center font-body text-[0.7rem] text-white/40 sm:text-left">
                  Modern infrastructure · Cyber resilience · Data intelligence
                </p>
              </button>
            ) : null}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
