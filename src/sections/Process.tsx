import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {processSteps} from '../content';

export function Process() {
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
      gsap.from(el.querySelectorAll('.step'), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {trigger: el.querySelector('.process-track'), start: 'top 80%'},
      });
      gsap.to(el.querySelector('.process-progress'), {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: el.querySelector('.process-track'),
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        },
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section id="process" ref={ref} className="px-[clamp(16px,4vw,64px)] py-[clamp(72px,12vh,140px)]">
      <h2 className="headline mb-14 text-[clamp(44px,8vw,120px)]">
        <SplitWords text="The Process" />
      </h2>
      <div className="process-track relative">
        <div
          className="process-progress absolute left-0 top-3 hidden h-px w-full origin-left scale-x-0 bg-sun md:block"
          aria-hidden
        />
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
          {processSteps.map((s) => (
            <li key={s.n} className="step relative">
              <span className="mb-3 block size-2.5 rounded-full bg-sun ring-4 ring-page" />
              <span className="text-micro font-semibold uppercase text-sage">{s.n}</span>
              <h3 className="mt-1 font-display text-[clamp(20px,2vw,28px)] font-bold tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[28ch] text-lede text-mute">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}