/**
 * Intelligence video section — plays /SBA Corporate Video.mp4 from public/.
 * Pre-play: branded poster with ambient motion (not a blank black frame).
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const VIDEO_SRC = encodeURI('/SBA Corporate Video.mp4')
const EASE = [0.16, 1, 0.3, 1]

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function PosterAmbient() {
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
            className="group relative z-20 mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/[0.16] bg-[#080809] transition-[border-color,box-shadow] duration-500 hover:border-primary-red/55 hover:shadow-[0_0_72px_rgba(231,0,11,0.24)]"
            style={{ aspectRatio: '16 / 9' }}
            data-placeholder="hero-video"
            whileHover={reduceMotion ? undefined : { scale: 1.006 }}
            transition={{ duration: 0.45, ease: EASE }}
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
                className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                <PosterAmbient />

                {/* Top meta */}
                <div className="absolute top-5 right-5 left-5 z-20 flex items-start justify-between gap-3 sm:top-7 sm:right-7 sm:left-7">
                  <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-heading text-[0.6rem] font-bold tracking-[0.22em] text-white/65 uppercase backdrop-blur-sm">
                    SBA IN MOTION
                  </span>
                  <div className="flex items-center gap-2">
                    {durationLabel ? (
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-heading text-[0.6rem] font-semibold tracking-wide text-white/70 tabular-nums backdrop-blur-sm">
                        {durationLabel}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Play control */}
                <span className="relative z-20 flex flex-col items-center">
                  <span className="relative flex h-[5rem] w-[5rem] items-center justify-center sm:h-24 sm:w-24">
                    {!reduceMotion && (
                      <>
                        <span
                          className="sba-play-pulse absolute inset-[-12px] rounded-full border border-primary-red/40"
                          aria-hidden="true"
                        />
                        <span
                          className="sba-play-pulse sba-play-pulse--delay absolute inset-[-27px] rounded-full border border-primary-red/20"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <span className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-primary-red shadow-[0_10px_36px_rgba(231,0,11,0.5)] transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:bg-[#ff1d28]">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-8 w-8 fill-white sm:h-9 sm:w-9"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </span>

                <div className="absolute right-5 bottom-5 left-5 z-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-heading text-[0.58rem] font-bold tracking-[0.16em] text-white/45 uppercase sm:right-7 sm:bottom-7 sm:left-7 sm:justify-start">
                  <span>Modernize</span>
                  <span className="h-1 w-1 rounded-full bg-primary-red" aria-hidden="true" />
                  <span>Protect</span>
                  <span className="h-1 w-1 rounded-full bg-primary-red" aria-hidden="true" />
                  <span>Activate intelligence</span>
                </div>
              </button>
            ) : null}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
