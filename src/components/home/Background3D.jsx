/**
 * Background3D — lazy-loaded Three.js 3D line network for the Hero section.
 * Colors: #E7000B (red), #FFFFFF (white), #000000 (black) only.
 * Respects prefers-reduced-motion by pausing animation.
 */

import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const RED   = new THREE.Color('#E7000B')
const WHITE = new THREE.Color('#FFFFFF')

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

// ─── 3D Line Network ──────────────────────────────────────────────────────────

function NodeNetwork({ mobile, reduced }) {
  const groupRef = useRef()
  const pointCount = mobile ? 30 : 60
  const mouse = useRef({ x: 0, y: 0 })

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
    const maxDist = 4.5
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

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.03 + mouse.current.x * 0.04
    groupRef.current.rotation.x = Math.sin(t * 0.015) * 0.12 + mouse.current.y * 0.025
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={RED} transparent opacity={0.18} depthWrite={false} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={RED} size={0.06} transparent opacity={0.9} sizeAttenuation />
      </points>

      {nodes
        .filter((_, i) => i % 4 === 0)
        .map((n, i) => (
          <mesh key={i} position={n.pos.toArray()}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={WHITE} transparent opacity={0.55} />
          </mesh>
        ))}
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({ mobile, reduced }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <NodeNetwork mobile={mobile} reduced={reduced} />
      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.05} luminanceSmoothing={0.9} radius={0.85} />
      </EffectComposer>
    </>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function Background3D() {
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
          dpr={[1, mobile ? 1.5 : 2]}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        >
          <Scene mobile={mobile} reduced={reduced} />
        </Canvas>
      </Suspense>

      {/* Gradient overlay to keep text readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
