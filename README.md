# SBA Info Solutions — Website 2.0

> **Engineering the modern, secure, and intelligent enterprise.**

A production-grade marketing website for **SBA Info Solutions**, built with React 19, Vite 8, Tailwind CSS v4, and Three.js. Features a fully animated 3D hero background, scroll-triggered section animations, a capabilities grid, insights carousel, and a contact form — all in a strict **red / white / black** brand palette.

---

## ✦ Live Preview

```
npm run dev   →   http://localhost:5173
```

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| 3D Background | Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing |
| Animations | Framer Motion 13 |
| Icons | Lucide React |
| Carousel | Swiper 14 |
| Routing | React Router DOM 7 |

---

## ✦ Project Structure

```
SBA Website 2.0/
├── public/
├── src/
│   ├── assets/
│   │   ├── sba-logo.png
│   │   └── hero.png
│   ├── components/
│   │   ├── home/
│   │   │   ├── AnimatedBackground.jsx   # CSS-only animated backgrounds (non-hero sections)
│   │   │   ├── Background3D.jsx         # Three.js 3D line network (Hero only)
│   │   │   ├── CapabilitiesGrid.jsx     # 6-card capability showcase
│   │   │   ├── CapabilityDiagram.jsx    # SVG node diagram (Hero right column)
│   │   │   ├── CareersBanner.jsx        # Careers CTA section
│   │   │   ├── ContactSection.jsx       # Contact form + address
│   │   │   ├── Hero.jsx                 # Full-viewport hero with 3D background
│   │   │   ├── InsightsCarousel.jsx     # Swiper-powered insights carousel
│   │   │   ├── PartnerLogos.jsx         # Ecosystem partner logos strip
│   │   │   └── TrustMetrics.jsx         # Animated count-up stats
│   │   └── layout/
│   │       ├── Header.jsx               # Sticky nav with mobile drawer
│   │       └── Footer.jsx               # Footer with nav links
│   ├── pages/
│   │   └── HomeV2.jsx                   # Homepage composition
│   ├── styles/
│   │   └── brand-tokens.css             # CSS design tokens (@theme + :root)
│   ├── App.jsx                          # Router setup
│   ├── index.css                        # Global styles + animation keyframes
│   └── main.jsx                         # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ✦ Brand Tokens

The entire site uses **only three colours** — enforced via CSS custom properties:

```css
--color-primary-red:  #E7000B
--color-white:        #FFFFFF
--color-black:        #000000
--font-heading:       Arial, Helvetica, sans-serif
--font-body:          Arial, Helvetica, sans-serif
```

---

## ✦ Key Features

### 3D Animated Hero Background
- Built with **Three.js + React Three Fiber**
- A field of glowing red line segments connecting floating 3D nodes, slowly drifting and responding to mouse parallax
- **Bloom postprocessing** via `@react-three/postprocessing` for a luminous glow effect
- Mobile-optimised: node count reduced by ~50% on screens ≤ 768px
- Fully respects `prefers-reduced-motion` — animation pauses for accessibility

### Section Animated Backgrounds
- CSS-only animated backgrounds on Trust Metrics, Capabilities Grid, Careers Banner, and Contact sections
- Variants: drifting grid, floating orbs, red-accent cross pattern
- All animations use `prefers-reduced-motion` media query

### Scroll-Triggered Animations
- Framer Motion `whileInView` on capability cards and trust metric stats
- Count-up animation on numeric stats (30+, 300+)
- Staggered entrance delays

### Fully Responsive
- Mobile-first layout, tested at 390px, 768px, and 1440px
- Sticky header with hamburger drawer on mobile
- Swiper carousel adapts from 1 → 2 → 3 columns

---

## ✦ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/harir2002/SBA-Website-2.0.git
cd SBA-Website-2.0

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✦ Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server at localhost:5173 |
| `npm run build` | Production build to `/dist` |
| `npm run preview` | Preview production build locally |

---

## ✦ Accessibility

- All decorative background layers use `aria-hidden="true"` and `pointer-events: none`
- Navigation uses semantic `<nav>` with `aria-label`
- Motion respects `prefers-reduced-motion: reduce`
- Form fields are properly labelled with `<label for>`

---

## ✦ License

© 2026 SBA Info Solutions. All rights reserved.
