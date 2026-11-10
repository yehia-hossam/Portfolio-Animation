// ═══════════════════════════════════════════════════════════════
// APP — Root component.
//
// Structure:
//   1. Header (nav + theme toggle)
//   2. Hero  (headline, WebGL face, bio, mood meter, newsletter)
//   3. Press strip (divider)
//   4. Portfolio sections (Work, About, Services, Process, Notes, Contact)
//   5. Footer
//
// The Hero is the identity of the site — the oversized headline and
// the interactive face are intentionally preserved and should not be
// replaced with images or simplified animations.
// ═══════════════════════════════════════════════════════════════

import {useCallback, useRef, useState, type FormEvent} from 'react';
import {bio, faces, nav, person, press} from './content';
import {FaceCanvas, type Mood} from './face/FaceCanvas';
import {useFitHeadline, useTheme, useSmoothAnchors} from './hooks';

// ─── Section components ───────────────────────────────────────
import {ScrollCue} from './sections/ScrollCue';
import {Work} from './sections/Work';
import {About} from './sections/About';
import {Services} from './sections/Services';
import {Process} from './sections/Process';
import {Notes} from './sections/Notes';
import {Contact} from './sections/Contact';
import {Footer} from './sections/Footer';

// ─── Constants ────────────────────────────────────────────────
// Color of the WebGL disc rendered behind the interactive face.
// Change this to recolor the disc (red, green, blue, etc.).
const DISC = '#D82245';

