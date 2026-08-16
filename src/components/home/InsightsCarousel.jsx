import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const INSIGHTS = [
  {
    category: 'Modernization',
    title: 'From Legacy to Cloud-Ready: A Practical Roadmap',
    excerpt:
      'How enterprise teams are de-risking core system migrations without halting day-to-day operations.',
  },
  {
    category: 'Cybersecurity',
    title: 'Zero-Trust in Practice: Beyond the Buzzword',
    excerpt:
      'Implementing zero-trust architecture across hybrid environments — lessons from the field.',
  },
  {
    category: 'Data & AI',
    title: 'Governed AI That Actually Ships',
    excerpt:
      'Building AI solutions that are auditable, explainable, and tied to measurable business outcomes.',
  },
  {
    category: 'Integration',
    title: 'API-First Enterprise: Connecting the Disconnected',
    excerpt:
      'Why platform thinking — not point-to-point integrations — is the path to enterprise agility.',
  },
  {
    category: 'Operations',
    title: 'AIOps at Scale: Smarter Incident Response',
    excerpt:
      'Reducing MTTR and alert fatigue by embedding intelligence into operational workflows.',
  },
]

export default function InsightsCarousel() {
  return (
    <section
      className="border-t border-white/10 bg-black"
      aria-labelledby="insights-heading"
    >
      {/* Full-bleed: no max-width, minimal side padding so the track
          runs to both edges of the viewport */}
      <div className="w-full px-4 py-16 sm:px-6 lg:py-20">
        <h2
          id="insights-heading"
          className="mb-10 font-heading text-3xl font-extrabold text-white sm:text-4xl"
        >
          Insights
        </h2>

        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          a11y={{ enabled: true }}
          breakpoints={{
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {INSIGHTS.map((item) => (
            <SwiperSlide key={item.title}>
              <article className="flex h-full flex-col border border-white/10 bg-black p-6 transition-colors hover:border-primary-red">
                <span className="mb-3 font-heading text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg font-bold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/65">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-5 font-heading text-xs font-bold tracking-wide text-primary-red uppercase hover:underline"
                >
                  Read more →
                </a>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
