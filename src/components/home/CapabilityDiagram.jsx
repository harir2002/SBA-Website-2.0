import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  { id: 'core',     label: 'Modernize',  x: 50,  y: 10,  color: '#E7000B' },
  { id: 'protect',  label: 'Protect',    x: 85,  y: 35,  color: '#ffffff' },
  { id: 'data',     label: 'Data & AI',  x: 70,  y: 75,  color: '#E7000B' },
  { id: 'connect',  label: 'Connect',    x: 30,  y: 75,  color: '#ffffff' },
  { id: 'operate',  label: 'Operate',    x: 15,  y: 35,  color: '#E7000B' },
  { id: 'center',   label: 'SBA',        x: 50,  y: 45,  color: '#E7000B' },
]

const EDGES = [
  ['center', 'core'],
  ['center', 'protect'],
  ['center', 'data'],
  ['center', 'connect'],
  ['center', 'operate'],
  ['core', 'protect'],
  ['protect', 'data'],
  ['data', 'connect'],
  ['connect', 'operate'],
  ['operate', 'core'],
]

export default function CapabilityDiagram() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative hidden h-[420px] w-full lg:block" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const nodeA = NODES.find((n) => n.id === a)
          const nodeB = NODES.find((n) => n.id === b)
          return (
            <line
              key={`${a}-${b}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke="rgba(231,0,11,0.25)"
              strokeWidth="0.4"
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.id === 'center' ? 6 : 4}
              fill={node.id === 'center' ? '#E7000B' : 'transparent'}
              stroke={node.color}
              strokeWidth={node.id === 'center' ? 0 : 0.6}
            />
            <text
              x={node.x}
              y={node.y + (node.id === 'center' ? 0.8 : 0.8)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={node.id === 'center' ? '3.2' : '2.8'}
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
              fill={node.id === 'center' ? '#ffffff' : node.color}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
