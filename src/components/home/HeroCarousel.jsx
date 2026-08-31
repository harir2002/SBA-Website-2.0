/**
 * HeroCarousel — homepage two-column hero OR full-bleed industry banner.
 *
 * variant="split" (default): text left + image right (capabilities)
 * variant="fullBleed": full-width photo with left gradient + left text (BFSI-style)
 *
 * Single-slide: autoplay off, dots hidden.
 */

import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, A11y } from 'swiper/modules'
import SlideCTAButton from './SlideCTAButton'

import 'swiper/css'

const HERO_AUTO_PLAY_INTERVAL = 5000
const EASE = [0.16, 1, 0.3, 1]

function HeroTextBlock({ slide, reduceMotion, isActive }) {
  const title = slide.title || slide.heading
  const description = slide.description || slide.subtext
  const content = (
    <>
      {slide.eyebrow && (
        <p className="mb-3 font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase sm:text-sm">
          {slide.eyebrow}
        </p>
      )}
      <h2
        className="font-heading font-extrabold leading-[1.12] text-white"
        style={{ fontSize: 'clamp(1.5rem, 3.2vw, 3rem)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 font-body leading-relaxed text-white/75"
          style={{
            fontSize: 'clamp(0.9rem, 1.15vw, 1.0625rem)',
            maxWidth: '100%',
          }}
        >
          {description}
        </p>
      )}
      {slide.ctaShort && slide.link && (
        <div className="mt-6">
          <SlideCTAButton label={slide.ctaShort} href={slide.link} />
        </div>
      )}
    </>
  )

  if (reduceMotion || !isActive) {
    return <div className={isActive ? undefined : 'opacity-90'}>{content}</div>
  }

  return (
    <motion.div
      key={`${slide.id || title}-in`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {slide.eyebrow && (
        <motion.p
          className="mb-3 font-heading text-xs font-bold tracking-[0.28em] text-primary-red uppercase sm:text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
        >
          {slide.eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="font-heading font-extrabold leading-[1.12] text-white"
        style={{ fontSize: 'clamp(1.5rem, 3.2vw, 3rem)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="mt-4 font-body leading-relaxed text-white/75"
          style={{
            fontSize: 'clamp(0.9rem, 1.15vw, 1.0625rem)',
            maxWidth: '100%',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
        >
          {description}
        </motion.p>
      )}
      {slide.ctaShort && slide.link && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
        >
          <SlideCTAButton label={slide.ctaShort} href={slide.link} />
        </motion.div>
      )}
    </motion.div>
  )
}

function FullBleedCTA({ label, href }) {
  return (
    <Link
      to={href}
      className="hero-fullbleed-cta group inline-flex items-center gap-2 rounded-lg bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white no-underline transition-[transform,filter] duration-200 ease-out hover:scale-[1.03] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        ▶
      </span>
    </Link>
  )
}

export default function HeroCarousel({
  slides = [],
  sectionId,
  ariaLabel = 'Hero carousel',
  className = '',
  variant = 'split',
}) {
  const reduceMotion = useReducedMotion()
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const multi = slides.length > 1
  const isFullBleed = variant === 'fullBleed'

  useEffect(() => {
    const el = sectionRef.current
    if (!el || !multi) return
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
  }, [multi])

  if (!slides.length) return null

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`${isFullBleed ? 'hero-fullbleed' : 'hero-cap'} relative w-full overflow-hidden bg-black ${className}`.trim()}
      aria-label={ariaLabel}
      style={{ marginTop: '72px' }}
    >
      <style>{`
        /* ——— Full-bleed industry banner ——— */
        .hero-fullbleed {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          background-color: #000;
        }
        @media (max-width: 768px) {
          .hero-fullbleed {
            height: 520px;
          }
        }
        .hero-fullbleed .swiper,
        .hero-fullbleed .swiper-wrapper,
        .hero-fullbleed .swiper-slide {
          height: 100%;
          width: 100%;
        }
        .hero-fullbleed-slide {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }
        .hero-fullbleed-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        @media (max-width: 768px) {
          .hero-fullbleed-img {
            object-position: center top;
          }
        }
        .hero-fullbleed-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.92) 0%,
            rgba(0, 0, 0, 0.85) 28%,
            rgba(0, 0, 0, 0.55) 48%,
            rgba(0, 0, 0, 0.2) 72%,
            rgba(0, 0, 0, 0.08) 100%
          );
        }
        .hero-fullbleed-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          width: 100%;
          max-width: 550px;
          padding: 40px 24px 56px;
          text-align: left;
        }
        @media (min-width: 768px) {
          .hero-fullbleed-content {
            width: 48%;
            max-width: 550px;
            padding: 48px 40px 64px 56px;
          }
        }
        @media (min-width: 1280px) {
          .hero-fullbleed-content {
            padding-left: 72px;
          }
        }
        .hero-fullbleed-label {
          margin: 0 0 14px;
          font-family: var(--font-heading, Poppins, sans-serif);
          font-size: clamp(15px, 1.2vw, 18px);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.78);
        }
        .hero-fullbleed-heading {
          margin: 0;
          font-family: var(--font-heading, Poppins, sans-serif);
          font-size: clamp(2rem, 4.2vw, 3.25rem);
          font-weight: 800;
          line-height: 1.12;
          color: #fff;
          max-width: 14ch;
        }
        .hero-fullbleed-cta-wrap {
          margin-top: 28px;
        }

        /* ——— Split (homepage capabilities) ——— */
        .hero-cap {
          width: 100%;
          background-color: #000000;
        }
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
        .hero-text-col {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 28px 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0;
          background: linear-gradient(
            90deg,
            #000 0%,
            #000 72%,
            rgba(0, 0, 0, 0.55) 88%,
            transparent 100%
          );
        }
        @media (min-width: 768px) {
          .hero-text-col {
            width: 46%;
            flex-shrink: 0;
            height: 100%;
            padding: 40px 16px 48px 40px;
            background: linear-gradient(
              90deg,
              #000 0%,
              #000 58%,
              rgba(0, 0, 0, 0.85) 78%,
              rgba(0, 0, 0, 0.35) 92%,
              transparent 100%
            );
          }
        }
        @media (min-width: 1280px) {
          .hero-text-col {
            padding: 48px 20px 56px 56px;
          }
        }
        .hero-image-col {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 340px;
          padding: 0;
          margin: 0;
          overflow: hidden;
          background: #000000;
        }
        @media (min-width: 768px) {
          .hero-image-col {
            width: 62%;
            height: 100%;
            min-height: 100%;
            flex: 1 1 62%;
            align-self: stretch;
            margin: 0 0 0 -8%;
          }
        }
        .hero-image-col::before {
          content: '';
          position: absolute;
          inset: 0 auto 0 0;
          width: 42%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            #000 0%,
            rgba(0, 0, 0, 0.75) 35%,
            rgba(0, 0, 0, 0.25) 70%,
            transparent 100%
          );
        }
        @media (min-width: 768px) {
          .hero-image-col::before {
            width: 36%;
          }
        }
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
        .hero-cap-img--kenburns {
          animation: hero-kenburns ${HERO_AUTO_PLAY_INTERVAL}ms ease-out both;
        }
        @keyframes hero-kenburns {
          from { transform: scale(calc(var(--hero-img-zoom, 1.14) * 1)); }
          to   { transform: scale(calc(var(--hero-img-zoom, 1.14) * 1.06)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cap-img--kenburns {
            animation: none;
          }
        }
        .hero-dot-track {
          position: relative;
          display: block;
          width: 28px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,0.28);
          overflow: hidden;
        }
        .hero-dot-track.is-active {
          background: rgba(231,0,11,0.35);
        }
        .hero-dot-fill {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0;
          background: #E7000B;
          border-radius: inherit;
        }
        .hero-dot-track.is-active .hero-dot-fill {
          animation: hero-dot-fill ${HERO_AUTO_PLAY_INTERVAL}ms linear both;
        }
        @keyframes hero-dot-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-dot-track.is-active .hero-dot-fill {
            animation: none;
            width: 100%;
          }
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Keyboard, A11y]}
        onSwiper={(sw) => { swiperRef.current = sw }}
        onRealIndexChange={(sw) => setActiveIndex(sw.realIndex)}
        rewind={multi}
        speed={450}
        allowTouchMove={multi}
        watchOverflow
        autoplay={
          !multi || reduceMotion
            ? false
            : {
                delay: HERO_AUTO_PLAY_INTERVAL,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        keyboard={{ enabled: multi }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => {
          const title = slide.title || slide.heading
          const label = slide.label || slide.eyebrow
          const key = slide.id || `${slide.image}-${index}`

          if (isFullBleed) {
            return (
              <SwiperSlide key={key}>
                <div className="hero-fullbleed-slide">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.alt || title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="hero-fullbleed-img"
                      style={
                        slide.objectPosition
                          ? { objectPosition: slide.objectPosition }
                          : undefined
                      }
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="hero-fullbleed-img"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(231,0,11,0.2) 0%, #000000 70%)',
                      }}
                      role="img"
                      aria-label={slide.alt || title}
                    />
                  )}
                  <div className="hero-fullbleed-overlay" aria-hidden="true" />
                  <div className="hero-fullbleed-content">
                    {label && <p className="hero-fullbleed-label">{label}</p>}
                    <h1 className="hero-fullbleed-heading">{title}</h1>
                    {(slide.ctaShort || slide.cta) && slide.link && (
                      <div className="hero-fullbleed-cta-wrap">
                        <FullBleedCTA
                          label={slide.ctaShort || slide.cta}
                          href={slide.link}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
          }

          return (
            <SwiperSlide key={key}>
              <div className="hero-slide">
                <div className="hero-text-col">
                  <HeroTextBlock
                    slide={slide}
                    reduceMotion={reduceMotion}
                    isActive={activeIndex === index}
                  />
                </div>
                <div className="hero-image-col">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.alt || title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className={`hero-cap-img${
                        activeIndex === index && !reduceMotion
                          ? ' hero-cap-img--kenburns'
                          : ''
                      }`}
                      style={{
                        objectPosition: slide.objectPosition || 'center center',
                        '--hero-img-zoom': slide.imageZoom ?? 1.14,
                        '--hero-img-origin': slide.imageOrigin || 'right center',
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
                      aria-label={slide.alt || title}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {multi && (
        <div
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5"
          role="tablist"
          aria-label="Carousel slides"
        >
          {slides.map((slide, i) => {
            const title = slide.title || slide.heading
            const key = slide.id || `${slide.image}-${i}`
            const isActive = activeIndex === i
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to ${title}`}
                onClick={() => swiperRef.current?.slideTo(i)}
                className="flex h-6 items-center justify-center px-0.5"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
              >
                <span
                  aria-hidden="true"
                  className={`hero-dot-track${isActive ? ' is-active' : ''}`}
                >
                  {isActive ? <span className="hero-dot-fill" key={`fill-${i}-${activeIndex}`} /> : null}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
