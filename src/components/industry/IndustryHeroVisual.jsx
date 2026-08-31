/**
 * Abstract industry hero visuals — CSS/SVG architecture motifs only.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const RED = '#E7000B'
const BFSI_RED = '#E7000B'

function RedPath({ d, reduceMotion, delay = 0, color = RED }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 1.6, delay, ease: EASE }}
    />
  )
}

function Frame({ children, className = '' }) {
  return (
    <div
      className={`relative aspect-square w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black ${className}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {children}
    </div>
  )
}

/** BFSI — secure transaction through core → identity → cloud → security → recovery */
function BfsiHeroVisual({ reduceMotion }) {
  return (
    <Frame>
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full p-5 sm:p-7">
        {/* Core systems */}
        <rect x="28" y="150" width="70" height="120" rx="5" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <path d="M42 175 H84 M42 200 H78 M42 225 H84" stroke="rgba(245,245,242,0.2)" strokeWidth="1" />

        {/* Identity controls */}
        <rect x="118" y="110" width="64" height="64" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <circle cx="150" cy="142" r="14" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />
        <path d="M150 156 V168 M142 168 H158" stroke="rgba(245,245,242,0.25)" strokeWidth="1.2" />

        {/* Cloud layers */}
        <ellipse cx="250" cy="100" rx="42" ry="16" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <ellipse cx="250" cy="128" rx="52" ry="18" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.2" />
        <ellipse cx="250" cy="156" rx="40" ry="14" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1.2" />

        {/* Security boundaries */}
        <rect x="300" y="180" width="88" height="88" rx="6" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <rect x="314" y="194" width="60" height="60" rx="4" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1" />
        <path d="M330 224 H358 M344 210 V238" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />

        {/* Resilient recovery architecture */}
        <rect x="160" y="280" width="140" height="70" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M180 305 H280 M180 325 H250" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />
        <circle cx="270" cy="325" r="8" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />

        {/* Uninterrupted transaction path */}
        <RedPath
          color={BFSI_RED}
          reduceMotion={reduceMotion}
          delay={0.1}
          d="M63 210 C100 210, 118 150, 150 142 S210 120, 250 128 S300 180, 344 224 S300 280, 230 315"
        />
        {[
          [63, 210],
          [150, 142],
          [250, 128],
          [344, 224],
          [230, 315],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={BFSI_RED}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.2, ease: EASE }}
          />
        ))}
      </svg>
    </Frame>
  )
}

/** Manufacturing — planning → ERP → production → fulfilment path */
function ManufacturingHeroVisual({ reduceMotion }) {
  const accent = BFSI_RED
  return (
    <Frame>
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full p-5 sm:p-7">
        {/* ERP backbone */}
        <rect x="28" y="160" width="78" height="140" rx="5" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <path d="M42 185 H92 M42 210 H86 M42 235 H92 M42 260 H80" stroke="rgba(245,245,242,0.2)" strokeWidth="1" />

        {/* Engineering / design application layers */}
        <rect x="126" y="70" width="100" height="72" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M142 92 H210 M142 112 H198 M142 132 H206" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Secured production zones */}
        <rect x="126" y="170" width="100" height="100" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={140 + c * 40}
              y={186 + r * 36}
              width={32}
              height={28}
              rx="2"
              fill="none"
              stroke="rgba(245,245,242,0.16)"
              strokeWidth="1"
            />
          )),
        )}

        {/* Remote sites */}
        <rect x="250" y="90" width="54" height="54" rx="4" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.2" />
        <rect x="320" y="110" width="54" height="54" rx="4" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.2" />
        <rect x="280" y="180" width="54" height="54" rx="4" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.2" />

        {/* Central monitoring */}
        <rect x="250" y="270" width="124" height="70" rx="5" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <path d="M268 295 H356 M268 315 H330" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />
        <circle cx="350" cy="315" r="7" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />

        {/* Continuous planning → production → fulfilment line */}
        <RedPath
          color={accent}
          reduceMotion={reduceMotion}
          delay={0.1}
          d="M66 200 C110 200, 126 106, 176 106 S226 170, 176 220 S250 250, 307 207 S330 280, 312 305"
        />
        {[
          [66, 200],
          [176, 106],
          [176, 220],
          [307, 207],
          [312, 305],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={accent}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.18, ease: EASE }}
          />
        ))}
      </svg>
    </Frame>
  )
}

/** IT/ITES — legacy stack → modern release pipeline */
function ItItesHeroVisual({ reduceMotion }) {
  const accent = BFSI_RED
  return (
    <Frame>
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full p-5 sm:p-7">
        {/* Legacy stack (left) */}
        <rect x="28" y="220" width="72" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1.1" />
        <rect x="28" y="178" width="72" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.1" />
        <rect x="28" y="136" width="72" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.1" />

        {/* Application / service layers */}
        <rect x="120" y="80" width="90" height="56" rx="4" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M134 98 H194 M134 116 H186" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Cloud + data platforms */}
        <ellipse cx="260" cy="100" rx="36" ry="14" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <ellipse cx="260" cy="128" rx="46" ry="16" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.2" />
        <rect x="230" y="152" width="60" height="28" rx="3" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1" />

        {/* DevOps / container pipeline */}
        <rect x="140" y="200" width="48" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.1" />
        <rect x="200" y="200" width="48" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.1" />
        <rect x="260" y="200" width="48" height="36" rx="3" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.1" />
        <path d="M188 218 H200 M248 218 H260" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />

        {/* Observability */}
        <rect x="320" y="170" width="72" height="80" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M334 195 H378 M334 215 H370 M334 235 H378" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Security operations */}
        <rect x="200" y="280" width="140" height="64" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <circle cx="230" cy="312" r="12" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />
        <path d="M255 300 H320 M255 320 H300" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Legacy → modern release path */}
        <RedPath
          color={accent}
          reduceMotion={reduceMotion}
          delay={0.1}
          d="M64 154 C100 154, 120 108, 165 108 S220 140, 260 128 S280 200, 284 218 S320 210, 356 210 S330 280, 270 312"
        />
        {[
          [64, 154],
          [165, 108],
          [260, 128],
          [284, 218],
          [356, 210],
          [270, 312],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={accent}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.15, ease: EASE }}
          />
        ))}
      </svg>
    </Frame>
  )
}

