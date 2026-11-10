import {nav, person} from '../content';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-[clamp(16px,4vw,64px)] py-10">
      <div className="grid gap-8 md:grid-cols-3 md:items-end">
        <div>
          <p className="font-display text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.02em]">
            {person.name}
          </p>
          <p className="mt-1 text-micro uppercase text-sage">Character art & interaction</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-ui font-semibold uppercase">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-mute hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <a href="#" className="group inline-flex items-center gap-2 text-ui font-semibold uppercase">
            Back to top
            <span className="transition-transform group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </div>
      <p className="mt-8 text-micro uppercase text-mute">© {year} {person.name}. All rights reserved.  <span className='text-red-500 :'>Yehia Dev</span></p>
    </footer>
  );
}