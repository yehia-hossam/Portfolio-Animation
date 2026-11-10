<div align="center">

# Otis — Creative Portfolio

**A premium, animated portfolio landing page for a fictional character artist & facial rigger.**

Featuring a fully interactive WebGL2 face you can grab, stretch, and let snap back — with physics, mood changes, and personality.

[Live Demo](https://your-demo-url.com) · [Report Bug](https://github.com/your-username/otis/issues) · [Request Feature](https://github.com/your-username/otis/issues)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Performance & Accessibility](#performance--accessibility)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About the Project

**Otis** is a single-page creative portfolio built from scratch with a strong emphasis on motion, interactivity, and typography. It was designed to feel like a hand-crafted studio site — not a template.

The centerpiece is a **fully interactive 3D cartoon face** rendered with native WebGL2. Users can:

- Grab any part of the face with mouse or touch
- Stretch and deform it in real time with spring-based physics
- Watch it snap back and morph into a random expression
- Track the character's "mood" and "patience" in a live UI meter

The page itself extends that playful identity across every section: oversized display typography, editorial project grids, GSAP-driven scroll reveals, and a persistent light/dark theme.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| **Build tool** | [Vite 6](https://vitejs.dev) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Animation** | [GSAP 3](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| **Rendering (face)** | Native [WebGL2](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) — no Three.js |
| **Icons** | Inline SVG |
| **Fonts** | Satoshi, Inter, Instrument Serif, Unbounded, JetBrains Mono |
| **State** | React hooks only — no Redux, no Zustand |

**Zero UI libraries.** No Framer Motion, no Radix, no MUI. Every component is hand-built.

---

## Features

### The Interactive Hero
- Custom WebGL2 face engine with vertex deformation
- Pointer-based drag physics with spring-back on release
- 14 expression states (chill, suspicious, cackling, OW, etc.)
- Live mood meter + patience decay
- Custom cursor ring that tightens while dragging

### Design System
- **Light + dark mode** with localStorage persistence and system preference detection
- CSS variable palette (emerald green + lemon yellow)
- Custom display typography with a highlighter-marker effect
- Responsive from 320px mobile to ultrawide desktop

### Content Sections
- **Selected Work** — asymmetric editorial grid with video/image cards
- **About** — expressive headline, portrait, skills grid
- **Services** — 6 character-illustrated cards with hover states
- **Process** — horizontal timeline with scrubbed progress line
- **Notes** — featured article + 3 article cards
- **Contact** — oversized CTA with disc background
- **Footer** — minimal, with back-to-top

### Motion
- GSAP entrance animations on every section
- Split-text character reveals
- ScrollTrigger-based reveals and parallax
- Hover states with magnetic feel
- Full `prefers-reduced-motion` support

### Developer Experience
- Strict TypeScript — no `any` in production code
- Reusable `useGsapSection` hook for GSAP + cleanup
- Proper `gsap.context().revert()` in every effect
- Safe under React StrictMode double-mount
- Lazy-loaded below-fold images

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- A modern browser with WebGL2 support

Verify your versions:

```bash
node --version
npm --version
