import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {faces, person} from '../content';

export function About() {
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
      gsap.from(el.querySelectorAll('.about-line'), {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {trigger: el, start: 'top 70%'},
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section id="about" ref={ref} className="px-[clamp(16px,4vw,64px)] py-[clamp(72px,12vh,140px)]">
      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 className="headline text-[clamp(44px,8vw,120px)]">
            <SplitWords text="I make" />
            <br />
            <span className="marker"><SplitWords text="faces" /></span>{' '}
            <SplitWords text="for a living." />
          </h2>
          <p className="about-line mt-8 max-w-[52ch] text-lede text-ink">
            Hi — I’m {person.name}. For eleven years I’ve been sculpting, rigging and animating
            cartoon characters for games, cereal boxes, and one very confused bank. I’m obsessed
            with the tiny shape changes that make a face read as alive.
          </p>
          <p className="about-line mt-4 max-w-[52ch] text-lede text-mute">
            My philosophy: respect the squash, respect the stretch, and never trust a straight
            line. I build small tools that let non-technical artists rig a face in an afternoon.
          </p>

          <dl className="about-line mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ['Character Design', 'Sculpt + style'],
              ['3D Modeling', 'High to low poly'],
              ['Facial Rigging', 'Blendshape + bone'],
              ['Animation', 'Expressive cycles'],
              ['Creative Dev', 'WebGL & GSAP'],
              ['Interaction', 'Magnetic UI'],
            ].map(([title, sub]) => (
              <div key={title}>
                <dt className="font-display text-[15px] font-bold">{title}</dt>
                <dd className="mt-1 text-micro uppercase text-sage">{sub}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-cream ring-1 ring-line">
            <img
              src={faces.base.src}
              alt="Portrait illustration of Otis"
              loading="lazy"
              className="absolute left-1/2 top-0 w-[135%] -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}