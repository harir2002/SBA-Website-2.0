/**
 * CapabilityCarousel — two-column hero slides.
 *
 * Left: DOM text (eyebrow → heading → description → CTA)
 * Right: slightly shrunk text-free capability image
 *
 * Uses rewind (not loop) to avoid clone black-flashes.
 */

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import { CAPABILITIES } from '../../data/capabilities'
import SlideCTAButton from './SlideCTAButton'

import 'swiper/css'

const HERO_AUTO_PLAY_INTERVAL = 5000

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
        if (entry.isIntersecting) sw.autoplay.start()
        else sw.autoplay.stop()
      },
      { threshold: 0.2 },
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
        .hero-cap {
          width: 100%;
          background-color: #000000;
        }

        /* Shared full-height chain: section → swiper → slide → row */
        .hero-cap,
        .hero-cap .swiper,
        .hero-cap .swiper-wrapper,
        .hero-cap .swiper-slide,
        .hero-slide {
          height: auto;
          min-height: 0;
          background-color: #000000;
        }

        .hero-slide {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: stretch;
          gap: 0;
        }

        @media (min-width: 768px) {
          .hero-cap,
          .hero-cap .swiper,
          .hero-cap .swiper-wrapper,
          .hero-cap .swiper-slide,
          .hero-slide {
            height: 80vh;
            min-height: 600px;
            max-height: 820px;
          }
          .hero-slide {
            flex-direction: row;
            align-items: stretch;
            gap: 0;
          }
        }

        /* Left text — ~46% (closer to midpoint, less center gap) */
        .hero-text-col {
          width: 100%;
          padding: 28px 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0;
        }
        @media (min-width: 768px) {
          .hero-text-col {
            width: 46%;
            flex-shrink: 0;
            height: 100%;
            padding: 40px 16px 48px 40px;
          }
        }
        @media (min-width: 1280px) {
          .hero-text-col {
            padding: 48px 20px 56px 56px;
          }
        }

        /* Right image — ~54%, starts nearer center, no outer gap */
        .hero-image-col {
          position: relative;
          width: 100%;
          height: 340px;
          padding: 0;
          margin: 0;
          overflow: hidden;
          background: #000000;
        }
        @media (min-width: 768px) {
          .hero-image-col {
            width: 54%;
            height: 100%;
            min-height: 100%;
            flex: 1 1 54%;
            align-self: stretch;
            margin: 0;
          }
        }

        /* Cover + slight zoom crops empty left/right padding in source art */
        .hero-cap-img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 0;
          background: #000000;
          transform: scale(var(--hero-img-zoom, 1.14));
          transform-origin: var(--hero-img-origin, right center);
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Keyboard, A11y]}
        onSwiper={(sw) => { swiperRef.current = sw }}
        onRealIndexChange={(sw) => setActiveIndex(sw.realIndex)}
        rewind
        speed={450}
        allowTouchMove
        watchOverflow
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
        className="w-full"
      >
        {CAPABILITIES.map((cap) => (
          <SwiperSlide key={cap.id}>
            <div className="hero-slide">
              {/* LEFT — DOM text stack */}
              <div className="hero-text-col">
                <p className="mb-3 font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase sm:text-sm">
                  {cap.eyebrow}
                </p>

                <h2
                  className="font-heading font-extrabold leading-[1.12] text-white"
                  style={{ fontSize: 'clamp(1.5rem, 3.2vw, 3rem)' }}
                >
                  {cap.title}
                </h2>

                <p
                  className="mt-4 font-body leading-relaxed text-white/75"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.15vw, 1.0625rem)',
                    maxWidth: '100%',
                  }}
                >
                  {cap.description}
                </p>

                <div className="mt-6">
                  <SlideCTAButton label={cap.ctaShort} href={cap.link} />
                </div>
              </div>

              {/* RIGHT — full-height image, starts nearer center */}
              <div className="hero-image-col">
                {cap.image ? (
                  <img
                    src={cap.image}
                    alt={cap.alt}
                    loading="eager"
                    decoding="async"
                    className="hero-cap-img"
                    style={{
                      objectPosition: cap.objectPosition || 'center center',
                      '--hero-img-zoom': cap.imageZoom ?? 1.14,
                      '--hero-img-origin': cap.imageOrigin || 'right center',
                    }}
                    draggable={false}
                  />
                ) : (
                  <div
                    className="hero-cap-img bg-black"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(231,0,11,0.15) 0%, rgba(0,0,0,0.95) 70%)',
                    }}
                    role="img"
                    aria-label={cap.alt}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5"
        role="tablist"
        aria-label="Capability slides"
      >
        {CAPABILITIES.map((cap, i) => (
          <button
            key={cap.id}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Go to ${cap.title}`}
            onClick={() => swiperRef.current?.slideTo(i)}
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
                transition: 'width 0.25s ease, background 0.25s ease',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
