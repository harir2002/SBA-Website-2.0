/**
 * CapabilityCarousel — image-only hero banner.
 *
 * All capability PNGs are 1366×768 (16:9). Hero uses that aspect-ratio
 * so the full image is visible with no crop and no Swiper autoHeight
 * (autoHeight + update() caused a max call stack crash).
 */

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import { CAPABILITIES } from '../../data/capabilities'

import 'swiper/css'

const HERO_AUTO_PLAY_INTERVAL = 3000 // 3 seconds

export default function CapabilityCarousel() {
  const reduceMotion = useReducedMotion()
  const swiperRef    = useRef(null)
  const sectionRef   = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const sw = swiperRef.current
        if (!sw?.autoplay) return
        entry.isIntersecting ? sw.autoplay.start() : sw.autoplay.stop()
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="hero-cap relative w-full overflow-hidden bg-black"
      aria-label="SBA Capabilities"
      style={{ marginTop: '72px' }}
    >
      <style>{`
        /* Match native image ratio (1366×768) — full image, no crop */
        .hero-cap {
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #000000;
        }
        .hero-cap .swiper,
        .hero-cap .swiper-slide {
          width: 100%;
          height: 100%;
          background-color: #000000;
        }
        .hero-cap-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Keyboard, A11y]}
        onSwiper={(sw) => { swiperRef.current = sw }}
        onRealIndexChange={(sw) => setActiveIndex(sw.realIndex)}
        loop
        speed={700}
        autoplay={
          reduceMotion
            ? false
            : {
                delay: HERO_AUTO_PLAY_INTERVAL,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous capability',
          nextSlideMessage: 'Next capability',
        }}
        className="h-full w-full"
      >
        {CAPABILITIES.map((cap, i) => (
          <SwiperSlide key={cap.id}>
            {cap.image ? (
              <img
                src={cap.image}
                alt={cap.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                className="hero-cap-img"
                draggable={false}
              />
            ) : (
              <div
                className="h-full w-full bg-black"
                role="img"
                aria-label={cap.alt}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5"
        role="tablist"
        aria-label="Capability slides"
      >
        {CAPABILITIES.map((cap, i) => (
          <button
            key={cap.id}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Go to ${cap.title}`}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="flex h-6 w-6 items-center justify-center"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: activeIndex === i ? '10px' : '8px',
                height: activeIndex === i ? '10px' : '8px',
                borderRadius: '50%',
                background: activeIndex === i ? '#E7000B' : 'transparent',
                border: activeIndex === i
                  ? '1px solid #E7000B'
                  : '1px solid rgba(255,255,255,0.55)',
                transition: 'all 0.3s ease',
              }}
            />
          </button>
        ))}
      </div>

      {/* Bottom cut */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        aria-hidden="true"
      >
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, #E7000B 18%, #E7000B 82%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
