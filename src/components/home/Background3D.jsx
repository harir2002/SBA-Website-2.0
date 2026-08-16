/**
 * Background3D — Three.js 3D line network for the Hero section.
 * Colors: #E7000B (red), #FFFFFF (white), #000000 (black) only.
 * Respects prefers-reduced-motion.
 *
 * Performance notes:
 * - EffectComposer/Bloom removed: multi-pass postprocessing caused frame-drop flicker
 * - useIsMobile reads once on mount only — no resize listener to avoid Canvas remounts
 * - Wrapped in React.memo so parent re-renders never hit the Canvas
 * - Mouse handler is passive to avoid blocking the render thread
 */

import { memo, Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RED   = new THREE.Color('#E7000B')
const WHITE = new THREE.Color('#FFFFFF')

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  return reduced
}

function useIsMobile() {
  const [mobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  return mobile
}

// ─── 3D Line Network ──────────────────────────────────────────────────────────

function NodeNetwork({ mobile, reduced }) {
  const groupRef   = useRef()
  const pointCount = mobile ? 28 : 55
  const mouse      = useRef({ x: 0, y: 0 })

  const nodes = useMemo(() => {
    return Array.from({ length: pointCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
      ),
    }))
  }, [pointCount])

  const linePositions = useMemo(() => {
    const positions = []
    const maxDist   = 4.5
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < maxDist) {
          positions.push(...nodes[i].pos.toArray(), ...nodes[j].pos.toArray())
        }
      }
    }
    return new Float32Array(positions)
  }, [nodes])

  const dotPositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      arr[i * 3]     = n.pos.x
      arr[i * 3 + 1] = n.pos.y
      arr[i * 3 + 2] = n.pos.z
    })
    return arr
  }, [nodes])

  const accentNodes = useMemo(() => nodes.filter((_, i) => i % 5 === 0), [nodes])

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.025 + mouse.current.x * 0.035
    groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.10 + mouse.current.y * 0.02
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={RED} transparent opacity={0.22} depthWrite={false} />
      </lineSegments>

      {/* Red dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={RED} size={0.07} transparent opacity={0.85} sizeAttenuation />
      </points>

      {/* Accent white nodes */}
      {accentNodes.map((n, i) => (
        <mesh key={i} position={n.pos.toArray()}>
          <sphereGeometry args={[0.045, 5, 5]} />
          <meshBasicMaterial color={WHITE} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Scene — no postprocessing, single render pass ────────────────────────────

function Scene({ mobile, reduced }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <NodeNetwork mobile={mobile} reduced={reduced} />
    </>
  )
}

// ─── Public component — memoized so Hero parent re-renders never touch Canvas ──

const Background3D = memo(function Background3D() {
  const reduced = usePrefersReducedMotion()
  const mobile  = useIsMobile()

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <Suspense fallback={<div style={{ background: '#000', width: '100%', height: '100%' }} />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={mobile ? 1 : [1, 1.5]}
          style={{ width: '100%', height: '100%' }}
          gl={{
            antialias:        false,
            powerPreference:  'high-performance',
            alpha:            false,
            stencil:          false,
            depth:            false,
          }}
          frameloop="always"
        >
          <Scene mobile={mobile} reduced={reduced} />
        </Canvas>
      </Suspense>

      {/* Readability overlay — CSS, not postprocessing */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          background:    'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
})

export default Background3D