/** Diversified — multi-environment architecture joined by one red line */
function DiversifiedHeroVisual({ reduceMotion }) {
  const accent = BFSI_RED
  return (
    <Frame>
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full p-5 sm:p-7">
        {/* High-performance compute zones */}
        <rect x="28" y="70" width="70" height="90" rx="5" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <rect x="40" y="86" width="22" height="58" rx="2" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1" />
        <rect x="68" y="86" width="22" height="58" rx="2" fill="none" stroke="rgba(245,245,242,0.16)" strokeWidth="1" />

        {/* Document / workflow streams */}
        <rect x="120" y="50" width="100" height="70" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M136 72 H204 M136 90 H190 M136 108 H198" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Customer communication pathways */}
        <path
          d="M250 70 C270 90, 300 90, 320 70 S360 50, 380 80"
          fill="none"
          stroke="rgba(245,245,242,0.2)"
          strokeWidth="1.2"
        />
        <circle cx="250" cy="70" r="5" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.1" />
        <circle cx="320" cy="70" r="5" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.1" />
        <circle cx="380" cy="80" r="5" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.1" />

        {/* Project / planning layers */}
        <rect x="120" y="150" width="120" height="100" rx="5" fill="none" stroke="rgba(245,245,242,0.2)" strokeWidth="1.2" />
        <path d="M138 175 H220 M138 198 H210 M138 221 H226" stroke="rgba(245,245,242,0.16)" strokeWidth="1" />
        <rect x="260" y="160" width="70" height="80" rx="4" fill="none" stroke="rgba(245,245,242,0.18)" strokeWidth="1.1" />

        {/* Secure managed operations */}
        <rect x="150" y="290" width="180" height="70" rx="5" fill="none" stroke="rgba(245,245,242,0.22)" strokeWidth="1.2" />
        <circle cx="180" cy="325" r="12" fill="none" stroke="rgba(245,245,242,0.28)" strokeWidth="1.2" />
        <path d="M205 312 H300 M205 332 H280" stroke="rgba(245,245,242,0.18)" strokeWidth="1" />

        {/* Connecting enterprise momentum line */}
        <RedPath
          color={accent}
          reduceMotion={reduceMotion}
          delay={0.1}
          d="M63 115 C100 115, 120 85, 170 85 S230 120, 280 90 S340 90, 360 120 S300 180, 200 200 S280 240, 295 200 S320 280, 240 325"
        />
        {[
          [63, 115],
          [170, 85],
          [280, 90],
          [200, 200],
          [295, 200],
          [240, 325],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={accent}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.15, ease: EASE }}
          />
        ))}
      </svg>
    </Frame>
  )
}

export default function IndustryHeroVisual({ visualKey = 'overview' }) {
  const reduceMotion = useReducedMotion()

  if (visualKey === 'bfsi') {
    return <BfsiHeroVisual reduceMotion={reduceMotion} />
  }

  if (visualKey === 'manufacturing') {
    return <ManufacturingHeroVisual reduceMotion={reduceMotion} />
  }

  if (visualKey === 'it-ites') {
    return <ItItesHeroVisual reduceMotion={reduceMotion} />
  }

  if (visualKey === 'diversified') {
    return <DiversifiedHeroVisual reduceMotion={reduceMotion} />
  }

  if (visualKey === 'overview') {
    return (
      <Frame>
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-6">
          {[40, 140, 240, 340].map((x, i) => (
            <rect
              key={x}
              x={x - 28}
              y={70 + (i % 2) * 20}
              width={56}
              height={220}
              rx="6"
              fill="none"
              stroke="rgba(245,245,242,0.18)"
              strokeWidth="1.25"
            />
          ))}
          <RedPath
            reduceMotion={reduceMotion}
            d="M40 200 C110 120, 160 280, 220 180 S320 140, 360 210"
          />
          {[80, 160, 240, 320].map((cx, i) => (
            <circle key={cx} cx={cx} cy={200 - (i % 2) * 30} r="4" fill={RED} opacity="0.9" />
          ))}
        </svg>
      </Frame>
    )
  }

  return (
    <Frame>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={48}
            y={48 + i * 56}
            width={304}
            height={40}
            rx="4"
            fill="none"
            stroke="rgba(245,245,242,0.16)"
            strokeWidth="1.2"
          />
        ))}
        <RedPath
          reduceMotion={reduceMotion}
          delay={0.15}
          d={
            visualKey === 'manufacturing'
              ? 'M48 280 H120 V160 H200 V240 H280 V120 H352'
              : visualKey === 'it-ites'
                ? 'M60 300 C120 260, 140 180, 200 160 S300 120, 340 80'
                : visualKey === 'diversified'
                  ? 'M60 320 C100 240, 160 280, 200 200 S280 140, 340 100'
                  : 'M60 320 C140 280, 180 200, 240 180 S320 100, 350 90'
          }
        />
        {[90, 160, 230, 300].map((y, i) => (
          <circle
            key={y}
            cx={80 + i * 70}
            cy={y - i * 20}
            r="3.5"
            fill={RED}
          />
        ))}
      </svg>
    </Frame>
  )
}
