import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'

function PillarIcon({ index }) {
  const paths = [
    'M4 18V8l8-4 8 4v10l-8 4-8-4Zm8-10v14M4 8l8 4 8-4',
    'M12 3 4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Zm0 6v8m-3-4h6',
    'M12 4v4m0 8v4M4 12h4m8 0h4m-9.5-5.5 2.8 2.8m4.2 4.2 2.8 2.8m0-9.8-2.8 2.8m-4.2 4.2-2.8 2.8',
  ]

  return (
    <span className="ops-pillar-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={paths[index] || paths[0]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/**
 * Data-driven operations pillars (Manufacturing / IT-ITES / Diversified).
 * BFSI keeps its dedicated component unchanged.
 */
export default function IndustryOperationsPillars({ headline, pillars }) {
  const reduceMotion = useReducedMotion()
  if (!headline || !pillars?.length) return null

  const headingId = 'solution-areas-heading'

  return (
    <section
      id="solution-areas"
      className="industry-solution-areas ops-pillars-section relative bg-black"
      aria-labelledby={headingId}
    >
      <div className="container mx-auto max-w-[1280px] px-5 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <motion.h2
          id={headingId}
          className="mx-auto max-w-4xl font-heading text-3xl font-extrabold leading-tight text-balance text-white sm:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {headline}
        </motion.h2>

        <div className="pillars-grid mt-10 text-left">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="ops-pillar-card"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            >
              <PillarIcon index={i} />
              <h3 className="ops-pillar-card__title">{pillar.title}</h3>
              <ul className="ops-pillar-card__items">
                {(pillar.items || []).map((item, itemIndex) => (
                  <motion.li
                    key={item.title}
                    className="ops-pillar-card__item"
                    initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: 0.12 + i * 0.05 + itemIndex * 0.05,
                      ease: EASE,
                    }}
                  >
                    <span className="ops-pillar-card__bullet" aria-hidden="true">
                      →
                    </span>
                    <div>
                      <h4 className="ops-pillar-card__item-title">{item.title}</h4>
                      <p className="ops-pillar-card__item-body">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .ops-pillar-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%);
          padding: 28px 24px 30px;
          transition: border-color 220ms ease, transform 220ms ease;
        }

        .ops-pillar-card:hover {
          border-color: rgba(231, 0, 11, 0.45);
          transform: translateY(-2px);
        }

        .ops-pillar-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(231, 0, 11, 0.45);
          background: rgba(231, 0, 11, 0.1);
          color: ${RED};
          margin-bottom: 18px;
        }

        .ops-pillar-card__icon svg {
          width: 22px;
          height: 22px;
        }

        .ops-pillar-card__title {
          margin: 0 0 22px;
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 1.4vw, 1.35rem);
          font-weight: 700;
          line-height: 1.25;
          color: #e7000b;
        }

        .ops-pillar-card__items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ops-pillar-card__item {
          display: grid;
          grid-template-columns: 18px minmax(0, 1fr);
          gap: 10px;
          align-items: start;
        }

        .ops-pillar-card__bullet {
          margin-top: 2px;
          color: ${RED};
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .ops-pillar-card__item-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.35);
          text-underline-offset: 3px;
        }

        .ops-pillar-card__item-body {
          margin: 8px 0 0;
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.62);
        }

        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ops-pillar-card:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 720px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }

          .ops-pillar-card:last-child {
            grid-column: auto;
          }

          .ops-pillar-card {
            height: auto;
          }
        }
      `}</style>
    </section>
  )
}
