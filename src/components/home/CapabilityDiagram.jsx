import { motion, useReducedMotion } from 'framer-motion'

// 6 capabilities evenly spaced around a circle
const ANGLE_STEP = 360 / 6
const RADIUS = 33  // distance from center to node center
const CX = 50      // SVG center x
const CY = 50      // SVG center y

const CAPABILITIES = [
  { id: 'modernize', line1: 'Modernize',   line2: 'the Core'      },
  { id: 'protect',   line1: 'Protect &',   line2: 'Recover'       },
  { id: 'data',      line1: 'Make Data',   line2: 'Actionable'    },
  { id: 'connect',   line1: 'Build &',     line2: 'Connect'       },
  { id: 'operate',   line1: 'Operate with', line2: 'Assurance'     },
  { id: 'ai',        line1: 'Accelerate',  line2: 'Business AI'   },
]

// Compute (x, y) for each outer node, starting from top (-90°)
const NODES = CAPABILITIES.map((cap, i) => {
  const angleDeg = -90 + i * ANGLE_STEP
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    ...cap,
    x: CX + RADIUS * Math.cos(angleRad),
    y: CY + RADIUS * Math.sin(angleRad),
  }
})

export default function CapabilityDiagram() {
  const reduceMotion = useReducedMotion()
      const NODE_R = 12   // outer node radius — large enough for 2 lines of text

  return (
    <div
      className="relative hidden h-[460px] w-full lg:flex lg:items-center lg:justify-center"
      aria-hidden="true"
    >
      <svg viewBox="-5 -5 110 110" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="center-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Spoke lines: center → each node ── */}
        {NODES.map((node, i) => (
          <motion.line
            key={`spoke-${node.id}`}
            x1={CX} y1={CY}
            x2={node.x} y2={node.y}
            stroke="rgba(231,0,11,0.4)"
            strokeWidth="0.45"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
          />
        ))}

        {/* ── Outer ring lines connecting adjacent nodes ── */}
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length]
          return (
            <motion.line
              key={`ring-${node.id}`}
              x1={node.x} y1={node.y}
              x2={next.x} y2={next.y}
              stroke="rgba(231,0,11,0.18)"
              strokeWidth="0.3"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
            />
          )
        })}

        {/* ── Center node — "SBA" ── */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {/* Pulse ring */}
          <motion.circle
            cx={CX} cy={CY} r={11}
            fill="none"
            stroke="rgba(231,0,11,0.25)"
            strokeWidth="0.5"
            animate={reduceMotion ? {} : {
              r: [11, 14, 11],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx={CX} cy={CY} r={9} fill="#E7000B" filter="url(#center-glow)" />
          <text
            x={CX} y={CY - 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800"
            fill="#ffffff"
          >
            SBA
          </text>
          <text
            x={CX} y={CY + 3}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="2.6" fontFamily="Arial, Helvetica, sans-serif" fontWeight="600"
            fill="rgba(255,255,255,0.75)"
          >
            Capabilities
          </text>
        </motion.g>

        {/* ── Outer capability nodes ── */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Node circle */}
            <circle
              cx={node.x} cy={node.y}
              r={NODE_R}
              fill="#000000"
              stroke="#E7000B"
              strokeWidth="0.65"
              filter="url(#node-glow)"
            />
            {/* Line 1 */}
            <text
              x={node.x} y={node.y - 2.4}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="2.6" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700"
              fill="#E7000B"
            >
              {node.line1}
            </text>
            {/* Line 2 */}
            <text
              x={node.x} y={node.y + 2.4}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="2.4" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400"
              fill="rgba(255,255,255,0.75)"
            >
              {node.line2}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
