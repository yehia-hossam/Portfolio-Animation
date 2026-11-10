import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {services} from '../content';

export function Services() {
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
      gsap.from(el.querySelectorAll('.service-card'), {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {trigger: el.querySelector('.service-grid'), start: 'top 80%'},
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section id="services" ref={ref} className="px-[clamp(16px,4vw,64px)] py-[clamp(72px,12vh,140px)]">
      <header className="mb-14 max-w-[52ch]">
        <h2 className="headline text-[clamp(44px,8vw,120px)]">
          <SplitWords text="Services &" />
          <br />
          <span className="marker"><SplitWords text="Expertise" /></span>
        </h2>
        <p className="mt-6 text-lede text-mute">
          Six things I do well — and care about doing well.
        </p>
      </header>

      <div className="service-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className="service-card group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-field p-6 transition-colors hover:bg-ink hover:text-page"
          >
            <div className="absolute right-0 top-0 h-1 w-12 bg-coral transition-all group-hover:w-full" aria-hidden />
            <span className="text-micro font-semibold uppercase text-mute group-hover:text-page/60">
              {s.n}
            </span>
            <div>
              <h3 className="font-display text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-2 text-lede opacity-80">{s.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}