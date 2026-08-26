/**
 * VideoCapabilitiesBridge — continuous SVG path from video into badge 01,
 * with a scroll-driven red “flow” highlight that draws along the line.
 * Must sit in the same stacking context as the badges (inside the showcase)
 * so the path can end at the circle center underneath it.
 */

import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const STROKE = '#E7000B'

function buildPath(startX, startY, endX, endY) {
  const dropY = startY + Math.max(48, (endY - startY) * 0.38)
  const corner = 22
  const horizY = dropY + corner
  const goingLeft = endX < startX
  const q1x = goingLeft ? startX - corner : startX + corner
  const q2y = horizY + corner

  return [
    `M ${startX} ${startY}`,
    `L ${startX} ${dropY}`,
    `Q ${startX} ${horizY} ${q1x} ${horizY}`,
    `L ${endX + (goingLeft ? corner : -corner)} ${horizY}`,
    `Q ${endX} ${horizY} ${endX} ${q2y}`,
    `L ${endX} ${endY}`,
  ].join(' ')
}

export default function VideoCapabilitiesBridge() {
  const wrapRef = useRef(null)
  const pathRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [geom, setGeom] = useState(null)
  const [pathLength, setPathLength] = useState(0)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.85', 'end 0.45'],
  })

  const dashOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [pathLength || 1, 0],
  )
  const flowOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0.35, 1, 1])

  useLayoutEffect(() => {
    let tries = 0
    let raf = 0
    let ro = null

    const update = () => {
      const wrap = wrapRef.current
      const badge = document.getElementById('cap-badge-01')
      if (!wrap || !badge) {
        if (tries < 60) {
          tries += 1
          raf = requestAnimationFrame(update)
        }
        return
      }

      const wr = wrap.getBoundingClientRect()
      const br = badge.getBoundingClientRect()

      // Exact center of the 01 circle, in wrap-local coordinates
      const startX = wr.width / 2
      const startY = 6
      const endX = br.left + br.width / 2 - wr.left
      const endY = br.top + br.height / 2 - wr.top

      if (wr.width < 40 || endY <= startY + 20) {
        if (tries < 60) {
          tries += 1
          raf = requestAnimationFrame(update)
        }
        return
      }

      // Tall enough that the final vertical segment reaches the circle center
      const svgH = Math.max(wr.height, Math.ceil(endY + 4))

      setGeom({
        w: Math.max(wr.width, 1),
        h: svgH,
        startX,
        startY,
        endX,
        endY,
        d: buildPath(startX, startY, endX, endY),
      })

      if (!ro && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(update)
        ro.observe(wrap)
        ro.observe(badge)
        const showcase = document.getElementById('industries')
        if (showcase) ro.observe(showcase)
      }
    }

    update()
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    if (!pathRef.current) return
    setPathLength(pathRef.current.getTotalLength())
  }, [geom])

  return (
    <div
      ref={wrapRef}
      className="connector-line pointer-events-none relative h-[200px] w-full overflow-visible bg-transparent sm:h-[220px]"
      aria-hidden="true"
    >
      {geom && (
        <svg
          className="absolute top-0 left-0"
          width={geom.w}
          height={geom.h}
          viewBox={`0 0 ${geom.w} ${geom.h}`}
          fill="none"
          overflow="visible"
          style={{ overflow: 'visible', zIndex: 1 }}
        >
          <rect
            x={geom.startX - 14}
            y={0}
            width={28}
            height={3}
            rx={1.5}
            fill={STROKE}
            opacity={0.9}
          />

          <path
            d={geom.d}
            stroke={STROKE}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.22}
          />

          <motion.path
            ref={pathRef}
            d={geom.d}
            stroke={STROKE}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              opacity: reduceMotion ? 1 : flowOpacity,
              strokeDasharray: pathLength || 1,
              strokeDashoffset: reduceMotion ? 0 : dashOffset,
              filter: 'drop-shadow(0 0 6px rgba(231,0,11,0.75))',
            }}
          />
        </svg>
      )}
    </div>
  )
}
