/**
 * VideoHero — Xoriant-style full-bleed looping background video hero.
 * Muted + autoplay + loop for browser autoplay policies.
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'

const VIDEO_SRC = '/videos/hero-bg.mp4'
const POSTER_SRC = '/images/hero-fallback.png'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function VideoHero() {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef(null)
  const [usePosterOnly, setUsePosterOnly] = useState(false)

  useEffect(() => {
    // Prefer static poster on small screens / reduced motion for performance
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => {
      setUsePosterOnly(reduceMotion || mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduceMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || usePosterOnly) return
    video.muted = true
    const play = video.play()
    if (play?.catch) play.catch(() => setUsePosterOnly(true))
  }, [usePosterOnly])

  return (
    <section
      className="sba-video-hero relative w-full overflow-hidden bg-black"
      aria-labelledby="video-hero-heading"
    >
      <style>{`
        .sba-video-hero {
          height: 600px;
        }
        @media (max-width: 768px) {
          .sba-video-hero {
            height: 520px;
          }
        }
        .sba-video-hero-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sba-video-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.82) 0%,
            rgba(0, 0, 0, 0.55) 42%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }
        .sba-video-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          max-width: 640px;
          padding: calc(var(--header-height, 88px) + 24px) 24px 56px;
          text-align: left;
        }
        @media (min-width: 768px) {
          .sba-video-hero-content {
            padding: calc(var(--header-height, 88px) + 24px) 40px 64px 56px;
          }
        }
        @media (min-width: 1280px) {
          .sba-video-hero-content {
            padding-left: 72px;
          }
        }
      `}</style>

      {usePosterOnly ? (
        <img
          src={POSTER_SRC}
          alt=""
          className="sba-video-hero-media"
          aria-hidden="true"
        />
      ) : (
        <video
          ref={videoRef}
          className="sba-video-hero-media"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER_SRC}
          preload="metadata"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      <div className="sba-video-hero-overlay" aria-hidden="true" />

      <div className="sba-video-hero-content">
        <p className="mb-3 font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase sm:text-sm">
          SBA Info Solutions
        </p>
        <h1
          id="video-hero-heading"
          className="font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl"
        >
          Engineering the modern, secure, and{' '}
          <span className="text-primary-red">intelligent</span> enterprise.
        </h1>
        <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-white/75 sm:text-lg">
          We partner with industry leaders to modernize core systems, protect
          business continuity, and activate AI-driven intelligence.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center justify-center rounded-lg bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[transform,filter] duration-200 hover:scale-[1.03] hover:brightness-110"
          >
            Let's Connect
          </button>
          <Link
            to="/#capabilities"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('capabilities')
            }}
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase no-underline transition-colors hover:border-primary-red/50 hover:text-primary-red"
          >
            Our Solutions
          </Link>
        </div>
      </div>
    </section>
  )
}
