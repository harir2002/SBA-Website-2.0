/**
 * ContactMotionPanel — three process boxes shown at once, each with its
 * full approved copy inside the box.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROCESS_STAGES } from '../../data/contactContent'

const EASE = [0.16, 1, 0.3, 1]
const CYCLE_MS = 3200

export default function ContactMotionPanel({ className = '' }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % PROCESS_STAGES.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(231,0,11,0.12) 0%, transparent 42%, rgba(231,0,11,0.08) 100%)',
        }}
      />

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-red/70 to-transparent"
          animate={{ top: ['8%', '88%', '8%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 flex h-full flex-col px-3 py-4 sm:px-4 sm:py-5">
        <p className="font-heading text-[10px] font-bold tracking-[0.22em] text-primary-red uppercase">
          A clearer first step
        </p>
        <p className="mt-1.5 max-w-[16ch] font-heading text-sm font-extrabold leading-snug text-white sm:text-base">
          From first conversation to practical direction.
        </p>

        <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5 sm:gap-3">
          {PROCESS_STAGES.map((s, i) => {
            const isActive = i === active
            const isPast = i < active

            return (
              <motion.div
                key={s.n}
                className={`relative overflow-hidden border bg-black px-3.5 py-3 sm:px-4 sm:py-3.5 ${
                  isActive
                    ? 'border-primary-red/70'
                    : isPast
                      ? 'border-primary-red/25'
                      : 'border-white/12'
                }`}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        x: isActive ? 6 : 0,
                        scale: isActive ? 1.015 : 1,
                      }
                }
                transition={{ duration: 0.4, ease: EASE }}
              >
                <motion.span
                  className="absolute inset-y-0 left-0 w-[3px] bg-primary-red"
                  animate={{
                    opacity: isActive ? 1 : isPast ? 0.45 : 0.15,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {isActive && !reduceMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ left: ['-35%', '110%'] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 0.6,
                    }}
                  />
                )}

                <div className="relative flex gap-3">
                  <motion.span
                    className={`mt-0.5 shrink-0 font-heading text-xl font-extrabold leading-none tracking-tight sm:text-2xl ${
                      isActive ? 'text-primary-red' : 'text-white/20'
                    }`}
                    animate={
                      isActive && !reduceMotion
                        ? { opacity: [0.85, 1, 0.85] }
                        : { opacity: 1 }
                    }
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    {s.n}
                  </motion.span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-heading text-sm font-bold leading-snug ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p
                      className={`mt-1.5 font-body text-[11px] leading-snug sm:text-xs ${
                        isActive ? 'text-white/60' : 'text-white/40'
                      }`}
                    >
                      {s.copy}
                    </p>

                    <div className="mt-2.5 h-[2px] w-full overflow-hidden bg-white/10">
                      <motion.div
                        className="h-full bg-primary-red"
                        initial={false}
                        animate={{
                          width: isActive || isPast ? '100%' : '0%',
                          opacity: isActive ? 1 : isPast ? 0.35 : 0.15,
                        }}
                        transition={
                          isActive && !reduceMotion
                            ? { duration: CYCLE_MS / 1000, ease: 'linear' }
                            : { duration: 0.35, ease: EASE }
                        }
                        key={isActive ? `fill-${active}-${s.n}` : `idle-${s.n}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
