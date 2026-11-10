import {useEffect, useLayoutEffect, useRef, useState} from 'react';

/**
 * From md up, sizes the one-line headline to span its parent's content
 * box exactly. Below md it keeps its CSS size and wraps.
 */
export function useFitHeadline<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const wide = window.matchMedia('(min-width: 768px)');

    const PROBE = 100;
    const fit = () => {
      if (wide.matches) {
        el.style.fontSize = `${PROBE}px`;
        const styles = getComputedStyle(parent);
        const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        const natural = el.offsetWidth;
        if (natural > 0) el.style.fontSize = `${(PROBE * available) / natural}px`;
      } else {
        el.style.fontSize = '';
      }
      parent.style.setProperty('--mega', getComputedStyle(el).fontSize);
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return ref;
}

const THEME_KEY = 'otis-theme';

export function useTheme() {
  // Always start in LIGHT mode — ignore any saved preference.
  // The user can still toggle; that only affects the current session.
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0a0f0d' : '#f6f7f2');
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      /* not persisted; fine */
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

/**
 * Smooth-scrolls to in-page anchors on click.
 * Respects prefers-reduced-motion, applies a sticky-header offset.
 */
export function useSmoothAnchors(offset = 80) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;

      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return;

      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({top, behavior: reduce ? 'auto' : 'smooth'});
      history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [offset]);
}