// ═══════════════════════════════════════════════════════════════
// HEADER
// - Brand mark (small face avatar + handle)
// - Main navigation (pulled from `nav` in content.ts)
// - Theme toggle button (light ↔ dark)
// ═══════════════════════════════════════════════════════════════
function Header({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  return (
    <header className="relative z-40 flex items-center justify-between gap-4 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.4vh,24px)]">
      {/* Brand mark — links to top of page */}
      <a href="#" className="flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[-0.01em]">
        <span className="relative size-8 overflow-hidden rounded-full bg-disc">
          <img src={faces.base.src} alt="" className="absolute top-[-2%] left-[-30%] w-[160%] max-w-none" />
        </span>
        {person.handle}
      </a>

      {/* Navigation */}
      <nav aria-label="Main" className="flex items-center gap-1.5">
        {nav.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={`rounded-full px-3.5 py-2 text-ui font-semibold uppercase transition-colors ${
              i === 0 ? 'bg-ink text-page' : 'hover:bg-line'
            }`}
          >
            {l.label}
          </a>
        ))}

        {/* Theme toggle — pill switch */}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={dark}
          aria-label="Dark mode"
          className="ml-2 flex h-7 w-12 items-center rounded-full bg-sun p-1"
        >
          <span
            className={`size-5 rounded-full bg-ink transition-transform duration-300 ${dark ? 'translate-x-5' : ''}`}
          />
        </button>
      </nav>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUBSCRIBE
// Newsletter signup form.
// - Single email input + submit button
// - On submit, replaces the form with a friendly confirmation
// ═══════════════════════════════════════════════════════════════
function Subscribe() {
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-[380px]">
      <label htmlFor="email" className="mb-2.5 block text-micro font-medium uppercase text-mute">
        Every other Sunday · one email
      </label>

      {done ? (
        <p className="flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-page">
          You’re in. He’s pulling a face about it.
        </p>
      ) : (
        <div className="flex h-11 gap-1.5">
          <input
            id="email"
            type="email"
            required
            placeholder="you@email.com"
            className="min-w-0 flex-1 rounded-full border border-line bg-field px-5 text-[14px] outline-none placeholder:text-mute focus:border-ink"
          />
          <button
            type="submit"
            className="rounded-full bg-disc px-5 text-ui font-semibold uppercase text-white transition-transform active:scale-95"
          >
            Subscribe →
          </button>
        </div>
      )}
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOOD METER
// Shows the current expression label + patience percentage.
// Values come from the WebGL face engine via the `mood` prop.
// ═══════════════════════════════════════════════════════════════
function MoodMeter({mood}: {mood: Mood}) {
  const p = mood.patience;

  return (
    <div className="w-full max-w-[380px] space-y-3" aria-live="polite">
      {/* Expression label */}
      <div className="flex items-baseline justify-between text-micro uppercase">
        <span className="text-mute">Current mood</span>
        <span className="font-display text-[15px] font-bold tracking-[-0.01em] normal-case">
          {faces[mood.face].mood}
        </span>
      </div>

      {/* Patience bar */}
      <div>
        <div className="mb-1.5 flex justify-between text-micro uppercase text-mute">
          <span>Patience</span>
          <span className="tabular-nums">{p}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{width: `${p}%`, background: `color-mix(in oklab, var(--disc) ${p}%, #e8412c)`}}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
export default function App() {
  // Smooth-scrolls in-page anchors (header, footer, ScrollCue, etc.)
  // 90px offset = height of the sticky header.
  useSmoothAnchors(90);

  // Theme state (light / dark), persisted to localStorage
  const [dark, toggle] = useTheme();

  // Auto-fit the oversized headline to fill its parent width on desktop
  const title = useFitHeadline<HTMLHeadingElement>();

  // Ref pointing to the stage — the WebGL face engine mounts here
  const stageRef = useRef<HTMLDivElement>(null);

  // Live mood state emitted by the face engine (expression + patience)
  const [mood, setMood] = useState<Mood>({face: 'base', patience: 100, pulls: 0});
  const onMood = useCallback((m: Mood) => setMood(m), []);

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <Header dark={dark} onToggle={toggle} />

      {/*
        ─── HERO ────────────────────────────────────────────────
        Full-viewport section with:
          - video background (optional — comment out to disable)
          - dark overlay so text stays readable
          - oversized headline
          - 3-column grid: bio | face | mood meter + newsletter
          - interactive WebGL face (bottom of <main>)
          - scroll cue
        ────────────────────────────────────────────────────────
      */}
      <main className="relative isolate flex flex-1 flex-col overflow-hidden px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,56px)] text-center">
        {/* ─── BACKGROUND VIDEO ──────────────────────────────────
            Optional — remove or comment out to use a solid/gradient bg.
            Media sources live in /public/hero-video.{mp4,webm}.
            `muted` and `playsInline` are required for mobile autoplay.
            ──────────────────────────────────────────────────────── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
          style={{
            transform: 'translateZ(0)',      // Force GPU compositing (sharper video)
            backfaceVisibility: 'hidden',    // Prevent flicker on some devices
          }}
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* ─── OVERLAY ───────────────────────────────────────────
            Sits above the video, below the text. Adjust the `/30`
            opacity (e.g. /20, /40, /60) to control text legibility.
            ──────────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-page/30" aria-hidden />

        {/* ─── HEADLINE ──────────────────────────────────────────
            The large "Hey, I'm Otis" title.
            Text color of "Hey, I'm" is set to a bright yellow so it
            pops over the video. The name uses the .marker class
            (yellow highlighter background).
            ──────────────────────────────────────────────────────── */}
        <h1 ref={title} className="headline relative z-0 inline-block text-[21vw] md:whitespace-nowrap">
          <span className="block md:inline ">Hey, I’m </span>
          <span className="marker">{person.name}</span>
        </h1>

        {/* ─── THREE-COLUMN GRID ─────────────────────────────────
            Desktop: bio | face | mood+newsletter
            Mobile: stacked in a single column
            ──────────────────────────────────────────────────────── */}
        <div className="relative grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 text-left md:grid-cols-[1fr_auto_1fr]">
          {/* Center — the WebGL face mounts here via `stageRef` */}
          <div ref={stageRef} className="stage relative mx-auto aspect-square w-[min(100vw,580px)] md:order-2 md:w-[min(46vw,78svh)]">
            {/* "pull my face" hint — fades out after first interaction */}
            <p
              className={`hint absolute top-[24%] right-[-2%] rotate-6 font-serif text-[clamp(17px,1.5vw,22px)] italic md:right-[-8%] ${
                mood.pulls ? 'translate-y-2 opacity-0' : ''
              }`}
            >
              pull my face
              <svg viewBox="0 0 60 40" className="ml-6 block h-8 w-12 -scale-x-100" fill="none" aria-hidden>
                <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M40 31l8 4 1-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>

          {/* Left — short bio (from content.ts) */}
          <div className="relative z-10 max-w-[380px] space-y-3 pb-[clamp(20px,5vh,48px)] text-lede md:order-1">
            {bio.map((b, i) => (
              <p key={i} className={i === 0 ? 'font-display text-[1.25em] font-bold tracking-[-0.015em]' : 'text-mute'}>
                {b}
              </p>
            ))}
          </div>

          {/* Right — mood meter + newsletter */}
          <div className="relative z-10 flex flex-col gap-7 pb-[clamp(20px,5vh,48px)] md:order-3 md:items-end">
            <MoodMeter mood={mood} />
            <Subscribe />
          </div>
        </div>

        {/* ─── WEBGL FACE ENGINE ─────────────────────────────────
            Mounts a canvas inside `stageRef`.
            - `discColor` — background disc color
            - `onMood`   — callback that fires on every expression change
            Do not replace this with an image or simplified animation.
            ──────────────────────────────────────────────────────── */}
        <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood} />

        {/* ─── SCROLL CUE ────────────────────────────────────────
            Small "Scroll" hint that points to the Work section.
            ──────────────────────────────────────────────────────── */}
        <ScrollCue />
      </main>

      {/* ─── PRESS STRIP ───────────────────────────────────────
          Divider between the Hero and the portfolio sections.
          Renders each entry in `press` as a styled wordmark.
          ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5">
        <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mute">
          <li className="text-micro font-medium uppercase">As seen in</li>
          {press.map((p) => (
            <li key={p.name} className={`text-wordmark ${p.font}`}>
              {p.name}
            </li>
          ))}
        </ul>
      </footer>

      {/* ─── PORTFOLIO SECTIONS ────────────────────────────────
          Each section is a self-contained component from ./sections/.
          Reorder, remove, or duplicate them here.
          ──────────────────────────────────────────────────────── */}
      <Work />
      <About />
      <Services />
      <Process />
      <Notes />
      <Contact />
      <Footer />
    </div>
  );
}