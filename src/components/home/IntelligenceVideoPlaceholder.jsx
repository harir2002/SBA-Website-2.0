/**
 * Intelligence video section — plays /SBA Corporate Video.mp4 from public/.
 */

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const VIDEO_SRC = encodeURI('/SBA Corporate Video.mp4')
const EASE = [0.16, 1, 0.3, 1]

export default function IntelligenceVideoPlaceholder() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const reduceMotion = useReducedMotion()

  const handlePlayClick = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setPlaying(true)
    } catch {
      // Gesture/autoplay edge cases — show native controls so user can retry
      setPlaying(true)
    }
  }

  return (
    <section
      className="relative bg-black"
      aria-labelledby="intelligence-video-heading"
    >
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
            className="group relative z-20 mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-[#0d0f14] transition-[border-color,box-shadow] duration-300 hover:border-primary-red/40 hover:shadow-[0_0_40px_rgba(231,0,11,0.15)]"
            style={{ aspectRatio: '16 / 9' }}
            data-placeholder="hero-video"
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
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
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 px-6 text-center">
                <p className="font-body text-sm text-white/70">
                  Video could not be loaded. Please refresh and try again.
                </p>
              </div>
            ) : !playing ? (
              <button
                type="button"
                onClick={handlePlayClick}
                aria-label="Play SBA corporate video"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                <span className="pointer-events-none absolute right-4 top-4 font-heading text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                  SBA
                </span>
                <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                  {!reduceMotion && (
                    <>
                      <span className="sba-play-pulse absolute inset-0 rounded-full bg-primary-red/40" aria-hidden="true" />
                      <span className="sba-play-pulse sba-play-pulse--delay absolute inset-0 rounded-full bg-primary-red/25" aria-hidden="true" />
                    </>
                  )}
                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-primary-red shadow-lg transition-transform duration-200 group-hover:scale-110">
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
            ) : null}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
