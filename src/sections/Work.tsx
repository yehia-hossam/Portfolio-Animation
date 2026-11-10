import {useCallback} from 'react';
import {gsap} from 'gsap';
import {useGsapSection} from '../lib/useGsap';
import {SplitWords} from '../components/SplitWords';
import {projects} from '../content';

type Project = (typeof projects)[number];

/**
 * Card media — supports video with poster, or a plain image.
 * Same 16:10 aspect and hover-zoom behavior as the original image.
 */
function CardMedia({p}: {p: Project}) {
  const video = 'video' in p ? p.video : undefined;
  const image = 'image' in p ? p.image : undefined;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-line">
      {video ? (
        <video
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={p.title}
          className="h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onMouseEnter={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : (
        <img
          src={image}
          alt={p.title}
          loading="lazy"
          className="h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

export function Work() {
  const setup = useCallback((self: gsap.Context, el: HTMLElement) => {
    self.add(() => {
      gsap.from(el.querySelectorAll('.split-char'), {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {trigger: el, start: 'top 75%'},
      });
      el.querySelectorAll<HTMLElement>('.work-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {trigger: card, start: 'top 88%'},
        });
      });
    });
  }, []);
  const ref = useGsapSection<HTMLElement>(setup);

  return (
    <section id="work" ref={ref} className="px-[clamp(16px,4vw,64px)] py-[clamp(56px,10vh,140px)]">
      <header className="mb-10 sm:mb-14 flex flex-wrap items-end justify-between gap-4 sm:gap-6">
        <h2 className="headline text-[clamp(36px,9vw,128px)]">
          <SplitWords text="Selected Work" />
        </h2>
        <p className="max-w-[34ch] text-lede text-mute">
          A few characters and interactions I’ve had the pleasure of building.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-6">
        {projects.map((p, i) => (
          <a
            key={p.slug}
            href="#work"
            className={`work-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-field ${
              p.featured ? 'md:col-span-6' : i % 2 === 0 ? 'md:col-span-4' : 'md:col-span-2'
            }`}
          >
            <CardMedia p={p} />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(18px,2.4vw,34px)] font-bold tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 max-w-[42ch] text-lede text-mute">{p.description}</p>
                <p className="mt-2 sm:mt-3 text-micro uppercase text-mute">{p.role}</p>
              </div>
              <span className="shrink-0 self-start rounded-full bg-sage px-2.5 sm:px-3 py-1 text-micro font-semibold uppercase text-white">
                {p.year}
              </span>
            </div>
            <span className="pointer-events-none absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full bg-sun px-2 sm:px-2.5 py-1 text-micro font-semibold uppercase text-ink">
              {p.category}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}