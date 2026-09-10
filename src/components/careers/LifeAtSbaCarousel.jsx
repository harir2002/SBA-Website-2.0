/**
 * LifeAtSbaCarousel — single-frame culture photo carousel for /careers.
 * Opacity crossfade only — no scale, blur, or CSS filters on photos.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { lifeAtSbaPhotos } from '../../data/careers/lifeAtSbaPhotos'

const INTERVAL_MS = 3000
const FADE_MS = 700

export default function LifeAtSbaCarousel() {
  const photos = lifeAtSbaPhotos
  const total = photos.length
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const rootRef = useRef(null)

  const goTo = useCallback(
    (next) => {
      if (total === 0) return
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (reduceMotion || paused || total <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return undefined
    }

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    const startTimer = () => {
      clearTimer()
      if (document.hidden) return
      timerRef.current = setInterval(() => {
        setIndex((current) => (current + 1) % total)
      }, INTERVAL_MS)
    }

    const onVisibility = () => {
      if (document.hidden) clearTimer()
      else startTimer()
    }

    startTimer()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimer()
    }
  }, [paused, reduceMotion, total])

  if (total === 0) return null

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

  return (
    <div
      ref={rootRef}
      className="life-at-sba__media"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) {
          setPaused(false)
        }
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Life at SBA photos"
    >
      <div className="absolute inset-0" aria-live="polite" aria-atomic="true">
        {photos.map((photo, i) => {
          const active = i === index
          return (
            <div
              key={photo.src}
              className={`life-at-sba__slide${active ? ' is-active' : ''}`}
              style={{
                transition: reduceMotion ? 'none' : `opacity ${FADE_MS}ms ease`,
              }}
              aria-hidden={!active}
            >
              <img
                src={photo.src}
                alt={active ? photo.alt : ''}
                width={photo.width}
                height={photo.height}
                className="life-at-sba__image"
                decoding="async"
                fetchPriority={i === 0 ? 'high' : undefined}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/75 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 z-[3] flex items-center justify-between gap-2 p-3 sm:p-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Show previous Life at SBA photo"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/25 bg-black/55 text-white transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <p className="font-heading text-[11px] font-bold tracking-[0.18em] text-white tabular-nums">
            {counter}
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Life at SBA photo selector"
          >
            {photos.map((photo, i) => {
              const active = i === index
              return (
                <button
                  key={photo.src}
                  type="button"
                  role="tab"
                  aria-label={`Show photo ${i + 1} of ${total}`}
                  aria-current={active ? 'true' : undefined}
                  aria-selected={active}
                  onClick={() => goTo(i)}
                  className={`inline-flex h-11 min-w-11 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red ${
                    active ? 'px-2' : 'px-1.5'
                  }`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] ${
                      active ? 'w-6 bg-primary-red' : 'w-1.5 bg-white/55'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Show next Life at SBA photo"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/25 bg-black/55 text-white transition-colors hover:border-primary-red hover:text-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
