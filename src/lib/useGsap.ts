import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useGsapSection<T extends HTMLElement>(
  setup: (self: gsap.Context, el: T) => void,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context((self) => setup(self, el), el);
    return () => ctx.revert();
  }, [setup]);
  return ref;
}