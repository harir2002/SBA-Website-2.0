import AnimatedBackground from './AnimatedBackground'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function CareersBanner() {
  return (
    <section
      id="careers"
      className="relative scroll-mt-[72px] overflow-hidden bg-black"
      aria-labelledby="careers-banner-heading"
    >
      <AnimatedBackground variant="cross" />

      <div className="relative mx-auto max-w-[1440px] px-4 py-20 text-center sm:px-6 lg:px-10">
        <h2
          id="careers-banner-heading"
          className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
        >
          Build the Future with SBA
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-base text-white/75 sm:text-lg">
          Join teams that modernize, secure, and intelligently operate enterprises across
          industries. Bring your craft. Shape what comes next.
        </p>
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="mt-8 inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
        >
          View Open Positions
        </button>
      </div>
    </section>
  )
}
