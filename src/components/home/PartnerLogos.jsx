const PARTNERS = [
  'Microsoft',
  'AWS',
  'Google Cloud',
  'ServiceNow',
  'Salesforce',
  'SAP',
  'Oracle',
  'IBM',
]

export default function PartnerLogos() {
  return (
    <section
      className="border-t border-white/10 bg-black"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <h2
          id="partners-heading"
          className="mb-8 text-center font-heading text-xs font-bold tracking-[0.25em] text-white/40 uppercase"
        >
          Trusted Ecosystem Partners
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="font-heading text-sm font-bold tracking-widest text-white/30 uppercase transition-colors hover:text-white/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
