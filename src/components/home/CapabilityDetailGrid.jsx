/**
 * CapabilityDetailGrid — text-only 3-column detail cards with scroll reveal.
 * Equal-width columns, equal-height sub-item cards, left-aligned text.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

function SubItem({ item, delay, reduceMotion }) {
  return (
    <motion.div
      className="capability-card cap-detail-item group/item flex w-full flex-1 cursor-pointer flex-col rounded-lg border border-primary-red bg-transparent p-5 text-left transition-colors duration-300 ease-out hover:border-[#ff2b35] hover:shadow-[0_0_20px_rgba(227,28,35,0.6),0_0_40px_rgba(227,28,35,0.3)]"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <h5 className="card-heading font-heading text-base font-bold text-primary-red">
        {item.title}
      </h5>
      <p className="mt-1.5 flex-1 font-body text-sm leading-relaxed text-white/[0.55]">
        {item.description}
      </p>
    </motion.div>
  )
}

function DetailColumn({ column, index, reduceMotion }) {
  const colDelay = index * 0.15

  return (
    <motion.div
      className="group/col relative flex h-full min-w-0 w-full flex-col text-left rounded-xl py-2 pl-5 pr-3"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: colDelay, ease: EASE }}
    >
      <motion.span
        className="absolute top-0 left-0 w-[2.5px] rounded-full transition-[filter,box-shadow] duration-200 ease-out group-hover/col:shadow-[0_0_12px_rgba(231,0,11,0.45)]"
        aria-hidden="true"
        initial={
          reduceMotion
            ? { clipPath: 'inset(0 0 0 0)' }
            : { clipPath: 'inset(0 0 100% 0)' }
        }
        whileInView={{ clipPath: 'inset(0 0 0 0)' }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay: colDelay + 0.08, ease: EASE }}
        style={{
          height: '100%',
          background:
            'linear-gradient(to bottom, #E7000B 0%, rgba(231,0,11,0.4) 50%, transparent 100%)',
        }}
      />

      <h4 className="column-header min-h-[2.75em] font-heading text-[20px] font-bold leading-snug text-white sm:text-[22px]">
        {column.heading}
      </h4>

      <div className="mt-5 flex w-full flex-1 flex-col gap-4 sm:gap-5">
        {column.items.map((item, i) => (
          <SubItem
            key={item.title}
            item={item}
            delay={colDelay + 0.18 + i * 0.09}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function CapabilityDetailGrid({ columns = [] }) {
  const reduceMotion = useReducedMotion()

  if (!columns.length) return null

  return (
    <div
      className="px-6 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
      data-placeholder="capability-detail-grid"
      aria-label="Capability detail areas"
    >
      <style>{`
        @media (min-width: 768px) {
          .cap-detail-grid-equal {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
      <motion.div
        className="cap-detail-grid-equal grid grid-cols-1 items-stretch gap-10 md:gap-8 lg:gap-10"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {columns.map((column, index) => (
          <DetailColumn
            key={column.heading}
            column={column}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </div>
  )
}
