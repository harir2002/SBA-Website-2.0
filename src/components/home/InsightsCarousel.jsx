/**
 * InsightsCarousel — published Case Studies and Blogs from shared Insights data.
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import ScrollReveal from './ScrollReveal'
import { getPublishedInsights } from '../../data/insights/content'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function typeLabel(type) {
  return type === 'case-study' ? 'CASE STUDY' : 'BLOG'
}

function secondaryLabel(item) {
  if (item.type === 'case-study') return item.industry || item.topics?.[0] || ''
  return (item.topics || [])[0] || ''
}

function HomeInsightCard({ item }) {
  const href = `/insights/${item.slug}`
  const cta = item.type === 'case-study' ? 'VIEW CASE STUDY' : 'READ INSIGHT'
  const topic = secondaryLabel(item)

  return (
    <article
      className="insight-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-primary-red/30 hover:shadow-[0_24px_48px_rgba(0,0,0,0.45),0_0_28px_rgba(231,0,11,0.12)]"
      style={{
        background: 'linear-gradient(145deg, #0d0f14 0%, #16181f 100%)',
      }}
    >
      <Link
        to={href}
        className="flex h-full flex-col outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
        aria-label={`${cta}: ${item.title}`}
      >
        <div className="insight-card-image">
          <img
            className="insight-card__image"
            src={item.thumbnailImage}
            alt={item.thumbnailAlt}
            loading="lazy"
          />
          <div className="insight-card-shine" aria-hidden="true" />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="insight-category font-heading text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase sm:text-xs">
              {typeLabel(item.type)}
            </span>
            {topic ? (
              <span className="font-heading text-[10px] font-bold tracking-[0.16em] text-white/45 uppercase sm:text-[11px]">
                {topic}
              </span>
            ) : null}
          </div>

          <h3 className="insight-title mt-3 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
            {item.title}
          </h3>

          <p className="insight-desc mt-2.5 flex-1 font-body text-sm leading-relaxed text-white/55">
            {item.dek}
          </p>

          <span className="insight-cta mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase no-underline transition-colors group-hover:text-[#ff3340]">
            {cta}
            <span
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}

export default function InsightsCarousel() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const items = getPublishedInsights()
  const modules = reduceMotion
    ? [Navigation, Pagination, A11y]
    : [Navigation, Pagination, A11y, Autoplay]

  return (
    <section
      className="bg-black"
      aria-labelledby="insights-heading"
      id="insights"
    >
      <style>{`
        .insights-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.35);
          opacity: 1;
        }
        .insights-swiper .swiper-pagination-bullet-active {
          background: #E7000B;
        }
        .insights-nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: #12141a;
          color: #fff;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .insights-nav-btn:hover {
          border-color: #E7000B;
          color: #E7000B;
        }
        .insights-nav-btn:disabled {
          opacity: 0.35;
          pointer-events: none;
        }
        .insight-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px 12px 0 0;
          overflow: hidden;
          margin-bottom: 0;
          background: #12141a;
        }
        .insight-card__image {
          display: block;
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          object-position: center;
          transform: none;
          filter: none;
        }
        .insight-card-shine {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 255, 255, 0.12) 48%,
            transparent 62%
          );
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }
        .insight-card:hover .insight-card-shine {
          transform: translateX(120%);
        }
      `}</style>

      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
        <ScrollReveal className="mb-10 max-w-2xl sm:mb-12" y={24}>
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
            Case Studies and Blogs
          </p>
          <h2
            id="insights-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl"
          >
            Insights & Success Stories
          </h2>
          <p className="mt-3 font-body text-sm text-white/55 sm:text-base">
            Explore ideas, expertise, and real-world outcomes from SBA.
          </p>
        </ScrollReveal>

        <div className="mb-5 flex items-center justify-end gap-3">
          <div className="flex gap-3">
            <button
              ref={prevRef}
              type="button"
              className="insights-nav-btn"
              aria-label="Previous insights"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              ref={nextRef}
              type="button"
              className="insights-nav-btn"
              aria-label="Next insights"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={modules}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          a11y={{ enabled: true }}
          grabCursor
          autoplay={
            reduceMotion
              ? false
              : {
                  delay: 6500,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }
          }
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="insights-swiper !pb-12"
        >
          {items.map((item) => (
            <SwiperSlide key={item.slug} className="!h-auto">
              <HomeInsightCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
