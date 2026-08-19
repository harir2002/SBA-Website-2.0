/**
 * CapabilityDetailGrid — text-only 3-column detail cards with scroll reveal.
 * Embedded inside each capability card (no separate flat black panel).
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

function SubItem({ item, delay, reduceMotion }) {
  return (
    <motion.div
      className="cap-detail-item group/item"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <h5 className="font-heading text-base font-bold text-white transition-transform duration-200 ease-out group-hover/item:translate-x-1">
        {item.title}
      </h5>
      <p className="mt-1.5 font-body text-sm leading-relaxed text-white/[0.55] transition-transform duration-200 ease-out group-hover/item:translate-x-1">
        {item.description}
      </p>
    </motion.div>
  )
}

function DetailColumn({ column, index, reduceMotion }) {
  const colDelay = index * 0.15

  return (
    <motion.div
      className="group/col relative rounded-xl py-2 pl-5 pr-2 transition-colors duration-200 ease-out hover:bg-white/[0.02]"
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

      <h4 className="font-heading text-[20px] font-bold leading-snug text-white sm:text-[22px]">
        {column.heading}
      </h4>

      <div className="mt-5 flex flex-col gap-7 sm:gap-8">
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
      <motion.div
        className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-10"
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
