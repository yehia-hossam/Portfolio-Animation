// ═══════════════════════════════════════════════════════════════
// APP — Root component.
// Structure:
//   1. Header (nav + theme toggle)
//   2. Hero (headline, WebGL face, bio, mood meter, newsletter)
//   3. Press strip (divider)
//   4. Portfolio sections
//   5. Footer
// ═══════════════════════════════════════════════════════════════

import {useCallback, useRef, useState, type FormEvent} from 'react';
import {bio, faces, nav, person, press} from './content';
import {FaceCanvas, type Mood} from './face/FaceCanvas';
import {useFitHeadline, useTheme, useSmoothAnchors} from './hooks';

import {ScrollCue} from './sections/ScrollCue';
import {Work} from './sections/Work';
import {About} from './sections/About';
import {Services} from './sections/Services';
import {Process} from './sections/Process';
import {Notes} from './sections/Notes';
import {Contact} from './sections/Contact';
import {Footer} from './sections/Footer';

const DISC = '#D82245';

// ═══════════════════════════════════════════════════════════════
// HEADER — responsive: nav wraps under logo on mobile
// ═══════════════════════════════════════════════════════════════
function Header({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  return (
    <header className="relative z-40 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.4vh,24px)]">
      <div className="flex items-center justify-between gap-4">
        <a
          href="#"
          className="flex items-center gap-2.5 font-display text-[14px] sm:text-[15px] font-bold tracking-[-0.01em]"
        >
          <span className="relative size-7 sm:size-8 shrink-0 overflow-hidden rounded-full bg-disc">
            <img
              src={faces.base.src}
              alt=""
              className="absolute top-[-2%] left-[-30%] w-[160%] max-w-none"
            />
          </span>
          {person.handle}
        </a>

        <button
          type="button"
          onClick={onToggle}
          aria-pressed={dark}
          aria-label="Dark mode"
          className="flex h-7 w-12 shrink-0 items-center rounded-full bg-sun p-1"
        >
          <span
            className={`size-5 rounded-full bg-ink transition-transform duration-300 ${
              dark ? 'translate-x-5' : ''
            }`}
          />
        </button>
      </div>

      <nav
        aria-label="Main"
        className="mt-3 flex items-center gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:absolute md:right-[clamp(16px,2.4vw,36px)] md:top-[clamp(14px,2.4vh,24px)] md:mt-0 md:pr-16"
      >
        {nav.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-ui font-semibold uppercase transition-colors ${
              i === 0 ? 'bg-ink text-page' : 'hover:bg-line'
            }`}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUBSCRIBE
// ═══════════════════════════════════════════════════════════════
function Subscribe() {
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-[380px]">
      <label
        htmlFor="email"
        className="mb-2.5 block text-micro font-medium uppercase text-mute"
      >
        Every other Sunday · one email
      </label>

      {done ? (
        <p className="flex h-11 items-center rounded-full bg-ink px-5 text-[13px] sm:text-[14px] font-medium text-page">
          You’re in. He’s pulling a face about it.
        </p>
      ) : (
        <div className="flex h-11 gap-1.5">
          <input
            id="email"
            type="email"
            required
            placeholder="you@email.com"
            className="min-w-0 flex-1 rounded-full border border-line bg-field px-4 sm:px-5 text-[13px] sm:text-[14px] outline-none placeholder:text-mute focus:border-ink"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-disc px-3.5 sm:px-5 text-ui font-semibold uppercase text-white transition-transform active:scale-95"
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
// ═══════════════════════════════════════════════════════════════
function MoodMeter({mood}: {mood: Mood}) {
  const p = mood.patience;

  return (
    <div className="w-full max-w-[380px] space-y-3" aria-live="polite">
      <div className="flex items-baseline justify-between gap-2 text-micro uppercase">
        <span className="text-mute">Current mood</span>
        <span className="font-display text-[14px] sm:text-[15px] font-bold tracking-[-0.01em] normal-case text-right">
          {faces[mood.face].mood}
        </span>
      </div>

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
  useSmoothAnchors(90);
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>({face: 'base', patience: 100, pulls: 0});
  const onMood = useCallback((m: Mood) => setMood(m), []);

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <Header dark={dark} onToggle={toggle} />

      {/* ─── HERO ─── */}
      <main className="relative isolate flex flex-1 flex-col overflow-hidden px-[clamp(16px,2.4vw,36px)] pt-[clamp(16px,4vh,56px)] text-center">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
          style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-page/30" aria-hidden />

        {/* Headline — responsive size */}
        <h1
          ref={title}
          className="headline relative z-0 inline-block text-[15vw] sm:text-[16vw] md:whitespace-nowrap"
        >
          <span className="block md:inline">Hey, I’m </span>
          <span className="marker">{person.name}</span>
        </h1>

        {/* Three-column grid */}
        <div className="relative grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-6 md:grid-cols-[1fr_auto_1fr] md:gap-y-8 text-left">
          {/* Center — face stage */}
          <div
            ref={stageRef}
            className="stage relative mx-auto aspect-square w-[min(85vw,420px)] sm:w-[min(80vw,520px)] md:order-2 md:w-[min(46vw,78svh)]"
          >
            <p
              className={`hint absolute top-[24%] right-[-2%] rotate-6 font-serif text-[clamp(14px,1.5vw,22px)] italic md:right-[-8%] ${
                mood.pulls ? 'translate-y-2 opacity-0' : ''
              }`}
            >
              pull my face
              <svg
                viewBox="0 0 60 40"
                className="ml-4 sm:ml-6 block h-6 sm:h-8 w-9 sm:w-12 -scale-x-100"
                fill="none"
                aria-hidden
              >
                <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path
                  d="M40 31l8 4 1-9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>

          {/* Left — bio */}
          <div className="relative z-10 mx-auto w-full max-w-[380px] space-y-3 pb-[clamp(16px,5vh,48px)] text-lede md:mx-0 md:order-1">
            {bio.map((b, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'font-display text-[1.1em] sm:text-[1.25em] font-bold tracking-[-0.015em]'
                    : 'text-mute'
                }
              >
                {b}
              </p>
            ))}
          </div>

          {/* Right — mood + subscribe */}
          <div className="relative z-10 mx-auto flex w-full max-w-[380px] flex-col gap-6 pb-[clamp(16px,5vh,48px)] md:mx-0 md:order-3 md:items-end">
            <MoodMeter mood={mood} />
            <Subscribe />
          </div>
        </div>

        <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood} />

        <ScrollCue />
      </main>

      {/* ─── PRESS STRIP ─── */}
      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-4 sm:py-5">
        <ul className="flex flex-wrap items-center justify-between gap-x-6 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-mute">
          <li className="text-micro font-medium uppercase">As seen in</li>
          {press.map((p) => (
            <li key={p.name} className={`text-wordmark ${p.font}`}>
              {p.name}
            </li>
          ))}
        </ul>
      </footer>

      {/* ─── SECTIONS ─── */}
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