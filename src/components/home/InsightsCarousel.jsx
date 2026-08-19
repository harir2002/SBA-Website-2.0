/**
 * InsightsCarousel — Insights & Success Stories (articles + case studies).
 */

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const INSIGHTS = [
  {
    id: 'ai-automation',
    kind: 'article',
    category: 'AI & AUTOMATION',
    title: 'AI & Automation',
    description: 'Insights into how AI is transforming enterprise operations.',
    cta: 'EXPLORE ARTICLE',
  },
  {
    id: 'cloud-infra',
    kind: 'article',
    category: 'CLOUD & INFRASTRUCTURE',
    title: 'Cloud & Infrastructure',
    description: 'Perspectives on building modern, scalable IT environments.',
    cta: 'EXPLORE ARTICLE',
  },
  {
    id: 'data-analytics',
    kind: 'article',
    category: 'DATA & ANALYTICS',
    title: 'Data & Analytics',
    description: 'Ideas for turning enterprise data into smarter decisions.',
    cta: 'EXPLORE ARTICLE',
  },
  {
    id: 'modernizing-infra',
    kind: 'case',
    category: 'CASE STUDY',
    title: 'Modernizing Enterprise Infrastructure',
    description:
      'See how SBA helps businesses build resilient, future-ready infrastructure.',
    cta: 'Learn More',
  },
  {
    id: 'ai-data-transform',
    kind: 'case',
    category: 'CASE STUDY',
    title: 'Accelerating AI & Data Transformation',
    description:
      'Discover how enterprises turn data and AI into measurable business value.',
    cta: 'Learn More',
  },
  {
    id: 'security-resilience',
    kind: 'case',
    category: 'CASE STUDY',
    title: 'Strengthening Security & Resilience',
    description:
      'Explore how SBA helps organizations protect critical systems and stay prepared.',
    cta: 'Learn More',
  },
]

function InsightCard({ item }) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
      style={{
        background:
          'linear-gradient(145deg, #0d0f14 0%, #16181f 100%)',
      }}
    >
      {/* Image placeholder */}
      <div
        className="relative flex aspect-video w-full items-center justify-center border-b border-dashed border-white/15 bg-[#12141a]"
        data-placeholder="insight-thumbnail"
      >
        <span className="font-body text-[10px] tracking-[0.16em] text-white/35 uppercase sm:text-xs">
          Image Placeholder
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="font-heading text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase sm:text-xs">
          {item.category}
        </span>

        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
          {item.title}
        </h3>

        <p className="mt-2.5 flex-1 font-body text-sm leading-relaxed text-white/55">
          {item.description}
        </p>

        <a
          href="#"
          className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.14em] text-primary-red uppercase no-underline transition-colors hover:text-[#ff3340]"
          onClick={(e) => e.preventDefault()}
        >
          {item.cta}
          <span
            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </div>
    </article>
  )
}

export default function InsightsCarousel() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section
      className="border-t border-white/10 bg-black"
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
      `}</style>

      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
        <div className="mb-10 max-w-2xl sm:mb-12">
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
        </div>

        <div className="mb-5 flex justify-end gap-3">
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

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          a11y={{ enabled: true }}
          grabCursor
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
          {INSIGHTS.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <InsightCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
