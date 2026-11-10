import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {notes, featuredNote} from '../content';

export function Notes() {
  const setup = useCallback((self: gsap.Context, el: HTMLElement) => {
    self.add(() => {
      gsap.from(el.querySelectorAll('.split-char'), {
        yPercent: 120,
        opacity: 0,
        stagger: 0.015,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {trigger: el, start: 'top 75%'},
      });
      gsap.from(el.querySelectorAll('.note-card'), {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {trigger: el.querySelector('.notes-grid'), start: 'top 80%'},
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section id="notes" ref={ref} className="px-[clamp(16px,4vw,64px)] py-[clamp(72px,12vh,140px)]">
      <header className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <h2 className="headline text-[clamp(44px,8vw,120px)]">
          <SplitWords text="Notes & Insights" />
        </h2>
        <a href="#notes" className="group inline-flex items-center gap-2 text-ui font-semibold uppercase">
          All notes
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </header>

      <article className="note-card mb-6 overflow-hidden rounded-3xl border border-line bg-ink p-8 text-page md:p-12">
        <div className="flex flex-wrap items-center gap-3 text-micro uppercase">
          <span className="rounded-full bg-sun px-2.5 py-1 font-semibold text-ink">Featured</span>
          <span className="text-page/60">{featuredNote.category}</span>
          <span className="text-page/60">{featuredNote.date}</span>
          <span className="text-page/60">{featuredNote.read}</span>
        </div>
        <h3 className="mt-6 max-w-[20ch] font-display text-[clamp(28px,4vw,56px)] font-bold tracking-[-0.02em]">
          {featuredNote.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-lede opacity-75">{featuredNote.excerpt}</p>
        <a href="#notes" className="group mt-6 inline-flex items-center gap-2 text-ui font-semibold uppercase">
          Read the note
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </article>

      <div className="notes-grid grid grid-cols-1 gap-4 md:grid-cols-3">
        {notes.map((n) => (
          <a
            key={n.title}
            href="#notes"
            className="note-card group flex min-h-[240px] flex-col justify-between rounded-3xl border border-line bg-field p-6 transition-colors hover:bg-ink hover:text-page"
          >
            <div className="flex flex-wrap items-center gap-2 text-micro uppercase text-mute group-hover:text-page/60">
              <span className="rounded-full bg-coral px-2 py-0.5 text-white">{n.category}</span>
              <span>{n.date}</span>
              <span>· {n.read}</span>
            </div>
            <div>
              <h3 className="font-display text-[clamp(18px,1.6vw,22px)] font-bold tracking-[-0.01em]">
                {n.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-micro font-semibold uppercase">
                Read
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}