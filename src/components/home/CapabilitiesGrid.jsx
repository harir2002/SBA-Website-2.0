import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Activity, Database, Layers, Shield, Sparkles, Workflow } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'

const CARDS = [
  {
    name: 'Modernize the Core',
    description:
      'Upgrade legacy systems into resilient, cloud-ready platforms that scale with the business.',
    href: '#capabilities',
    Icon: Layers,
  },
  {
    name: 'Protect and Recover',
    description: 'Secure critical operations and recover with confidence when disruption strikes.',
    href: '#capabilities',
    Icon: Shield,
  },
  {
    name: 'Make Data Actionable',
    description:
      'Turn enterprise data into decisions, products, and intelligence the business can use.',
    href: '#capabilities',
    Icon: Database,
  },
  {
    name: 'Build and Connect',
    description: 'Integrate systems and workflows so teams, partners, and platforms move as one.',
    href: '#capabilities',
    Icon: Workflow,
  },
  {
    name: 'Operate with Assurance',
    description:
      'Run, monitor, and sustain operations with the rigor enterprise environments demand.',
    href: '#capabilities',
    Icon: Activity,
  },
  {
    name: 'Accelerate Business AI',
    description:
      'Activate AI that is practical, governed, and tied to measurable business outcomes.',
    href: '#capabilities',
    Icon: Sparkles,
  },
]

export default function CapabilitiesGrid() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="capabilities"
      className="relative scroll-mt-[72px] overflow-hidden bg-black"
      aria-labelledby="capabilities-heading"
    >
      <AnimatedBackground variant="dots" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <h2
          id="capabilities-heading"
          className="max-w-2xl font-heading text-3xl font-extrabold text-white sm:text-4xl"
        >
          One Connected Capability Ecosystem
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CARDS.map((card, index) => (
            <motion.article
              key={card.name}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group border border-white/10 bg-black p-6 transition-colors hover:border-primary-red"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-primary-red/40 text-primary-red"
                aria-hidden="true"
              >
                <card.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">{card.name}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
                {card.description}
              </p>
              <a
                href={card.href}
                className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-primary-red"
              >
                Learn more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
