import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {faces, person} from '../content';

const EMAIL = `hello@${person.handle.replace('@', '')}.studio`;

export function Contact() {
  const setup = useCallback((self: gsap.Context, el: HTMLElement) => {
    self.add(() => {
      gsap.from(el.querySelectorAll('.split-char'), {
        yPercent: 120,
        opacity: 0,
        stagger: 0.012,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {trigger: el, start: 'top 70%'},
      });
      gsap.from(el.querySelectorAll('.contact-fade'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {trigger: el, start: 'top 65%'},
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-[clamp(16px,4vw,64px)] py-[clamp(88px,16vh,180px)] text-center"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] -z-10 aspect-square w-[min(70vw,560px)] -translate-x-1/2 rounded-full bg-disc opacity-90"
        aria-hidden
      />
      <img
        src={faces.x_laugh.src}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute left-1/2 top-[10%] -z-10 aspect-square w-[min(58vw,440px)] -translate-x-1/2 rounded-full object-cover"
        aria-hidden
      />
      <h2 className="headline relative mx-auto max-w-[16ch] text-[clamp(40px,8.5vw,132px)]">
        <SplitWords text="Have a good idea?" />
        <br />
        <span className="marker"><SplitWords text="Let’s make it real." /></span>
      </h2>
      <p className="contact-fade relative mx-auto mt-8 max-w-[46ch] text-lede text-mute">
        Got a character that needs a soul, or an interaction that should feel alive? Tell me
        about it.
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="contact-fade relative mt-8 inline-flex items-center gap-3 rounded-full bg-disc px-8 py-4 font-display text-[clamp(16px,1.6vw,20px)] font-bold text-white shadow-[0_12px_40px_-12px_var(--disc)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_var(--disc)]"
      >
        {EMAIL}
        <span aria-hidden>→</span>
      </a>
      <ul className="contact-fade relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ui font-semibold uppercase">
        {['Dribbble', 'Instagram', 'X / Twitter', 'Read.cv'].map((s) => (
          <li key={s}>
            <a href="#" className="text-mute hover:text-sage">{s}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}